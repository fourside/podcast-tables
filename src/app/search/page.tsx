import { search } from "../../lib/search-client";
import { SearchPage } from "./search-page";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
  const key = searchParams["key"];
  const page_idx = searchParams["page_idx"];

  if (key === undefined) {
    return <SearchPage searchPrograms={[]} />;
  }

  const searchKey = Array.isArray(key) ? key[0] : key;
  const pageIndex = Array.isArray(page_idx) ? page_idx[0] : page_idx;
  const programResponse = await search({ key: searchKey, page_idx: pageIndex });
  const searchPrograms = programResponse.data.map((data) => ({
    station_id: data.station_id,
    title: data.title,
    performer: data.performer,
    start_time: data.start_time,
    end_time: data.end_time,
    info: data.info,
  }));

  return <SearchPage searchPrograms={searchPrograms} meta={programResponse.meta} />;
}
