import React, { useContext, useState, useEffect } from "react";
import styles from "./GameDetails.module.css";

// CONTEXTS
import { SettingsContext } from "../../../context/SettingsContext";

// COMPONENTS
import TittleOfGame from "./TitleOfGame/TittleOfGame";
import TabInCurrentGame from "./TabInGameDetails/TabInGameDetails";
import SummaryOfCurrentGame from "./SummaryOfCurrentGame/SummaryOfCurrentGame";
import ExplanationRules from "../../HomePage/Rules/ExplanationRules";

export default function GameDetails({ currentGame, playersToFindTeams }) {
  const settingsContextValue = useContext(SettingsContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentGameTab, setCurrentGameTab] = useState(true);
  const [rulesTab, setRulesTab] = useState(false);

  useEffect(() => {
    if (
      settingsContextValue.wrongAnswerCounter >= 5 ||
      settingsContextValue.correctPlayers.length === 22
    ) {
      settingsContextValue.setGameStarted(false);
      settingsContextValue.setEndOfGame(true);
    }
    if (settingsContextValue.wrongAnswerCounter === 4) {
      settingsContextValue.setSummaryOfGame([
        ...settingsContextValue.summaryOfGame,
        "Attention il vous reste une seule erreur possible !",
      ]);
    }
  }, [
    settingsContextValue.wrongAnswerCounter,
    settingsContextValue.correctPlayers,
  ]);

  return (
    <div className={styles.gameDetails_mainContainer}>
      <TittleOfGame
        team1={currentGame.teams[0]}
        team2={currentGame.teams[1]}
        currentGame={currentGame}
      />
      <TabInCurrentGame
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        currentGameTab={currentGameTab}
        setCurrentGameTab={setCurrentGameTab}
        rulesTab={rulesTab}
        setRulesTab={setRulesTab}
      />
      {currentGameTab && (
        <SummaryOfCurrentGame
          currentGame={currentGame}
          team1={currentGame.teams[0]}
          team2={currentGame.teams[1]}
          playersToFindTeams={playersToFindTeams}
        />
      )}
      {rulesTab && (
        <div className={styles.rules_container}>
          <ExplanationRules />
        </div>
      )}
    </div>
  );
}
