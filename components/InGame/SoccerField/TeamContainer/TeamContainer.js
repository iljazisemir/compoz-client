import React, { useContext, useEffect, useState } from "react";
import { isEmpty, toUpperCaseAndWithoutAccent } from "../../../Utils";
import styles from "./TeamContainerAndCompositions.module.css";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

// CONTEXTS
import SettingsContext from "../../../../context/SettingsContext";

// SVG
import JerseySvg from "../../../../styles/svg/JerseySVG";

export default function TeamContainer({
  team,
  playersToFind,
  setPlayersToFind,
}) {
  const settingsContextValue = useContext(SettingsContext);
  const [listOfWrongAnswers, setListOfWrongAnswers] = useState([]);

  const handleLineUp = () => {
    let composition;
    switch (team.composition) {
      case "4-4-2":
        return team.team1
          ? (composition = styles.dom442)
          : (composition = styles.ext442);
      case "4-1-4-1":
        return team.team1
          ? (composition = styles.dom4141)
          : (composition = styles.ext4141);
      case "4-2-3-1":
        return team.team1
          ? (composition = styles.dom4231)
          : (composition = styles.ext4231);
      case "4-3-3":
        return team.team1
          ? (composition = styles.dom433)
          : (composition = styles.ext433);
      case "4-4-1-1":
        return team.team1
          ? (composition = styles.dom4411)
          : (composition = styles.ext4411);
      default:
        return null;
    }
  };
  const handlerInputPlayer = (index) => (e) => {
    let newPlayersToFind = [...playersToFind];
    if (e.target.value.match("^[a-zA-Z-' ]*$") != null) {
      playersToFind[index].lastName = toUpperCaseAndWithoutAccent(
        e.target.value
      );
      setPlayersToFind(newPlayersToFind);
    }
  };
  const handleCheckWrongAnswer = (playerToFind, answerIsWrong) => {
    let newListOfWrongAnswers = [...listOfWrongAnswers];
    if (
      newListOfWrongAnswers &&
      newListOfWrongAnswers.find(
        (answer) => answer == playerToFind.lastName
      ) === undefined
    ) {
      newListOfWrongAnswers = [...newListOfWrongAnswers, playerToFind.lastName];
      answerIsWrong = true;
    } else {
      return false;
    }
    setListOfWrongAnswers(newListOfWrongAnswers);
  };
  const handleComparedPlayer = (team, playerToFind) => {
    let newPlayersToFind = [...playersToFind];
    let answerIsWrong = false;
    let playerAlreadyFound = false;
    for (const player in team.players) {
      if (
        // GOOD PLAYER BUT NOT RIGHT POSITION
        team.players[player].numberPosition !== playerToFind.numberPosition &&
        toUpperCaseAndWithoutAccent(team.players[player].lastName) ==
          toUpperCaseAndWithoutAccent(playerToFind.lastName) &&
        handleSpellCheck(
          toUpperCaseAndWithoutAccent(playerToFind.lastName),
          toUpperCaseAndWithoutAccent(team.players[player].lastName)
        )
      ) {
        playersToFind.map((p) => {
          if (
            p.numberPosition === team.players[player].numberPosition &&
            toUpperCaseAndWithoutAccent(team.players[player].lastName) ===
              toUpperCaseAndWithoutAccent(p.lastName)
          ) {
            playerAlreadyFound = true;
          }
          playerToFind.answer = "warning";
          playerToFind.answerColor = "#ff9f40";
          settingsContextValue.setSummaryOfGame([
            ...settingsContextValue.summaryOfGame,
            {
              answerColor: "#ff9f40",
              player: playerToFind.lastName,
              teamName: team.name,
              text: !playerAlreadyFound
                ? "Mauvais poste : "
                : "Joueur déjà trouvé : ",
            },
          ]);
        });
        answerIsWrong = false;
        break;
      } else if (
        // GOOD PLAYER
        toUpperCaseAndWithoutAccent(team.players[player].lastName) ==
          toUpperCaseAndWithoutAccent(playerToFind.lastName) &&
        team.players[player].numberPosition == playerToFind.numberPosition
      ) {
        playerToFind.answer = "correct";
        playerToFind.answerColor = "#228b22";
        settingsContextValue.setCorrectPlayers([
          ...settingsContextValue.correctPlayers,
          playerToFind,
        ]);
        settingsContextValue.setSummaryOfGame([
          ...settingsContextValue.summaryOfGame,
          {
            answerColor: "#228b22",
            player: playerToFind.lastName,
            teamName: team.name,
            text: "Joueur trouvé : ",
          },
        ]);
        answerIsWrong = false;
        break;
      }
      // LESS THAN 30% FAULTS
      else if (
        team.players[player].numberPosition === playerToFind.numberPosition &&
        handleSpellCheck(
          playerToFind.lastName,
          toUpperCaseAndWithoutAccent(team.players[player].lastName)
        )
      ) {
        playerToFind.answer = "correct";
        playerToFind.answerColor = "#228b22";
        playerToFind.lastName = toUpperCaseAndWithoutAccent(
          team.players[player].lastName
        );
        settingsContextValue.setCorrectPlayers([
          ...settingsContextValue.correctPlayers,
          playerToFind,
        ]);
        settingsContextValue.setSummaryOfGame([
          ...settingsContextValue.summaryOfGame,
          {
            answerColor: "#228b22",
            player: toUpperCaseAndWithoutAccent(team.players[player].lastName),
            teamName: team.name,
            text: "Joueur trouvé : ",
          },
        ]);
        answerIsWrong = false;
        break;
      } else if (
        // WRONG PLAYER
        toUpperCaseAndWithoutAccent(team.players[player].lastName) !==
          toUpperCaseAndWithoutAccent(playerToFind.lastName) &&
        team.players[player].numberPosition !== playerToFind.numberPosition
      ) {
        playerToFind.answer = "wrong";
        playerToFind.answerColor = "#ff4040";
        handleCheckWrongAnswer(playerToFind, answerIsWrong);
        // PLAYER ALREADY TRIED
        if (handleCheckWrongAnswer(playerToFind, answerIsWrong) == false) {
          settingsContextValue.setSummaryOfGame([
            ...settingsContextValue.summaryOfGame,
            {
              answerColor: "#ff4040",
              player: playerToFind.lastName,
              teamName: team.name,
              text: "Joueur déjà essayé : ",
            },
          ]);
          answerIsWrong = false;
        } else if (playerToFind.lastName.length < 2) {
          settingsContextValue.setSummaryOfGame([
            ...settingsContextValue.summaryOfGame,
            "Entrez deux lettres minimum.",
          ]);
          answerIsWrong = false;
        } else {
          settingsContextValue.setSummaryOfGame([
            ...settingsContextValue.summaryOfGame,
            {
              answerColor: "#ff4040",
              player: playerToFind.lastName,
              teamName: team.name,
              text: "Mauvais joueur : ",
            },
          ]);
          answerIsWrong = true;
        }
      }
    }
    if (answerIsWrong == true) {
      settingsContextValue.setWrongAnswerCounter(
        settingsContextValue.wrongAnswerCounter + 1
      );
      playerToFind.lastName = "";
      answerIsWrong = false;
    }
    if (
      (answerIsWrong == false && playerToFind.answer == "warning") ||
      (answerIsWrong == false && playerToFind.answer == "wrong")
    ) {
      playerToFind.lastName = "";
    }
    if (playerToFind.lastName == "") {
      playerToFind.answerColor = "#3BC68D";
    }

    setPlayersToFind(newPlayersToFind);
  };
  const handleSpellCheck = (playerToFind, thePlayer) => {
    console.log(playerToFind, thePlayer);
    let arrayOfPlayerToFindLettersChart = playerToFind.split("").sort();
    let arrayOfPlayerLettersChart = thePlayer.split("").sort();
    let numberOfFaults = 0;
    const playerNameLength = thePlayer.length;
    let newArrayOfPlayerToFindLettersChart = arrayOfPlayerToFindLettersChart;
    let newArrayOfPlayerLettersChart = arrayOfPlayerLettersChart;

    if (
      arrayOfPlayerLettersChart.length > arrayOfPlayerToFindLettersChart.length
    ) {
      for (
        let k = arrayOfPlayerToFindLettersChart.length;
        k < arrayOfPlayerLettersChart.length;
        k++
      ) {
        newArrayOfPlayerToFindLettersChart.push(".");
      }
      arrayOfPlayerToFindLettersChart = newArrayOfPlayerToFindLettersChart;
    }

    if (
      arrayOfPlayerLettersChart.length < arrayOfPlayerToFindLettersChart.length
    ) {
      for (
        let l = arrayOfPlayerLettersChart.length;
        l < arrayOfPlayerToFindLettersChart.length;
        l++
      ) {
        newArrayOfPlayerLettersChart.push(".");
      }
      arrayOfPlayerLettersChart = newArrayOfPlayerLettersChart;
    }

    for (let i = 0; i < arrayOfPlayerToFindLettersChart.length; i++) {
      let sameLetter = false;
      arrayOfPlayerLettersChart = newArrayOfPlayerLettersChart;
      for (let j = 0; j < newArrayOfPlayerLettersChart.length; j++) {
        if (
          arrayOfPlayerToFindLettersChart[i] == arrayOfPlayerLettersChart[j]
        ) {
          newArrayOfPlayerLettersChart.splice(j, 1);
          sameLetter = true;
        }
      }
      !sameLetter && numberOfFaults++;
    }

    if ((numberOfFaults / playerNameLength) * 100 <= 30) {
      return true;
    } else {
      return false;
    }
  };
  const handlerEnterKeyEventForComparedPlayer = (e, team, player) => {
    if (e && e.keyCode == 13) {
      handleComparedPlayer(team, player);
    }
  };
  const handlePlayerNumber = (player) => {
    let revealIsTrue = false;
    team.players.map((p) => {
      if (p.numberPosition == player.numberPosition) {
        if (p.reveal) {
          revealIsTrue = true;
        }
      }
    });
    if (player.answer == "correct" || settingsContextValue.endOfGame) {
      return team.players.map((p) => {
        if (p.numberPosition == player.numberPosition && revealIsTrue) {
          return (
            <span className={styles.playerNumber_container} key={uuidv4()}>
              {p.number}
            </span>
          );
        }
      });
    }
  };
  const handlerTargetPlayerForClue = (player) => {
    return team.players.map((p) => {
      if (
        p.numberPosition == player.numberPosition &&
        player.answer !== "correct"
      ) {
        settingsContextValue.clueActivated &&
          settingsContextValue.setTargetPlayer({
            target: true,
            team: team.name,
            numberPosition: p.numberPosition,
            firstLetter: Array.from(p.lastName)[0],
            number: p.number,
            club: p.club,
          });
      } else if (
        player.answer == "correct" &&
        settingsContextValue.clueActivated
      ) {
        settingsContextValue.setSummaryOfGame([
          ...settingsContextValue.summaryOfGame,
          "Joueur déjà trouvé, veuillez sélectionner un nouveau joueur.",
        ]);
      }
    });
  };
  const handlerTooltipPlayer = (player) => {
    return (
      <ReactTooltip
        id={player.lastName}
        textColor="#FFFFF"
        backgroundColor="#3BC68D"
        place="bottom"
      >
        <span>
          {!isEmpty(player.reveal)
            ? toUpperCaseAndWithoutAccent(player.lastName)
            : "CLIQUEZ POUR AFFICHER"}
        </span>
      </ReactTooltip>
    );
  };
  const handlerTooltipPlayerClues = (player) => {
    if (player.clues.length > 0) {
      return (
        <ReactTooltip
          id={player.lastName + player.numberPosition + team.name}
          textColor="white"
          backgroundColor="#ffd300"
          place="bottom"
        >
          <div className={styles.listOfClues_container}>
            {player.clues.map((playerClues) => (
              <span key={uuidv4()}>{playerClues.text + playerClues.clue}</span>
            ))}
          </div>
        </ReactTooltip>
      );
    }
  };
  const handlerRevealPlayer = (player) => {
    let newPlayersToFind = [...playersToFind];
    team.players.map((playerNotFound) => {
      if (player.numberPosition == playerNotFound.numberPosition) {
        if (settingsContextValue.endOfGame) {
          playerNotFound.reveal = true;
          setPlayersToFind(newPlayersToFind);
        }
      }
    });
  };
  // const inputStyle = (answer) => {

  // };

  return (
    <div className={handleLineUp()}>
      {!isEmpty(playersToFind) &&
        playersToFind.map((player, index) => {
          const handleFindPlayerPositionForGridArea = () => {
            return (
              (player.numberPosition == 1 && styles.n1) ||
              (player.numberPosition == 2 && styles.n2) ||
              (player.numberPosition == 3 && styles.n3) ||
              (player.numberPosition == 4 && styles.n4) ||
              (player.numberPosition == 5 && styles.n5) ||
              (player.numberPosition == 6 && styles.n6) ||
              (player.numberPosition == 7 && styles.n7) ||
              (player.numberPosition == 8 && styles.n8) ||
              (player.numberPosition == 9 && styles.n9) ||
              (player.numberPosition == 10 && styles.n10) ||
              (player.numberPosition == 11 && styles.n11)
            );
          };
          return (
            <div
              className={handleFindPlayerPositionForGridArea()}
              key={index}
              onClick={() => handlerRevealPlayer(player)}
            >
              <div className={styles.player_container}>
                {team.players.map((teamPlayer) => {
                  if (teamPlayer.numberPosition == player.numberPosition) {
                    return (
                      <span
                        className={styles.playerPosition_container}
                        key={uuidv4()}
                      >
                        {teamPlayer.position}
                      </span>
                    );
                  }
                })}
                {handlePlayerNumber(player)}
                <JerseySvg
                  className={styles.jersey_svg}
                  style={{ color: team.color }}
                  onClick={() => handlerTargetPlayerForClue(player)}
                />
                {settingsContextValue.gameStarted &&
                  (player.answer !== "correct" ? (
                    <>
                      <form name="loginBox" target="#here" method="post">
                        <input
                          type="text"
                          name="playerToFind"
                          style={{
                            backgroundColor:
                              player.answer &&
                              player.lastName.length > 0 &&
                              player.answerColor,
                          }}
                          className={
                            settingsContextValue.targetPlayer.target &&
                            settingsContextValue.targetPlayer.numberPosition ==
                              player.numberPosition &&
                            settingsContextValue.targetPlayer.team.toUpperCase() ==
                              team.name.toUpperCase()
                              ? styles.playerToFindNone_input
                              : styles.playerToFind_input
                          }
                          autoComplete="off"
                          onChange={handlerInputPlayer(index)}
                          value={player.lastName}
                          onKeyDown={(e) =>
                            handlerEnterKeyEventForComparedPlayer(
                              e,
                              team,
                              player
                            )
                          }
                          data-tip="Lovely colors!"
                          data-for={
                            player.lastName + player.numberPosition + team.name
                          }
                        />
                        <input type="submit" hidden />
                      </form>
                      {handlerTooltipPlayerClues(player)}
                    </>
                  ) : (
                    <>
                      <div
                        className={styles.playerWithAnswerColor_container}
                        style={{
                          backgroundColor: player.answer && player.answerColor,
                        }}
                        data-tip="Lovely colors!"
                        data-for={player.lastName}
                      >
                        {player.lastName}
                      </div>
                    </>
                  ))}
                {settingsContextValue.endOfGame &&
                  (player.answer == "correct" ? (
                    <div key={uuidv4()}>
                      <div
                        className={styles.playerWithAnswerColor_container}
                        style={{
                          backgroundColor: player.answer && player.answerColor,
                        }}
                        data-tip="Lovely colors!"
                        data-for={player.lastName}
                      >
                        {player.lastName}
                      </div>
                      {handlerTooltipPlayer(player)}
                    </div>
                  ) : (
                    team.players.map((playerNotFound) => {
                      if (
                        player.numberPosition == playerNotFound.numberPosition
                      ) {
                        return (
                          <div key={uuidv4()}>
                            <div
                              className={styles.playerWithAnswerColor_container}
                              style={{
                                backgroundColor: "#3BC68D",
                                filter: !playerNotFound.reveal
                                  ? "blur(2px)"
                                  : "none",
                              }}
                              data-tip="Lovely colors!"
                              data-for={playerNotFound.lastName}
                            >
                              {toUpperCaseAndWithoutAccent(
                                playerNotFound.lastName
                              )}
                            </div>
                            {handlerTooltipPlayer(playerNotFound)}
                          </div>
                        );
                      }
                    })
                  ))}
              </div>
            </div>
          );
        })}
      <div className={team.team1 ? styles.cDom : styles.cExt}>
        {team.composition}
      </div>
      <div className={team.team1 ? styles.flag_team1 : styles.flag_team2}>
        <img
          src={`https://countryflagsapi.com/png/${team.nameEN}`}
          className={styles.flag_img}
          alt={team.name}
        />
      </div>
    </div>
  );
}
