import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Mic } from "react-feather";
import { formatDateOfProgramDate, formatDateOfProgramPerDate, getToday } from "../lib/day";
import { stripHtmlElement } from "../lib/html";
import { Program, ProgramPerDate, calcWeightFromDuration as calcWeight } from "../models/program";
import type { FirebaseUser } from "./auth-context";
import { Menu } from "./menu";
import { RecordProgramModal } from "./record-program-modal";

type Props = {
  stationId: string;
  programPerDates: ProgramPerDate[];
  user: FirebaseUser;
};

export const ProgramColumns: FC<Props> = ({ stationId, programPerDates, user }) => {
  const dateList = programPerDates.map((programPerDate) => programPerDate.date);
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState<Program>({
    id: "",
    from: "",
    to: "",
    duration: 0,
    title: "",
    url: "",
    info: "",
    img: "",
    personality: "",
  });
  const [activeDate, setActiveDate] = useState(getToday);

  const closeModal = () => setOpen(false);

  const handleClick = (program: Program) => {
    setOpen(true);
    setProgram(program);
  };

  const handleMenuClick = useCallback((date: string) => {
    setActiveDate(date);
  }, []);

  return (
    <div className="flex w-11/12 mx-auto p-2">
      <div className="w-1/12">
        <Menu title={stationId} dateList={dateList} activeDate={activeDate} onMenuClick={handleMenuClick} />
      </div>
      <div className="flex gap-3 overflow-y-hidden">
        {programPerDates.map((programPerDate) => (
          <ProgramColumn
            key={programPerDate.date}
            programPerDate={programPerDate}
            activeDate={activeDate}
            onClick={handleClick}
          />
        ))}
      </div>
      {open && (
        <RecordProgramModal open={open} onClose={closeModal} stationId={stationId} program={program} user={user} />
      )}
    </div>
  );
};

type ProgramColumnProps = {
  programPerDate: ProgramPerDate;
  activeDate: string;
  onClick: (program: Program) => void;
};

const ProgramColumn: FC<ProgramColumnProps> = (props) => {
  const monthAndDate = formatDateOfProgramPerDate(props.programPerDate.date, "MM/DD ddd");
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.programPerDate.date === props.activeDate) {
      columnRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [props.activeDate, props.programPerDate.date]);

  return (
    <div
      ref={columnRef}
      className="flex flex-col gap-1 flex-shrink-0 p-2 w-1/4 border border-slate-200 rounded-xl shadow-md shadow-slate-300"
    >
      <h3 className="whitespace-nowrap m-2 font-bold text-lg">{monthAndDate}</h3>
      {props.programPerDate.programs.map((program) => (
        <ProgramCard program={program} key={program.id} onClick={props.onClick} />
      ))}
    </div>
  );
};

type ProgramCardProps = {
  program: Program;
  onClick: (program: Program) => void;
};

const ProgramCard: FC<ProgramCardProps> = ({ program, onClick }) => {
  const startTime = formatDateOfProgramDate(program.from, "HH:mm");
  const weight = calcWeight(program.duration);
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
        <div className="text-slate-200">{startTime}</div>
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
