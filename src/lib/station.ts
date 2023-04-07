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
