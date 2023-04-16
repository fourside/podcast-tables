import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../components/auth-context";
import Layout from "../../components/layout";
import { Loading } from "../../components/loading";
import { ProgramColumns } from "../../components/program-columns";
import { getPrograms } from "../../lib/client";
import { ProgramPerDate } from "../../lib/station";

type Props = {
  programs: ProgramPerDate[];
  stationId: string;
};

const ProgramsPage: NextPage<Props> = ({ programs, stationId }) => {
  const authState = useAuth();

  useEffect(() => {
    if (authState.type === "not_authenticated") {
      Router.push("/signin");
    }
  }, [authState]);

  const router = useRouter();
  if (router.isFallback && !programs) {
    return <Loading />;
  }

  if (authState.type === "not_authenticated" || authState.type === "initialized") {
    return null;
  }

  return (
    <Layout user={authState.user}>
      <ProgramColumns stationId={stationId} programPerDates={programs} user={authState.user} />
    </Layout>
  );
};

export default ProgramsPage;

const REVALIDATE_SEC = 60 * 60;

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
): Promise<GetStaticPropsResult<Props>> {
  const id = context.params?.id;
  const stationId = id ?? "";
  const programs = await getPrograms(stationId);
  return {
    props: {
      programs,
      stationId,
    },
    revalidate: REVALIDATE_SEC,
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: true,
  };
}
