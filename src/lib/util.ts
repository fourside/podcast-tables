import { decode } from "he";
import type { Program } from "../models/program";
import { RecordProgram } from "../models/record-program";
import { formatFull, unformatFull } from "./day";

export function calcWeightFromDuration(durationSec: number): number {
  const hour = durationSec / (60 * 60);
  if (hour < 1) {
    return 1;
  }
  return Math.floor(hour);
}

export function stripHtmlElement(html: string): string {
  const decoded = decode(html);
  return decoded.replace(/(<([^>]+)>)/gi, "");
}

export function decodeHtml(htmlString: string): string {
  return decode(htmlString);
}

export function formatProgram(program: Program): RecordProgram {
  return {
    stationId: "",
    title: program.title.trim(),
    personality: program.personality,
    fromTime: formatFull(program.from),
    duration: String(program.duration / 60),
  };
}

export function unformatProgram(formatted: RecordProgram): RecordProgram {
  return {
    ...formatted,
    fromTime: unformatFull(formatted.fromTime),
  };
}
