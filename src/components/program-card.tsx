import { FC } from "react";
import { Mic } from "react-feather";
import { formatHourMinute } from "../lib/day";
import { Program } from "../lib/station";
import { calcWeightFromDuration, stripHtmlElement } from "../lib/util";

type Props = {
  program: Program;
  onClick: (program: Program) => void;
};

export const ProgramCard: FC<Props> = ({ program, onClick }) => {
  const time = formatHourMinute(program.from);
  const weight = calcWeightFromDuration(program.duration);
  const info = stripHtmlElement(program.info);
  const handleClick = () => {
    onClick(program);
  };
  return (
    <div
      className="flex flex-col gap-1 p-3 text-slate-600 border border-slate-200 rounded-xl"
      style={{ minHeight: `${1.5 * 4 * weight}em` }}
    >
      <div title={program.title} className="grid grid-cols-[1fr,auto] gap-2">
        <h4 className="text-slate-700 cursor-pointer truncate font-bold">
          <a onClick={handleClick}>{program.title}</a>
        </h4>
        <div className="text-slate-200">{time}</div>
      </div>
      <div title={program.personality} className="grid grid-cols-[auto,1fr] items-center gap-1">
        <Mic size={16} color={"#999"} />
        <div className="truncate text-slate-500">{program.personality}</div>
      </div>
      <div
        title={info}
        className="text-slate-400 break-all overflow-hidden text-sm"
        style={{ display: "-webkit-box", WebkitLineClamp: weight * 3 }}
      >
        {info}
      </div>
    </div>
  );
};
