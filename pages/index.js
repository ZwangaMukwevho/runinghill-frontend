import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Word</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <h1 className={styles.title}>
            Welcome to the sentence making app{" "}
            <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing <code>pages/index.js</code>
          </p>
        </main>
      </Layout>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
