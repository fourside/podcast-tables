"use client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { AuthProvider, useAuth } from "../../../components/auth-context";
import { HeaderLayout } from "../../../components/header-layout";
import { ProgramColumns } from "../../../components/program-columns";
import { ToastProvider } from "../../../components/toast";
import type { ProgramPerDate } from "../../../models/program";

type Props = {
  programs: ProgramPerDate[];
  stationId: string;
};

export const ProgramsPage: FC<Props> = ({ programs, stationId }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Programs programs={programs} stationId={stationId} />
      </ToastProvider>
    </AuthProvider>
  );
};

type ProgramsProps = {
  programs: ProgramPerDate[];
  stationId: string;
};

const Programs: FC<ProgramsProps> = (props) => {
  const router = useRouter();
  const authState = useAuth();

  useEffect(() => {
    if (authState.type === "not_authenticated") {
      router.push("/signin");
    }
  }, [authState, router]);

  if (authState.type === "not_authenticated" || authState.type === "initialized") {
    return null;
  }
  return (
    <HeaderLayout user={authState.user}>
      <ProgramColumns stationId={props.stationId} programPerDates={props.programs} user={authState.user} />
    </HeaderLayout>
  );
};
