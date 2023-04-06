import { z } from "zod";

const fileNamePattern = /^[^ \n\\]+$/;
const notWhiteSpacePattern = /^[^ \n]+$/;

export const formSchema = z.object({
  stationId: z.string().regex(fileNamePattern, { message: "stationId cannot contain white spaces" }),
  title: z.string().regex(fileNamePattern, { message: "title cannot contain white spaces" }),
  fromTime: z
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/, { message: "fromTime must be format: YYYY/MM/DD HH:mm" }),
  duration: z.string().regex(/^\d+$/, { message: "duration must be number" }),
  personality: z.string().regex(notWhiteSpacePattern, { message: "personality cannot contain white spaces" }),
});
