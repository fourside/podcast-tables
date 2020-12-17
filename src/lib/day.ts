import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function formatMonthDay(monthDay: string): string {
  const d = dayjs(monthDay, "YYYYMMDD");
  return d.format("ddd, D MMMM");
}

export function formatHourMinute(dateTime: string): string {
  const d = dayjs(dateTime, "YYYYMMDDHHmmss");
  return d.format("HH:mm");
}

export function formatHourMinuteFromTimeStamp(timestamp: number): string {
  const d = dayjs(timestamp);
  return d.format("HH:mm");
}
