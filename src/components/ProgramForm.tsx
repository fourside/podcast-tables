import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Program } from "../lib/station";
import { PostParams } from "../lib/client";
import { decodeHtml } from "../lib/util";
import { formatFull } from "../lib/day";

type Props = {
  stationId: string;
  program: Program;
};
export const ProgramForm: React.FC<Props> = ({ stationId, program }) => {
  const { handleSubmit } = useForm<PostParams>();
  const infoHtml = decodeHtml(program.info);

  const onSubmit = (params: PostParams) => {
    console.log(params);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input type="text" width={20} readOnly={true} name="stationId" value={stationId} />
        <Input type="text" width={77} readOnly={true} name="title" value={program.title} />
      </FormControl>
      <FormControl>
        <Input type="text" readOnly={true} name="personality" value={program.personality} />
      </FormControl>
      <FormControl>
        <Input type="text" width={40} readOnly={true} name="from" value={formatFull(program.from)} />
        <Input type="text" width={15} readOnly={true} name="duration" value={program.duration / 60} />
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
  "&:hover": {
    backgroundColor: "#888",
    color: "#eee",
    border: "none",
  },
});
