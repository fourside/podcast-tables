import { getPrograms } from "../../../lib/client";
import { ProgramsPage } from "./programs-page";

export default async function Programs({ params }: { params: { station_id: string } }) {
  const programs = await getPrograms(params.station_id);
  return <ProgramsPage stationId={params.station_id} programs={programs} />;
}
