import { FC } from "react";
import { Clock, Mic } from "react-feather";
import { parseAsDateJs } from "../lib/day";
import { SearchProgram } from "../lib/station";
import { stripHtmlElement } from "../lib/util";

type Props = {
  program: SearchProgram;
  onClick: (program: SearchProgram) => void;
};

export const SearchProgramCard: FC<Props> = ({ program, onClick }) => {
  const date = parseAsDateJs(program.start_time, "YYYY-MM-DD HH:mm:ss");
  const startDate = date.format("MM/DD ddd");
  const startTime = date.format("HH:mm");
  const info = stripHtmlElement(program.info);

  const handleClick = () => {
    onClick(program);
  };

  return (
    <div className="grid grid-rows-[auto,auto,auto,1fr] gap-1 p-3 h-[300px] text-slate-600 border border-slate-200 rounded-xl shadow-md shadow-slate-300">
      <h4 className="text-slate-700 cursor-pointer truncate font-bold text-lg">
        <a onClick={handleClick}>{program.title}</a>
      </h4>
      <div className="grid grid-cols-[auto,1fr] gap-1 items-center text-slate-500">
        <Clock size={16} />
        {startDate} {startTime}
      </div>
      <div title={program.performer} className="grid grid-cols-[auto,1fr] items-center gap-1">
        <Mic size={16} color={"#999"} />
        <div className="text-slate-500">{program.performer}</div>
      </div>
      <div title={info} className="text-slate-400 break-all overflow-auto text-sm">
        {info}
      </div>
    </div>
  );
};
