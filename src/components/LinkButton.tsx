import styled from "styled-components";

type Props = {
  label: string;
  href: string
}
export const LinkButton: React.FC<Props> = ({ label, href }) => {
  return (
    <_Button href={href}>
      {label}
    </_Button>
  );
};

const _Button = styled.a({
  display: "block",
  backgroundColor: "transparent",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "4px 12px",
  color: "#666",
});
