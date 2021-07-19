import React from "react";
import { IStrapiComponent } from "../models/strapi";
import CountUpNumber from "./common/countUpNumber";
import CountUps from "./frontpage/countUps";
import { CTA } from "./frontpage/cta";
import { Hero } from "./frontpage/heroBanner";
import { MissionStatement } from "./frontpage/missionStatement";
import { SectionHeader } from "./frontpage/sectionHeader";
import { Steps } from "./frontpage/steps";
import { Testimonials } from "./frontpage/testimonials";

interface PageProps {
  content: IStrapiComponent[];
}

export const renderComponent = (component: any) => {
  switch (component.__component) {
    case "frontpage.hero-teaser":
      return <Hero content={component} />;
    case "frontpage.section-header":
      return <SectionHeader content={component} />;
    case "frontpage.mission-statement":
      return <MissionStatement content={component} />;
    case "frontpage.steps":
      return <Steps content={component} />;
    case "frontpage.testimonials":
      return <Testimonials content={component} />;
    case "frontpage.mission-statement":
      return <MissionStatement content={component} />;
    case "frontpage.cta":
      return <CTA content={component} />;
    case "frontpage.count-ups":
      return <CountUps content={component} />;
    case "common.count-up-number":
      return <CountUpNumber content={component} />;
  }
};

export const PageContent = (props: PageProps) => {
  return (
    <div>
      {props.content.map((block, index) => {
        return <div key={index}>{renderComponent(block)}</div>;
      })}
    </div>
  );
};
