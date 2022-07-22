import React from "react";

const JerseySvg = ({ className, style, onClick }) => {
  return (
    <svg
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      onClick={onClick}
      fill="currentColor"
    >
      <g>
        <path d="m350 132.3-29.227-53.551h58.453z" />
        <path d="m580.3 180.07-49.523 70h-0.003906c-1.668 2.2969-4.332 3.6641-7.1719 3.6758-1.8125-0.007812-3.5781-0.55859-5.0781-1.5742l-35.875-24.676v245c0 2.3203-0.92188 4.5469-2.5625 6.1875-1.6406 1.6406-3.8672 2.5625-6.1875 2.5625h-247.8c-4.8359 0-8.75-3.918-8.75-8.75v-245l-35 25.375c-1.5 1.0195-3.2656 1.5664-5.0781 1.5742-2.8398-0.011719-5.5039-1.3789-7.1719-3.6758l-49.523-70h-0.003906c-2.5547-3.6992-1.9531-8.7266 1.4023-11.723l99.227-87.5h2.625-0.003906c0.63672-0.10156 1.2891-0.10156 1.9258 0h75.949l41.477 75.949c1.4375 2.9375 4.4258 4.8008 7.6992 4.8008s6.2617-1.8633 7.6992-4.8008l40.602-78.75h75.949c0.63672-0.10156 1.2891-0.10156 1.9258 0h2.625l99.227 87.5h-0.003906c2.2617 1.4727 3.7344 3.8906 4.0078 6.5781 0.27344 2.6836-0.6875 5.3477-2.6055 7.2461z" />
      </g>
    </svg>
  );
};

export default JerseySvg;
