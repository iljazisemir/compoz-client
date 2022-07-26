import React, { createContext, useState } from "react";

const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {
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
  const [clue1, setClue1] = useState(true);
  const [clue2, setClue2] = useState(true);
  const [clue3, setClue3] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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
    clue1,
    setClue1,
    clue2,
    setClue2,
    clue3,
    setClue3,
    isMounted,
    setIsMounted,
  };

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsContextProvider };
