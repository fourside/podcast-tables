import Link from "next/link";
import { Station } from "../lib/station";

type Props = {
  stations: Station[];
};

export const StationCards: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-y-6 gap-x-4">
      {props.stations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
};

type StationCardProps = {
  station: Station;
};

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  return (
    <div className="w-[200px] h-[100px] py-8 px-4 flex justify-center items-center rounded-xl border border-slate-200 shadow-md cursor-pointer">
      <Link href={`/programs/${station.id}`} passHref>
        <a className="text-center text-slate-700 font-bold leading-4">{station.name}</a>
      </Link>
    </div>
  );
};
