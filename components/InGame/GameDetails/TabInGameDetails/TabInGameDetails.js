import React, { useContext } from "react";
import styles from "./TabInGameDetails.module.css";

// CONTEXTS
import SettingsContext from "../../../../context/SettingsContext";

export default function TabInCurrentGame(props) {
  const settingsContextValue = useContext(SettingsContext);
  const currentGameTabOpen = () => {
    props.setCurrentGameTab(true);
    props.setRulesTab(false);
  };

  const rulesTabOpen = () => {
    props.setCurrentGameTab(false);
    props.setRulesTab(true);
  };
  return (
    <div className={styles.tabInGameDetails_mainContainer}>
      <div
        className={props.currentGameTab ? styles.targetTab : styles.untargetTab}
        onClick={() => currentGameTabOpen()}
      >
        Jeu en cours
      </div>
      <div className={styles.spaceBetweenTab_div}></div>
      <div
        className={props.rulesTab ? styles.targetTab : styles.untargetTab}
        onClick={() => rulesTabOpen()}
      >
        Règles
      </div>
    </div>
  );
}
