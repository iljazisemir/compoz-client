import React, { useContext, useRef } from "react";
import { toUpperCaseAndWithoutAccent } from "../../../Utils";
import styles from "./Player.module.css";
import ReactTooltip from "react-tooltip";

// CONTEXT
import { SettingsContext } from "../../../../context/SettingsContext";

// COMPONENT
import InputPlayer from "../InputPlayer/InputPlayer";
import NameOfPlayerContainer from "../NameOfPlayerContainer/NameOfPlayerContainer";

// SVG
import JerseySvg from "../../../SVG/JerseySVG";

export default function Player({
  playersToFind,
  setPlayersToFind,
  team,
  placementOfPlayer,
}) {
  const settingsContextValue = useContext(SettingsContext);
  const inputPlayerRef = useRef([]);

  const showPLayerNumber = (player) => {
    if (player.answer === "correct" || settingsContextValue.endOfGame) {
      return team.players.map((p) => {
        if (p.numberPosition === player.numberPosition) {
          if (p.reveal) {
            return (
              <span className={styles.playerNumber_container} key={p._id}>
                {p.number}
              </span>
            );
          }
        }
      });
    }
  };
  const handlerTargetPlayerForClue = (player) => {
    return team.players.map((p) => {
      if (
        p.numberPosition === player.numberPosition &&
        player.answer !== "correct"
      ) {
        settingsContextValue.clueActivated &&
          settingsContextValue.setTargetPlayer({
            target: true,
            team: team.name,
            numberPosition: p.numberPosition,
            firstLetter: Array.from(p.lastName)[0],
            firstName: p.firstName,
            club: p.club,
          });
      } else if (
        player.answer === "correct" &&
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
          {player.reveal
            ? toUpperCaseAndWithoutAccent(player.lastName)
            : "CLIQUEZ POUR AFFICHER"}
        </span>
      </ReactTooltip>
    );
  };
  const handlerRevealPlayer = (player) => {
    let newPlayersToFind = [...playersToFind];
    team.players.map((playerNotFound) => {
      if (player.numberPosition === playerNotFound.numberPosition) {
        if (settingsContextValue.endOfGame) {
          playerNotFound.reveal = true;
          setPlayersToFind(newPlayersToFind);
        }
      }
    });
  };
  const handleClickFocusInput = (index, player) => {
    settingsContextValue.gameStarted &&
      !settingsContextValue.clueActivated &&
      player.answer !== "correct" &&
      inputPlayerRef.current[index].focus();
  };

  const cursorPlayer =
    !settingsContextValue.gameStarted && !settingsContextValue.endOfGame
      ? "default"
      : "pointer";
  return (
    <>
      {playersToFind?.map((player, index) => {
        return (
          <div
            className={placementOfPlayer(player)}
            key={index}
            onClick={
              settingsContextValue.endOfGame
                ? () => handlerRevealPlayer(player)
                : () => handleClickFocusInput(index, player)
            }
          >
            <div
              className={styles.player_container}
              style={{ cursor: cursorPlayer }}
            >
              {team.players.map((teamPlayer) => {
                if (teamPlayer.numberPosition === player.numberPosition) {
                  return (
                    <span
                      className={styles.playerPosition_container}
                      key={teamPlayer._id}
                    >
                      {teamPlayer.position}
                    </span>
                  );
                }
              })}
              {team.players.map((p) => {
                if (
                  p.numberPosition === player.numberPosition &&
                  player.reveal
                ) {
                  return (
                    <span className={styles.playerNumber_container} key={p._id}>
                      {p.number}
                    </span>
                  );
                }
              })}
              {showPLayerNumber(player)}
              <JerseySvg
                className={styles.jersey_svg}
                style={{ color: team.color }}
                onClick={() => handlerTargetPlayerForClue(player)}
              />
              {settingsContextValue.gameStarted &&
                (player.answer !== "correct" ? (
                  <InputPlayer
                    playersToFind={playersToFind}
                    setPlayersToFind={setPlayersToFind}
                    player={player}
                    team={team}
                    index={index}
                    ref={inputPlayerRef}
                  />
                ) : (
                  <NameOfPlayerContainer
                    player={player}
                    playerNotFound={false}
                  />
                ))}
              {settingsContextValue.endOfGame &&
                (player.answer === "correct" ? (
                  <div key={index}>
                    <NameOfPlayerContainer
                      player={player}
                      playerNotFound={false}
                    />
                    {handlerTooltipPlayer(player)}
                  </div>
                ) : (
                  team.players.map((playerNotFound) => {
                    if (
                      player.numberPosition === playerNotFound.numberPosition
                    ) {
                      return (
                        <div key={playerNotFound._id}>
                          <NameOfPlayerContainer
                            player={playerNotFound}
                            playerNotFound={true}
                          />
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
    </>
  );
}
