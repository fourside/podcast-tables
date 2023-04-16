import type { GetStaticPropsResult, NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useAuth } from "../components/auth-context";
import Layout from "../components/layout";
import { StationCards } from "../components/station-cards";
import { getStations } from "../lib/client";
import { Station } from "../models/models";

type Props = {
  stations: Station[];
};
const IndexPage: NextPage<Props> = ({ stations }) => {
  const authState = useAuth();
  useEffect(() => {
    if (authState.type === "not_authenticated") {
      Router.push("/signin");
    }
  }, [authState]);

  if (authState.type === "not_authenticated" || authState.type === "initialized") {
    return null;
  }

  return (
    <Layout user={authState.user}>
      <h2 className="text-3xl text-center tracking-widest my-5">Stations</h2>
      <div className="max-w-[720px] min-h-screen mx-auto my-12">
        <StationCards stations={stations} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const stations = await getStations();
  return {
    props: {
      stations,
    },
  };
}
