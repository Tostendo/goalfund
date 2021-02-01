import Head from "next/head";
import Layout from "../components/layout";
import Router from "next/router";
import { Testimonial } from "../components/testimonial";
import Icon from "../components/icon";

const PROCESS = [
  {
    headline: "Sign up as a player",
    description:
      "Amateur league football players sign up with Goalfund and select a charity to support.",
  },
  {
    headline: "Pledge as a supporter",
    description:
      "Goalfunders pledge donations per goal scored by their chosen players.",
  },
  {
    headline: "Score goals and raise money",
    description:
      "When players score in official amateur league matches, the funds raised by each goal are transferred by Goalfund to the player’s charity.",
  },
  {
    headline: "Compete against others",
    description:
      "Players compete to raise the most money in their teams, leagues, regions and countries.",
  },
];

const TESTIMONIALS = [
  {
    headline: "Really cool project",
    text:
      "It feels good to score goals and do something good at the same time. Ilove the challenge and I am happy for everybody who supports a charity through me. It is so easy.",
    authorName: "Thomas O.",
    authorImageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    headline: "Competitive socializing",
    text:
      "I love the competition. This here feels like a competition except that we are actually all aiming for the same goal: Collect as much money as possible for something good ",
    authorName: "Sholto W.",
    authorImageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    headline: "Mexicans for the win",
    text:
      "Enabling others with scoring goals to have a better life makes me score just more and more. ",
    authorName: "Oscar P.",
    authorImageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
];

const ProcessIcon = ({ step, last }: any) => {
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
    <div className="px-8 flex flex-col justify-center max-w-xl rounded">
      <div className="md:text-2xl text-xl font-bold text-primary">
        {headline}
      </div>
      <div className="mt-4 text-primary">{description}</div>
    </div>
  );
};

const Headline = ({ headline, subtext }: any) => {
  return (
    <div className="text-center">
      <p className="mt-24 mb-16 text-4xl leading-8 font-extrabold tracking-tight text-primary sm:text-5xl">
        {headline}
      </p>
      {subtext && (
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          {subtext}
        </p>
      )}
    </div>
  );
};

const CTA = ({ handleClick }: any) => {
  return (
    <button
      onClick={handleClick}
      className="mt-6 shadow-lg text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none border-green-400 hover:border-green-600 bg-green-400  hover:bg-green-600 text-white"
    >
      Become a goalfunder
    </button>
  );
};

export default function Home() {
  const handleClick = (e: any) => {
    e.stopPropagation();
    Router.push("/register");
  };

  return (
    <Layout inContainer={false}>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-full bg-cover bg-center bg-hero h-screen-2/3">
          <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
                Every goal matters
              </h1>
              <CTA handleClick={handleClick} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center m-auto">
          <Headline headline="How it works" />
          {PROCESS.map((step, index) => {
            return (
              <div className="flex md:flex-row flex-col justify-center md:text-left text-center md:my-4 my-8">
                <ProcessIcon
                  step={index + 1}
                  last={index + 1 === PROCESS.length}
                />
                <ProcessDescription
                  headline={step.headline}
                  description={step.description}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-32 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Headline headline="Our dream" />
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <div className="h-6 w-6">
                    <Icon type="goal" />
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-primary">
                  Goalfund is an interactive crowdfunding tool which offers an
                  easy and competitive way to raise funds for good causes.
                </dt>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <div className="h-6 w-6">
                    <Icon type="showUp" />
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-primary">
                  Our aim is to grow a global movement of amateur players and
                  their supporters *goalfunders* that can create positive
                  change, simply, by playing football.
                </dt>
              </div>
            </div>
          </dl>
        </div>
        <div className="mt-32 flex items-center flex-col max-w-screen-xl mx-auto px-4 sm:px-8">
          <Headline headline="What goalfunders say" />
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((testimonial) => {
              return (
                <Testimonial
                  key={testimonial.authorName}
                  testimonial={testimonial}
                />
              );
            })}
          </div>
        </div>
        <div className="my-16 max-w-screen-xl mx-auto text-center">
          <CTA handleClick={handleClick} />
        </div>
      </main>
    </Layout>
  );
}
