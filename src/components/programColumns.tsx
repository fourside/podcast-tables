import styled from "styled-components";
import { useState } from "react";

import { Program, ProgramPerDate } from "../lib/station";
import { Menu } from "./menu";
import { ProgramColumn } from "./programColumn";
import { Modal } from "./Modal";

type Props = {
  stationId: string;
  programPerDates: ProgramPerDate[];
};
export const ProgramColumns: React.FC<Props> = ({ stationId, programPerDates }) => {
  const dateList = programPerDates.map((programPerDate) => programPerDate.date);
  const [open, setOpen] = useState(false)
  const [program, setProgram] = useState<Program | undefined>(undefined)

  const closeModal = () => setOpen(false)

  const handleClick = (program: Program) => {
    setOpen(true);
    setProgram(program);
  }

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
      <Modal isOpen={open} onClose={closeModal}>{program?.title}</Modal>
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
