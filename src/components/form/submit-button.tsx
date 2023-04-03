import { FC } from "react";

type Props = {
  label: string;
  isSubmitting: boolean;
  isValid: boolean;
};

export const SubmitButton: FC<Props> = ({ label, isSubmitting, isValid }) => {
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
