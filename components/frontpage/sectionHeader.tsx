import { ISectionHeader } from "../../models/frontpage";

export const SectionHeader = ({ content }: { content: ISectionHeader }) => {
  return (
    <div className="max-w-screen-xl mx-auto text-center">
      <p className="mt-24 mb-16 text-4xl leading-8 font-extrabold tracking-tight text-primary sm:text-5xl">
        {content.headline}
      </p>
      {content.subheadline && (
        <p className="mt-4 mb-8 max-w-2xl text-xl text-primary lg:mx-auto">
          {content.subheadline}
        </p>
      )}
    </div>
  );
};
