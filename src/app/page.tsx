import { Env } from "../lib/env";
import { stationArraySchema } from "../lib/schema";
import type { Station } from "../models/station";
import { IndexPage } from "./index-page";

export default async function Index() {
  const stations = await getStations();
  return <IndexPage stations={stations} />;
}

async function getStations(): Promise<Station[]> {
  const response = await fetch(`${Env.radikoResourceEndpoint}/stations.json`);
  const json = await response.json();
  return stationArraySchema.parse(json);
}
