import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { ClientPortal } from "./client-portal";

type ToastContextProps = {
  setToast: (toast: ToastType) => void;
};
const ToastContext = createContext<ToastContextProps>({
  setToast: () => {
    return;
  },
});

export const ToastProvider: FC<PropsWithChildren> = (props) => {
  const [toast, setToast] = useState<ToastType | undefined>(undefined);

  const value: ToastContextProps = {
    setToast,
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setToast(undefined);
    }, FADEOUT_TIME_MS);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <ToastContext.Provider value={value}>
      {toast && <Toast toast={toast} />}
      {props.children}
    </ToastContext.Provider>
  );
};

export const useToast: () => ToastContextProps = () => {
  return useContext(ToastContext);
};

const FADEOUT_TIME_MS = 4000;

type ToastType = {
  text: string;
  level?: "success" | "error";
};

type Props = {
  toast: ToastType;
};

const Toast: FC<Props> = ({ toast }) => {
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
