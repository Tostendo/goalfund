import { ICountUpNumber } from "../../models/common";
import { ICountUps } from "../../models/frontpage";
import CountUpNumber from "../common/countUpNumber";

const CountUps = ({ content }: { content: ICountUps }) => {
  return (
    <div
      style={{
        backgroundColor: `${content.backgroundColor}`,
        backgroundImage: content.backgroundImage
          ? `url(${content.backgroundImage.url})`
          : `none`,
      }}
      className="bg-cover"
    >
      <div className="grid grid-cols-1 py-16 px-8 md:px-0 gap-8 md:grid-cols-3 max-w-screen-xl mx-auto">
        {content.stats.map((entry: ICountUpNumber) => {
          return <CountUpNumber key={entry.id} content={entry} />;
        })}
      </div>
    </div>
  );
};

export default CountUps;
