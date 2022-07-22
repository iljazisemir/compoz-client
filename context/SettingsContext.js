import React from "react";

export default React.createContext({
  correctPlayers: [],
  setCorrectPlayers: (name) => {},
  wrongAnswerCounter: "",
  setWrongAnswerCounter: (name) => {},
  gameStarted: "",
  setGameStarted: (name) => {},
  endOfGame: "",
  setEndOfGame: (name) => {},
  summaryOfGame: [],
  setSummaryOfGame: (name) => {},
  targetPlayer: {},
  setTargetPlayer: (name) => {},
  clueActivated: "",
  setClueActivated: (name) => {},
});
