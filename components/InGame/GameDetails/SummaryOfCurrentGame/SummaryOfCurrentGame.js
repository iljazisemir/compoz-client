import React, { useContext, useEffect, useState } from "react";
import styles from "./SummaryOfCurrentGame.module.css";
import { isEmpty, dateParser } from "../../../Utils.js";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

// CONTEXTS
import SettingsContext from "../../../../context/SettingsContext";

// COMPONENTS
import CluesContainer from "../Clues/CluesContainer";
import ChoiceOfClues from "../Clues/ChoiceOfClues";

// SVG
import HomeSVG from "../../../../styles/svg/HomeSVG";
import ReplaySVG from "../../../../styles/svg/ReplaySVG";
import ShareSVG from "../../../../styles/svg/ShareSVG";
import Share from "../Share/Share";
import TrophySVG from "../../../../styles/svg/TrophySVG";

export default function SummaryOfCurrentGame({ currentGame, team1, team2 }) {
  const settingsContextValue = useContext(SettingsContext);
  const [openShare, setOpenShare] = useState(false);

  // SCROLLBAR
  useEffect(() => {
    var element = document.querySelector("#gameActionList_id");
    element.scrollTop = element.scrollHeight;
  });

  const handlerStartGame = () => {
    settingsContextValue.setGameStarted(true);

    settingsContextValue.setSummaryOfGame([
      ...settingsContextValue.summaryOfGame,
      "Le match commence !",
    ]);
  };

  const handlerEndOfGame = () => {
    settingsContextValue.setEndOfGame(true);
    settingsContextValue.setGameStarted(false);
    settingsContextValue.setClueActivated(false);

    settingsContextValue.setSummaryOfGame([
      ...settingsContextValue.summaryOfGame,
      "Fin du jeu !",
      "Vous avez trouvé " +
        settingsContextValue.correctPlayers.length +
        " / 22 joueurs.",
    ]);
  };

  return (
    <div className={styles.summary_mainContainer}>
      <div className={styles.top_mainContainer}>
        <div
          className={
            settingsContextValue.gameStarted
              ? styles.correctAnswerCounter_container
              : styles.correctAnswerCounterDisabled_container
          }
        >
          {settingsContextValue.correctPlayers.length} / 22
        </div>
        <CluesContainer />
        <div
          className={
            settingsContextValue.gameStarted
              ? styles.wrongAnswerCounter_container
              : styles.wrongAnswerCounterDisabled_container
          }
        >
          {settingsContextValue.wrongAnswerCounter} / 5
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.gameActionList_container} id={"gameActionList_id"}>
        {isEmpty(settingsContextValue.summaryOfGame) &&
          !settingsContextValue.gameStarted && (
            <div className={styles.resume_container}>
              <div>
                <span>Compétition : {currentGame.competition}</span>
                <TrophySVG className={styles.svgInResume} />
              </div>
              <span>Date : {dateParser(currentGame.date)}</span>
              <div>
                <span>Stade : {currentGame.stadium}</span>
              </div>
              <div>
                <span>Lieu : {currentGame.localisation}</span>
                <img
                  src={`https://countryflagsapi.com/png/${currentGame.localisationEN}`}
                  className={styles.flagOfLocalisation_img}
                  alt={currentGame.localisationEN}
                />
              </div>
              <span>
                Score : {team1.name} {currentGame.score} {team2.name}
              </span>
              <span>{currentGame.resume}</span>
            </div>
          )}
        {!isEmpty(settingsContextValue.summaryOfGame) &&
          settingsContextValue.summaryOfGame.map((action) => {
            return typeof action === "object" ? (
              <div
                className={styles.summaryOfGameForObject_container}
                key={uuidv4()}
              >
                <div
                  className={styles.circleAnswerColor_div}
                  style={{ backgroundColor: action.answerColor }}
                ></div>
                <span
                  className={styles.textInSummary_span}
                  style={{
                    color:
                      action.teamName == team1.name ? team1.color : team2.color,
                  }}
                >
                  {action.teamName.toUpperCase()}
                </span>
                <div className={styles.textInSummary_span}>
                  - {action.text.toUpperCase()}
                </div>
                <span
                  className={styles.textInSummary_span}
                  style={{ color: action.answerColor }}
                >
                  {action.player}
                </span>
              </div>
            ) : (
              <div key={uuidv4()}>{action}</div>
            );
          })}
        <ChoiceOfClues />
      </div>
      <div className={styles.bottom_mainContainer}>
        <div className={styles.line}></div>
        <div className={styles.bottom_container}>
          {settingsContextValue.endOfGame ? (
            <div className={styles.endGame_container}>
              <div
                className={styles.svg_container}
                onClick={() => setOpenShare(!openShare)}
              >
                <ShareSVG className={styles.svg} />
              </div>
              {openShare && (
                <Share
                  resultOfGame={settingsContextValue.correctPlayers.length}
                  currentGame={currentGame}
                  team1={team1}
                  team2={team2}
                />
              )}
              <div
                className={styles.svg_container}
                onClick={() => window.location.reload()}
              >
                <ReplaySVG className={styles.svg} />
              </div>
              <Link href="/">
                <a className={styles.svg_container}>
                  <HomeSVG className={styles.svg} />
                </a>
              </Link>
            </div>
          ) : !settingsContextValue.gameStarted ? (
            <button
              className={styles.eventGame_button}
              onClick={() => handlerStartGame()}
            >
              COMMENCER
            </button>
          ) : (
            <button
              className={styles.eventGame_button}
              onClick={() => handlerEndOfGame()}
            >
              RÉSULTAT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
