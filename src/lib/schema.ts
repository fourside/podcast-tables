import { z } from "zod";
import { RecordingTask } from "./client";
import { ProgramResponse, ProgramsPerDateResponse, Station } from "./station";

const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

export const stationArraySchema = schemaForType<Station[]>()(
  z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  )
);

const programResponseSchema = schemaForType<ProgramResponse>()(
  z.object({
    id: z.string(),
    ft: z.string(),
    to: z.string(),
    dur: z.string(),
    title: z.string(),
    url: z.string(),
    info: z.string(),
    img: z.string(),
    personality: z.string(),
  })
);

export const programsPerDateArraySchema = schemaForType<ProgramsPerDateResponse[]>()(
  z.array(
    z.object({
      date: z.number(),
      programs: z.array(programResponseSchema),
    })
  )
);

export const recordingTaskArraySchema = schemaForType<RecordingTask[]>()(
  z.array(
    z.object({
      stationId: z.string(),
      title: z.string(),
      fromTime: z.string(),
      duration: z.string(),
      personality: z.string(),
    })
  )
);
