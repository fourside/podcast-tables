import styled from "styled-components";
import { Mic } from "react-feather";

import { formatHourMinute } from "../lib/day";
import { Program } from "../lib/station";

type Props = {
  program: Program
}
export const ProgramCard: React.FC<Props> = ({ program }) => {
  const time = formatHourMinute(program.from);
  return (
    <Container>
      <CardHeader>
        <Time>{time}</Time>
        <Title>{program.title}</Title>
      </CardHeader>
      <Personality personality={program.personality} />
      <Info title={program.info}>{program.info}</Info>
    </Container>
  )
};

const Container = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  padding: "12px",
  color: "#444",
});

const CardHeader = styled.div({
  paddingBottom: "4px",
});

const Time = styled.span({
  color: "#ccc",
  float: "right",
});

const Title = styled.h4({
  margin: "0px",
  color: "#333",
});

const _Personality = styled.div({});

const Info = styled.div({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Personality: React.FC<{ personality?: string }> = ({ personality }) => {
  if (!personality) {
    return null;
  }
  return (
    <_Personality>
      <Mic size={16} color={"#999"} />
      {personality}
    </_Personality>
  );
};
