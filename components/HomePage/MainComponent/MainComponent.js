import React, { useState } from "react";
import { isEmpty } from "../../Utils";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import styles from "./MainComponent.module.css";

// COMPONENTS
import TabInHomePage from "../TabInHomePage/TabInHomePage";
import ListOfGames from "../ListOfGames/ListOfGames";

export default function MainComponent({ games }) {
  const [worldCupTab, setWorldCupTab] = useState(true);
  const [euroCupTab, setEuroCupTab] = useState(false);

  const openWorldCupTab = () => {
    setWorldCupTab(true);
    setEuroCupTab(false);
  };

  const openEuroCupTab = () => {
    setWorldCupTab(false);
    setEuroCupTab(true);
  };

  return (
    <div className={styles.mainComponent_container}>
      <div className={styles.top_container}>
        <div className={styles.listOfTab_container}>
          <TabInHomePage
            openTabFunction={openWorldCupTab}
            targetTab={worldCupTab}
          >
            Coupe du Monde
          </TabInHomePage>
          <div className={styles.spaceBetweenTab_div}></div>
          <TabInHomePage
            openTabFunction={openEuroCupTab}
            targetTab={euroCupTab}
          >
            Euro
          </TabInHomePage>
        </div>
      </div>
      <div className={styles.listOfGames_mainContainer}>
        <div className={styles.listOfGames_container}>
          {!isEmpty(games) &&
            worldCupTab &&
            games.map((game) => {
              if (game.competition == "Coupe du Monde") {
                return <ListOfGames currentGame={game} key={uuidv4()} />;
              }
            })}
          {!isEmpty(games) &&
            euroCupTab &&
            games.map((game) => {
              if (game.competition == "Euro") {
                return <ListOfGames currentGame={game} key={uuidv4()} />;
              }
            })}
        </div>
      </div>
    </div>
  );
}
