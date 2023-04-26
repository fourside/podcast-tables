export interface RecordProgram {
  stationId: string;
  title: string;
  fromTime: string; // yyyymmddHHmm
  duration: string; // min
  personality: string;
}

export const DATE_FORMAT_RECORD_PROGRAM = "YYYYMMDDHHmm";
