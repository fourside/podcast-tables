import styled from "styled-components";

import { diffDateFrom, formatMonthDate } from "../lib/day";
import { Clock } from "./clock";
import { columnId } from "../lib/util";
import { VFC } from "react";

type Props = {
  title: string;
  dateList: string[];
};
export const Menu: React.FC<Props> = ({ title, dateList }) => {
  return (
    <StickyMenu>
      <Title>{title}</Title>
      <Clock />
      {dateList.map((date) => (
        <DateButton key={date} date={date} />
      ))}
    </StickyMenu>
  );
};

const StickyMenu = styled.div({
  position: "sticky",
  top: "20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const Title = styled.h2({
  color: "#888",
});

type DateButtonProps = {
  date: string;
};

const DateButton: VFC<DateButtonProps> = (props) => {
  const label = formatMonthDate(props.date);
  const index = diffDateFrom(props.date);
  const idAttribute = columnId(index);
  return <_Button href={`#${idAttribute}`}>{label}</_Button>;
};

const _Button = styled.a({
  display: "block",
  backgroundColor: "transparent",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "4px 12px",
  color: "#666",
});
