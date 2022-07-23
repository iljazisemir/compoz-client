import React, { useContext, useState } from "react";
import styles from "./GameDetails.module.css";

// CONTEXTS
import TeamsContext from "../../../context/TeamsContext";
import CurrentGameContext from "../../../context/CurrentGameContext";

// COMPONENTS
import TittleOfGame from "./TitleOfGame/TittleOfGame";
import TabInCurrentGame from "./TabInGameDetails/TabInGameDetails";
import SummaryOfCurrentGame from "./SummaryOfCurrentGame/SummaryOfCurrentGame";
import ExplanationRules from "../../HomePage/Rules/ExplanationRules";

export default function GameDetails() {
  const currentGameContextValue = useContext(CurrentGameContext);
  const teamsContextValue = useContext(TeamsContext);
  const [currentGameTab, setCurrentGameTab] = useState(true);
  const [rulesTab, setRulesTab] = useState(false);

  return (
    <div className={styles.gameDetails_mainContainer}>
      <TittleOfGame
        team1={teamsContextValue.team1}
        team2={teamsContextValue.team2}
        currentGame={currentGameContextValue.currentGame}
      />
      <TabInCurrentGame
        currentGameTab={currentGameTab}
        setCurrentGameTab={setCurrentGameTab}
        rulesTab={rulesTab}
        setRulesTab={setRulesTab}
      />
      {currentGameTab && (
        <SummaryOfCurrentGame
          currentGame={currentGameContextValue.currentGame}
          team1={teamsContextValue.team1}
          team2={teamsContextValue.team2}
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
