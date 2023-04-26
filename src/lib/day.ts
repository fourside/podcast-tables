import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT_FORM_DATE } from "../components/program-form";
import { DATE_FORMAT_PROGRAM_FROM, DATE_FORMAT_PROGRAM_PER_DATE } from "../models/program";
import { DATE_FORMAT_RECORD_PROGRAM } from "../models/record-program";
import { DATE_FORMAT_SEARCH_PROGRAM_START_TIME } from "../models/search-program";
dayjs.extend(customParseFormat);

export function formatDateOfProgramPerDate(date: string, format: string): string {
  return dayjs(date, DATE_FORMAT_PROGRAM_PER_DATE).format(format);
}

export function formatDateOfProgramDate(dateTime: string, format: string): string {
  return dayjs(dateTime, DATE_FORMAT_PROGRAM_FROM).format(format);
}

export function getCurrentHourMinute(): string {
  return dayjs().format("HH:mm");
}

export function exchangeFormDateToRecordProgramDate(formDate: string): string {
  return dayjs(formDate, DATE_FORMAT_FORM_DATE).format(DATE_FORMAT_RECORD_PROGRAM);
}

export function getToday(): string {
  return dayjs().format("YYYYMMDD");
}

export function parseSearchProgramDate(dateString: string): Dayjs {
  return dayjs(dateString, DATE_FORMAT_SEARCH_PROGRAM_START_TIME);
}

export function calcDurationSeconds(startDateTime: string, endDateTime: string): number {
  const start = dayjs(startDateTime, DATE_FORMAT_SEARCH_PROGRAM_START_TIME);
  const end = dayjs(endDateTime, DATE_FORMAT_SEARCH_PROGRAM_START_TIME);
  return end.diff(start, "second");
}
