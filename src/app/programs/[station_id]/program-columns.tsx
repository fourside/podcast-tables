import { FC, useEffect, useRef, useState } from "react";
import { Mic } from "react-feather";
import type { FirebaseUser } from "../../../components/auth-context";
import { RecordProgramModal } from "../../../components/record-program-modal";
import { formatDateOfProgramDate, formatDateOfProgramPerDate } from "../../../lib/day";
import { stripHtmlElement } from "../../../lib/html";
import { Program, ProgramPerDate, calcWeightFromDuration as calcWeight } from "../../../models/program";
import classes from "./program-columns.module.css";

type Props = {
  stationId: string;
  programPerDates: ProgramPerDate[];
  user: FirebaseUser;
  activeDate: string;
};

export const ProgramColumns: FC<Props> = ({ stationId, programPerDates, user, activeDate }) => {
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

  const closeModal = () => setOpen(false);

  const handleClick = (program: Program) => {
    setOpen(true);
    setProgram(program);
  };

  return (
    <div className={classes.columns}>
      {programPerDates.map((programPerDate) => (
        <ProgramColumn
          key={programPerDate.date}
          programPerDate={programPerDate}
          activeDate={activeDate}
          onClick={handleClick}
        />
      ))}
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
    <div ref={columnRef} className={classes.column}>
      <h3 className={classes.columnDate}>{monthAndDate}</h3>
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
    <div className={classes.card} style={{ minHeight: `${1.5 * 4 * weight}em` }}>
      <div title={program.title} className={classes.cardTitleContainer}>
        <h4 className={classes.cardTitle}>
          <a onClick={handleClick}>{program.title}</a>
        </h4>
        <div className={classes.startTime}>{startTime}</div>
      </div>
      <div title={program.personality} className={classes.personalityContainer}>
        <Mic size={16} color={"#999"} />
        <div className={classes.personality}>{program.personality}</div>
      </div>
      <div title={info} className={classes.info} style={{ display: "-webkit-box", WebkitLineClamp: weight * 3 }}>
        {info}
      </div>
    </div>
  );
};
