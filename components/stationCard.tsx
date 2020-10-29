import Link from "next/link";
import { Station } from "../lib/station";
import styles from "./stationCard.module.css";

type Props = {
  station: Station;
};

export const StationCard: React.FC<Props> = ({ station }) => {
  return (
    <div className={styles.stationCard}>
      <Link href={`/${station.id}`}>
        <a className={styles.stationCardLink}>{station.name}</a>
      </Link>
    </div>
  )
}
