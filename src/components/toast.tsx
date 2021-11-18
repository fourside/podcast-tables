import { ClientPortal } from "./client-portal";
import styled, { keyframes } from "styled-components";

export const FADEOUT_TIME_MS = 4000;

type Level = "success" | "error";

export type ToastType = {
  text: string;
  level?: Level;
};

type Props = {
  toast: ToastType;
};

export const Toast: React.FC<Props> = ({ toast }) => {
  return (
    <ClientPortal selector="#toast">
      <_Toast level={toast.level ?? "success"}>{toast.text}</_Toast>
    </ClientPortal>
  );
};

const fadeout = keyframes({
  "0%": {
    top: "0",
    opacity: "0",
  },
  "90%": {
    opacity: "1",
  },
  "100%": {
    top: "32px",
    opacity: "0",
  },
});

const fadeoutDiv = styled.div`
  animation: ${fadeout} ${FADEOUT_TIME_MS / 1000}s infinite ease;
`;

const _Toast = styled(fadeoutDiv)(
  {
    position: "absolute",
    top: "32px",
    left: "calc(50% - 100px)",
    padding: "16px",
    width: "200px",
    borderRadius: "10px",
    textAlign: "center",
  },
  (props: { level: Level }) => {
    if (props.level === "success") {
      return {
        color: "rgb(0,100,0)",
        backgroundColor: "rgba(50,200,50,0.3)",
      };
    }
    return {
      color: "rgb(100,0,0)",
      backgroundColor: "rgba(250,100,100,0.3)",
    };
  }
);
