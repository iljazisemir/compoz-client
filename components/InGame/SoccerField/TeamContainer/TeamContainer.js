import React from "react";
import styles from "./TeamContainer.module.css";

//COMPONENT
import Player from "../Player/Player";

export default function TeamContainer({
  team,
  playersToFind,
  setPlayersToFind,
}) {
  const createLineUp = () => {
    let composition;
    switch (team.composition) {
      case "4-4-2":
        return team.home
          ? (composition = styles.dom442)
          : (composition = styles.ext442);
      case "4-1-4-1":
        return team.home
          ? (composition = styles.dom4141)
          : (composition = styles.ext4141);
      case "4-2-3-1":
        return team.home
          ? (composition = styles.dom4231)
          : (composition = styles.ext4231);
      case "4-3-3":
        return team.home
          ? (composition = styles.dom433)
          : (composition = styles.ext433);
      case "4-4-1-1":
        return team.home
          ? (composition = styles.dom4411)
          : (composition = styles.ext4411);
      case "3-4-3":
        return team.home
          ? (composition = styles.dom343)
          : (composition = styles.ext343);
      case "5-3-2":
        return team.home
          ? (composition = styles.dom532)
          : (composition = styles.ext532);
      case "4-3-1-2":
        return team.home
          ? (composition = styles.dom4312)
          : (composition = styles.ext4312);
      case "4-2-2-2":
        return team.home
          ? (composition = styles.dom4222)
          : (composition = styles.ext4222);
      case "4-1-3-2":
        return team.home
          ? (composition = styles.dom4132)
          : (composition = styles.ext4132);
      default:
        return null;
    }
  };
  const placementOfPlayer = (player) => {
    return (
      (player.numberPosition === 1 && styles.n1) ||
      (player.numberPosition === 2 && styles.n2) ||
      (player.numberPosition === 3 && styles.n3) ||
      (player.numberPosition === 4 && styles.n4) ||
      (player.numberPosition === 5 && styles.n5) ||
      (player.numberPosition === 6 && styles.n6) ||
      (player.numberPosition === 7 && styles.n7) ||
      (player.numberPosition === 8 && styles.n8) ||
      (player.numberPosition === 9 && styles.n9) ||
      (player.numberPosition === 10 && styles.n10) ||
      (player.numberPosition === 11 && styles.n11)
    );
  };

  return (
    <div className={createLineUp()}>
      <Player
        playersToFind={playersToFind}
        setPlayersToFind={setPlayersToFind}
        team={team}
        placementOfPlayer={(player) => placementOfPlayer(player)}
      />
      <div className={team.home ? styles.cDom : styles.cExt}>
        {team.composition}
      </div>
      <div className={team.home ? styles.flag_team1 : styles.flag_team2}>
        <img
          src={`https://countryflagsapi.com/png/${team.nameEN}`}
          className={styles.flag_img}
          alt={team.name}
        />
      </div>
    </div>
  );
}
