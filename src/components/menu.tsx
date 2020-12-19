import styled from "styled-components";

import { diffDateFrom, formatMonthDate } from "../lib/day";
import { LinkButton } from "./LinkButton";
import { Clock } from "./Clock";
import { columnId } from "../lib/util";

type Props = {
  title: string;
  dateList: string[];
};
export const Menu: React.FC<Props> = ({ title, dateList }) => {
  return (
    <StickyMenu>
      <Title>{title}</Title>
      <Clock />
      {dateList.map((date) => {
        const label = formatMonthDate(date);
        const index = diffDateFrom(date);
        const idAttribute = columnId(index);
        return <LinkButton label={label} href={`#${idAttribute}`} key={date} />;
      })}
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
