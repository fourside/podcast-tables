import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { z } from "zod";
import { exchangeFormDateToRecordProgramDate, formatDateOfProgramDate } from "../lib/day";
import { decodeHtml } from "../lib/html";
import { schemaForType } from "../lib/schema";
import { convertToRecordProgram, type Program } from "../models/program";
import type { RecordProgram } from "../models/record-program";
import classes from "./program-form.module.css";

export const DATE_FORMAT_FORM_DATE = "YYYY/MM/DD HH:mm";

type Props = {
  stationId: string;
  program: Program;
  onSubmit: (record: RecordProgram) => Promise<void>;
};

export const ProgramForm: FC<Props> = ({ stationId, program, onSubmit }) => {
  const recordProgram = convertToRecordProgram(program, stationId);
  const {
    handleSubmit,
    register,
    formState,
    formState: { errors },
  } = useForm<RecordProgram>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      stationId: recordProgram.stationId,
      title: recordProgram.title,
      personality: recordProgram.personality,
      fromTime: formatDateOfProgramDate(recordProgram.fromTime, DATE_FORMAT_FORM_DATE),
      toTime: formatDateOfProgramDate(recordProgram.toTime, DATE_FORMAT_FORM_DATE),
      duration: recordProgram.duration,
    },
  });
  const { isSubmitting, isValid } = formState;

  const onSubmitWrapper = (formData: RecordProgram) => {
    onSubmit({
      ...formData,
      fromTime: exchangeFormDateToRecordProgramDate(formData.fromTime),
      toTime: exchangeFormDateToRecordProgramDate(formData.toTime),
    });
  };

  const infoHtml = decodeHtml(program.info);

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className={classes.form}>
      <FormControlGroup>
        <div className={classes.stationAndTitle}>
          <Input forceReadOnly={true} name="stationId" register={register} hasError={!!errors.stationId} />
          <Input name="title" register={register} hasError={!!errors.title} />
        </div>
        <ErrorFormMessage message={errors.stationId?.message} />
        <ErrorFormMessage message={errors.title?.message} />
      </FormControlGroup>

      <FormControlGroup>
        <div className={classes.personality}>
          <Input name="personality" register={register} hasError={!!errors.personality} />
        </div>
        <ErrorFormMessage message={errors.personality?.message} />
      </FormControlGroup>

      <FormControlGroup>
        <div className={classes.fromAndTo}>
          <Input name="fromTime" register={register} hasError={!!errors.fromTime} />
          <Input name="toTime" register={register} hasError={!!errors.toTime} />
        </div>
        <ErrorFormMessage message={errors.fromTime?.message} />
        <ErrorFormMessage message={errors.toTime?.message} />
      </FormControlGroup>

      {infoHtml && (
        <FormControlGroup>
          <div dangerouslySetInnerHTML={{ __html: infoHtml }} className={classes.info} />
        </FormControlGroup>
      )}

      <div>
        <SubmitButton isSubmitting={isSubmitting} isValid={!isSubmitting || isValid} />
      </div>
    </form>
  );
};

const FormControlGroup: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.FormControlGroup}>{children}</div>
);

const fileNamePattern = /^[^ \n\\]+$/;
const notWhiteSpacePattern = /^[^ \n]+$/;

const formSchema = schemaForType<RecordProgram>()(
  z.object({
    stationId: z.string().regex(fileNamePattern, { message: "stationId cannot contain white spaces" }),
    title: z.string().regex(fileNamePattern, { message: "title cannot contain white spaces" }),
    fromTime: z
      .string()
      .regex(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/, { message: "fromTime must be format: YYYY/MM/DD HH:mm" }),
    toTime: z
      .string()
      .regex(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/, { message: "toTime must be format: YYYY/MM/DD HH:mm" }),
    duration: z.string().regex(/^\d+$/, { message: "duration must be number" }),
    personality: z.string().regex(notWhiteSpacePattern, { message: "personality cannot contain white spaces" }),
  })
);

type InputProps = {
  name: keyof RecordProgram;
  hasError: boolean;
  register: UseFormRegister<RecordProgram>;
  forceReadOnly?: boolean;
};

const Input: FC<InputProps> = (props) => {
  const [readOnly, setReadOnly] = useState(true);

  const handleClick = () => {
    setReadOnly(false);
  };
  const handleBlur = () => {
    setReadOnly(true);
  };

  return (
    <input
      {...props.register(props.name)}
      type="text"
      onClick={handleClick}
      readOnly={props.forceReadOnly || readOnly}
      onBlur={handleBlur}
      className={classes.input}
      style={{
        borderColor: props.hasError ? "var(--red-8)" : "var(--slate-7)",
        backgroundColor: props.forceReadOnly || readOnly ? "#fafafa" : "transparent",
      }}
    />
  );
};

type ErrorFormMessageProps = {
  message?: string;
};

const ErrorFormMessage: FC<ErrorFormMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className={classes.errorMessage}>{message}</div>;
};

type SubmitButtonProps = {
  isSubmitting: boolean;
  isValid: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({ isSubmitting, isValid }) => {
  return (
    <button
      name="submit"
      disabled={!isValid}
      className={classes.submitButton}
      style={{ cursor: isValid ? "pointer" : "not-allowed" }}
    >
      {isSubmitting ? <div className={classes.spinner} /> : "SEND"}
    </button>
  );
};
