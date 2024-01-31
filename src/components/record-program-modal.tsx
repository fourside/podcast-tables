import type { FC } from "react";
import type { Program } from "../models/program";
import type { RecordProgram } from "../models/record-program";
import type { FirebaseUser } from "./auth-context";
import { Modal } from "./modal";
import { ProgramForm } from "./program-form";
import { useToast } from "./toast";

type Props = {
  open: boolean;
  stationId: string;
  program: Program;
  user: FirebaseUser;
  onClose: () => void;
};

export const RecordProgramModal: FC<Props> = (props) => {
  const { setToast } = useToast();

  const handleSubmit = async (program: RecordProgram) => {
    try {
      await recordProgram(program, props.user);
      setToast({ text: "OK" });
    } catch (err) {
      if (err instanceof Error) {
        setToast({ text: `ERROR: ${err.message}`, level: "error" });
        console.error(err);
      } else {
        throw err;
      }
    }
    props.onClose();
  };

  return (
    <Modal isOpen={props.open} onClose={props.onClose}>
      <ProgramForm stationId={props.stationId} program={props.program} onSubmit={handleSubmit} />
    </Modal>
  );
};

async function recordProgram(recordProgram: RecordProgram, user: FirebaseUser): Promise<void> {
  if (user.email === null) {
    throw new Error("not has email");
  }
  await fetch("/api/queue", {
    method: "POST",
    headers: { "x-login-user": user.email },
    body: JSON.stringify(recordProgram),
  });
}
