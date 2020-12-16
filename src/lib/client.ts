import { getApiEndpoint } from "./env";
import { Station, ProgramsPerDateResponse, ProgramPerDate } from "./station";
import { formatMonthDay } from "./day";

export async function getStations(): Promise<Station[]> {
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/stations`;
  const response = await fetch(url);
  const json = await response.json();
  return json as Station[];
}

export async function getPrograms(stationId: string): Promise<ProgramPerDate[]> {
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/programs/${stationId}`;
  const response = await fetch(url);
  console.log("res", response);
  const json = (await response.json()) as ProgramsPerDateResponse[];
  // console.log("res body", JSON.stringify(json, null , "  "))
  return convert(json);
}

function convert(programPerDateResponses: ProgramsPerDateResponse[]): ProgramPerDate[] {
  return programPerDateResponses.map((res) => {
    const date = formatMonthDay(res.date.toString());
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
      date,
      programs,
    };
  });
}