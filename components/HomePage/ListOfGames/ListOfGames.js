import React from "react";
import styles from "./ListOfGames.module.css";
import Link from "next/link";

export default function ListOfGames({ currentGame }) {
  return (
    <Link href={`/game/${currentGame.url}`}>
      <a className={styles.game_container}>
        <div className={styles.top_container}>
          <div className={styles.team_container}>
            <img
              src={`https://countryflagsapi.com/png/${currentGame.teams[0].nameEN}`}
              className={styles.flag_img}
              alt={currentGame.teams[0].name}
            />
          </div>
          <span className={styles.vs_span}>VS</span>
          <div className={styles.team_container}>
            <img
              src={`https://countryflagsapi.com/png/${currentGame.teams[1].nameEN}`}
              className={styles.flag_img}
              alt={currentGame.teams[1].name}
            />
          </div>
        </div>
        <div className={styles.bottom_container}>{currentGame.year}</div>
      </a>
    </Link>
  );
}
