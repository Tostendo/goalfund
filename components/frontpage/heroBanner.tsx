import { IHeroTeaser } from "../../models/frontpage";
import { CTA } from "./cta";

export const Hero = ({ content }: { content: IHeroTeaser }) => {
  return (
    <div
      style={{ backgroundImage: `url(${content.backgroundImage.url})` }}
      className="w-full bg-cover bg-center h-screen-2/3"
    >
      <div className="flex items-start py-16 justify-center h-full w-full bg-gray-900 bg-opacity-50">
        <div className="text-center">
          <h1 className="p-2 md:p-0 text-white text-4xl font-semibold uppercase md:text-5xl">
            {content.headline}
          </h1>
          <CTA content={content.cta} />
        </div>
      </div>
    </div>
  );
};
