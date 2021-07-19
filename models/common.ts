import { IStrapiComponent, IStrapiImage } from "./strapi";

export interface ITeaser extends IStrapiComponent {
  backgroundImage: IStrapiImage;
  headline: string;
  copy: string;
  buttonLink: string;
  buttonLabel: string;
}

export interface ICountUpNumber extends IStrapiComponent {
  name: string;
  number: number;
  description: string;
  color: string;
  backgroundColor: string;
}
