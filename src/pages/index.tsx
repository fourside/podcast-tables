import { GetStaticPropsResult } from "next";
import styled from "styled-components";

import Layout from "../components/layout";
import { StationCard } from "../components/stationCard";
import { getStations } from "../lib/client";
import { Station } from "../lib/station";

type Props = {
  stations: Station[];
};
const Index: React.FC<Props> = ({ stations }) => {
  return (
    <Layout>
      <Container>
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </Container>
    </Layout>
  );
};

const Container = styled.div({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
});

export default Index;

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const stations = await getStations();
  return {
    props: {
      stations,
    },
  };
};
