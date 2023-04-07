import { FC, PropsWithChildren } from "react";
import { X } from "react-feather";
import { ClientPortal } from "./client-portal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const Modal: FC<PropsWithChildren<Props>> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ClientPortal selector="#modal">
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/30">
        <div className="relative overflow-hidden p-6 w-[600px] rounded-xl bg-white">
          <div>
            <button
              onClick={onClose}
              title="close modal"
              className="absolute top-1 right-1 cursor-pointer w-6 h-6 border-none bg-transparent text-slate-600 hover:text-slate-300"
            >
              <X />
            </button>
          </div>
          <div className="max-h-full">{children}</div>
        </div>
      </div>
    </ClientPortal>
  );
};
