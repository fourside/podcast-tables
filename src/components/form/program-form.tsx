import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { PostParams } from "../../lib/client";
import { formSchema } from "../../lib/form-schema";
import { Program } from "../../lib/station";
import { decodeHtml, formatProgram } from "../../lib/util";
import { EditableInput } from "./editable-input";
import { ErrorFormMessage } from "./error-form-message";
import { SubmitButton } from "./submit-button";

type Props = {
  stationId: string;
  program: Program;
  onSubmit: (postParams: PostParams) => Promise<void>;
};

export const ProgramForm: FC<Props> = ({ stationId, program, onSubmit }) => {
  const formatted = formatProgram(program);
  const {
    handleSubmit,
    register,
    formState,
    formState: { errors },
  } = useForm<PostParams>({
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
          <EditableInput forceReadOnly={true} name="stationId" register={register} hasError={!!errors.stationId} />
          <EditableInput name="title" register={register} hasError={!!errors.title} />
        </div>
        <ErrorFormMessage message={errors.stationId?.message} />
        <ErrorFormMessage message={errors.title?.message} />
      </FormControlGroup>

      <FormControlGroup>
        <div className="w-full">
          <EditableInput name="personality" register={register} hasError={!!errors.personality} />
        </div>
        <ErrorFormMessage message={errors.personality?.message} />
      </FormControlGroup>

      <FormControlGroup>
        <div className="grid grid-cols-[3fr,1fr] items-center gap-2 w-3/4">
          <EditableInput name="fromTime" register={register} hasError={!!errors.fromTime} />
          <EditableInput name="duration" register={register} hasError={!!errors.duration} />
        </div>
        <ErrorFormMessage message={errors.fromTime?.message} />
        <ErrorFormMessage message={errors.duration?.message} />
      </FormControlGroup>

      {infoHtml && (
        <FormControlGroup>
          <div
            dangerouslySetInnerHTML={{ __html: infoHtml }}
            className="rounded-xl w-full text-slate-600 text-xs p-3 border border-slate-100 [&>a]:text-blue-500"
          />
        </FormControlGroup>
      )}

      <div>
        <SubmitButton label={"SEND"} isSubmitting={isSubmitting} isValid={!isSubmitting || isValid} />
      </div>
    </form>
  );
};

const FormControlGroup: FC = ({ children }) => <div className="flex flex-col items-start gap-1 w-full">{children}</div>;
