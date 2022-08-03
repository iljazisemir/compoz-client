import React, { useState } from "react";

import styles from "./GamesWrapper.module.css";

// COMPONENTS
import TabInHomePage from "../TabInHomePage/TabInHomePage";
import Game from "../Game/Game";

const COMPETITIONS = ["Coupe du Monde", "Euro"];

export default function GamesWrapper({ games }) {
  const [selectedCompetition, setSelectedCompetition] = useState(
    COMPETITIONS[0]
  );

  const filteredGames = games?.filter(
    (game) => game.competition === selectedCompetition
  );

  return (
    <div className={styles.mainComponent_container}>
      <div className={styles.top_container}>
        <div className={styles.listOfTab_container}>
          {COMPETITIONS.map((competition, index) => (
            <TabInHomePage
              key={competition}
              onTabClick={() => setSelectedCompetition(competition)}
              selectedTab={selectedCompetition === competition}
              COMPETITIONS={COMPETITIONS}
              index={index}
            >
              {competition}
            </TabInHomePage>
          ))}
        </div>
      </div>
      <div className={styles.listOfGames_mainContainer}>
        <div className={styles.listOfGames_container}>
          {filteredGames?.map((game) => (
            <Game key={game._id} currentGame={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
