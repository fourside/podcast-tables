import { createHash } from "node:crypto";
import { SearchProgramResponse, SearchQueries, mergeSearchPrograms } from "../models/search-program";
import { searchProgramsResponseSchema } from "./schema";

export async function search(searchQueries: SearchQueries): Promise<SearchProgramResponse> {
  const urlParams = new URLSearchParams({
    key: searchQueries.key,
    filter: "",
    start_day: "",
    end_day: "",
    area_id: "JP14",
    region_id: "",
    cul_area_id: "JP14",
    page_idx: searchQueries.page_idx?.toString() ?? "",
    uid: md5hex(),
    row_limit: "12",
    app_id: "pc",
    cur_area_id: "JP14",
    action_id: "0",
  });
  const response = await fetch(`https://radiko.jp/v3/api/program/search?${urlParams}`);
  const json = await response.json();
  const parsed = searchProgramsResponseSchema.parse(json);
  return {
    meta: parsed.meta,
    data: mergeSearchPrograms(parsed.data),
  };
}

function md5hex(): string {
  const rnd = Math.floor(Math.random() * 1000000000) + "" + new Date().getTime();
  return createHash("md5").update(rnd).digest("hex");
}
