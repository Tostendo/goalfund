import { API_BASE_URL } from "../config/cms";

export const uploadImage = async (data: any) => {
  const upload = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: data,
  });
  return await upload.json();
};
