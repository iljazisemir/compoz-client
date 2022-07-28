import React from "react";
import ExplanationRules from "./ExplanationRules";
import styles from "./Rules.module.css";

export default function Rules() {
  return (
    <div className={styles.rules_mainContainer}>
      <div className={styles.top_container}>RÈGLES</div>
      <ExplanationRules />
    </div>
  );
}
