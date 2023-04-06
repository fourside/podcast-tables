import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  selector: string;
};

export const ClientPortal: FC<PropsWithChildren<Props>> = ({ children, selector }) => {
  const ref = useRef<Element>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const elem = document.querySelector(selector);
    if (!elem) {
      return;
    }
    ref.current = elem;
    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
