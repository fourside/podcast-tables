import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsResult } from "next";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

import Layout from "../../components/layout";
import { ProgramColumns } from "../../components/programColumns";
import { useAuth } from "../../context/Auth";
import { getPrograms } from "../../lib/client";
import { ProgramPerDate } from "../../lib/station";

type Props = {
  programs: ProgramPerDate[];
  stationId: string;
};
const Programs: React.FC<Props> = ({ programs, stationId }) => {
  const router = useRouter();
  if (router.isFallback && !programs) {
    return <div>not found</div>;
  }
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser === null) {
      Router.push("/signin");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <Layout>
      <ProgramColumns stationId={stationId} programPerDates={programs} />
    </Layout>
  );
};

export default Programs;

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
