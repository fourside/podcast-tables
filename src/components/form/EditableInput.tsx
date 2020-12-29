import { useState } from "react";
import styled from "styled-components";

type Props = {
  width?: number;
  name: string;
  hasError: boolean;
  register: () => void;
  forceReadOnly?: boolean;
};
export const EditableInput: React.FC<Props> = (props) => {
  const [readOnly, setReadOnly] = useState(true);

  const handleClick = () => {
    setReadOnly(false);
  };
  const handleBlur = () => {
    setReadOnly(true);
  };

  if (props.forceReadOnly || readOnly) {
    return (
      <Input
        type="text"
        width={props.width}
        name={props.name}
        hasError={props.hasError}
        ref={props.register}
        onClick={handleClick}
        readOnly={true}
      />
    );
  }
  return (
    <Input
      type="text"
      width={props.width}
      name={props.name}
      hasError={props.hasError}
      ref={props.register}
      onBlur={handleBlur}
    />
  );
};

const Input = styled.input(
  {
    border: "1px solid #eee",
    borderRadius: "10px",
    outline: "none",
    padding: "12px",
    color: "#333",
  },
  (props: { width?: number; hasError: boolean; readOnly?: boolean }) => {
    const widthStyle = props.width ? { width: `${props.width}%` } : { width: "100%" };
    const borderColor = props.hasError ? "#f22" : "#eee";
    const backgroundColor = props.readOnly ? "#fafafa" : "transparent";
    return {
      ...widthStyle,
      backgroundColor,
      border: `1px solid ${borderColor}`,
    };
  }
);
