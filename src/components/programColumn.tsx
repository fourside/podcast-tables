import styled from "styled-components";

import { diffDateFrom, formatMonthDay } from "../lib/day";
import { columnId } from "../lib/util";
import { ProgramPerDate } from "../lib/station";
import { ProgramCard } from "./programCard";

type Props = {
  programPerDate: ProgramPerDate;
};
export const ProgramColumn: React.FC<Props> = ({ programPerDate }) => {
  const index = diffDateFrom(programPerDate.date);
  const idAttribute = columnId(index);
  const date = formatMonthDay(programPerDate.date);

  return (
    <Column key={programPerDate.date} id={idAttribute}>
      <Date>{date}</Date>
      {programPerDate.programs.map((program) => (
        <ProgramCard program={program} key={program.id} />
      ))}
    </Column>
  );
};

const Column = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  margin: "8px",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  width: "calc(100% / 4)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  gap: "4px",
  padding: "8px",
  scrollSnapAlign: "center",
});

const Date = styled.h3({
  margin: "8px",
  paddingLeft: "2px",
  whiteSpace: "nowrap",
});
