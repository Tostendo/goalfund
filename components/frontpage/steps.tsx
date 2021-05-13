import { ISteps } from "../../models/frontpage";

export const Steps = ({ content }: { content: ISteps }) => {
  return (
    <div>
      {content.steps.map((step, index) => {
        return (
          <div key={index} className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-start-2 col-span-2 flex lg:flex-row flex-col justify-start lg:text-left text-center md:my-4 my-8">
              <ProcessIcon step={index + 1} />
              <ProcessDescription
                headline={step.headline}
                description={step.description}
              />
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

const ProcessIcon = ({ step }: { step: number }) => {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="w-20 h-8 md:flex hidden justify-center">
        <div className="h-full border-dashed"></div>
      </div>
      <div className="rounded-full w-24 h-24 text-xl text-white bg-primary font-black flex justify-center items-center mb-6 shadow-lg">
        {step}
      </div>
    </div>
  );
};

const ProcessDescription = ({ headline, description }: any) => {
  return (
    <div className="px-8 flex flex-col justify-center rounded">
      <div className="md:text-2xl text-xl font-bold text-primary">
        {headline}
      </div>
      <div className="mt-4 text-primary">{description}</div>
    </div>
  );
};
