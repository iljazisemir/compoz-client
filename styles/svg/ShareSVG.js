import React from "react";

export default function ShareSVG(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      onClick={props.onClick}
      style={props.style}
      className={`bi bi-share-fill ${props.className}`}
      viewBox="0 0 16 16"
    >
      <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
    </svg>
  );
}
