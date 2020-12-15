import styled from "styled-components";

import { formatHourMinute } from "../lib/day";
import { Program } from "../lib/station";

type Props = {
  program: Program
}
export const ProgramCard: React.FC<Props> = ({ program }) => {
  const time = formatHourMinute(program.from);
  return (
    <Container>
      <Time>{time}</Time>
      <Title>{program.title}</Title>
      <Personality>{program.personality}</Personality>
      <Info>{program.info}</Info>
    </Container>
  )
};

const Container = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  margin: "4px",
  padding: "8px",
  color: "#444",
});

const Time = styled.span({
  color: "#ccc",
});

const Title = styled.h4({
  margin: "0px",
  color: "#333",
});

const Personality = styled.div({});

const Info = styled.div({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});
