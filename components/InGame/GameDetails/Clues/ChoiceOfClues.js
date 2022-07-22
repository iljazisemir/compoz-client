import React, { useContext } from "react";
import styles from "./Clues.module.css";

// CONTEXT
import PlayersToFindContext from "../../../../context/PlayersToFindContext";
import SettingsContext from "../../../../context/SettingsContext";
import TeamsContext from "../../../../context/TeamsContext";

export default function ChoiceOfClues() {
  const teamsContextValue = useContext(TeamsContext);
  const settingsContextValue = useContext(SettingsContext);
  const playersToFindContextValue = useContext(PlayersToFindContext);

  const handleClue = (targetElement, targetPlayer, playersToFindTeam) => {
    let clueText = "";
    if (targetElement == targetPlayer.firstLetter) {
      clueText = "Première lettre : ";
    } else if (targetElement == targetPlayer.number) {
      clueText = "Numéro du maillot : ";
    } else if (targetElement == targetPlayer.club) {
      clueText = "Club du joueur : ";
    }
    settingsContextValue.setSummaryOfGame([
      ...settingsContextValue.summaryOfGame,
      {
        answerColor: "#ffd300",
        player: targetElement,
        teamName: targetPlayer.team,
        text: clueText,
      },
    ]);
    playersToFindTeam.map((findPlayer) => {
      if (findPlayer.numberPosition === targetPlayer.numberPosition) {
        findPlayer.clues = [
          ...findPlayer.clues,
          { clue: targetElement, text: clueText },
        ];
      }
    });
    settingsContextValue.setClueActivated(false);
    settingsContextValue.setTargetPlayer({
      target: false,
      team: "",
      firstLetter: "",
      number: "",
      club: "",
    });
  };

  const handleChoiceOfClueIsAlreadyUsed = (
    targetElement,
    targetPlayer,
    playersToFindTeam,
    text
  ) => {
    let checkChoiceOfClueIsAlreadyUsed = false;
    playersToFindTeam.map((playerToFind) => {
      if (playerToFind.numberPosition === targetPlayer.numberPosition) {
        playerToFind.clues.map((clue) => {
          if (clue.clue == targetElement) {
            checkChoiceOfClueIsAlreadyUsed = true;
          }
        });
      }
    });
    return !checkChoiceOfClueIsAlreadyUsed ? (
      <div
        className={styles.choiceOfClue_container}
        onClick={() =>
          handleClue(targetElement, targetPlayer, playersToFindTeam)
        }
      >
        {targetElement == targetPlayer.firstLetter ? (
          <>
            <span className={styles.textFirstLetterInChoiceClue_span}>
              1<sup>re</sup>
            </span>
            <span>Lettre</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </div>
    ) : (
      <div className={styles.clueDisabled}>
        {targetElement == targetPlayer.firstLetter ? (
          <>
            <span className={styles.textFirstLetterInChoiceClue_span}>
              1<sup>re</sup>
            </span>
            <span>Lettre</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </div>
    );
  };

  return (
    <>
      {settingsContextValue.targetPlayer.target &&
        settingsContextValue.clueActivated && (
          <div className={styles.choiceOfClues_container}>
            <span className={styles.clues_choice}>Choix indice : </span>
            {handleChoiceOfClueIsAlreadyUsed(
              settingsContextValue.targetPlayer.firstLetter,
              settingsContextValue.targetPlayer,
              settingsContextValue.targetPlayer.team ==
                teamsContextValue.team1.name
                ? playersToFindContextValue.playersToFindTeam1
                : playersToFindContextValue.playersToFindTeam2,
              "1re Lettre"
            )}
            {handleChoiceOfClueIsAlreadyUsed(
              settingsContextValue.targetPlayer.number,
              settingsContextValue.targetPlayer,
              settingsContextValue.targetPlayer.team ==
                teamsContextValue.team1.name
                ? playersToFindContextValue.playersToFindTeam1
                : playersToFindContextValue.playersToFindTeam2,
              "N°"
            )}
            {handleChoiceOfClueIsAlreadyUsed(
              settingsContextValue.targetPlayer.club,
              settingsContextValue.targetPlayer,
              settingsContextValue.targetPlayer.team ==
                teamsContextValue.team1.name
                ? playersToFindContextValue.playersToFindTeam1
                : playersToFindContextValue.playersToFindTeam2,
              "Club"
            )}
          </div>
        )}
    </>
  );
}
