import styled from "styled-components";

import { formatMonthDate } from "../lib/day";
import { Clock } from "./clock";
import { useCallback, VFC } from "react";

type Props = {
  title: string;
  dateList: string[];
  activeDate: string;
  onMenuClick: (date: string) => void;
};
export const Menu: React.FC<Props> = ({ title, dateList, activeDate, onMenuClick }) => {
  return (
    <StickyMenu>
      <Title>{title}</Title>
      <Clock />
      {dateList.map((date) => (
        <DateButton key={date} date={date} isActive={date === activeDate} onClick={onMenuClick} />
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
  isActive: boolean;
  onClick: (date: string) => void;
};

const DateButton: VFC<DateButtonProps> = (props) => {
  const { onClick } = props;
  const label = formatMonthDate(props.date);

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    onClick(props.date);
  }, [onClick, props.date]);

  return <_Button onClick={handleClick} isActive={props.isActive}>{label}</_Button>;
};

const _Button = styled.a<{ isActive: boolean }>`
  display: block;
  background-color: ${(props) => props.isActive ? "#ddd" : "transparent"};
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 4px 12px;
  color: "#666";
  cursor: pointer;
`;
