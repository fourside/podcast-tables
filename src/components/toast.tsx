import { FC } from "react";
import { ClientPortal } from "./client-portal";

export const FADEOUT_TIME_MS = 4000;

type Level = "success" | "error";

export type ToastType = {
  text: string;
  level?: Level;
};

type Props = {
  toast: ToastType;
};

export const Toast: FC<Props> = ({ toast }) => {
  const level = toast.level ?? "success";
  return (
    <ClientPortal selector="#toast">
      <div
        className="fixed top-8 left-1/2 w-[200px] -translate-x-2/4 text-center text-sm p-3 rounded-xl animate-fadeOut"
        style={
          level === "success"
            ? { color: "rgb(0,100,0)", backgroundColor: "rgba(50,200,50)" }
            : { color: "rgb(100,0,0)", backgroundColor: "rgba(250,100,100)" }
        }
      >
        {toast.text}
      </div>
    </ClientPortal>
  );
};
