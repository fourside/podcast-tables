import { getStations } from "../lib/client";
import { IndexPage } from "./index-page";

export default async function Index() {
  const stations = await getStations();
  return <IndexPage stations={stations} />;
}
