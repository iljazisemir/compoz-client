import axios from "axios";
import styles from "../styles/Home.module.css";

// COMPONENTS
import Layout from "../components/Layout";
import MainComponent from "../components/HomePage/MainComponent/MainComponent";
import Rules from "../components/HomePage/Rules/Rules";

export default function Home({ data }) {
  return (
    <>
      <Layout title="CompoZ">
        <div className={styles.homePage_mainContainer}>
          <MainComponent games={data} />
          <Rules />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.NEXT_APP_API_URL}/api/game`);

  return {
    props: {
      data: data || {},
    },
  };
}
