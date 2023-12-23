import { FirebaseUser } from "../components/auth-context";
import type { RecordProgram } from "../models/record-program";
import type { SearchProgramResponse, SearchQueries } from "../models/search-program";
import { Env } from "./env";
import { recordProgramsSchema, searchProgramsResponseSchema } from "./schema";

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
