import { canonicalProgramTitle } from "./program";

export interface SearchProgram {
  station_id: string;
  title: string;
  performer: string;
  info: string;
  start_time: string;
  end_time: string;
}

export const DATE_FORMAT_SEARCH_PROGRAM_START_TIME = "YYYY-MM-DD HH:mm:ss";

export interface SearchMeta {
  page_idx: number;
  row_limit: number;
  result_count: number;
  start_day: string;
  end_day: string;
}

export interface SearchProgramResponse {
  data: SearchProgram[];
  meta: SearchMeta;
}

export interface SearchQueries {
  key: string;
  page_idx?: string;
}

export function mergeSearchPrograms(programs: SearchProgram[]): SearchProgram[] {
  let sameFlag = false;
  const samePrograms: SearchProgram[] = [];
  return programs.reduce<SearchProgram[]>((acc, program) => {
    const canonical = {
      ...program,
      title: canonicalProgramTitle(program.title),
    };
    if (canonical.title === acc.at(-1)?.title) {
      samePrograms.push(program);
      sameFlag = true;
    } else if (sameFlag) {
      sameFlag = false;
      const before = acc.pop()!;
      acc.push(_mergeSearchPrograms([before, ...samePrograms]));
      samePrograms.splice(0); // clear
      acc.push(program);
    } else {
      acc.push(program);
    }
    return acc;
  }, []);
}

function _mergeSearchPrograms(programs: SearchProgram[]): SearchProgram {
  if (programs.length === 1) {
    return programs[0];
  }
  return programs.reduce((acc, cur) => {
    acc.end_time = cur.end_time; // overwrite end time
    return acc;
  });
}
