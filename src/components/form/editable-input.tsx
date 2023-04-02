import { FC, useState } from "react";

type Props = {
  name: string;
  hasError: boolean;
  register: () => void;
  forceReadOnly?: boolean;
};

export const EditableInput: FC<Props> = (props) => {
  const [readOnly, setReadOnly] = useState(true);

  const handleClick = () => {
    setReadOnly(false);
  };
  const handleBlur = () => {
    setReadOnly(true);
  };

  return (
    <input
      ref={props.register}
      type="text"
      name={props.name}
      onClick={handleClick}
      readOnly={props.forceReadOnly || readOnly}
      onBlur={handleBlur}
      className="border border-slate-300 rounded-xl p-3 text-slate-800 text-xs w-full outline-blue-500"
      style={{
        borderColor: props.hasError ? "#ef4444" : "#eee",
        backgroundColor: props.forceReadOnly || readOnly ? "#fafafa" : "transparent",
      }}
    />
  );
};
