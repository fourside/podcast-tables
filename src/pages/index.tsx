import { useEffect } from "react";
import { GetStaticPropsResult, NextPage } from "next";
import Router from "next/router";
import styled from "styled-components";

import Layout from "../components/layout";
import { StationCard } from "../components/station-card";
import { getStations } from "../lib/client";
import { Station } from "../lib/station";
import { useAuth } from "../context/auth";

type Props = {
  stations: Station[];
};
const IndexPage: NextPage<Props> = ({ stations }) => {
  const { authState } = useAuth();
  useEffect(() => {
    if (authState === "fail") {
      Router.push("/signin");
    }
  }, [authState]);

  if (authState === "unknown") {
    return null;
  }

  return (
    <Layout>
      <Header>Stations</Header>
      <Container>
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </Container>
    </Layout>
  );
};

const Header = styled.h2({
  textAlign: "center",
  letterSpacing: "6px",
});

const Container = styled.div({
  maxWidth: "720px",
  margin: "3rem auto 6rem",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
});

export default IndexPage;

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const stations = await getStations();
  return {
    props: {
      stations,
    },
  };
}
