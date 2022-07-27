import React, { createContext, useState, useEffect } from "react";
import localStorage from "localStorage";

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
  const [clues, setClues] = useState({
    clue1: true,
    clue2: true,
    clue3: true,
  });
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
    clues,
    setClues,
    isMounted,
    setIsMounted,
  };

  // useEffect(() => {
  //   localStorage.setItem("settings", JSON.stringify(settingsContextValue));
  // }, [settingsContextValue]);

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsContextProvider };
