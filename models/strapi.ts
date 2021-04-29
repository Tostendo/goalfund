export interface IStrapiComponent {
  __component: string;
  id: string;
}

export interface IStrapiImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  created_at: string;
  updated_at: string;
  formats: {
    thumbnail?: IStrapiImageFormat;
    large?: IStrapiImageFormat;
    medium?: IStrapiImageFormat;
    small?: IStrapiImageFormat;
  } | null;
}

export interface IStrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}
