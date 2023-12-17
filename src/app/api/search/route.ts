import { createHash } from "node:crypto";
import { searchProgramsResponseSchema } from "../../../lib/schema";
import { mergeSearchPrograms } from "../../../models/search-program";

export async function GET(request: Request): Promise<Response> {
  const query = new URL(request.url).searchParams;
  const key = query.get("key");
  if (key === null) {
    return new Response(undefined, { status: 400 });
  }
  const pageIndex = query.get("page_idx") ?? "";
  const urlParams = new URLSearchParams({
    key: key,
    filter: "",
    start_day: "",
    end_day: "",
    area_id: "JP14",
    region_id: "",
    cul_area_id: "JP14",
    page_idx: pageIndex,
    uid: md5hex(),
    row_limit: "12",
    app_id: "pc",
    cur_area_id: "JP14",
    action_id: "0",
  });
  const response = await fetch(`https://radiko.jp/v3/api/program/search?${urlParams}`);
  const json = await response.json();
  const parsed = searchProgramsResponseSchema.parse(json);
  return new Response(JSON.stringify({
    meta: parsed.meta,
    data: mergeSearchPrograms(parsed.data),
  }));
}

function md5hex(): string {
  const rnd = Math.floor(Math.random() * 1000000000) + "" + new Date().getTime();
  return createHash("md5").update(rnd).digest("hex");
}
