import Head from "next/head";
import Layout from "../components/layout";
import Router from "next/router";
import { Testimonial } from "../components/testimonial";
import { fetchHomepage } from "../api/homepage";
import {
  IHeroTeaser,
  IMissionStatement,
  ISteps,
  ITestimonials,
  ISectionHeader,
  IFrontpage,
  ICTA,
} from "../models/frontpage";

const renderComponent = (component: any) => {
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
  }
};

const MissionStatement = ({ content }: { content: IMissionStatement }) => {
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

const Testimonials = ({ content }: { content: ITestimonials }) => {
  return (
    <div className="mt-32 flex items-center flex-col max-w-screen-xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {content.testimonials.map((testimonial) => {
          return (
            <Testimonial key={testimonial.name} testimonial={testimonial} />
          );
        })}
      </div>
    </div>
  );
};

const Hero = ({ content }: { content: IHeroTeaser }) => {
  return (
    <div
      style={{ backgroundImage: `url(${content.backgroundImage.url})` }}
      className="w-full bg-cover bg-center h-screen-2/3"
    >
      <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
        <div className="text-center">
          <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
            {content.headline}
          </h1>
          <CTA content={content.cta} />
        </div>
      </div>
    </div>
  );
};

const Steps = ({ content }: { content: ISteps }) => {
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

const SectionHeader = ({ content }: { content: ISectionHeader }) => {
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

const CTA = ({ content }: { content: ICTA }) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    Router.push(content.linkUrl);
  };
  return (
    <div className="my-16 max-w-screen-xl mx-auto text-center">
      <button
        onClick={handleClick}
        className="mt-6 shadow-lg text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none border-green-400 hover:border-green-600 bg-green-400  hover:bg-green-600 text-white"
      >
        {content.label}
      </button>
    </div>
  );
};

export default function Home({ data }: { data: IFrontpage }) {
  return (
    <Layout inContainer={false}>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {data.content.map((el, idx) => (
          <div key={idx}>{renderComponent(el)}</div>
        ))}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetchHomepage();
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}
