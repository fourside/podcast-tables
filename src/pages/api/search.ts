import type { NextApiRequest, NextApiResponse } from "next";
import { search } from "../../lib/search-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  const { key, page_idx } = req.query;
  if (key === undefined) {
    res.status(400).json({ message: "key parameter is required" });
    return;
  }
  const searchKey = Array.isArray(key) ? key[0] : key;
  const pageIndex = page_idx === undefined ? "" : Array.isArray(page_idx) ? page_idx[0] : page_idx;

  const json = await search({ key: searchKey, page_idx: pageIndex });
  res.status(200).json(json);
}
