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
  searchTerm: string;
};

export const searchPlayers = async ({ searchTerm }: SearchData) => {
  if (!searchTerm) {
    const result = await fetch(`${API_BASE_URL}/players?_limit=10`);
    return await result.json();
  }
  const result = await fetch(
    `${API_BASE_URL}/players?name_contains=${searchTerm}`
  );
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
