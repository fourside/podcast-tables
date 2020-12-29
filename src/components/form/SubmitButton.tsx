import styled, { keyframes } from "styled-components";

type Props = {
  label: string;
  isSubmitting: boolean;
  isValid: boolean;
};
export const SubmitButton: React.FC<Props> = ({ label, isSubmitting, isValid }) => {
  if (isSubmitting) {
    return (
      <LoaderContainer title="submitting...">
        <Loader />
      </LoaderContainer>
    );
  }
  return <Button type="submit" name="submit" value={label} disabled={!isValid} />;
};

const Button = styled.input({
  border: "1px solid #eee",
  borderRadius: "10px",
  color: "#333",
  padding: "8px 12px",
  cursor: "pointer",
  width: "100px",
  height: "36px",
  outline: "none",
  "&:hover": {
    backgroundColor: "#aaa",
    color: "#eee",
    border: "1px solid #aaa",
  },
});

const LoaderContainer = styled.div({
  borderRadius: "10px",
  padding: "8px 12px",
  margin: "0",
  width: "100px",
  height: "36px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#aaa",
  border: "1px solid #aaa",
});

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const Loading = styled.div`
  animation: ${rotate} 1.1s infinite linear;
`;

const Loader = styled(Loading)({
  borderTop: "2px solid rgba(50,50,50,0.2)",
  borderRight: "2px solid rgba(50,50,50,0.2)",
  borderBottom: "2px solid rgba(50,50,50,0.2)",
  borderLeft: "2px solid #aaa",
  transform: "translateZ(0)",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
});
