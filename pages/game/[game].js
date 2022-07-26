import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./game.module.css";

// CONTEXTS
import TeamsContext from "../../context/TeamsContext";
import CurrentGameContext from "../../context/CurrentGameContext";
import { PlayersToFindContextProvider } from "../../context/PlayersToFindContext";
import { SettingsContextProvider } from "../../context/SettingsContext";

// COMPONENTS
import Layout from "../../components/Layout";
import SoccerField from "../../components/InGame/SoccerField/SoccerField.js";
import GameDetails from "../../components/InGame/GameDetails/GameDetails.js";

export default function Game({ currentGame }) {
  const currentGameContextValue = {
    currentGame,
  };
  const teamsContextValue = {
    team1: currentGame.teams[0].team1
      ? currentGame.teams[0]
      : currentGame.teams[1],
    team2: currentGame.teams[1].team1
      ? currentGame.teams[0]
      : currentGame.teams[1],
  };

  return (
    <CurrentGameContext.Provider value={currentGameContextValue}>
      <TeamsContext.Provider value={teamsContextValue}>
        <PlayersToFindContextProvider>
          <SettingsContextProvider>
            <Layout title={`CompoZ | ${currentGame.title}`}>
              <div className={styles.gamePage_mainContainer}>
                <SoccerField />
                <GameDetails />
              </div>
            </Layout>
          </SettingsContextProvider>
        </PlayersToFindContextProvider>
      </TeamsContext.Provider>
    </CurrentGameContext.Provider>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.game;
  const { data } = await axios.get(`${process.env.NEXT_APP_API_URL}/api/game`);

  const currentGame = data.find((game) => game.url == slug);

  return {
    props: {
      currentGame,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.NEXT_APP_API_URL}/api/game`);

  const paths = data.map((item) => ({
    params: { game: item.url },
  }));

  return {
    paths,
    fallback: false,
  };
}
