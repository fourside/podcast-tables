import styled from "styled-components";

type Props = {
  label: string;
  onClick: () => void;
}
export const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <_Button onClick={onClick} >
      {label}
    </_Button>
  );
};

const _Button = styled.button({
  backgroundColor: "transparent",
  border: "1px solid #ccc",
  borderRadius: "8px",
  color: "#333",
  padding: "4px 12px",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "1px 1px 4px 1px rgba(135,200,250,0.6)",
  },
});
