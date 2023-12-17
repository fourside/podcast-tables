import { FC } from "react";
import { Calendar, Mic } from "react-feather";
import { parseSearchProgramDate } from "../../lib/day";
import { stripHtmlElement } from "../../lib/html";
import { SearchProgram } from "../../models/search-program";
import classes from "./search-program-card.module.css";

type Props = {
  program: SearchProgram;
  onClick: (program: SearchProgram) => void;
};

export const SearchProgramCard: FC<Props> = ({ program, onClick }) => {
  const date = parseSearchProgramDate(program.start_time);
  const startDate = date.format("MM/DD ddd");
  const startTime = date.format("HH:mm");
  const info = stripHtmlElement(program.info);

  const handleClick = () => {
    onClick(program);
  };

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>
        <a onClick={handleClick}>{program.title}</a>
      </h4>
      <div className={classes.date}>
        <Calendar size={16} />
        {startDate} {startTime}
      </div>
      <div title={program.performer} className={classes.performer}>
        <Mic size={16} color={"#999"} />
        <div className={classes.performerName}>{program.performer}</div>
      </div>
      <div title={info} className={classes.info}>
        {info}
      </div>
    </div>
  );
};
