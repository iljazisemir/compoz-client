import React from "react";
import styles from "./TabInHomePage.module.css";

export default function TabInHomePage({
  onTabClick,
  selectedTab,
  children,
  COMPETITIONS,
  index,
}) {
  return (
    <>
      <div
        className={selectedTab ? styles.targetTab : styles.untargetTab}
        onClick={() => onTabClick()}
      >
        {children}
      </div>
      <div
        className={
          COMPETITIONS[index + 1] !== undefined ? styles.marginTab_div : ""
        }
      ></div>
    </>
  );
}
