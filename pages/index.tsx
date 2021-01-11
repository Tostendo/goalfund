import Head from "next/head";
import Layout from "../components/layout";
import Router from "next/router";

export default function Home() {
  const handleClick = (e: any) => {
    e.stopPropagation();
    Router.push("/register");
  };
  return (
    <Layout>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center flex-wrap justify-around mt-8 lg:mt-16 lg:gap-0 gap-16">
        <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:gap-16 items-center">
          <div className="lg:p-0 p-4 w-48 h-auto lg:w-64 lg:h-auto">
            <img src="/img/goalfund_full_logo.png" />
          </div>
          <div className="flex items-center justify-start gap-4">
            <button
              onClick={handleClick}
              className="shadow-lg text-lg font-bold p-4 border rounded-lg focus:outline-none appearance-none bg-green-400  hover:bg-green-600 text-white"
            >
              Become a donor
            </button>
            <span>|</span>
            <a className="font-bold">How it works</a>
          </div>
        </div>
        <div className=" lg:p-0 p-4 w-full lg:w-1/2">
          <img src="/img/goal.svg" />
        </div>
      </main>
    </Layout>
  );
}
