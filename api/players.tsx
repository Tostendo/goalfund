const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";

import { getPlayerDonations } from "./donations";
import { calculateSumOfPledges } from "../helpers/calculate";
import { Player, PlayerSearchData, PlayerUpdate } from "../models/player";

export const searchPlayers = async ({
  searchTerm,
  sortBy,
  limit,
}: PlayerSearchData) => {
  let query = `_limit=${limit ? limit : 10}`;
  if (searchTerm) {
    query += `&name_contains=${searchTerm}`;
  }
  if (sortBy) {
    query += `&_sort=${sortBy}`;
  }
  const result = await fetch(`${API_BASE_URL}/players?${query}`);
  const data = (await result.json()) as Player[];
  const all = data.map(async (player) => {
    const donations = await getPlayerDonations(player.id);
    return {
      ...player,
      money: calculateSumOfPledges(player.goals, donations),
    };
  });
  return Promise.all(all);
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

export const getPlayerByIdWithDonations = async (id: string) => {
  const player = await getPlayerById(id);
  const donations = await getPlayerDonations(player.id);
  return {
    ...player,
    money: calculateSumOfPledges(player.goals, donations),
  } as Player;
};

export const getPlayerById = async (id: string) => {
  const result = await fetch(`${API_BASE_URL}/players/${id}`);
  const player = await result.json();
  return player;
};

export const getPlayersByIds = async (ids: string[]) => {
  const query = ids.map((id) => `id_in=${id}`).join("&");
  const result = await fetch(`${API_BASE_URL}/players?${query}`);
  const data = (await result.json()) as Player[];
  const all = data.map(async (player) => {
    const donations = await getPlayerDonations(player.id);
    return {
      ...player,
      money: calculateSumOfPledges(player.goals, donations),
    };
  });
  return Promise.all(all);
};

export const getAllPlayerIds = async () => {
  const result = await fetch(`${API_BASE_URL}/players`);
  const data = await result.json();
  return data.map((player: Player) => player.id);
};
