import React from "react";
import styles from "./SoccerField.module.css";

// COMPONENTS
import TeamContainer from "./TeamContainer/TeamContainer";

export default function SoccerField({ currentGame, playersToFindTeams }) {
  return (
    <div className={styles.soccerField_mainContainer}>
      <TeamContainer
        team={currentGame.teams[1]}
        playersToFind={playersToFindTeams.playersToFindTeam2}
        setPlayersToFind={playersToFindTeams.setPlayersToFindTeam2}
      />
      <TeamContainer
        team={currentGame.teams[0]}
        playersToFind={playersToFindTeams.playersToFindTeam1}
        setPlayersToFind={playersToFindTeams.setPlayersToFindTeam1}
      />
    </div>
  );
}
