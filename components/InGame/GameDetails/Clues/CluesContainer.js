import React, { useContext, useEffect, useState } from "react";
import styles from "./Clues.module.css";
import ReactTooltip from "react-tooltip";

// CONTEXTS
import { SettingsContext } from "../../../../context/SettingsContext";

export default function CluesContainer() {
  const settingsContextValue = useContext(SettingsContext);

  useEffect(() => {
    if (settingsContextValue.clueActivated) {
      settingsContextValue.setSummaryOfGame([
        ...settingsContextValue.summaryOfGame,
        "Sélectionnez un joueur sur le terrain.",
      ]);
    }
  }, [settingsContextValue.clueActivated]);

  useEffect(() => {
    settingsContextValue.setIsMounted(true);
  }, []);

  const handlerChoiceOfClue = async (n) => {
    if (
      settingsContextValue.gameStarted &&
      settingsContextValue.endOfGame === false &&
      settingsContextValue.clueActivated === false
    ) {
      settingsContextValue.setClueActivated(true);
      if (n === 1) settingsContextValue.setClue1(false);
      if (n === 2) settingsContextValue.setClue2(false);
      if (n === 3) settingsContextValue.setClue3(false);
    }
  };

  return (
    <>
      <div className={styles.listOfClues_container}>
        {settingsContextValue.clue1 &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted ? (
          <div
            className={styles.clue_container}
            onClick={() => handlerChoiceOfClue(1)}
            data-tip="Lovely colors!"
            data-for="indice"
          >
            1
          </div>
        ) : (
          <div className={styles.clueActivated_container}>1</div>
        )}
        {settingsContextValue.clue2 &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted ? (
          <div
            className={styles.clue_container}
            onClick={() => handlerChoiceOfClue(2)}
            data-tip="Lovely colors!"
            data-for="indice"
          >
            2
          </div>
        ) : (
          <div className={styles.clueActivated_container}>2</div>
        )}
        {settingsContextValue.clue3 &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted ? (
          <div
            className={styles.clue_container}
            onClick={() => handlerChoiceOfClue(3)}
            data-tip="Lovely colors!"
            data-for="indice"
          >
            3
          </div>
        ) : (
          <div className={styles.clueActivated_container}>3</div>
        )}
      </div>
      {settingsContextValue.isMounted &&
        !settingsContextValue.clueActivated &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted && (
          <ReactTooltip
            id="indice"
            textColor="white"
            backgroundColor="#ffd300"
            place="bottom"
          >
            <span>INDICE</span>
          </ReactTooltip>
        )}
    </>
  );
}
