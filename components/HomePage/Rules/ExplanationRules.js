import React from "react";
import styles from "./Rules.module.css";

export default function ExplanationRules() {
  return (
    <div className={styles.rules_p}>
      <h3>Bienvenue sur CompoZ ! </h3>
      <p>
        Compoz est une application de football qui a pour but de se replonger
        dans les plus grands matchs historiques du monde du football et de
        retrouver leurs compositions !
      </p>
      <p>
        Vous pourrez ainsi retrouver des joueurs comme Zidane, Ronaldo ou encore
        Kylian Mbappé et même des joueurs que vous aviez complètement oubliés !
      </p>
      <p>Voici quelques détails concernant les règles du jeu :</p>
      <p>
        Le jeu se compose en deux blocs, un terrain avec les joueurs et les
        détails du jeu en cours.
      </p>
      <p>Appuyez sur le bouton commencer pour démarrer la partie.</p>
      <p>
        Sélectionnez un joueur en cliquant sur le maillot pour entrer son nom
        puis validez votre réponse.
      </p>
      <p>Quelques détails concernant le nom du joueur : </p>
      <li>Entrez uniquement le nom</li>
      <li>Les accents ne sont pas pris en compte</li>
      <li>30 % de fautes sur le nom est autorisé</li>
      <li>Deux lettres minimums</li>
      <p>
        Vous aurez des couleurs qui indiqueront le résultat de votre réponse :
      </p>
      <div className={styles.paragrapheWithExample_div}>
        <div
          className={styles.circleAnswerColor_div}
          style={{ backgroundColor: "#228b22" }}
        ></div>
        <div> = Joueur trouvé</div>
      </div>
      <div className={styles.paragrapheWithExample_div}>
        <div
          className={styles.circleAnswerColor_div}
          style={{ backgroundColor: "#ff9f40" }}
        ></div>
        <div className={styles.egal_div}> = </div>
        <div>
          <div>Mauvais Poste</div>
          <div>Joueur déjà trouvé</div>
        </div>
      </div>
      <div className={styles.paragrapheWithExample_div}>
        <div
          className={styles.circleAnswerColor_div}
          style={{ backgroundColor: "#ff4040" }}
        ></div>
        <div className={styles.egal_div}> = </div>
        <div>
          <div>Mauvais Joueur</div>
          <div>Joueur déjà essayé</div>
        </div>
      </div>
      <p>Un bon joueur vous donne 1 point</p>
      <p>Un mauvais joueur vous donne une erreur</p>
      <p>
        Vous devez trouver 22 joueurs pour 5 erreurs maximales, faites attention
        !
      </p>
      <p>
        Pour vous aidez des indices sont mis à votre disposition, vous en avez
        3.
      </p>
      <p>
        Pour utiliser un indice cliquez dessus puis sélectionnez un joueur, vous
        aurez ensuite le choix sur trois indices différents.
      </p>
      <p>Cliquez sur Résultat pour finir la partie !</p>
      <p>Bon courage et bon jeu à vous !</p>
    </div>
  );
}
