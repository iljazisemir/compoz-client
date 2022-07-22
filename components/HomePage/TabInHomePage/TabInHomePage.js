import React from "react";
import styles from "./TabInHomePage.module.css";

export default function TabInHomePage({
  openTabFunction,
  targetTab,
  children,
}) {
  return (
    <div
      className={targetTab ? styles.targetTab : styles.untargetTab}
      onClick={() => openTabFunction()}
    >
      {children}
    </div>
  );
}
