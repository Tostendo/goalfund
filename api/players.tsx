const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";

export type Player = {
  id: string;
  name: string;
  profileUrl: string;
  image?: any[];
  position?: string;
  strongLeg?: string;
  description?: string;
  career?: string;
  team?: any;
  charity?: any;
  stats?: any;
  goals?: number;
  minutesPlayed?: number;
  appearances?: number;
};

type PlayerUpdate = {
  image?: any;
  position?: string;
  strongLeg?: string;
  description?: string;
  career?: string;
  charity?: any;
};

type SearchData = {
  searchTerm?: string;
  sortBy?: string;
  limit?: number;
};

export const searchPlayers = async ({
  searchTerm,
  sortBy,
  limit,
}: SearchData) => {
  let query = `_limit=${limit ? limit : 10}`;
  if (searchTerm) {
    query += `&name_contains=${searchTerm}`;
  }
  if (sortBy) {
    query += `&_sort=${sortBy}`;
  }
  const result = await fetch(`${API_BASE_URL}/players?${query}`);
  return await result.json();
};

export const updatePlayer = async (
  playerId: string,
  updateData: PlayerUpdate
) => {
  const update = await fetch(`${API_BASE_URL}/players/${playerId}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await update.json();
};

export const getPlayerById = async (id: string) => {
  const result = await fetch(`${API_BASE_URL}/players/${id}`);
  return await result.json();
};

export const getAllPlayerIds = async () => {
  const result = await fetch(`${API_BASE_URL}/players`);
  const data = await result.json();
  return data.map((player: Player) => player.id);
};
