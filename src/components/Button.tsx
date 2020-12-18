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
  padding: "4px 12px",
});
