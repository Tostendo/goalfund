import { API_BASE_URL } from "../config/cms";
import _ from "lodash";

export const getAllCharities = async () => {
  const result = await fetch(`${API_BASE_URL}/charities?_limit=-1`);
  const data = await result.json();
  if (!data) {
    return [];
  }
  return data;
};
