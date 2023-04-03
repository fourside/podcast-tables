import { FC } from "react";

type Props = {
  label: string;
  onClick: () => void;
};

export const Button: FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border border-slate-200 rounded-lg text-slate-500 py-2 px-3 text-sm cursor-pointer hover:shadow hover:shadow-slate-200"
    >
      {label}
    </button>
  );
};
