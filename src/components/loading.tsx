import { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[64px] h-[64px] rounded-full bg-slate-800 animate-scalePulse" />
    </div>
  );
};
