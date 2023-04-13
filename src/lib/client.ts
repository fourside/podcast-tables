import { FirebaseUser } from "../context/auth";
import { getApiEndpoint, getWritableUserMailAddress } from "./env";
import { programsPerDateArraySchema, recordingTaskArraySchema, stationArraySchema } from "./schema";
import { ProgramPerDate, ProgramsPerDateResponse, Station } from "./station";
import { mergeSameProgramPerDates } from "./util";

export type PostParams = {
  stationId: string;
  title: string;
  fromTime: string;
  duration: string;
  personality: string;
};

export type RecordingTask = PostParams;

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

export async function postProgram(postParams: PostParams, user: FirebaseUser): Promise<void> {
  const writableUser = getWritableUserMailAddress();
  if (writableUser !== user?.email) {
    return;
  }
  const idToken = await user.getIdToken();
  const response = await request("/program", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(postParams),
  });
  console.log("post response", response);
}

export async function getRecordingTask(user: FirebaseUser): Promise<RecordingTask[]> {
  const idToken = await user.getIdToken();
  const response = await request("/programs/queue", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (response.status === 204) {
    return [];
  }
  const json = await response.json();
  return recordingTaskArraySchema.parse(json);
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
