import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronDown, AlertCircle, AlertTriangle } from "react-feather";
import { getRecordingTask, RecordingTask } from "../lib/client";
import { RecordingTaskItem } from "./RecordingTaskItem";
import { useAuth } from "../context/Auth";
import { Loading } from "./Loading";

export const DropdownMenu: React.FC = () => {
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
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, user]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
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
    <MenuContainer ref={containerRef}>
      <MenuLabel>
        <a onClick={toggleOpen}>
          <ChevronDown size={16} style={{ marginRight: "4px", verticalAlign: "middle" }} />
          recording
        </a>
      </MenuLabel>
      {open && (
        <MenuList>
          {loading && <Loading />}
          {!loading && recordingTasks.length === 0 && !errorMessage && (
            <NoTasks>
              <Icon>
                <AlertTriangle size={16} style={{ marginRight: "4px", verticalAlign: "middle" }} />
              </Icon>
              No recording task
            </NoTasks>
          )}
          {!loading &&
            recordingTasks.map((recording, i) => (
              <MenuItem key={i}>
                <RecordingTaskItem recordingTask={recording} />
              </MenuItem>
            ))}
          {!loading && errorMessage && (
            <ErrorMessage>
              <Icon>
                <AlertCircle size={16} style={{ marginRight: "4px", verticalAlign: "middle" }} />
              </Icon>
              {errorMessage}
            </ErrorMessage>
          )}
        </MenuList>
      )}
    </MenuContainer>
  );
};

const MenuContainer = styled.div({
  position: "relative",
});

const MenuLabel = styled.div({
  color: "#333",
  cursor: "pointer",
});

const dropDownOpen = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const _MenuList = styled.div({
  position: "absolute",
  bottom: -8,
  right: 0,
  margin: 0,
  padding: 0,
  transform: "translateY(100%)",
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  width: 250,
});

const MenuList = styled(_MenuList)`
  animation: ${dropDownOpen} 0.5s;
`;

const MenuItem = styled.div({
  display: "block",
  borderBottom: "1px solid #ccc",
  "&:last-child": {
    borderBottom: "none",
  },
});

const ErrorMessage = styled.div({
  display: "flex",
  gap: "8px",
  color: "#f03",
  padding: "16px",
});

const Icon = styled.span({});

const NoTasks = styled.div({
  display: "flex",
  gap: "8px",
  color: "#666",
  padding: "16px",
});
