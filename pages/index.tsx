import Head from "next/head";
import Layout from "../components/layout";
import Router from "next/router";

const ProcessIcon = ({ step, last }: any) => {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="w-28 h-12 md:flex hidden justify-center">
        <div className="h-full border-dashed"></div>
      </div>
      <div className="rounded-full w-12 h-12 text-xl font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
        {step}
      </div>
      <img
        alt="step2"
        className="w-28 h-28 rounded-full shadow my-6 object-scale-down"
        src="https://image.flaticon.com/icons/svg/1330/1330216.svg"
      />

      <div className="w-56 h-12 md:flex hidden justify-center">
        {!last && <div className="h-full border-r-4 border-dashed"></div>}
      </div>
    </div>
  );
};

const Headline = ({ headline, subtext }: any) => {
  return (
    <div className="lg:text-center">
      <p className="mt-24 mb-16 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
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

const Testimonial = () => {
  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">Amazing</h2>
        <p className="mt-2 text-gray-600">
          it feels good to score goals and do something good at the same time. I
          love the challenge and I am happy for everybody who supports a
          chairity through me. It is so easy.
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <a href="#" className="text-xl font-medium text-primary">
          John Doe
        </a>
      </div>
    </div>
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
              <button
                onClick={handleClick}
                className="mt-6 shadow-lg text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none border-green-400 hover:border-green-600 bg-green-400  hover:bg-green-600 text-white"
              >
                Become a goalfunder
              </button>
            </div>
          </div>
        </div>
        <div className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Headline headline="Mission" />
            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Competitive exchange rates
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      No hidden fees
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Transfers are instant
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Mobile notifications
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center m-auto">
          <Headline headline="How it works" />
          <div className="flex md:flex-row flex-col justify-center md:text-left text-center">
            <ProcessIcon step={1} />
            <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-teal-200">
              <div className="md:text-3xl text-xl font-bold text-teal-700">
                Find your best idea
              </div>
              <div className="mt-4 text-teal-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                facilis, voluptates error alias dolorem praesentium sit soluta
                iure incidunt labore explicabo eaque, quia architecto veritatis
                dolores, enim consequatur nihil ipsum.
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-center md:text-left text-center">
            <ProcessIcon step={2} />
            <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-orange-200">
              <div className="md:text-3xl text-xl font-bold text-orange-700">
                Find your team and collaborate
              </div>
              <div className="mt-4 text-orange-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                facilis, voluptates error alias dolorem praesentium sit soluta
                iure incidunt labore explicabo eaque, quia architecto veritatis
                dolores, enim consequatur nihil ipsum.
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col  justify-center md:text-left text-center">
            <ProcessIcon step={3} />
            <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded ">
              <div className="md:text-3xl text-xl font-bold ">
                Make a good plan and prepare tasks
              </div>
              <div className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                facilis, voluptates error alias dolorem praesentium sit soluta
                iure incidunt labore explicabo eaque, quia architecto veritatis
                dolores, enim consequatur nihil ipsum.
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col  justify-center md:text-left text-center">
            <ProcessIcon step={4} last />
            <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded ">
              <div className="md:text-3xl text-xl font-bold ">
                Execute, impletement your solution
              </div>
              <div className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                facilis, voluptates error alias dolorem praesentium sit soluta
                iure incidunt labore explicabo eaque, quia architecto veritatis
                dolores, enim consequatur nihil ipsum.
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Headline headline="What goalfunders say" />
          <div className="grid grid-cols-3 gap-4">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto text-center">
          <button
            onClick={handleClick}
            className="mt-6 shadow-lg text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none border-green-400 hover:border-green-600 bg-green-400  hover:bg-green-600 text-white"
          >
            Become a goalfunder
          </button>
        </div>
      </main>
    </Layout>
  );
}
