import { IStrapiComponent, IStrapiImage } from "./strapi";

export interface ICTA extends IStrapiComponent {
  label: string;
  linkUrl: string;
}

export interface IHeroTeaser extends IStrapiComponent {
  backgroundImage: IStrapiImage;
  cta: ICTA;
  headline: string;
}

export interface ISectionHeader extends IStrapiComponent {
  headline: string;
  subheadline: string;
}

export interface ISteps extends IStrapiComponent {
  steps: IStep[];
}

export interface IStep extends IStrapiComponent {
  headline: string;
  description: string;
}

export interface IMissionStatement extends IStrapiComponent {
  backgroundImage: IStrapiImage;
  description: string;
  headline: string;
  boxColor: string;
  boxTextColor: string;
}

export interface ITestimonials extends IStrapiComponent {
  testimonials: ITestimonial[];
}

export interface ITestimonial extends IStrapiComponent {
  image: IStrapiImage;
  name: string;
  headline: string;
  copyText: string;
}
