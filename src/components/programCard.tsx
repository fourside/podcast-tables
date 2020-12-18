import styled from "styled-components";
import { Mic } from "react-feather";

import { formatHourMinute } from "../lib/day";
import { Program } from "../lib/station";
import { calcWeightFromDuration, stripHtmlElement } from "../lib/util";

type Props = {
  program: Program
}
export const ProgramCard: React.FC<Props> = ({ program }) => {
  const time = formatHourMinute(program.from);
  const weight = calcWeightFromDuration(program.duration);
  const info = stripHtmlElement(program.info);
  return (
    <Container weight={weight}>
      <CardHeader title={program.title}>
        <Time>{time}</Time>
        <Title>{program.title}</Title>
      </CardHeader>
      <CardBody>
        <Personality personality={program.personality} />
        <Info weight={weight} title={info}>{info}</Info>
      </CardBody>
    </Container>
  )
};

const Container = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  padding: "12px",
  color: "#444",
}, (props: { weight: number }) => {
  return {
    minHeight: `calc(1.5em * 4 * ${props.weight})`,
  };
});

const CardHeader = styled.div({
  paddingBottom: "4px",
});
const CardBody = styled.div({
});

const Time = styled.span({
  color: "#ccc",
  float: "right",
});

const Title = styled.h4({
  margin: "0px",
  color: "#333",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const _Personality = styled.div({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Info = styled.div({
  color: "#777",
  fontSize: "small",
  paddingTop: "4px",
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  wordBreak: "break-all",
}, (props: { weight: number }) => {
  return {
    "-webkit-line-clamp": `${props.weight * 3}`,
  };
});

const Personality: React.FC<{ personality?: string }> = ({ personality }) => {
  if (!personality) {
    return null;
  }
  return (
    <_Personality title={personality}>
      <Mic size={16} color={"#999"} style={{ marginRight: "4px", verticalAlign: "middle" }} />
      {personality}
    </_Personality>
  );
};
