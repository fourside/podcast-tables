import { z } from "zod";
import type { ProgramResponse, ProgramsPerDateResponse } from "../models/program";
import type { RecordProgram } from "../models/record-program";
import type { SearchMeta, SearchProgram, SearchProgramResponse } from "../models/search-program";
import type { Station } from "../models/station";

export const schemaForType =
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

const searchProgramsSchema = schemaForType<SearchProgram>()(
  z.object({
    station_id: z.string(),
    title: z.string(),
    performer: z.string(),
    info: z.string(),
    start_time: z.string(),
    end_time: z.string(),
  })
);

const searchMetaSchema = schemaForType<SearchMeta>()(
  z.object({
    page_idx: z.number(),
    row_limit: z.number(),
    result_count: z.number(),
    start_day: z.string(),
    end_day: z.string(),
  })
);

export const searchProgramsResponseSchema = schemaForType<SearchProgramResponse>()(
  z.object({
    data: z.array(searchProgramsSchema),
    meta: searchMetaSchema,
  })
);

export const recordProgramSchema = schemaForType<RecordProgram>()(
  z.object({
    stationId: z.string(),
    title: z.string(),
    fromTime: z.string(),
    toTime: z.string(),
    duration: z.string(),
    personality: z.string(),
  })
);

export const recordProgramsSchema = schemaForType<RecordProgram[]>()(z.array(recordProgramSchema));
