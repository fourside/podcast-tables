import Link from "next/link";
import styled from "styled-components";

import { Station } from "../lib/station";

type Props = {
  stations: Station[];
};

export const StationCards: React.FC<Props> = (props) => {
  return (
    <Container>
      {props.stations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "24px 16px",
});

type StationCardProps = {
  station: Station;
};

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  return (
    <Card>
      <Link href={`/programs/${station.id}`} passHref>
        <CardLink>{station.name}</CardLink>
      </Link>
    </Card>
  );
};

const Card = styled.div({
  width: "200px",
  height: "100px",
  padding: "32px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  border: "1px #eee solid",
  boxShadow: "4px 4px 12px 2px rgba(0,0,0,0.1)",
  cursor: "pointer",
});

const CardLink = styled.a({
  textAlign: "center",
  display: "block",
  lineHeight: 1.5,
  color: "#444",
  fontWeight: "bold",
});
