import { IStrapiImage } from "./strapi";

export interface ICharity {
  id: string;
  images: IStrapiImage[];
  name: string;
  description: string;
  link: string;
}
