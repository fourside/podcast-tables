import { getApiEndpoint, getWritableUserMailAddress } from "./env";
import { Station, ProgramsPerDateResponse, ProgramPerDate } from "./station";
import { mergeSameProgramPerDates } from "./util";
import { FirebaseUser } from "../context/auth";
import { programsPerDateArraySchema, recordingTaskArraySchema, stationArraySchema } from "./schema";

export async function getStations(): Promise<Station[]> {
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/stations`;
  const response = await fetch(url);
  const json = await response.json();
  return stationArraySchema.parse(json);
}

export async function getPrograms(stationId: string): Promise<ProgramPerDate[]> {
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/programs/${stationId}`;
  const response = await fetch(url);
  console.log("res", response);
  const json = await response.json();
  const programPerDateJson = programsPerDateArraySchema.parse(json);
  const convertedJson = convert(programPerDateJson);
  return mergeSameProgramPerDates(convertedJson);
}

export type PostParams = {
  stationId: string;
  title: string;
  fromTime: string;
  duration: string;
  personality: string;
};

export type RecordingTask = PostParams;

export async function postProgram(postParams: PostParams, user: FirebaseUser): Promise<void> {
  const writableUser = getWritableUserMailAddress();
  if (writableUser !== user?.email) {
    return;
  }
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/program`;
  const idToken = await user.getIdToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(postParams),
  });
  console.log("post response", response);
}

export async function getRecordingTask(user: FirebaseUser): Promise<RecordingTask[]> {
  if (!user) {
    throw new Error("not authenticated");
  }
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/programs/queue`;
  const idToken = await user.getIdToken();
  const response = await fetch(url, {
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
