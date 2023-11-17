import { ResultScreenElements, changeScreen } from "./DOM.js";

import { initScreen as initGameScreen } from "./GameScreen.js";

import {
  getUsername,
  getScore,
  getSelectedLevel,
  getTime,
  setWrongCount,
  getWrongCount,
} from "./State.js";

const {
  nextLevelButton,
  playAgainButton,
  messageEl,
  levelEl,
  scoreEl,
  timeEl,
  resultWrongsEl,
  feedbackInputEl,
  feedbackSendEl,
  feedbackContent,
  feedbackThanks,
} = ResultScreenElements;

let feedback = "";

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

  feedbackInputEl.addEventListener("keydown", (e) => {
    feedback = e.target.value;
  });

  feedbackSendEl.addEventListener("click", () => {
    feedback.trim() && sendFeedback(feedback);
  });
};

const sendFeedback = async (feedback) => {
  console.log("sendFeedback");
  // code fragment
  // https://www.emailjs.com/docs/rest-api/send/ 
  //documentattion requires these parameters
  var data = {
    service_id: "service_nd4xsh7",
    template_id: "template_jnxb4vz",
    user_id: "uWTiITuvG5pezPNHF",
    template_params: {
      feedback: feedback,
    },
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function () {
      feedbackContent.style.display = "none";
      feedbackThanks.style.display = "flex";
    })
    .catch(function (error) {
      console.log("error", error);
    });
};
