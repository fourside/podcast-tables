"use client";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../../../components/auth-context";
import { HeaderLayout } from "../../../components/header-layout";
import { ToastProvider } from "../../../components/toast";
import { getToday } from "../../../lib/day";
import type { ProgramPerDate } from "../../../models/program";
import { Menu } from "./menu";
import { ProgramColumns } from "./program-columns";
import classes from "./programs-page.module.css";

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

  const [activeDate, setActiveDate] = useState(getToday);

  const handleMenuClick = useCallback((date: string) => {
    setActiveDate(date);
  }, []);

  const dateList = props.programs.map((program) => program.date);

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
      <div className={classes.container}>
        <div className={classes.columnsSide}>
          <Menu title={props.stationId} dateList={dateList} activeDate={activeDate} onMenuClick={handleMenuClick} />
        </div>
        <ProgramColumns
          stationId={props.stationId}
          programPerDates={props.programs}
          user={authState.user}
          activeDate={activeDate}
        />
      </div>
    </HeaderLayout>
  );
};
