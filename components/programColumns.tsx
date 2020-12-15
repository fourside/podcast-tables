import styled from "styled-components";

import { ProgramPerDate} from "../lib/station";
import { ProgramCard } from "./programCard";

type Props = {
  programs: ProgramPerDate[]
};
export const ProgramColumns: React.FC<Props> = ({ programs }) => {
  return (
    <Container>
      {programs.map(program => (
        <Column key={program.date}>
          <Date>{program.date}</Date>
          {program.programs.map((p) => (
            <ProgramCard program={p} key={p.id} />
          ))}
        </Column>
      ))}
    </Container>
  )
};

const Container = styled.div({
  display: "flex",
  flexWrap: "wrap",
});

const Column = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  margin: "8px 16px",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  width: "calc(100% / 5)",
  display: "flex",
  flexDirection: "column",
  padding: "8px",
});

const Date = styled.h3({
})
