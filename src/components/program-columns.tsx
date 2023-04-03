import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth";
import { useToast } from "../context/toast";
import { PostParams, postProgram } from "../lib/client";
import { formatMonthDay, getToday } from "../lib/day";
import { Program, ProgramPerDate } from "../lib/station";
import { unformatPostParams } from "../lib/util";
import { ProgramForm } from "./form/program-form";
import { Menu } from "./menu";
import { Modal } from "./modal";
import { ProgramCard } from "./program-card";

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
