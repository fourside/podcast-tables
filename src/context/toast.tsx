import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { FADEOUT_TIME_MS, Toast, ToastType } from "../components/toast";

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
