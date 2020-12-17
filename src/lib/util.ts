import { ProgramPerDate, Program } from "./station";

export function columnId(index: number): string {
  return `column_${index}`;
}

export function calcWeightFromDuration(durationSec: number): number {
  const hour = durationSec / (60 * 60);
  if (hour < 1) {
    return 1;
  }
  return Math.floor(hour);
}

export function mergeSameProgramPerDates(programPerDates: ProgramPerDate[]): ProgramPerDate[] {
  const result = programPerDates.reduce<ProgramPerDate[]>((acc, programPerDate) => {
    const samePrograms: Program[] = [];
    let sameFlag = false;
    const mergedPrograms = programPerDate.programs.reduce<Program[]>((acc, program) => {
      if (isSameProgram(program.title)) {
        samePrograms.push(program);
        sameFlag = true;
      } else if (sameFlag) {
        // un-match and before is matched
        acc.push(mergePrograms(samePrograms));
        samePrograms.splice(0); // clear array
        sameFlag = false;
        acc.push(program);
      } else {
        acc.push(program);
      }
      return acc;
    }, []);
    const mergedProgramPerDate = {
      date: programPerDate.date,
      programs: mergedPrograms,
    };
    acc.push(mergedProgramPerDate);
    return acc;
  }, []);
  return result;
}

function isSameProgram(title: string): boolean {
  return /\(\d\)/.test(title) || /（[０-９]）/.test(title);
}

function mergePrograms(programs: Program[]): Program {
  if (programs.length === 1) {
    return programs[0];
  }
  const result = programs.reduce((acc, cur) => {
    acc.to = cur.to; // overwrite end time
    acc.duration += cur.duration; // add duration
    return acc;
  });
  result.title = result.title.replace(/\(\d\).*$|（[０-９]）.*$/, "");

  return result;
}
