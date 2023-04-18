import { FC } from "react";
import { Calendar, Mic } from "react-feather";
import { parseSearchProgramDate } from "../lib/day";
import { stripHtmlElement } from "../lib/html";
import { SearchProgram } from "../models/search-program";

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
    <div className="grid grid-rows-[auto,auto,auto,1fr] gap-1 p-3 h-[300px] text-slate-600 border border-slate-200 rounded-xl shadow-md shadow-slate-300">
      <h4 className="text-slate-700 cursor-pointer font-bold text-lg">
        <a onClick={handleClick}>{program.title}</a>
      </h4>
      <div className="grid grid-cols-[auto,1fr] gap-1 items-center text-slate-500">
        <Calendar size={16} />
        {startDate} {startTime}
      </div>
      <div title={program.performer} className="grid grid-cols-[auto,1fr] items-center gap-1 truncate">
        <Mic size={16} color={"#999"} />
        <div className="text-slate-500">{program.performer}</div>
      </div>
      <div title={info} className="text-slate-400 break-all overflow-auto text-sm">
        {info}
      </div>
    </div>
  );
};
