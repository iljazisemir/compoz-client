import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./game.module.css";

// CONTEXTS
import TeamsContext from "../../context/TeamsContext";
import CurrentGameContext from "../../context/CurrentGameContext";
import PlayersToFindContext from "../../context/PlayersToFindContext";
import SettingsContext from "../../context/SettingsContext";

// COMPONENTS
import Layout from "../../components/Layout";
import SoccerField from "../../components/InGame/SoccerField/SoccerField.js";
import GameDetails from "../../components/InGame/GameDetails/GameDetails.js";

export default function Game({ currentGame }) {
  const [playersToFindTeam1, setPlayersToFindTeam1] = useState([
    {
      numberPosition: 1,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 2,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 3,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 4,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 5,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 6,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 7,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 8,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 9,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 10,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 11,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
  ]);
  const [playersToFindTeam2, setPlayersToFindTeam2] = useState([
    {
      numberPosition: 1,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 2,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 3,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 4,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 5,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 6,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 7,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 8,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 9,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 10,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
    {
      numberPosition: 11,
      lastName: "",
      answer: "",
      answerColor: "",
      clues: [],
      reveal: false,
    },
  ]);
  const [correctPlayers, setCorrectPlayers] = useState([]);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [endOfGame, setEndOfGame] = useState(false);
  const [summaryOfGame, setSummaryOfGame] = useState([]);
  const [targetPlayer, setTargetPlayer] = useState({
    target: false,
    team: "",
    numberPosition: "",
    firstLetter: "",
    number: "",
    club: "",
  });
  const [clueActivated, setClueActivated] = useState(false);

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
  const playersToFindContextValue = {
    playersToFindTeam1,
    setPlayersToFindTeam1,
    playersToFindTeam2,
    setPlayersToFindTeam2,
  };
  const settingsContextValue = {
    correctPlayers,
    setCorrectPlayers,
    wrongAnswerCounter,
    setWrongAnswerCounter,
    gameStarted,
    setGameStarted,
    endOfGame,
    setEndOfGame,
    summaryOfGame,
    setSummaryOfGame,
    targetPlayer,
    setTargetPlayer,
    clueActivated,
    setClueActivated,
  };

  useEffect(() => {
    if (wrongAnswerCounter >= 5 || correctPlayers.length == 22) {
      setGameStarted(false);
      setEndOfGame(true);
    }
    if (wrongAnswerCounter == 4) {
      setSummaryOfGame([
        ...summaryOfGame,
        "Attention il vous reste une seule erreur possible !",
      ]);
    }
  }, [wrongAnswerCounter, correctPlayers]);

  return (
    <CurrentGameContext.Provider value={currentGameContextValue}>
      <TeamsContext.Provider value={teamsContextValue}>
        <PlayersToFindContext.Provider value={playersToFindContextValue}>
          <SettingsContext.Provider value={settingsContextValue}>
            <Layout title={`CompoZ | ${currentGame.title}`}>
              <div className={styles.gamePage_mainContainer}>
                <SoccerField />
                <GameDetails />
              </div>
            </Layout>
          </SettingsContext.Provider>
        </PlayersToFindContext.Provider>
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
