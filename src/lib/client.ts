import { FirebaseUser } from "../components/auth-context";
import { mergeSameProgramPerDates, type ProgramPerDate, type ProgramsPerDateResponse } from "../models/program";
import type { RecordProgram } from "../models/record-program";
import type { SearchProgramResponse, SearchQueries } from "../models/search-program";
import type { Station } from "../models/station";
import { Env } from "./env";
import {
  programsPerDateArraySchema,
  recordProgramsSchema,
  searchProgramsResponseSchema,
  stationArraySchema,
} from "./schema";

export async function getStations(): Promise<Station[]> {
  try {
    console.log("????????????????????????", Env.radikoResourceEndpoint);
  } catch (er) {
    console.log("catched", process.env.RADIKO_RESOURCE_ENDPOINT);
  }
  const response = await fetch(`${Env.radikoResourceEndpoint}/stations.json`);
  const json = await response.json();
  return stationArraySchema.parse(json);
}

export async function getPrograms(stationId: string): Promise<ProgramPerDate[]> {
  const response = await fetch(`${Env.radikoResourceEndpoint}/programs/${stationId}.json`);
  const json = await response.json();
  const programPerDateJson = programsPerDateArraySchema.parse(json);
  const convertedJson = convert(programPerDateJson);
  return mergeSameProgramPerDates(convertedJson);
}

export async function recordProgram(recordProgram: RecordProgram, user: FirebaseUser): Promise<void> {
  if (Env.writableUserMailAddress !== user?.email) {
    return;
  }
  const idToken = await user.getIdToken();
  const response = await fetch(`${Env.apiEndpoint}/program`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(recordProgram),
  });
  console.log("post response", response);
}

export async function getRecordPrograms(user: FirebaseUser): Promise<RecordProgram[]> {
  const idToken = await user.getIdToken();
  const response = await fetch(`${Env.apiEndpoint}/programs/queue`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (response.status === 204) {
    return [];
  }
  const json = await response.json();
  return recordProgramsSchema.parse(json);
}

export async function getSearchPrograms(searchQueries: SearchQueries): Promise<SearchProgramResponse> {
  const queries = new URLSearchParams({ key: searchQueries.key, page_idx: searchQueries.page_idx ?? "" });
  const response = await fetch(`/api/search?${queries}`);
  const json = await response.json();
  return searchProgramsResponseSchema.parse(json);
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
