import React from "react";
import styles from "./TittleOfGame.module.css";

export default function TittleOfGame(props) {
  return (
    <div className={styles.titleOfGame_mainContainer}>
      <div className={styles.team_container}>
        <img
          src={`https://countryflagsapi.com/png/${props.team1.nameEN}`}
          className={styles.flag_img}
          alt={props.team1.name}
        />
      </div>
      <span className={styles.teamName_span}>
        {props.team1.name.toUpperCase()}
      </span>
      <div className={styles.titleOfCompetition_container}>
        {props.currentGame.title}
      </div>
      <span className={styles.teamName_span}>
        {props.team2.name.toUpperCase()}
      </span>
      <div className={styles.team_container}>
        <img
          src={`https://countryflagsapi.com/png/${props.team2.nameEN}`}
          className={styles.flag_img}
          alt={props.team2.name}
        />
      </div>
    </div>
  );
}
