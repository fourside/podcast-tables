import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function formatMonthDay(monthDay: string): string {
  const d = dayjs(monthDay, "YYYYMMDD");
  return d.format("MMM D");
}
