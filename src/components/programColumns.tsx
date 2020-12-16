import styled from "styled-components";

import { ProgramPerDate} from "../lib/station";
import { ProgramCard } from "./programCard";

type Props = {
  stationId: string;
  programs: ProgramPerDate[];
};
export const ProgramColumns: React.FC<Props> = ({ stationId, programs }) => {
  return (
    <Container>
      <Title>{stationId}</Title>
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
  flexWrap: "nowrap",
  overflowY: "hidden",
  margin: "0 auto",
  width: "85%",
});

const Title = styled.h2({
  color: "#888",
});

const Column = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  margin: "8px 16px",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  width: "calc(100% / 4)",
  display: "flex",
  flexDirection: "column",
  padding: "8px",
});

const Date = styled.h3({
});
