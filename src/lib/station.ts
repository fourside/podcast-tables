export interface Station {
  id: string;
  name: string;
}

export interface ProgramsPerDateResponse {
  date: number;
  programs: ProgramResponse[];
}

export interface ProgramResponse {
  id: string;
  ft: string;
  to: string;
  dur: string;
  title: string;
  url: string;
  info: string;
  img: string;
  personality: string;
}
export interface ProgramPerDate {
  date: string;
  programs: Program[];
}

export interface Program {
  id: string;
  from: string;
  to: string;
  duration: number;
  title: string;
  url: string;
  info: string;
  img: string;
  personality: string;
}

export interface SearchProgram {
  station_id: string;
  title: string;
  performer: string;
  info: string;
  start_time: string; // yyyy-mm-dd hh:mm:ss
  end_time: string;
}

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
