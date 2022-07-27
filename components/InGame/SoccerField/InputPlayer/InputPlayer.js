import React, { useContext, useState, forwardRef } from "react";
import styles from "./InputPlayer.module.css";
import { toUpperCaseAndWithoutAccent } from "../../../Utils";
import ReactTooltip from "react-tooltip";

// CONTEXTS
import { SettingsContext } from "../../../../context/SettingsContext";

const InputPlayer = (
  { player, team, index, playersToFind, setPlayersToFind },
  ref
) => {
  const settingsContextValue = useContext(SettingsContext);
  const [listOfWrongAnswers, setListOfWrongAnswers] = useState([]);
  const handlerInputPlayer = (e, index) => {
    e.preventDefault();
    let newPlayersToFind = [...playersToFind];
    if (e.target.value.match("^[a-zA-Z-' ]*$") != null) {
      playersToFind[index].lastName = toUpperCaseAndWithoutAccent(
        e.target.value
      );
      setPlayersToFind(newPlayersToFind);
    }
  };
  const handlerTooltipPlayerClues = (player, index) => {
    if (
      player.clues.length > 0
      // || inputPlayerRef.current[index].focus()
    ) {
      return (
        <ReactTooltip
          id={player.lastName + player.numberPosition + team.name}
          textColor="white"
          backgroundColor="#ffd300"
          place="bottom"
        >
          <div className={styles.listOfClues_container}>
            {player.clues.map((playerClues, index) => (
              <span key={index}>{playerClues.text + playerClues.clue}</span>
            ))}
          </div>
        </ReactTooltip>
      );
    }
  };
  const handleComparedPlayer = (e, team, playerToFind) => {
    e.preventDefault();
    let newPlayersToFind = [...playersToFind];
    let answerIsWrong = false;
    let playerAlreadyFound = false;
    for (const player in team.players) {
      if (
        // GOOD PLAYER BUT NOT RIGHT POSITION
        team.players[player].numberPosition !== playerToFind.numberPosition &&
        toUpperCaseAndWithoutAccent(team.players[player].lastName) ===
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
        toUpperCaseAndWithoutAccent(team.players[player].lastName) ===
          toUpperCaseAndWithoutAccent(playerToFind.lastName) &&
        team.players[player].numberPosition === playerToFind.numberPosition
      ) {
        playerToFind.answer = "correct";
        playerToFind.answerColor = "#228b22";
        playerToFind.reveal = true;
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
        if (handleCheckWrongAnswer(playerToFind, answerIsWrong) === false) {
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
    if (answerIsWrong === true) {
      settingsContextValue.setWrongAnswerCounter(
        settingsContextValue.wrongAnswerCounter + 1
      );
      playerToFind.lastName = "";
      answerIsWrong = false;
    }
    if (
      (answerIsWrong === false && playerToFind.answer === "warning") ||
      (answerIsWrong === false && playerToFind.answer === "wrong")
    ) {
      playerToFind.lastName = "";
    }
    if (playerToFind.lastName === "") {
      playerToFind.answerColor = "#3BC68D";
    }

    setPlayersToFind(newPlayersToFind);
  };
  const handleCheckWrongAnswer = (playerToFind, answerIsWrong) => {
    let newListOfWrongAnswers = [...listOfWrongAnswers];
    if (
      newListOfWrongAnswers &&
      newListOfWrongAnswers.find(
        (answer) => answer === playerToFind.lastName
      ) === undefined
    ) {
      newListOfWrongAnswers = [...newListOfWrongAnswers, playerToFind.lastName];
      answerIsWrong = true;
    } else {
      return false;
    }
    setListOfWrongAnswers(newListOfWrongAnswers);
  };
  const handleSpellCheck = (playerToFind, thePlayer) => {
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
          arrayOfPlayerToFindLettersChart[i] === arrayOfPlayerLettersChart[j]
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

  return (
    <>
      <form action="" onSubmit={(e) => handleComparedPlayer(e, team, player)}>
        <input
          type="text"
          name="playerToFind"
          ref={(element) => {
            ref.current[index] = element;
          }}
          style={{
            backgroundColor:
              player.answer && player.lastName.length > 0 && player.answerColor,
          }}
          className={
            settingsContextValue.targetPlayer.target &&
            settingsContextValue.targetPlayer.numberPosition ===
              player.numberPosition &&
            settingsContextValue.targetPlayer.team.toUpperCase() ===
              team.name.toUpperCase()
              ? styles.playerToFindNone_input
              : styles.playerToFind_input
          }
          autoComplete="off"
          onChange={(e) => handlerInputPlayer(e, index)}
          value={player.lastName}
          data-tip="Lovely colors!"
          data-for={player.lastName + player.numberPosition + team.name}
        />
      </form>
      {handlerTooltipPlayerClues(player, index)}
    </>
  );
};

export default forwardRef(InputPlayer);
