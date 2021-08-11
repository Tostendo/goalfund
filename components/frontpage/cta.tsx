import Router from "next/router";
import { ICTA } from "../../models/frontpage";

export const CTA = ({ content }: { content: ICTA }) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    Router.push(content.linkUrl);
  };
  return (
    <div className="my-4 max-w-screen-xl mx-auto text-center">
      <button
        onClick={handleClick}
        className="mt-6 shadow-lg text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none border-green-400 hover:border-green-600 bg-green-400  hover:bg-green-600 text-white"
      >
        {content.label}
      </button>
    </div>
  );
};
