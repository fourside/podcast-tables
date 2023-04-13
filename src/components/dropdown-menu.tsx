"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, ChevronDown, Clock } from "react-feather";
import { FirebaseUser } from "../context/auth";
import { RecordingTask, getRecordingTask } from "../lib/client";
import { Loading } from "./loading";

type DropdownMenuProps = {
  user: FirebaseUser;
};

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [recordingTasks, setRecordingTasks] = useState<RecordingTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (!open) {
        return;
      }
      try {
        setLoading(true);
        setRecordingTasks([]);
        const result = await getRecordingTask(props.user);
        setRecordingTasks(result);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setErrorMessage(error.message);
        } else {
          throw error;
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [open, props.user]);

  const handleClickOutside = useCallback((event: Event) => {
    if (event.target instanceof Node && containerRef.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="text-slate-800">
        <a onClick={toggleOpen} className="cursor-pointer flex items-center gap-1">
          <ChevronDown size={16} style={{ flexShrink: 0 }} />
          recording
        </a>
      </div>
      {open && (
        <div className="absolute -bottom-2 right-0 m-0 p-0 translate-y-full bg-white border border-slate-300 rounded-lg shadow-md w-[250px]">
          {loading && <Loading />}
          {!loading && recordingTasks.length === 0 && !errorMessage && (
            <div className="flex items-center gap-2 text-slate-600 p-4">
              <AlertTriangle size={16} />
              No recording task
            </div>
          )}
          {!loading &&
            recordingTasks.map((recording, i) => (
              <div key={i} className="border-b border-b-slate-300 last:border-b-0">
                <RecordingTaskItem recordingTask={recording} />
              </div>
            ))}
          {!loading && errorMessage && (
            <div className="flex items-center gap-2 p-4 text-red-600">
              <AlertCircle size={16} className="flex-shrink-0" />
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

type RecordingTaskItemProps = {
  recordingTask: RecordingTask;
};

const RecordingTaskItem: FC<RecordingTaskItemProps> = (props) => {
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
