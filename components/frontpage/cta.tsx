import Router from "next/router";
import { ICTA } from "../../models/frontpage";

export const CTA = ({ content }: { content: ICTA }) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    Router.push(content.linkUrl);
  };
  return (
    <div className="max-w-screen-xl mx-auto text-center">
      <button
        onClick={handleClick}
        className="text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none border-accent75 hover:border-accent bg-accent75  hover:bg-accent text-white"
      >
        {content.label}
      </button>
    </div>
  );
};
