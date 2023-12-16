import { FC, useCallback, useEffect, useState } from "react";
import { formatDateOfProgramPerDate, getCurrentHourMinute } from "../../../lib/day";

type Props = {
  title: string;
  dateList: string[];
  activeDate: string;
  onMenuClick: (date: string) => void;
};

export const Menu: FC<Props> = ({ title, dateList, activeDate, onMenuClick }) => {
  return (
    <div className="sticky top-5 text-center flex flex-col gap-2 pr-3">
      <h2 className="text-slate-500 text-2xl my-6">{title}</h2>
      <Clock />
      {dateList.map((date) => (
        <DateButton key={date} date={date} isActive={date === activeDate} onClick={onMenuClick} />
      ))}
    </div>
  );
};

type DateButtonProps = {
  date: string;
  isActive: boolean;
  onClick: (date: string) => void;
};

const DateButton: FC<DateButtonProps> = (props) => {
  const { onClick } = props;
  const label = formatDateOfProgramPerDate(props.date, "MM/DD");

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      onClick(props.date);
    },
    [onClick, props.date]
  );

  return (
    <a
      onClick={handleClick}
      className="border border-slate-300 rounded-lg py-1 px-3 text-slate-600 cursor-pointer min-w-fit"
      style={{ backgroundColor: props.isActive ? "#ddd" : "transparent" }}
    >
      {label}
    </a>
  );
};

const Clock: FC = () => {
  const [hourMinute, setHourMinute] = useState(getCurrentHourMinute);
  useEffect(() => {
    const id = setInterval(() => {
      setHourMinute(getCurrentHourMinute());
    }, 1000 * 60);

    return () => {
      clearInterval(id);
    };
  }, []);

  const [hour, min] = hourMinute.split(":");
  return (
    <div className="text-slate-300">
      {hour}
      <span className="text-slate-300 px-px animate-blink">:</span>
      {min}
    </div>
  );
};
