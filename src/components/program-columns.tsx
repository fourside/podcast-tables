import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Mic } from "react-feather";
import { useAuth } from "../context/auth";
import { useToast } from "../context/toast";
import { PostParams, postProgram } from "../lib/client";
import { formatHourMinute, formatMonthDay, getToday } from "../lib/day";
import { Program, ProgramPerDate } from "../lib/station";
import { calcWeightFromDuration, stripHtmlElement, unformatPostParams } from "../lib/util";
import { Menu } from "./menu";
import { Modal } from "./modal";
import { ProgramForm } from "./program-form";

type Props = {
  stationId: string;
  programPerDates: ProgramPerDate[];
};

export const ProgramColumns: FC<Props> = ({ stationId, programPerDates }) => {
  const { user } = useAuth();
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
  const [activeDate, setActiveDate] = useState(getToday());

  const closeModal = () => setOpen(false);
  const { setToast } = useToast();

  const handleClick = (program: Program) => {
    setOpen(true);
    setProgram(program);
  };

  const handleSubmit = async (formatted: PostParams) => {
    const program = unformatPostParams(formatted);
    try {
      const res = await postProgram(program, user);
      setToast({ text: "OK" });
      console.log(res);
    } catch (err) {
      if (err instanceof Error) {
        setToast({ text: `ERROR: ${err.message}`, level: "error" });
        console.error(err);
      } else {
        throw err;
      }
    }
    setOpen(false);
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
      <Modal isOpen={open} onClose={closeModal}>
        <ProgramForm stationId={stationId} program={program} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

type ProgramColumnProps = {
  programPerDate: ProgramPerDate;
  activeDate: string;
  onClick: (program: Program) => void;
};

const ProgramColumn: FC<ProgramColumnProps> = (props) => {
  const date = formatMonthDay(props.programPerDate.date);
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
      <h3 className="whitespace-nowrap m-2 font-bold text-lg">{date}</h3>
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
