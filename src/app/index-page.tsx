"use client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { AuthProvider, useAuth } from "../components/auth-context";
import { HeaderLayout } from "../components/header-layout";
import { StationCards } from "../components/station-cards";
import { ToastProvider } from "../components/toast";
import type { Station } from "../models/station";

type Props = {
  stations: Station[];
};

export const IndexPage: FC<Props> = (props) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Index stations={props.stations} />
      </ToastProvider>
    </AuthProvider>
  );
};

type IndexProps = {
  stations: Station[];
};

const Index: FC<IndexProps> = (props) => {
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
      <h2 className="text-3xl text-center tracking-widest my-5">Stations</h2>
      <div className="max-w-[720px] min-h-screen mx-auto my-12">
        <StationCards stations={props.stations} />
      </div>
    </HeaderLayout>
  );
};
