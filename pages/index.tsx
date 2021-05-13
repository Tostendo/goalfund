import Head from "next/head";
import { GetStaticPropsContext } from "next";
import Layout from "../components/layout";
import { fetchHomepage } from "../api/homepage";
import React from "react";
import { PageContent } from "../components/pageContent";
import { IStrapiComponent } from "../models/strapi";

interface IFrontpage {
  id: string;
  content: IStrapiComponent[];
}

export default function Home({
  data,
  preview,
}: {
  data: IFrontpage;
  preview: boolean | null;
}) {
  return (
    <Layout inContainer={false} preview={preview}>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContent content={data.content} />
      </main>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const data = await fetchHomepage();
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
