import { FC, useCallback, useEffect, useState } from "react";
import { formatDateOfProgramPerDate, getCurrentHourMinute } from "../../../lib/day";
import classes from "./menu.module.css";

type Props = {
  title: string;
  dateList: string[];
  activeDate: string;
  onMenuClick: (date: string) => void;
};

export const Menu: FC<Props> = ({ title, dateList, activeDate, onMenuClick }) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
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
      className={classes.dateButton}
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
    <div className={classes.clock}>
      {hour}
      <span className={classes.clockDelimiter}>:</span>
      {min}
    </div>
  );
};
