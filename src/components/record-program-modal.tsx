import { FC } from "react";
import { useToast } from "../context/toast";
import { PostParams, postProgram } from "../lib/client";
import { Program } from "../lib/station";
import { unformatPostParams } from "../lib/util";
import { FirebaseUser } from "./auth-context";
import { Modal } from "./modal";
import { ProgramForm } from "./program-form";

type Props = {
  open: boolean;
  stationId: string;
  program: Program;
  user: FirebaseUser;
  onClose: () => void;
};

export const RecordProgramModal: FC<Props> = (props) => {
  const { setToast } = useToast();

  const handleSubmit = async (formatted: PostParams) => {
    const program = unformatPostParams(formatted);
    try {
      await postProgram(program, props.user);
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
