import Items from "itemsjs";

import { SearchResult } from "../models/search";
// eslint-disable-next-line import/no-unresolved
import searchData from "../static_data/searchIndex.json";

export interface ISearchIndexQuery {
  query?: string;
  page?: number;
  sort?: string;
}

export interface ISearchIndex {
  search: (query: ISearchIndexQuery) => SearchResult;
}

let searchIndex: ISearchIndex;

export function getIndex(): ISearchIndex {
  if (!searchIndex) {
    searchIndex = Items(searchData.players, {
      searchableFields: ["name", "teamName"],
      sortings: {
        name_asc: {
          field: "name",
          order: "asc",
        },
      },
    });
  }

  return searchIndex;
}

export function search(query: ISearchIndexQuery): SearchResult {
  const start = Date.now();

  const localQuery = query;
  // full-text search
  getIndex();
  const indexDone = Date.now();
  const result = searchIndex.search({ ...localQuery, sort: "name_asc" });
  const searchDone = Date.now();
  console.log("index time [ms]:", indexDone - start);
  console.log("search time [ms]:", searchDone - indexDone);
  return result;
}
