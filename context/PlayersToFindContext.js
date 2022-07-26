import React, { createContext, useState, useEffect } from "react";

const PlayersToFindContext = createContext();

const PlayersToFindContextProvider = ({ children }) => {
  const [playersToFindTeam1, setPlayersToFindTeam1] = useState([]);
  const [playersToFindTeam2, setPlayersToFindTeam2] = useState([]);

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

  useEffect(() => {
    setPlayersToFindTeam1(addPlayerInPlayersToFindArray());
    setPlayersToFindTeam2(addPlayerInPlayersToFindArray());
  }, []);

  const playersToFindContextValue = {
    playersToFindTeam1,
    setPlayersToFindTeam1,
    playersToFindTeam2,
    setPlayersToFindTeam2,
  };

  return (
    <PlayersToFindContext.Provider value={playersToFindContextValue}>
      {children}
    </PlayersToFindContext.Provider>
  );
};

export { PlayersToFindContext, PlayersToFindContextProvider };
