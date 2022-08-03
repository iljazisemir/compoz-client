import React, { useState } from "react";
import styles from "./Share.module.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

// SVG
import ClipboardSVG from "../../../SVG/ClipboardSVG";
import ClipboardCheckSVG from "../../../SVG/ClipboardCheckSVG";

export default function Share(props) {
  const [copySuccess, setCopySuccess] = useState(false);
  const textOfShare = `J'ai trouvé ${
    props.resultOfGame !== 0 ? props.resultOfGame : 0
  } / 22 joueurs sur CompoZ lors du match historique entre ${
    props.team1.name
  } et ${props.team2.name} en ${
    props.currentGame.title
  } ! Essaye de faire mieux !`;
  const url = `https://compoz.vercel.app/game/${props.currentGame.url}`;

  const handlerCopyToClipboard = (textOfShare) => {
    navigator.clipboard.writeText(textOfShare + " " + url);
    setCopySuccess(true);
  };
  return (
    <div className={styles.share_mainContainer}>
      <FacebookShareButton
        url={url}
        title={textOfShare}
        hashtag={"#CompoZ"}
        className={styles.share_container}
      >
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton
        url={url}
        title={textOfShare}
        hashtag={"#CompoZ"}
        className={styles.share_container}
      >
        <WhatsappIcon size={30} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url={url}
        title={textOfShare}
        hashtag={"#CompoZ"}
        className={styles.share_container}
      >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
      <button
        className={styles.share_container}
        onClick={() => handlerCopyToClipboard(textOfShare)}
      >
        {!copySuccess ? (
          <ClipboardSVG className={styles.clipboard_svg} />
        ) : (
          <ClipboardCheckSVG className={styles.clipboard_svg} />
        )}
      </button>
    </div>
  );
}
