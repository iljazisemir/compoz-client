import styles from "../styles/Home.module.css";

// COMPONENTS
import Layout from "../components/Layout";
import GamesWrapper from "../components/HomePage/GamesWrapper/GamesWrapper";
import Rules from "../components/HomePage/Rules/Rules";

export default function Home({ data }) {
  return (
    <>
      <Layout title="CompoZ">
        <div className={styles.homePage_mainContainer}>
          <GamesWrapper games={data} />
          <Rules />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_APP_API_URL}/api/game`);
  const data = await res.json();

  return {
    props: {
      data: data || {},
    },
  };
}
