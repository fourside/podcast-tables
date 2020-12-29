import styled from "styled-components";

type Props = {
  message?: string;
};
export const ErrorFormMessage: React.FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <ErrorMessage>{message}</ErrorMessage>;
};

const ErrorMessage = styled.div({
  color: "#d00",
  fontSize: "small",
  marginTop: "-8px",
  paddingLeft: "8px",
});
