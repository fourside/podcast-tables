import { FC } from "react";
import { Clock } from "react-feather";
import { RecordingTask } from "../lib/client";

type Props = {
  recordingTask: RecordingTask;
};

export const RecordingTaskItem: FC<Props> = (props) => {
  return (
    <div title={props.recordingTask.title} className="w-300 py-16 px-32">
      <h1 className="text-slate-600 text-base m-0 truncate">{props.recordingTask.title}</h1>
      <div className="flex gap-2 justify-center">
        <div className="bg-slate-500 text-slate-100 text-xs rounded-lg py-1 px-2">{props.recordingTask.stationId}</div>
        <div className="text-sm text-slate-500">{props.recordingTask.personality}</div>
      </div>
      <div>
        <Clock size={16} color={"#999"} style={{ marginRight: "4px", verticalAlign: "middle" }} />
        <span className="text-slate-400 text-sm">
          {props.recordingTask.fromTime}({props.recordingTask.duration} min)
        </span>
      </div>
    </div>
  );
};
