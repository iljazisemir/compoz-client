import React, { useState } from "react";
import styles from "./game.module.css";

// COMPONENTS
import Layout from "../../components/Layout";
import SoccerField from "../../components/InGame/SoccerField/SoccerField.js";
import GameDetails from "../../components/InGame/GameDetails/GameDetails.js";

export default function Game({ currentGame }) {
  const addPlayerInPlayersToFindArray = () => {
    let playersToFind = [];
    for (let i = 1; i <= 11; i++) {
      playersToFind.push({
        numberPosition: i,
        lastName: "",
        answer: "",
        answerColor: "",
        clues: [],
        reveal: false,
      });
    }
    return playersToFind;
  };

  const [playersToFindTeam1, setPlayersToFindTeam1] = useState(
    addPlayerInPlayersToFindArray
  );
  const [playersToFindTeam2, setPlayersToFindTeam2] = useState(
    addPlayerInPlayersToFindArray
  );

  const playersToFindTeams = {
    playersToFindTeam1,
    setPlayersToFindTeam1,
    playersToFindTeam2,
    setPlayersToFindTeam2,
  };

  return (
    <Layout title={`CompoZ | ${currentGame.title}`}>
      <div className={styles.gamePage_mainContainer}>
        <SoccerField
          currentGame={currentGame}
          playersToFindTeams={playersToFindTeams}
        />
        <GameDetails
          currentGame={currentGame}
          playersToFindTeams={playersToFindTeams}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.game;
  const res = await fetch(`${process.env.NEXT_APP_API_URL}/api/game`);
  const data = await res.json();

  const currentGame = data.find((game) => game.url === slug);

  return {
    props: {
      currentGame,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_APP_API_URL}/api/game`);
  const data = await res.json();

  const paths = data.map((item) => ({
    params: { game: item.url },
  }));

  return {
    paths,
    fallback: false,
  };
}
