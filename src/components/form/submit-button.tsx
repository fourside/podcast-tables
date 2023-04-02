import { FC } from "react";

type Props = {
  label: string;
  isSubmitting: boolean;
  isValid: boolean;
};

export const SubmitButton: FC<Props> = ({ label, isSubmitting, isValid }) => {
  if (isSubmitting) {
    return (
      <div
        title="submitting..."
        className="rounded-xl w-[100px] h-[36px] px-2 py-3 flex justify-center bg-slate-400 border-slate-400"
      >
        <div className="rounded-full w-[20px] h-[20px] border border-t-slate-800 border-b-slate-800 border-r-slate-800 border-l-slate-300 animate-spin" />
      </div>
    );
  }
  return (
    <button
      name="submit"
      disabled={!isValid}
      className="flex justify-center items-center border border-slate-300 rounded-xl text-sm text-slate-600 w-[100px] h-[36px] px-2 py-3 hover:bg-slate-400 hover:text-slate-300 hover:border-slate-400"
      style={{ cursor: isValid ? "pointer" : "not-allowed" }}
    >
      {label}
    </button>
  );
};

// const rotate = keyframes({
//   "0%": {
//     transform: "rotate(0deg)",
//   },
//   "100%": {
//     transform: "rotate(360deg)",
//   },
// });

// const Loading = styled.div`
//   animation: ${rotate} 1.1s infinite linear;
// `;

// const Loader = styled(Loading)({
//   borderTop: "2px solid rgba(50,50,50,0.2)",
//   borderRight: "2px solid rgba(50,50,50,0.2)",
//   borderBottom: "2px solid rgba(50,50,50,0.2)",
//   borderLeft: "2px solid #aaa",
//   transform: "translateZ(0)",
//   borderRadius: "50%",
//   width: "20px",
//   height: "20px",
// });

// const LoaderContainer = styled.div({
//   borderRadius: "10px",
//   padding: "8px 12px",
//   margin: "0",
//   width: "100px",
//   height: "36px",
//   display: "flex",
//   justifyContent: "center",
//   backgroundColor: "#aaa",
//   border: "1px solid #aaa",
// });

// const Button = styled.input({
//   border: "1px solid #eee",
//   borderRadius: "10px",
//   color: "#333",
//   padding: "8px 12px",
//   cursor: "pointer",
//   width: "100px",
//   height: "36px",
//   outline: "none",
//   "&:hover": {
//     backgroundColor: "#aaa",
//     color: "#eee",
//     border: "1px solid #aaa",
//   },
// });
