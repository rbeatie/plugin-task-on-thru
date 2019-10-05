import React from "react";

const circlephoneSvgPath = (color) => (
  <div>
    <g
      transform="
          scale(.62)
        "
      width="42px"
      height="auto"
      fill="white"
    >
      <path
        id="PhoneSVG"
        d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"
      />
    </g>
    <g
    fill={color}
    >
      <path
        id="CircleCrossSVG"
        d="M27.314 4.686c-3.022-3.022-7.040-4.686-11.314-4.686s-8.292 1.664-11.314 4.686c-3.022 3.022-4.686 7.040-4.686 11.314s1.664 8.292 4.686 11.314c3.022 3.022 7.040 4.686 11.314 4.686s8.292-1.664 11.314-4.686c3.022-3.022 4.686-7.040 4.686-11.314s-1.664-8.292-4.686-11.314zM28 16c0 2.588-0.824 4.987-2.222 6.949l-16.727-16.727c1.962-1.399 4.361-2.222 6.949-2.222 6.617 0 12 5.383 12 12zM4 16c0-2.588 0.824-4.987 2.222-6.949l16.727 16.727c-1.962 1.399-4.361 2.222-6.949 2.222-6.617 0-12-5.383-12-12z"
      />
    </g>
  </div>
);
export const NoInterruptRed = () => (
  <svg id="icon-phone" height="100%" width="100%" viewBox="0 0 36 36">
    <title>NoInterruptRedIcon</title>
    {circlephoneSvgPath('red')}
  </svg>
);

export const NoInterruptGrey = () => (
  <svg id="icon-phone" height="100%" width="100%" viewBox="0 0 36 36">
    <title>NoInterruptGreyIcon</title>
    {circlephoneSvgPath('grey')}
  </svg>
);


export default circlephoneSvgPath()