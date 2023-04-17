import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { z } from "zod";
import { schemaForType } from "../lib/schema";
import { decodeHtml, formatProgram } from "../lib/util";
import type { Program } from "../models/program";
import type { RecordProgram } from "../models/record-program";

type Props = {
  stationId: string;
  program: Program;
  onSubmit: (record: RecordProgram) => Promise<void>;
};

export const ProgramForm: FC<Props> = ({ stationId, program, onSubmit }) => {
  const formatted = formatProgram(program);
  const {
    handleSubmit,
    register,
    formState,
    formState: { errors },
  } = useForm<RecordProgram>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      stationId,
      title: formatted.title,
      personality: formatted.personality,
      fromTime: formatted.fromTime,
      duration: formatted.duration,
    },
  });
  const { isSubmitting, isValid } = formState;

  const infoHtml = decodeHtml(program.info);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 my-2">
      <FormControlGroup>
        <div className="grid grid-cols-[1fr,5fr] items-center gap-2 w-full">
          <Input forceReadOnly={true} name="stationId" register={register} hasError={!!errors.stationId} />
          <Input name="title" register={register} hasError={!!errors.title} />
        </div>
        <ErrorFormMessage message={errors.stationId?.message} />
        <ErrorFormMessage message={errors.title?.message} />
      </FormControlGroup>

      <FormControlGroup>
        <div className="w-full">
          <Input name="personality" register={register} hasError={!!errors.personality} />
        </div>
        <ErrorFormMessage message={errors.personality?.message} />
      </FormControlGroup>

      <FormControlGroup>
        <div className="grid grid-cols-[3fr,1fr] items-center gap-2 w-3/4">
          <Input name="fromTime" register={register} hasError={!!errors.fromTime} />
          <Input name="duration" register={register} hasError={!!errors.duration} />
        </div>
        <ErrorFormMessage message={errors.fromTime?.message} />
        <ErrorFormMessage message={errors.duration?.message} />
      </FormControlGroup>

      {infoHtml && (
        <FormControlGroup>
          <div
            dangerouslySetInnerHTML={{ __html: infoHtml }}
            className="rounded-xl w-full text-slate-600 text-xs p-3 border border-slate-100 [&>a]:text-blue-500 overflow-y-auto max-h-[300px]"
          />
        </FormControlGroup>
      )}

      <div>
        <SubmitButton label={"SEND"} isSubmitting={isSubmitting} isValid={!isSubmitting || isValid} />
      </div>
    </form>
  );
};

const FormControlGroup: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col items-start gap-1 w-full">{children}</div>
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

export const Input: FC<InputProps> = (props) => {
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
      className="border border-slate-300 rounded-xl p-3 text-slate-800 text-xs w-full outline-blue-500"
      style={{
        borderColor: props.hasError ? "#ef4444" : "#eee",
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

  return <div className="text-red-700 text-sm">{message}</div>;
};

type SubmitButtonProps = {
  label: string;
  isSubmitting: boolean;
  isValid: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({ label, isSubmitting, isValid }) => {
  if (isSubmitting) {
    return (
      <div
        title="submitting..."
        className="rounded-xl w-[100px] h-[36px] px-2 py-3 flex justify-center bg-slate-400 border-slate-400"
      >
        <div className="rounded-full w-[20px] h-[20px] border border-t-slate-800 border-b-slate-800 border-r-slate-800 border-l-slate-300 animate-spin" />
      </div>
    );
  }
  return (
    <button
      name="submit"
      disabled={!isValid}
      className="flex justify-center items-center border border-slate-300 rounded-xl text-sm text-slate-600 w-[100px] h-[36px] px-2 py-3 hover:bg-slate-400 hover:text-slate-300 hover:border-slate-400"
      style={{ cursor: isValid ? "pointer" : "not-allowed" }}
    >
      {label}
    </button>
  );
};
