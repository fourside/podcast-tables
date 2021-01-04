import { getApiEndpoint, getWritableUserMailAddress } from "./env";
import { Station, ProgramsPerDateResponse, ProgramPerDate } from "./station";
import { mergeSameProgramPerDates } from "./util";

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
  const convertedJson = convert(json);
  return mergeSameProgramPerDates(convertedJson);
}

export type PostParams = {
  stationId: string;
  title: string;
  fromTime: string;
  duration: string;
  personality: string;
};

export async function postProgram(postParams: PostParams, userMailAddress: string | null | undefined): Promise<void> {
  const writableUser = getWritableUserMailAddress();
  if (writableUser !== userMailAddress) {
    return;
  }
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/program`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(postParams),
  });
  console.log("post response", response);
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
