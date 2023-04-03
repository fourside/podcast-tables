import { FC, useEffect, useState } from "react";
import { formatHourMinuteFromTimeStamp } from "../lib/day";

export const Clock: FC = () => {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now);
    }, 1000 * 60);

    return () => {
      clearInterval(id);
    };
  }, []);

  const hourMinute = formatHourMinuteFromTimeStamp(now);
  const [hour, min] = hourMinute.split(":");
  return (
    <div className="text-slate-300">
      {hour}
      <span className="text-slate-300 px-px animate-blink">:</span>
      {min}
    </div>
  );
};
