import React from "react";
import styles from "./Components.module.css";
import Link from "next/link";

// SVG
import LinkedInSVG from "../styles/svg/LinkedInSVG";
import GithubSVG from "../styles/svg/GithubSVG";

export default function Footer() {
  return (
    <div className={styles.footer_container}>
      <div className={styles.myInfo_container}>
        <span>Developed by ILJAZI SEMIR</span>
        <Link href={"https://www.linkedin.com/in/semir-iljazi-193ab51b8/"}>
          <a>
            <LinkedInSVG className={styles.svg} />
          </a>
        </Link>
        <Link href={"https://github.com/iljazisemir"}>
          <a>
            <GithubSVG className={styles.svg} />
          </a>
        </Link>
      </div>
      {/* <div>CONDITIONS D'UTILISATION | CONFIDENTIALITÉ | RESSOURCES</div> */}
    </div>
  );
}
