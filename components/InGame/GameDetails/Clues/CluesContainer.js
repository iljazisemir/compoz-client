import React, { useContext, useEffect, useState } from "react";
import styles from "./Clues.module.css";
import ReactTooltip from "react-tooltip";

// CONTEXTS
import { SettingsContext } from "../../../../context/SettingsContext";

export default function CluesContainer() {
  const settingsContextValue = useContext(SettingsContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (settingsContextValue.clueActivated) {
      settingsContextValue.setSummaryOfGame([
        ...settingsContextValue.summaryOfGame,
        "Sélectionnez un joueur sur le terrain.",
      ]);
    }
  }, [settingsContextValue.clueActivated]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlerChoiceOfClue = async (n) => {
    if (
      settingsContextValue.gameStarted &&
      settingsContextValue.endOfGame === false &&
      settingsContextValue.clueActivated === false
    ) {
      settingsContextValue.setClueActivated(true);
      if (n === 1)
        settingsContextValue.setClues({
          ...settingsContextValue.clues,
          clue1: false,
        });
      if (n === 2)
        settingsContextValue.setClues({
          ...settingsContextValue.clues,
          clue2: false,
        });
      if (n === 3)
        settingsContextValue.setClues({
          ...settingsContextValue.clues,
          clue3: false,
        });
    }
  };

  return (
    <>
      <div className={styles.listOfClues_container}>
        {settingsContextValue.clues.clue1 &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted ? (
          <div
            className={styles.clue_container}
            onClick={() => handlerChoiceOfClue(1)}
            data-tip="Lovely colors!"
            data-for="indice"
            data-text-color="black"
          >
            1
          </div>
        ) : (
          <div className={styles.clueActivated_container}>1</div>
        )}
        {settingsContextValue.clues.clue2 &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted ? (
          <div
            className={styles.clue_container}
            onClick={() => handlerChoiceOfClue(2)}
            data-tip="Lovely colors!"
            data-text-color="black"
            data-for="indice"
          >
            2
          </div>
        ) : (
          <div className={styles.clueActivated_container}>2</div>
        )}
        {settingsContextValue.clues.clue3 &&
        !settingsContextValue.endOfGame &&
        settingsContextValue.gameStarted ? (
          <div
            className={styles.clue_container}
            onClick={() => handlerChoiceOfClue(3)}
            data-tip="Lovely colors!"
            data-text-color="black"
            data-for="indice"
          >
            3
          </div>
        ) : (
          <div className={styles.clueActivated_container}>3</div>
        )}
      </div>
      {isMounted &&
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
