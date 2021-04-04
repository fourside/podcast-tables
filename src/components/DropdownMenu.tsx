import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronDown } from "react-feather";
import { getRecordingTask, RecordingTask } from "../lib/client";
import { RecordingTaskItem } from "./RecordingTaskItem";
import { useAuth } from "../context/Auth";

export const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [recordingTasks, setRecordingTasks] = useState<RecordingTask[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const result = await getRecordingTask(user);
        setRecordingTasks(result);
      } catch (error) {
        console.error(error);
        setErrorMessage(error);
      }
    })();
  }, []);

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
  }, []);

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
      {open && recordingTasks.length > 0 && (
        <MenuList>
          {recordingTasks.map((recording, i) => (
            <MenuItem key={i}>
              <RecordingTaskItem recordingTask={recording} />
            </MenuItem>
          ))}
        </MenuList>
      )}
      {open && errorMessage && <div>{errorMessage}</div>}
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
