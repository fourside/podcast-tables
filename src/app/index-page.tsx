"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { AuthProvider, useAuth } from "../components/auth-context";
import { HeaderLayout } from "../components/header-layout";
import { ToastProvider } from "../components/toast";
import type { Station } from "../models/station";
import classes from "./index-page.module.css";

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
      <h2 className={classes.title}>Stations</h2>
      <div className={classes.container}>
        <div className={classes.cardsContainer}>
          {props.stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </HeaderLayout>
  );
};


type StationCardProps = {
  station: Station;
};

const StationCard: FC<StationCardProps> = ({ station }) => {
  return (
    <div className={classes.cardContainer}>
      <Link href={`/programs/${station.id}`} className={classes.cardLink}>
        {station.name}
      </Link>
    </div>
  );
};
