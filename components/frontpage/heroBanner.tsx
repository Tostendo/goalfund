import { IHeroTeaser } from "../../models/frontpage";
import { CTA } from "./cta";

export const Hero = ({ content }: { content: IHeroTeaser }) => {
  return (
    <div
      style={{ backgroundImage: `url(${content.backgroundImage.url})` }}
      className="w-full bg-cover bg-center h-screen-2/3"
    >
      <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
        <div className="text-center">
          <h1 className="text-white text-5xl font-semibold uppercase md:text-6xl">
            {content.headline}
          </h1>
          <CTA content={content.cta} />
        </div>
      </div>
    </div>
  );
};
