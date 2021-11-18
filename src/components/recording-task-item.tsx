import styled from "styled-components";
import { Clock } from "react-feather";
import { RecordingTask } from "../lib/client";

type Props = {
  recordingTask: RecordingTask;
};
export const RecordingTaskItem: React.FC<Props> = (props) => {
  return (
    <Container title={props.recordingTask.title}>
      <Title>{props.recordingTask.title}</Title>
      <div>
        <Station>{props.recordingTask.stationId}</Station>
        <Personality>{props.recordingTask.personality}</Personality>
      </div>
      <div>
        <Clock size={16} color={"#999"} style={{ marginRight: "4px", verticalAlign: "middle" }} />
        <Time>
          {props.recordingTask.fromTime}({props.recordingTask.duration} min)
        </Time>
      </div>
    </Container>
  );
};

const Container = styled.div({
  overflow: "visible",
  width: 300,
  padding: "16px 32px",
});

const Title = styled.h1({
  color: "#444",
  fontSize: "100%",
  margin: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Personality = styled.span({
  fontSize: "small",
  color: "#666",
});

const Station = styled.span({
  display: "inline-block",
  backgroundColor: "#999",
  color: "#eee",
  fontSize: "x-small",
  borderRadius: "8px",
  padding: "2px 8px",
  marginRight: "8px",
});

const Time = styled.span({
  color: "#999",
  fontSize: "small",
});
