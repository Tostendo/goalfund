import Head from "next/head";
import { GetStaticPropsContext } from "next";
import Layout from "../components/layout";
import React from "react";
import { fetchAboutUsPage } from "../api/aboutUsPage";
import { IStrapiComponent } from "../models/strapi";
import { ITeaser } from "../models/common";
import { Teaser } from "../components/common/teaser";
import ReactMarkdown from "react-markdown";
import { ICharity } from "../models/charity";
import Link from "next/link";

interface IAboutUsPage extends IStrapiComponent {
  teaser: ITeaser;
  content: string;
}

export default function AboutUs({
  data,
  preview,
}: {
  data: IAboutUsPage;
  preview: boolean | null;
}) {
  return (
    <Layout inContainer={false} preview={preview}>
      <main>
        <div>
          {data.teaser && <Teaser content={data.teaser} />}
          {data.content && (
            <div className="max-w-screen-xl mx-auto p-8">
              <ReactMarkdown>{data.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const data = await fetchAboutUsPage();
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
