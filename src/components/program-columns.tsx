import styled from "styled-components";
import { useState } from "react";

import { Program, ProgramPerDate } from "../lib/station";
import { Menu } from "./menu";
import { Modal } from "./modal";
import { ProgramForm } from "./form/program-form";
import { PostParams, postProgram } from "../lib/client";
import { unformatPostParams } from "../lib/util";
import { useToast } from "../context/Toast";
import { useAuth } from "../context/Auth";
import { diffDateFrom, formatMonthDay } from "../lib/day";
import { columnId } from "../lib/util";
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

  return (
    <Container>
      <SideContainer>
        <Menu title={stationId} dateList={dateList} />
      </SideContainer>
      <ColumnContainer>
        {programPerDates.map((programPerDate) => (
          <ProgramColumn programPerDate={programPerDate} key={programPerDate.date} onClick={handleClick} />
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
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
});

const SideContainer = styled.div({
  width: "10%",
  paddingRight: "16px",
});


type ProgramColumnProps = {
  programPerDate: ProgramPerDate;
  onClick: (program: Program) => void;
};
const ProgramColumn: React.FC<ProgramColumnProps> = ({ programPerDate, onClick }) => {
  const index = diffDateFrom(programPerDate.date);
  const idAttribute = columnId(index);
  const date = formatMonthDay(programPerDate.date);

  return (
    <Column key={programPerDate.date} id={idAttribute}>
      <Date>{date}</Date>
      {programPerDate.programs.map((program) => (
        <ProgramCard program={program} key={program.id} onClick={onClick} />
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
  scrollSnapAlign: "center",
});

const Date = styled.h3({
  margin: "8px",
  paddingLeft: "2px",
  whiteSpace: "nowrap",
});
