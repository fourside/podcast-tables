import { FC } from "react";

type Props = {
  message?: string;
};

export const ErrorFormMessage: FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className="text-red-700 text-sm">{message}</div>;
};
