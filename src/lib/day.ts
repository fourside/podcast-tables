import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function formatMonthDay(monthDay: string): string {
  const d = dayjs(monthDay, "YYYYMMDD");
  return d.format("MM/DD ddd");
}

export function formatMonthDate(monthDay: string): string {
  const d = dayjs(monthDay, "YYYYMMDD");
  return d.format("MM/DD");
}

export function formatHourMinute(dateTime: string): string {
  const d = dayjs(dateTime, "YYYYMMDDHHmmss");
  return d.format("HH:mm");
}

export function formatHourMinuteFromTimeStamp(timestamp: number): string {
  const d = dayjs(timestamp);
  return d.format("HH:mm");
}

export function formatFull(fromDay: string): string {
  const d = dayjs(fromDay, "YYYYMMDDHHmmss");
  return d.format("YYYY/MM/DD HH:mm");
}

export function unformatFull(fromDay: string): string {
  const d = dayjs(fromDay, "YYYY/MM/DD HH:mm");
  return d.format("YYYYMMDDHHmm");
}

export function getToday(): string {
  return dayjs().format("YYYYMMDD");
}

export function parseAsDateJs(dateString: string, format: string): Dayjs {
  return dayjs(dateString, format);
}

export function calcDurationSeconds(startDateTime: string, endDateTime: string): number {
  const start = dayjs(startDateTime, "YYYY-MM-DD HH:mm:ss");
  const end = dayjs(endDateTime, "YYYY-MM-DD HH:mm:ss");
  return end.diff(start, "second");
}
