import { API_BASE_URL } from "../config/cms";

export const fetchHomepage = async () => {
  const result = await fetch(`${API_BASE_URL}/homepage`);
  return await result.json();
};
