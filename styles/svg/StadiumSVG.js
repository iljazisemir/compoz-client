import React from "react";

export default function ShareSVG(props) {
  //   return (
  // <svg
  //   version="1.1"
  //   id="Capa_1"
  //   xmlns="http://www.w3.org/2000/svg"
  //   xmlns:xlink="http://www.w3.org/1999/xlink"
  //   x="0px"
  //   y="0px"
  //   viewBox="0 0 415.506 415.506"
  //   style="enable-background:new 0 0 415.506 415.506;"
  //   xml:space="preserve"
  // >
  //   <path
  //     d="M383.272,110.52l0.002-0.646l-3.484-0.011l-0.086,27.448c-8.281-6.856-17.703-12.51-26.766-17.017
  // c-23.309-11.592-48.772-18.684-74.508-23.022l0.041-13.047c12.619-10.885,23.938,5.021,32.303-10.692
  // c-19.652,0.258-15.338-11.771-32.234-10.734l0.002-0.646l-3.484-0.011l-0.109,34.548c-6.285-0.999-12.58-1.838-18.861-2.541
  // c-35.063-3.924-70.861-3.619-105.82,1.212c-3.229,0.446-6.465,0.94-9.705,1.463l-0.109-34.682l-3.484,0.011l0.002,0.646
  // c-16.897-1.037-12.582,10.993-32.234,10.734c8.363,15.713,19.684-0.193,32.301,10.692l0.043,13.168
  // c-29.039,4.941-58.164,13.233-83.584,28.047c-5.867,3.419-11.984,7.537-17.688,12.285l-0.088-27.863l-3.484,0.011l0.002,0.646
  // C15.338,109.481,19.654,121.512,0,121.254c8.367,15.712,19.685-0.192,32.303,10.693l0.029,8.801
  // c-12.324,11.22-21.863,25.568-21.074,42.402c0.912,19.49,12.287,34.646,26.885,46.248v27.828c-5.445-4.65-9.631-9.446-12.393-13.967
  // c-1.525-2.488-2.686-4.849-3.545-6.978c-0.828-2.137-1.412-4.026-1.752-5.592c-0.346-1.563-0.578-2.787-0.672-3.617
  // c-0.111-0.833-0.168-1.263-0.168-1.263s-0.033,0.433-0.096,1.271c-0.072,0.841-0.129,2.098-0.059,3.742
  // c0.156,3.262,0.719,8.221,3.197,14.016c1.211,2.896,2.832,6.002,4.924,9.176c2.078,3.184,4.682,6.381,7.674,9.584
  // c0.918,0.976,1.891,1.945,2.889,2.91v25.319c-5.445-4.65-9.631-9.445-12.393-13.966c-1.525-2.488-2.686-4.849-3.545-6.978
  // c-0.828-2.136-1.412-4.026-1.752-5.592c-0.346-1.563-0.578-2.788-0.672-3.617c-0.111-0.833-0.168-1.263-0.168-1.263
  // s-0.033,0.433-0.096,1.271c-0.072,0.841-0.129,2.098-0.059,3.742c0.156,3.262,0.719,8.22,3.199,14.016
  // c1.211,2.895,2.832,6.001,4.924,9.176c2.078,3.184,4.682,6.38,7.674,9.583c0.918,0.975,1.889,1.943,2.887,2.908l0.74,0.701
  // c5.4,5.107,11.889,10.04,19.26,14.613c4.549,2.825,9.438,5.5,14.594,8.053c5.16,2.543,10.615,4.894,16.285,7.137
  // c11.363,4.416,23.65,8.211,36.555,11.218c6.445,1.538,13.053,2.835,19.764,3.979c0.332,0.057,0.666,0.107,0.998,0.163l1.918,6.39
  // l4.053-1.216l4.051-1.216l-14.377-47.884c44.209-11.229,87.334-11.229,131.541,0l-14.377,47.883l4.053,1.217l4.051,1.217
  // l1.918-6.389c0.332-0.056,0.668-0.107,0.998-0.164c6.713-1.144,13.32-2.442,19.766-3.979c12.902-3.007,25.191-6.802,36.555-11.218
  // c5.668-2.243,11.125-4.594,16.285-7.137c5.154-2.553,10.045-5.228,14.592-8.053c7.371-4.573,13.859-9.506,19.262-14.613l0.74-0.701
  // c0.998-0.964,1.969-1.933,2.885-2.908c6.031-6.369,10.244-12.928,12.615-18.751c2.439-5.813,3.068-10.751,3.188-14.023
  // c0.063-1.648,0.012-2.912-0.063-3.743c-0.063-0.838-0.096-1.271-0.096-1.271s-0.059,0.43-0.17,1.263
  // c-0.096,0.84-0.322,2.057-0.676,3.616c-0.348,1.564-0.939,3.451-1.758,5.59c-0.846,2.132-2.012,4.492-3.551,6.972
  // c-1.555,2.471-3.467,5.074-5.824,7.667c-1.926,2.099-4.109,4.223-6.551,6.309v-25.321c0.998-0.965,1.971-1.934,2.887-2.91
  // c6.029-6.369,10.244-12.929,12.613-18.752c2.439-5.813,3.068-10.751,3.188-14.023c0.063-1.648,0.012-2.913-0.063-3.743
  // c-0.063-0.838-0.096-1.271-0.096-1.271s-0.059,0.43-0.17,1.263c-0.096,0.84-0.322,2.057-0.676,3.616
  // c-0.348,1.565-0.939,3.451-1.756,5.59c-0.846,2.132-2.012,4.492-3.551,6.972c-1.557,2.471-3.467,5.074-5.824,7.667
  // c-1.926,2.1-4.111,4.224-6.553,6.31V229.77c14.756-11.677,26.125-26.96,27.268-46.711c-0.061-17.35-9.113-31.51-21.455-42.729
  // l0.025-8.384c12.619-10.885,23.938,5.019,32.303-10.693C395.852,121.512,400.168,109.481,383.272,110.52z M280.027,114.548
  // c16.605,3.143,32.943,7.585,48.641,13.701c14,5.455,31.211,13.355,43.342,24.885l-66.66,41.398
  // c-13.203-10.172-34.381-18.08-59.785-22.076L280.027,114.548z M229.93,108.653c13.213,0.727,26.494,2.042,39.658,4.104
  // l-34.686,58.282c-8.693-0.95-17.787-1.458-27.148-1.458c-9.363,0-18.455,0.507-27.15,1.458l-34.693-58.297
  // C173.648,108.351,201.9,107.111,229.93,108.653z M55.637,143.732c23.703-15.661,52.072-24.007,79.842-29.186l34.463,57.909
  // c-25.404,3.997-46.582,11.904-59.785,22.076l-66.695-41.421C47.25,149.625,51.412,146.522,55.637,143.732z M85.145,316.543
  // c-7.936-2.711-15.35-5.71-22.109-8.982c-4.535-2.154-8.732-4.49-12.617-6.872c-0.814-0.498-1.605-1.004-2.389-1.513v-24.268
  // c3.15,2.375,6.525,4.688,10.111,6.914c4.549,2.825,9.439,5.5,14.594,8.053c3.973,1.958,8.123,3.801,12.41,5.569V316.543z
  //  M85.145,281.943c-7.936-2.711-15.352-5.711-22.111-8.983c-4.535-2.154-8.73-4.49-12.615-6.872
  // c-0.816-0.497-1.605-1.004-2.389-1.513v-28.113c3.461,2.231,7,4.297,10.545,6.205c8.537,4.595,17.439,8.505,26.57,11.873V281.943z
  //  M76.422,232.545c-13.803-6.317-27.742-14.164-37.881-25.706c-4.895-5.57-11.996-16.036-10.539-24.222
  // c0.709-3.98,1.832-10.702,4.355-15.745c1.236-2.247,2.668-4.369,4.242-6.385l66.076,41.036c-4.676,5.438-7.244,11.331-7.244,17.49
  // c0,9.679,6.328,18.706,17.252,26.33C100.236,242.043,88.055,237.868,76.422,232.545z M128.746,327.655
  // c-11.809-2.156-23.133-4.828-33.715-7.97v-20.436c9.649,3.467,19.881,6.496,30.543,8.981c3.219,0.768,6.479,1.476,9.771,2.135
  // l5.803,19.328C136.967,329.063,132.828,328.379,128.746,327.655z M320.477,319.685c-10.582,3.143-21.906,5.814-33.717,7.97
  // c-4.08,0.724-8.221,1.408-12.402,2.039l5.803-19.328c3.293-0.659,6.553-1.367,9.772-2.135c10.664-2.485,20.896-5.515,30.545-8.981
  // V319.685z M320.477,285.085c-10.582,3.142-21.906,5.814-33.715,7.97c-3.631,0.644-7.309,1.256-11.021,1.828
  // c-45.701-11.633-90.273-11.633-135.975,0c-3.711-0.572-7.389-1.184-11.02-1.828c-11.811-2.155-23.133-4.828-33.715-7.97v-27.131
  // c20.076,6.438,41.053,10.423,61.723,12.957c34.283,4.202,69.221,4.148,103.496-0.104c20.242-2.512,40.645-6.456,60.227-12.713
  // V285.085z M367.478,299.177c-0.783,0.509-1.574,1.015-2.391,1.513c-3.885,2.382-8.08,4.717-12.615,6.872
  // c-6.76,3.271-14.176,6.27-22.109,8.982v-21.099c4.285-1.769,8.438-3.611,12.41-5.569c5.154-2.552,10.045-5.228,14.592-8.053
  // c3.588-2.226,6.963-4.54,10.113-6.914V299.177z M367.478,264.575c-0.783,0.509-1.574,1.016-2.389,1.513
  // c-3.885,2.382-8.08,4.717-12.615,6.872c-6.76,3.272-14.176,6.272-22.111,8.983V254.69c8.365-3.068,16.555-6.584,24.469-10.653
  // c4.268-2.193,8.52-4.607,12.646-7.247V264.575z M387.141,182.557c-0.145,15.047-13.639,29.256-26.842,38.099
  // c-17.16,11.493-36.879,19.13-57.113,24.43c10.701-7.569,16.889-16.503,16.889-26.074c0-6.158-2.566-12.052-7.242-17.49
  // l65.863-40.903C383.428,166.971,386.568,174.235,387.141,182.557z"
  //   />
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  //   <g></g>
  // </svg>
  //   );
}
