import type { SearchProgramResponse, SearchQueries } from "../models/search-program";
import { searchProgramsResponseSchema } from "./schema";

export async function getSearchPrograms(searchQueries: SearchQueries): Promise<SearchProgramResponse> {
  const queries = new URLSearchParams({ key: searchQueries.key, page_idx: searchQueries.page_idx ?? "" });
  const response = await fetch(`/api/search?${queries}`);
  const json = await response.json();
  return searchProgramsResponseSchema.parse(json);
}
