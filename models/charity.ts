import { IStrapiImage } from "./strapi";

export type Charity = {
  images: IStrapiImage[];
  name: string;
  description: string;
  link: string;
};
