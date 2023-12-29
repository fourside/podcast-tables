import { Env } from "../lib/env";
import { RecordProgram } from "../models/record-program";
import { FirebaseUser } from "./auth-context";

export async function recordProgram(recordProgram: RecordProgram, user: FirebaseUser): Promise<void> {
  if (Env.writableUserMailAddress !== user?.email) {
    console.warn("user is not be able to record.");
    return;
  }
  await fetch("/api/queue", { method: "POST", body: JSON.stringify(recordProgram) });
}
