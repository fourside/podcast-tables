import { useState, useEffect } from "react";
import styled from "styled-components";

import { formatHourMinuteFromTimeStamp } from "../lib/day";

export const Clock: React.FC = () => {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now);
    }, 1000 * 60)

    return () => {
      clearInterval(id);
    }
  }, [])

  const hourMinute = formatHourMinuteFromTimeStamp(now);
  return (
    <_Clock>{hourMinute}</_Clock>
  );
}

const _Clock = styled.div({
  color: "#ccc",
});
