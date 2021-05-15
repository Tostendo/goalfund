import Head from "next/head";
import { GetStaticPropsContext } from "next";
import Layout from "../components/layout";
import React from "react";
import { fetchCharityOverviewPage } from "../api/charityOverviewPage";
import { IStrapiComponent } from "../models/strapi";
import { ITeaser } from "../models/common";
import { Teaser } from "../components/common/teaser";
import ReactMarkdown from "react-markdown";
import { ICharity } from "../models/charity";
import Link from "next/link";

interface ICharityOverviewPage extends IStrapiComponent {
  Teaser: ITeaser;
  description: string;
  charities: any[];
}

interface CharityTeaserProps {
  charity: ICharity;
  reversed: boolean;
}

const CharityTeaser = (props: CharityTeaserProps) => {
  return (
    <div
      className={
        props.reversed
          ? `flex flex-col justify-between items-center md:flex-row-reverse`
          : `flex flex-col md:flex-row justify-between items-center`
      }
    >
      <div className="m-8 p-8 md:w-1/3 h-auto">
        <img src={props.charity.images[0].url} />
      </div>
      <div className="md:w-2/3 flex flex-grow-2 flex-col justify-start m-8">
        <h2 className="font-bold text-2xl">{props.charity.name}</h2>
        <ReactMarkdown>{props.charity.description}</ReactMarkdown>
        {props.charity.link && (
          <div className="w-32 my-6">
            <Link href={props.charity.link}>Read more</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CharityOveview({
  data,
  preview,
}: {
  data: ICharityOverviewPage;
  preview: boolean | null;
}) {
  return (
    <Layout inContainer={false} preview={preview}>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Teaser content={data.Teaser} />
          {data.description && (
            <div className="max-w-screen-xl mx-auto p-8">
              <ReactMarkdown>{data.description}</ReactMarkdown>
            </div>
          )}
          <div className="max-w-screen-xl mx-auto">
            {data.charities.map((charity: any, idx: number) => {
              return (
                <CharityTeaser
                  charity={charity}
                  key={idx}
                  reversed={idx % 2 === 0}
                />
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const data = await fetchCharityOverviewPage();
    return {
      props: {
        data,
        preview: context.preview || null,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}
