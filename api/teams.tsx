import { API_BASE_URL } from "../config/cms";
import _ from "lodash";
import { ITeam } from "../models/team";
import { getPlayerDonations } from "./donations";
import { calculateSumOfPledges } from "../helpers/calculate";

export const getAllTeamSlugs = async () => {
  const result = await fetch(`${API_BASE_URL}/teams?_limit=-1`);
  const data = await result.json();
  const slugs = data.map((team: ITeam) => {
    if (!team.slug) {
      console.error(`team ${team.name} is missing slug.`);
    }
    return team.slug;
  });
  return _.filter(slugs, _.identity);
};

export const getTeamBySlug = async (slug: string) => {
  const result = await fetch(`${API_BASE_URL}/teams?slug=${slug}`);
  const team = await result.json();
  if (team && team.length) {
    const selected = team[0] as ITeam;
    if (selected.players && selected.players.length) {
      const all = await Promise.all(
        selected.players.map(async (player) => {
          const donations = await getPlayerDonations(player.id);
          return {
            ...player,
            goals: player.goals || 0,
            money: calculateSumOfPledges(player.goals, donations),
          };
        })
      );
      selected.players = all;
    }
    return selected;
  }
  if (team.length > 1) {
    console.info(`More than one team for slug ${slug}`);
  }
  return null;
};
