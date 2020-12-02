import Head from "next/head";
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <img src="/img/goalfund_full_logo.png" alt="Goalfund" />
        <p className="description">Coming soon in 2021...</p>
      </main>
    </Layout>
  );
}
