import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, ChevronDown } from "react-feather";
import { useAuth } from "../context/auth";
import { getRecordingTask, RecordingTask } from "../lib/client";
import { Loading } from "./loading";
import { RecordingTaskItem } from "./recording-task-item";

export const DropdownMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const [recordingTasks, setRecordingTasks] = useState<RecordingTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!open) {
        return;
      }
      try {
        setLoading(true);
        setRecordingTasks([]);
        const result = await getRecordingTask(user);
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
  }, [open, user]);

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
