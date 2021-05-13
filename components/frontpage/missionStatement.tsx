import { IMissionStatement } from "../../models/frontpage";

export const MissionStatement = ({
  content,
}: {
  content: IMissionStatement;
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${content.backgroundImage.url})` }}
      className="w-full bg-cover mt-16"
    >
      <div className="py-32 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12">
          <div className="col-start-3 col-span-8">
            <div className="text-2xl p-12 text-center text-white bg-primary rounded-lg bg-opacity-90">
              <div className="text-white pb-16 text-4xl sm:text-5xl">
                {content.headline}
              </div>
              <div>{content.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
