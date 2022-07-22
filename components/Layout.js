import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import styles from "./Components.module.css";

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="CompoZ" />
        <link rel="icon" href="/soccerFieldIcon.png" />
        <title>{title}</title>
      </Head>
      <main className={styles.layout_mainContainer}>
        <Link href={"/"}>
          <a>
            <h1 className={styles.title}>CompoZ</h1>
          </a>
        </Link>
        {children}
        <Footer />
      </main>
    </div>
  );
}
