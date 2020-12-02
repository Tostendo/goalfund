import Head from 'next/head'
import Layout from '../components/layout/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Goalfund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <img src="/img/goalfund_full_logo.png" width="100%" alt="Goalfund" />


        <p className="description">
          Coming soon...
        </p>
      </main>

      <footer>
          Powered by{' '}
          <img src="/logo.png" alt="Goalfund" className="logo" />
      </footer>

      <style jsx>{`
        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .logo {
          height: 1em;
        }
      `}</style>
    </Layout>
  )
}
