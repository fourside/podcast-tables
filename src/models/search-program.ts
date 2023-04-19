import { isSequentialProgram } from "./program";

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
    if (isSequentialProgram(program.title)) {
      samePrograms.push(program);
      sameFlag = true;
    } else if (sameFlag) {
      sameFlag = false;
      acc.push(_mergeSearchPrograms(samePrograms)); // flush
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
  const result = programs.reduce((acc, cur) => {
    acc.end_time = cur.end_time; // overwrite end time
    return acc;
  });
  result.title = result.title.replace(/\(\d\).*$|（[０-９]）.*$/, "");

  return result;
}
