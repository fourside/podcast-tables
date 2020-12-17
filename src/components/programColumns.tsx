import styled from "styled-components";

import { ProgramPerDate} from "../lib/station";
import { ProgramCard } from "./programCard";
import { Button } from "../components/Button";
import { Clock } from "../components/Clock";

type Props = {
  stationId: string;
  programs: ProgramPerDate[];
};
export const ProgramColumns: React.FC<Props> = ({ stationId, programs }) => {
  const handleClickNext = () => {
    console.log("next")
  };
  const handleClickPrev = () => {
    console.log("prev")
  };

  return (
    <Container>
      <SideContainer>
        <SideMenu>
          <Title>{stationId}</Title>
          <Clock />
          <Button label={"next"} onClick={handleClickNext} />
          <Button label={"prev"} onClick={handleClickPrev} />
        </SideMenu>
      </SideContainer>
      <ColumnContainer>
        {programs.map(program => (
          <Column key={program.date}>
            <Date>{program.date}</Date>
            {program.programs.map((p) => (
              <ProgramCard program={p} key={p.id} />
            ))}
          </Column>
        ))}
      </ColumnContainer>
    </Container>
  )
};

const Container = styled.div({
  display: "flex",
  margin: "0 auto",
  width: "90%",
});

const ColumnContainer = styled.div({
  display: "flex",
  flexWrap: "nowrap",
  overflowY: "hidden",
});

const SideContainer = styled.div({
  width: "5%",
});

const SideMenu = styled.div({
  position: "sticky",
  top: "20px",
  textAlign: "center",
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
