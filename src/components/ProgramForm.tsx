import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Program } from "../lib/station";
import { PostParams } from "../lib/client";
import { decodeHtml, formatProgram } from "../lib/util";

type Props = {
  stationId: string;
  program: Program;
  onSubmit: (postParams: PostParams) => Promise<void>;
};
export const ProgramForm: React.FC<Props> = ({ stationId, program, onSubmit }) => {
  const { handleSubmit, register } = useForm<PostParams>();
  const formatted = formatProgram(program);
  const infoHtml = decodeHtml(program.info);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input type="text" width={20} readOnly={true} name="stationId" value={stationId} ref={register} />
        <Input type="text" width={77} readOnly={true} name="title" value={formatted.title} ref={register} />
      </FormControl>
      <FormControl>
        <Input type="text" readOnly={true} name="personality" value={formatted.personality} ref={register} />
      </FormControl>
      <FormControl>
        <Input type="text" width={40} readOnly={true} name="fromTime" value={formatted.from} ref={register} />
        <Input type="text" width={15} readOnly={true} name="duration" value={formatted.duration} ref={register} />
        <EmptySpan width={40} />
      </FormControl>
      <FormControl>
        <Info dangerouslySetInnerHTML={{ __html: infoHtml }} />
      </FormControl>
      <FormControl>
        <SubmitButton type="submit" name="submit" value={"SEND"} />
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

const Input = styled.input(
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

const SubmitButton = styled.input({
  border: "1px solid #eee",
  borderRadius: "10px",
  color: "#333",
  padding: "8px 12px",
  cursor: "pointer",
  width: "100px",
  outline: "none",
  "&:hover": {
    backgroundColor: "#888",
    color: "#eee",
    border: "1px solid #888",
  },
});
