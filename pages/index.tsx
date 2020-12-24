import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-20 h-screen flex items-center justify-center">
        <img src="/img/goalfund_full_logo.png" alt="Goalfund" />
      </main>
    </Layout>
  );
}
