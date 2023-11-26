import { ResultScreenElements, changeScreen } from "./DOM.js";

import { initScreen as initGameScreen } from "./GameScreen.js";

// get and set functions from State.js (session storage)
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

// feedback variable for feedback input
let feedback = "";

export const initScreen = () => {
  // get username, level and score from session storage
  const username = getUsername();
  const level = getSelectedLevel();
  const score = getScore();

    // if level is hard or score is less than 50, hide next level button
  if (level == "hard" || score < 50) {
    nextLevelButton.style.display = "none";
  }
  // render username, level and score
  levelEl.innerText = level;
  scoreEl.innerText = `Score: ${score}`;
  resultWrongsEl.innerText = `Wrongs: ${getWrongCount()}`;

    // if score is less than 50, show game over message and hide next level button
    // if score is less than 90, show good job message
    // if score is greater than 90, show congratulations message
  if (score < 50) {
    //messageEl.innerText = `Congratulations ${username}!`;
    messageEl.innerText = `OOPS ! Game over :( ${username}!`;
  } else if (score < 90) {
    messageEl.innerText = `Good Job ! ${username}!`;
  } else {
    messageEl.innerText = `Congratulations ${username}!`;
  }

  // calculate time
  let time = {};
  // get time from session storage
  time.miliseconds = getTime();
  time.seconds = Math.floor(time.miliseconds / 1000);
  time.minutes = Math.floor(time.seconds / 60);

  // render time as minutes and seconds
  timeEl.innerText = `Time: ${time.minutes}m ${time.seconds}s `;

  // click events for play again and next level buttons

  playAgainButton.addEventListener("click", () => {
    //reset state and reload page
    setWrongCount(0);
    sessionStorage.clear();
    location.reload();
  });

  nextLevelButton.addEventListener("click", () => {
    // set next level in session storage
    if (level == "easy") {
      sessionStorage.setItem("level", "medium");
    } else if (level == "medium") {
      sessionStorage.setItem("level", "hard");
    }
    //reset score
    sessionStorage.setItem("score", 0);
    // change screen to game screen
    changeScreen("screen-game", () => {
      // reset wrong count and init game screen
      setWrongCount(0);
      // init game screen events
      initGameScreen();
    });
  });
 // feedback input events
  feedbackInputEl.addEventListener("keydown", (e) => {
    // when user press keys in feedback input, set text of the input to feedback variable
    feedback = e.target.value;
  });

  feedbackSendEl.addEventListener("click", () => {
    // when user click send button, send feedback if feedback is not empty
    feedback.trim() && sendFeedback(feedback);
  });
};
// send feedback function, send the feedback message (feedback argument) with emailjs api
const sendFeedback = async (feedback) => {
  // credentials for emailjs api 
  var data = {
    service_id: "service_nd4xsh7",
    template_id: "template_jnxb4vz",
    user_id: "uWTiITuvG5pezPNHF",
    template_params: {
      feedback: feedback,
    },
  };
  // send  the request with fetch api
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function () {
      // if response is success, hide feedback input and show thanks message
      feedbackContent.style.display = "none";
      feedbackThanks.style.display = "flex";
    })
    .catch(function (error) {
      // if response is error, log error to console
      console.log("error", error);
    });
};
