import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Program } from "../lib/station";
import { PostParams } from "../lib/client";
import { decodeHtml, formatProgram } from "../lib/util";
import { SubmitButton } from "./SubmitButton";
import { formSchema } from "../lib/formSchema";

type Props = {
  stationId: string;
  program: Program;
  onSubmit: (postParams: PostParams) => Promise<void>;
};
export const ProgramForm: React.FC<Props> = ({ stationId, program, onSubmit }) => {
  const { handleSubmit, register, formState, errors } = useForm<PostParams>({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });
  const { isSubmitting, isValid } = formState;

  const formatted = formatProgram(program);
  const infoHtml = decodeHtml(program.info);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input
          type="text"
          width={20}
          readOnly={true}
          name="stationId"
          value={stationId}
          ref={register}
          hasError={!!errors.stationId}
        />
        <Input
          type="text"
          width={77}
          readOnly={true}
          name="title"
          value={formatted.title}
          ref={register}
          hasError={!!errors.title}
        />
      </FormControl>
      <ErrorMessage>{errors.stationId?.message}</ErrorMessage>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <FormControl>
        <Input
          type="text"
          readOnly={true}
          name="personality"
          value={formatted.personality}
          ref={register}
          hasError={!!errors.personality}
        />
      </FormControl>
      <ErrorMessage>{errors.personality?.message}</ErrorMessage>
      <FormControl>
        <Input
          type="text"
          width={40}
          readOnly={true}
          name="fromTime"
          value={formatted.from}
          ref={register}
          hasError={!!errors.fromTime}
        />
        <Input
          type="text"
          width={15}
          readOnly={true}
          name="duration"
          value={formatted.duration}
          ref={register}
          hasError={!!errors.duration}
        />
        <EmptySpan width={40} />
      </FormControl>
      <ErrorMessage>{errors.fromTime?.message}</ErrorMessage>
      <ErrorMessage>{errors.duration?.message}</ErrorMessage>
      <FormControl>
        <Info dangerouslySetInnerHTML={{ __html: infoHtml }} />
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

const _Input = styled.input(
  {
    border: "1px solid #eee",
    borderRadius: "10px",
    outline: "none",
    padding: "12px",
  },
  (props: { width?: number }) => {
    if (props.width) {
      return {
        width: `${props.width}%`,
      };
    }
    return {
      width: "100%",
    };
  }
);

const Input = styled(_Input)({}, (props: { hasError: boolean }) => {
  if (props.hasError) {
    return {
      border: "1px solid #f22",
    };
  }
  return {
    border: "1px solid #eee",
  };
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
