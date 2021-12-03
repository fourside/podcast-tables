import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Program } from "../../lib/station";
import { PostParams } from "../../lib/client";
import { decodeHtml, formatProgram } from "../../lib/util";
import { SubmitButton } from "./submit-button";
import { EditableInput } from "./editable-input";
import { ErrorFormMessage } from "./error-form-message";
import { formSchema } from "../../lib/form-schema";

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
      <ErrorFormMessage message={errors.stationId?.message} />
      <ErrorFormMessage message={errors.title?.message} />
      <FormControl>
        <EditableInput name="personality" register={register} hasError={!!errors.personality} />
      </FormControl>
      <ErrorFormMessage message={errors.personality?.message} />
      <FormControl>
        <EditableInput width={40} name="fromTime" register={register} hasError={!!errors.fromTime} />
        <EditableInput width={15} name="duration" register={register} hasError={!!errors.duration} />
        <EmptySpan width={40} />
      </FormControl>
      <ErrorFormMessage message={errors.fromTime?.message} />
      <ErrorFormMessage message={errors.duration?.message} />
      <FormControl>{infoHtml && <Info dangerouslySetInnerHTML={{ __html: infoHtml }} />}</FormControl>
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
