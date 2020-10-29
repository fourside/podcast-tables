import { getApiEndpoint } from "./env";
import { Station } from "./station";

export async function getStations() {
  const endpoint = getApiEndpoint();
  const url = `${endpoint}/stations`;
  const response = await fetch(url);
  const json = (await response.json()) as Station[];
  return json;
}
