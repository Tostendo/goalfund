import Router from "next/router";
import React from "react";
import { ITeaser } from "../../models/common";
import CustomButton from "../customButton";

export const Teaser = ({ content }: { content: ITeaser }) => {
  const clickHandler = () => {
    Router.push({
      pathname: content.buttonLink,
    });
  };

  return (
    <div
      style={{
        backgroundImage:
          content && content.backgroundImage
            ? `url(${content.backgroundImage.url})`
            : ``,
      }}
      className="w-full bg-cover bg-center h-96 bg-gray-900 bg-opacity-50"
    >
      <div className="h-full w-full bg-gray-900 bg-opacity-30">
        <div className="max-w-screen-xl mx-auto flex flex-col items-start justify-center h-full w-full p-8">
          <h1 className="text-white shadow-lg text-4xl font-bold uppercase md:text-5xl">
            {content.headline}
          </h1>
          {content.buttonLabel && (
            <CustomButton
              type="primary"
              label={content.buttonLabel}
              handleClick={clickHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
