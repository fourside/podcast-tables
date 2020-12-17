import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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
  const [hour, min] = hourMinute.split(":")
  return (
    <_Clock>
      {hour}
      <Blink>:</Blink>
      {min}
    </_Clock>
  );
}

const _Clock = styled.div({
  color: "#ccc",
});

const blink = keyframes`
  0% { color: #ccc; }
  50% { color: #fefefe; }
  100% { color: #ccc; }
`;

const Blink = styled.span`
  color: #ccc;
  padding: 0 1px;
  animation: ${blink} 1.5s infinite;
`;
