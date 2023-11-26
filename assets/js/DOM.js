// Global DOM elements, for all screens
export const audioEl = document.querySelector("audio#game-music");
export const wrongAudioEl = document.querySelector("audio#wrong-sound");
export const correctAudioEl = document.querySelector("audio#correct-sound");

// Welcome Screen Elements Begin
const rulesButtonEl = document.getElementById("rules-button");
const rulesModalEl = document.getElementById("rules-modal");
const rulesModalCloseButtonEl = document.querySelector("#rules-modal span");
const soundButton = document.querySelector("#screen-welcome #header span");
const inputUsername = document.querySelector(
  "#screen-welcome input#input-username"
);
const startButton = document.querySelector(
  "#screen-welcome button#start-button"
);

const levelButtons = document.querySelectorAll(
  "#screen-welcome .level-buttons .level-button"
);

const usernameErrorEl = document.querySelector(
  "#screen-welcome .username-error"
);

// Welcome Screen Elements End

export const WelcomeScreenElements = {
  rulesButtonEl,
  rulesModalEl,
  rulesModalCloseButtonEl,
  soundButton,
  levelButtons,
  inputUsername,
  startButton,
};

// Game Screen Elements Begin

const confirmButton = document.querySelector("#screen-game button#confirm");
const nextQuestionButton = document.querySelector(
  "#screen-game button#next-question"
);
const headerQuestionNumber = document.querySelector(
  "#screen-game .header .question-number"
);
const headerScore = document.querySelector("#screen-game .header .score");
const questionNumberEl = document.querySelector("#question-number");
const questionTextEl = document.querySelector("#question-text");
const optionA = document.querySelector(".option#a");
const optionB = document.querySelector(".option#b");
const optionC = document.querySelector(".option#c");
const optionD = document.querySelector(".option#d");
const headerTime = document.querySelector("#screen-game .header .time");
const wrongsEl = document.querySelector("#screen-game .header .wrongs");
const optionsEl = document.querySelector(".options");

const blockerEl = document.querySelector(".options .blocker");

const homeButtonEl = document.querySelector("#screen-game .header span.home");

// Game Screen Elements End

export const GameScreenElements = {
  confirmButton,
  nextQuestionButton,
  headerQuestionNumber,
  headerScore,
  questionNumberEl,
  questionTextEl,
  optionA,
  optionB,
  optionC,
  optionD,
  headerTime,
  optionsEl,
  wrongsEl,
  blockerEl,
  homeButtonEl
};

// Result Screen Elements

const messageEl = document.querySelector("#screen-result #message");
const scoreEl = document.querySelector("#screen-result .score");
const timeEl = document.querySelector("#screen-result .time");
const levelEl = document.querySelector("#screen-result .level");
const resultWrongsEl = document.querySelector("#screen-result .wrongs");
const feedbackInputEl = document.querySelector(
  "#screen-result #feedback-input"
);
const feedbackSendEl = document.querySelector("#screen-result #feedback-send");
const playAgainButton = document.querySelector(
  "#screen-result button#play-again"
);
const nextLevelButton = document.querySelector(
  "#screen-result button#next-level"
);

const feedbackContent = document.querySelector(".feedback .content");
const feedbackThanks = document.querySelector(".feedback .thanks");

// Result Screen Elements End

export const ResultScreenElements = {
  messageEl,
  scoreEl,
  timeEl,
  levelEl,
  playAgainButton,
  nextLevelButton,
  resultWrongsEl,
  feedbackInputEl,
  feedbackSendEl,
  feedbackContent,
  feedbackThanks,
};

// set Active Screen in session storage
const setPersistedActiveScreen = (newActiveScreen) => {
  sessionStorage.setItem("activeScreen", newActiveScreen);
};
// this function for all screens to get active screen from session storage
export const getActiveScreen = () => {
  const activeScreen = sessionStorage.getItem("activeScreen");
  if (activeScreen) {
    return activeScreen;
  } else {
    return "screen-welcome";
  }
};

// this function for all screens to change screen
export const changeScreen = (screenName, initScreenEvents) => {
  // set active screen in session storage
  setPersistedActiveScreen(screenName);
  // hide all screens
  const screensElements = document.querySelectorAll(".screen");
  screensElements.forEach((screen) => {
    screen.style.display = "none";
  });

  // show active screen
  document.getElementById(screenName).style = "";

  // call initScreenEvents function of the screen
  initScreenEvents();
};

// this function for welcome screen to show username error
export const showUsernameError = () => {
  usernameErrorEl.style.display = "flex";
  // after 3 seconds hide username error
  setTimeout(() => {
    usernameErrorEl.style.display = "none";
  }, 3000);
};
