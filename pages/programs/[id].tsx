import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getPrograms } from "../../lib/client";
import { ProgramPerDate } from "../../lib/station";

type Props = {
  programs: ProgramPerDate[];
}
const Programs: React.FC<Props> = ({ programs }) => {
  return (
    <div>
      {programs.map(program => (
        <div key={program.date}>
          {program.date}
        </div>
      ))}
    </div>
  )
};

export default Programs;

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const id = context.params?.id;
  if (!id) {
    context.res.writeHead(404);
    context.res.end();
    return { notFound: true }
  }
  const stationId = (Array.isArray(id)) ? id[0] : id;
  const programs = await getPrograms(stationId);
  return {
    props: {
      programs,
    }
  };
}
