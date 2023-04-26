import { FirebaseUser } from "../components/auth-context";
import { mergeSameProgramPerDates, type ProgramPerDate, type ProgramsPerDateResponse } from "../models/program";
import type { RecordProgram } from "../models/record-program";
import type { SearchProgramResponse, SearchQueries } from "../models/search-program";
import type { Station } from "../models/station";
import { getApiEndpoint, getWritableUserMailAddress } from "./env";
import {
  programsPerDateArraySchema,
  recordProgramsSchema,
  searchProgramsResponseSchema,
  stationArraySchema,
} from "./schema";

export async function getStations(): Promise<Station[]> {
  const response = await request("/stations");
  const json = await response.json();
  return stationArraySchema.parse(json);
}

export async function getPrograms(stationId: string): Promise<ProgramPerDate[]> {
  const response = await request(`/programs/${stationId}`);
  console.log("res", response);
  const json = await response.json();
  const programPerDateJson = programsPerDateArraySchema.parse(json);
  const convertedJson = convert(programPerDateJson);
  return mergeSameProgramPerDates(convertedJson);
}

export async function recordProgram(recordProgram: RecordProgram, user: FirebaseUser): Promise<void> {
  const writableUser = getWritableUserMailAddress();
  if (writableUser !== user?.email) {
    return;
  }
  const idToken = await user.getIdToken();
  const response = await request("program", {
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
  const response = await request("programs/queue", {
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

async function request(path: string, requestInit?: RequestInit): Promise<Response> {
  const endpoint = getApiEndpoint();
  return fetch(`${endpoint}/${path}`, requestInit);
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
