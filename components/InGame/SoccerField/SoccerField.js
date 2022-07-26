import React, { useContext } from "react";
import styles from "./SoccerField.module.css";

// CONTEXTS
import TeamsContext from "../../../context/TeamsContext";
import { PlayersToFindContext } from "../../../context/PlayersToFindContext";

// COMPONENTS
import TeamContainer from "./TeamContainer/TeamContainer";

export default function SoccerField() {
  const teamsContextValue = useContext(TeamsContext);
  const playersToFindContextValue = useContext(PlayersToFindContext);

  return (
    <div className={styles.soccerField_mainContainer}>
      <TeamContainer
        team={teamsContextValue.team2}
        playersToFind={playersToFindContextValue.playersToFindTeam2}
        setPlayersToFind={playersToFindContextValue.setPlayersToFindTeam2}
      />
      <TeamContainer
        team={teamsContextValue.team1}
        playersToFind={playersToFindContextValue.playersToFindTeam1}
        setPlayersToFind={playersToFindContextValue.setPlayersToFindTeam1}
      />
    </div>
  );
}
