import { ResultScreenElements, changeScreen } from "./DOM.js";

import { initScreen as initGameScreen } from "./GameScreen.js";


import {
  getUsername,
  getScore,
  getSelectedLevel,
  getTime,
  setWrongCount,
  getWrongCount
} from "./State.js";

const {
  nextLevelButton,
  playAgainButton,
  messageEl,
  levelEl,
  scoreEl,
  timeEl,
  resultWrongsEl,
} = ResultScreenElements;

export const initScreen = () => {
  const username = getUsername();
  const level = getSelectedLevel();
  const score = getScore();

  if (level == "hard") {
    nextLevelButton.style.display = "none";
  }

  messageEl.innerText = `Congratulations ${username}!`;
  levelEl.innerText = level;
  scoreEl.innerText = `Score: ${score}`;
  resultWrongsEl.innerText = `Wrongs: ${getWrongCount()}`;

  let time = {};
  time.miliseconds = getTime();
  time.seconds = Math.floor(time.miliseconds / 1000);
  time.minutes = Math.floor(time.seconds / 60);

  timeEl.innerText = `Time: ${time.minutes}m ${time.seconds}s `;

  playAgainButton.addEventListener("click", () => {
    setWrongCount(0);
    sessionStorage.clear();
    location.reload();
  });

  nextLevelButton.addEventListener("click", () => {
    if (level == "easy") {
      sessionStorage.setItem("level", "medium");
    } else if (level == "medium") {
      sessionStorage.setItem("level", "hard");
    }

    sessionStorage.setItem("score", 0);

    changeScreen("screen-game", () => {
      setWrongCount(0);
      initGameScreen();
    });
  });
};
