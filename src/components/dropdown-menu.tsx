"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, ChevronDown, Clock } from "react-feather";
import { recordProgramsSchema } from "../lib/schema";
import type { RecordProgram } from "../models/record-program";
import { FirebaseUser } from "./auth-context";
import classes from "./dropdown-menu.module.css";
import { Loading } from "./loading";

type DropdownMenuProps = {
  user: FirebaseUser;
};

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [recordPrograms, setRecordPrograms] = useState<RecordProgram[]>([]);
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
        setErrorMessage(undefined);
        setRecordPrograms([]);
        const result = await getRecordPrograms(props.user);
        setRecordPrograms(result);
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
    <div ref={containerRef} className={classes.container}>
      <div>
        <a onClick={toggleOpen} className={classes.trigger}>
          <ChevronDown size={16} style={{ flexShrink: 0 }} />
          recording
        </a>
      </div>
      {open && (
        <div className={classes.dropdown}>
          <div className={classes.dropdownContent}>
            {loading ? (
              <Loading />
            ) : errorMessage !== undefined ? (
              <div className={classes.errorContainer}>
                <AlertCircle size={16} className={classes.errorIcon} />
                {errorMessage}
              </div>
            ) : recordPrograms.length === 0 ? (
              <div className={classes.empty}>
                <AlertTriangle size={16} />
                No recording task
              </div>
            ) : (
              recordPrograms.map((recording, i) => (
                <div key={i} className={classes.item}>
                  <RecordProgramItem recordingTask={recording} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

type RecordProgramItemProps = {
  recordingTask: RecordProgram;
};

const RecordProgramItem: FC<RecordProgramItemProps> = (props) => {
  return (
    <div title={props.recordingTask.title} className={classes.itemContainer}>
      <h1 className={classes.itemTitle}>{props.recordingTask.title}</h1>
      <div className={classes.itemContent}>
        <div className={classes.itemStation}>{props.recordingTask.stationId}</div>
        <div className={classes.itemPersonality}>{props.recordingTask.personality}</div>
      </div>
      <div>
        <Clock size={16} color={"#999"} style={{ marginRight: "4px", verticalAlign: "middle" }} />
        <span className={classes.itemDuration}>
          {props.recordingTask.fromTime}({props.recordingTask.duration} min)
        </span>
      </div>
    </div>
  );
};

async function getRecordPrograms(user: FirebaseUser): Promise<RecordProgram[]> {
  const idToken = await user.getIdToken();
  const response = await fetch("/api/queue", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const json = await response.json();
  return recordProgramsSchema.parse(json);
}
