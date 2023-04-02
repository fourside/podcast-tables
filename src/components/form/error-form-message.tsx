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

// const ErrorMessage = styled.div({
//   color: "#d00",
//   fontSize: "small",
//   marginTop: "-8px",
//   paddingLeft: "8px",
// });
