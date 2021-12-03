import { object, string, SchemaOf } from "yup";

import { PostParams } from "./client";

const fileNamePattern = /^[^ \n\\]+$/;
const notWhiteSpacePattern = /^[^ \n]+$/;

export const formSchema: SchemaOf<PostParams> = object().shape({
  stationId: string().required().matches(fileNamePattern, { message: "stationId cannot contain white spaces" }),
  title: string().required().matches(fileNamePattern, { message: "title cannot contain white spaces" }),
  fromTime: string()
    .required()
    .matches(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/, { message: "fromTime must be format: YYYY/MM/DD HH:mm" }),
  duration: string().required().matches(/^\d+$/, { message: "duration must be number" }),
  personality: string()
    .required()
    .matches(notWhiteSpacePattern, { message: "personality cannot contain white spaces" }),
});
