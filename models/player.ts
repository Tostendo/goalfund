import { ICharity } from "./charity";
import { IStrapiImage } from "./strapi";
import { ITeam } from "./team";

export type Player = {
  id: string;
  name: string;
  slug: string;
  profileUrl: string;
  image?: IStrapiImage[];
  position?: string;
  strongLeg?: string;
  description?: string;
  career?: string;
  team?: ITeam;
  teamName?: string;
  charity?: ICharity;
  stats?: any;
  goals?: number;
  minutesPlayed?: number;
  appearances?: number;
  money?: number;
};

export type PlayerUpdate = {
  image?: string;
  position?: string;
  strongLeg?: string;
  description?: string;
  career?: string;
  charity?: any;
};

export type PlayerSearchData = {
  searchTerm?: string;
  sortBy?: string;
  limit?: number;
};
