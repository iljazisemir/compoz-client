import React from "react";
import styles from "./NameOfPlayerContainer.module.css";
import { toUpperCaseAndWithoutAccent } from "../../../Utils";

export default function NameContainerOfPlayer({ player, playerNotFound }) {
  return (
    <div
      className={styles.playerWithAnswerColor_container}
      style={
        !playerNotFound
          ? {
              backgroundColor: player.answer && player.answerColor,
            }
          : {
              backgroundColor: "#3BC68D",
              filter: !player.reveal ? "blur(2px)" : "none",
            }
      }
      data-tip="Lovely colors!"
      data-for={player.lastName}
    >
      {toUpperCaseAndWithoutAccent(player.lastName)}
    </div>
  );
}
