import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";

import { Program, ProgramPerDate } from "../lib/station";
import { Menu } from "./menu";
import { Modal } from "./modal";
import { ProgramForm } from "./form/program-form";
import { PostParams, postProgram } from "../lib/client";
import { unformatPostParams } from "../lib/util";
import { useToast } from "../context/toast";
import { useAuth } from "../context/auth";
import { formatMonthDay, getToday } from "../lib/day";
import { ProgramCard } from "./program-card";

type Props = {
  stationId: string;
  programPerDates: ProgramPerDate[];
};
export const ProgramColumns: React.FC<Props> = ({ stationId, programPerDates }) => {
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
    <Container>
      <SideContainer>
        <Menu title={stationId} dateList={dateList} activeDate={activeDate} onMenuClick={handleMenuClick} />
      </SideContainer>
      <ColumnContainer>
        {programPerDates.map((programPerDate) => (
          <ProgramColumn
            key={programPerDate.date}
            programPerDate={programPerDate}
            activeDate={activeDate}
            onClick={handleClick}
          />
        ))}
      </ColumnContainer>
      <Modal isOpen={open} onClose={closeModal}>
        <ProgramForm stationId={stationId} program={program} onSubmit={handleSubmit} />
      </Modal>
    </Container>
  );
};

const Container = styled.div({
  display: "flex",
  margin: "0 auto",
  width: "90%",
});

const ColumnContainer = styled.div({
  display: "flex",
  flexWrap: "nowrap",
  overflowY: "hidden",
});

const SideContainer = styled.div({
  width: "10%",
  paddingRight: "16px",
});

type ProgramColumnProps = {
  programPerDate: ProgramPerDate;
  activeDate: string;
  onClick: (program: Program) => void;
};
const ProgramColumn: React.FC<ProgramColumnProps> = (props) => {
  const date = formatMonthDay(props.programPerDate.date);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.programPerDate.date === props.activeDate) {
      columnRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [props.activeDate, props.programPerDate.date]);

  return (
    <Column ref={columnRef}>
      <Date>{date}</Date>
      {props.programPerDate.programs.map((program) => (
        <ProgramCard program={program} key={program.id} onClick={props.onClick} />
      ))}
    </Column>
  );
};

const Column = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  margin: "8px",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  width: "calc(100% / 4)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  gap: "4px",
  padding: "8px",
});

const Date = styled.h3({
  margin: "8px",
  paddingLeft: "2px",
  whiteSpace: "nowrap",
});
