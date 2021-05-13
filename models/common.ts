import { IStrapiComponent, IStrapiImage } from "./strapi";

export interface ITeaser extends IStrapiComponent {
  backgroundImage: IStrapiImage;
  headline: string;
  copy: string;
  buttonLink: string;
  buttonLabel: string;
}
