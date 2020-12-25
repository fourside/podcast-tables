import styled from "styled-components";
import { useState } from "react";

import { Program, ProgramPerDate } from "../lib/station";
import { Menu } from "./menu";
import { ProgramColumn } from "./programColumn";
import { Modal } from "./Modal";
import { ProgramForm } from "./ProgramForm";
import { PostParams, postProgram } from "../lib/client";
import { unformatPostParams } from "../lib/util";

type Props = {
  stationId: string;
  programPerDates: ProgramPerDate[];
};
export const ProgramColumns: React.FC<Props> = ({ stationId, programPerDates }) => {
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

  const handleClick = (program: Program) => {
    setOpen(true);
    setProgram(program);
  };

  const handleSubmit = async (formatted: PostParams) => {
    const program = unformatPostParams(formatted);
    try {
      const res = await postProgram(program);
      console.log(res);
    } catch (err) {
      console.error(err);
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
