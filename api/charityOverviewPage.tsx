import { API_BASE_URL } from "../config/cms";

export const fetchCharityOverviewPage = async () => {
  const result = await fetch(`${API_BASE_URL}/charity-overview-page`);
  return await result.json();
};
