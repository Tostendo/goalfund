import { ICountUpNumber } from "../../models/common";
import ReactMarkdown from "react-markdown";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const CountUpNumber = ({ content }: { content: ICountUpNumber }) => {
  return (
    <div
      style={{
        backgroundColor: `${
          content.backgroundColor ? content.backgroundColor : "transparent"
        }`,
        opacity: 0.85,
      }}
    >
      <div className="flex flex-col p-12 gap-6 items-center">
        <div
          style={{
            color: `${content.color}`,
          }}
          className="font-bold text-7xl md:text-8xl"
        >
          <CountUp end={content.number}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        </div>
        {content.name && (
          <div
            style={{ color: `${content.color}` }}
            className="font-bold text-2xl md:text-3xl"
          >
            {content.name.toUpperCase()}
          </div>
        )}
        {content.description && (
          <div
            style={{ color: `${content.color}` }}
            className="text-center font-bold text-l md:text-xl"
          >
            <ReactMarkdown>{content.description}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountUpNumber;
