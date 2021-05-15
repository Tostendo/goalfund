import { IStrapiImage } from "./strapi";

export interface ICharity {
  images: IStrapiImage[];
  name: string;
  description: string;
  link: string;
}
