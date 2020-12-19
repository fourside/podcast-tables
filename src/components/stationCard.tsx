import Link from "next/link";
import styled from "styled-components";

import { Station } from "../lib/station";

type Props = {
  station: Station;
};

export const StationCard: React.FC<Props> = ({ station }) => {
  return (
    <Card>
      <Link href={`/programs/${station.id}`}>
        <CardLink>{station.name}</CardLink>
      </Link>
    </Card>
  );
};

const Card = styled.div({
  borderRadius: "10px",
  border: "1px #eee solid",
  margin: "8px 16px",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  cursor: "pointer",
});

const CardLink = styled.a({
  display: "block",
  width: "200px",
  height: "100px",
  textAlign: "center",
  lineHeight: 1.5,
  padding: "32px 16px",
  color: "#444",
  fontWeight: "bold",
});
