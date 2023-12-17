import { FC, PropsWithChildren } from "react";
import { X } from "react-feather";
import { ClientPortal } from "./client-portal";
import classes from "./modal.module.css";

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
      <div className={classes.overlay}>
        <div className={classes.container}>
          <div>
            <button
              onClick={onClose}
              title="close modal"
              className={classes.close}
            >
              <X />
            </button>
          </div>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </ClientPortal>
  );
};
