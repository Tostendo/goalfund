import { API_BASE_URL } from "../config/cms";

export const fetchAboutUsPage = async () => {
  const result = await fetch(`${API_BASE_URL}/about-us-page`);
  return await result.json();
};
