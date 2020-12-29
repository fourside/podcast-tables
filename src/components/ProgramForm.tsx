import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Program } from "../lib/station";
import { PostParams } from "../lib/client";
import { decodeHtml, formatProgram } from "../lib/util";
import { SubmitButton } from "./SubmitButton";
import { EditableInput } from "./EditableInput";
import { formSchema } from "../lib/formSchema";

type Props = {
  stationId: string;
  program: Program;
  onSubmit: (postParams: PostParams) => Promise<void>;
};
export const ProgramForm: React.FC<Props> = ({ stationId, program, onSubmit }) => {
  const formatted = formatProgram(program);

  const { handleSubmit, register, formState, errors } = useForm<PostParams>({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    defaultValues: {
      stationId,
      title: formatted.title,
      personality: formatted.personality,
      fromTime: formatted.fromTime,
      duration: formatted.duration,
    },
  });
  const { isSubmitting, isValid } = formState;

  const infoHtml = decodeHtml(program.info);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <EditableInput
          width={20}
          forceReadOnly={true}
          name="stationId"
          register={register}
          hasError={!!errors.stationId}
        />
        <EditableInput width={77} name="title" register={register} hasError={!!errors.title} />
      </FormControl>
      <ErrorMessage>{errors.stationId?.message}</ErrorMessage>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <FormControl>
        <EditableInput name="personality" register={register} hasError={!!errors.personality} />
      </FormControl>
      <ErrorMessage>{errors.personality?.message}</ErrorMessage>
      <FormControl>
        <EditableInput width={40} name="fromTime" register={register} hasError={!!errors.fromTime} />
        <EditableInput width={15} name="duration" register={register} hasError={!!errors.duration} />
        <EmptySpan width={40} />
      </FormControl>
      <ErrorMessage>{errors.fromTime?.message}</ErrorMessage>
      <ErrorMessage>{errors.duration?.message}</ErrorMessage>
      <FormControl>
        {infoHtml && <Info dangerouslySetInnerHTML={{ __html: infoHtml }} />}
      </FormControl>
      <FormControl>
        <SubmitButton label={"SEND"} isSubmitting={isSubmitting} isValid={!isSubmitting || isValid} />
      </FormControl>
    </Form>
  );
};

const Form = styled.form({
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "8px 16px",
  backgroundColor: "#fff",
});

const FormControl = styled.div({
  margin: "8px 0",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const ErrorMessage = styled.div({
  color: "#d00",
  fontSize: "small",
  marginTop: "-8px",
  paddingLeft: "8px",
});

const EmptySpan = styled.span({}, (props: { width: number }) => {
  return { width: `${props.width}%` };
});

const Info = styled.div({
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "12px",
  color: "#555",
  fontSize: "small",
  width: "100%",
  "& > a": {
    color: "#09b",
  },
});
