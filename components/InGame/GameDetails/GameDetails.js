import React, { useContext, useState } from "react";
import styles from "./GameDetails.module.css";

// CONTEXTS
import TeamsContext from "../../../context/TeamsContext";
import CurrentGameContext from "../../../context/CurrentGameContext";

// COMPONENTS
import TittleOfGame from "./TitleOfGame/TittleOfGame";
import TabInCurrentGame from "./TabInGameDetails/TabInGameDetails";
import SummaryOfCurrentGame from "./SummaryOfCurrentGame/SummaryOfCurrentGame";

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
        <div className="container h-5/6 bg-emerald-500 bg-opacity-50 p-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          praesentium repellat quidem possimus iure sed, totam maxime, incidunt
          ducimus vero illum tenetur laudantium aperiam accusantium beatae
          accusamus ratione, eligendi reprehenderit unde enim quasi a provident
          doloremque at! Commodi dignissimos quam impedit aperiam non placeat
          temporibus asperiores minima in! Reiciendis, quia?
        </div>
      )}
    </div>
  );
}
