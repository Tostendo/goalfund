import { Player } from "./player";
import { IStrapiImage } from "./strapi";

export interface ITeam {
  coach?: string;
  name: string;
  description: string;
  players: Player[];
  profileUrl: string;
  id: string;
  slug: string;
  images: IStrapiImage[];
}
