const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";

export const fetchHomepage = async () => {
  const result = await fetch(`${API_BASE_URL}/homepage`);
  return await result.json();
};
