import { FC, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import { PostParams } from "../../lib/client";

type Props = {
  name: keyof PostParams;
  hasError: boolean;
  register: UseFormRegister<PostParams>;
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
      {...props.register(props.name)}
      type="text"
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
