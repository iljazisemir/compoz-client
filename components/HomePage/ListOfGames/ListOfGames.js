import React from "react";
import styles from "./ListOfGames.module.css";
import Link from "next/link";

export default function ListOfGames({ currentGame }) {
  let team1;
  let team2;
  currentGame.teams.map((team) => {
    team.team1 ? (team1 = team) : (team2 = team);
  });

  return (
    <Link href={`/game/${currentGame.url}`}>
      <a className={styles.game_container}>
        <div className={styles.top_container}>
          <div className={styles.team_container}>
            <img
              src={`https://countryflagsapi.com/png/${team1.nameEN}`}
              className={styles.flag_img}
              alt={team1.name}
            />
          </div>
          <span className={styles.vs_span}>VS</span>
          <div className={styles.team_container}>
            <img
              src={`https://countryflagsapi.com/png/${team2.nameEN}`}
              className={styles.flag_img}
              alt={team2.name}
            />
          </div>
        </div>
        <div className={styles.bottom_container}>{currentGame.year}</div>
      </a>
    </Link>
  );
}
