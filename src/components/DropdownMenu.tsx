import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getRecordingTask, RecordingTask } from "../lib/client";

export const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [recordingTasks, setRecordingTasks] = useState<RecordingTask[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getRecordingTask();
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
      <div>
        <a onClick={toggleOpen}>recording</a>
      </div>
      {open && recordingTasks.length > 0 && (
        <MenuList>
          {recordingTasks.map((recording, i) => (
            <MenuItem key={i}>{recording.title}</MenuItem>
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

const MenuList = styled.ul({
  listStyle: "none",
  position: "absolute",
  bottom: 0,
  right: 0,
  margin: 0,
  padding: 0,
  transform: "translateY(100%)",
  background: "white",
});

const MenuItem = styled.li({
  display: "block",
});
