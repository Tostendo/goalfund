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
  charity?: any;
  stats?: any;
  goals?: number;
  minutesPlayed?: number;
  appearances?: number;
  money?: number;
};

export type PlayerUpdate = {
  image?: any;
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
