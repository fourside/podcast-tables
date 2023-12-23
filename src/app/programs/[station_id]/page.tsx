import { Env } from "../../../lib/env";
import { programsPerDateArraySchema } from "../../../lib/schema";
import { mergeSameProgramPerDates, type ProgramPerDate, type ProgramsPerDateResponse } from "../../../models/program";
import { ProgramsPage } from "./programs-page";

export default async function Programs({ params }: { params: { station_id: string } }) {
  const programs = await getPrograms(params.station_id);
  return <ProgramsPage stationId={params.station_id} programs={programs} />;
}

async function getPrograms(stationId: string): Promise<ProgramPerDate[]> {
  const response = await fetch(`${Env.radikoResourceEndpoint}/programs/${stationId}.json`, { cache: "no-store" });
  const json = await response.json();
  const programPerDateJson = programsPerDateArraySchema.parse(json);
  const convertedJson = convert(programPerDateJson);
  return mergeSameProgramPerDates(convertedJson);
}

function convert(programPerDateResponses: ProgramsPerDateResponse[]): ProgramPerDate[] {
  return programPerDateResponses.map((res) => {
    const programs = res.programs.map((res) => {
      return {
        id: res.id,
        from: res.ft,
        to: res.to,
        duration: parseInt(res.dur),
        title: res.title,
        url: res.url,
        info: res.info,
        img: res.img,
        personality: res.personality,
      };
    });
    return {
      date: res.date.toString(),
      programs,
    };
  });
}
