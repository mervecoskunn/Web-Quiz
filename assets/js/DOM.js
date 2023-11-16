export const audioEl = document.querySelector("audio#game-music");
export const wrongAudioEl = document.querySelector("audio#wrong-sound");
export const correctAudioEl = document.querySelector("audio#correct-sound");

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

export const WelcomeScreenElements = {
  rulesButtonEl,
  rulesModalEl,
  rulesModalCloseButtonEl,
  soundButton,
  levelButtons,
  inputUsername,
  startButton,
};

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
const optionsEl = document.querySelector(".options");

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
};

// Result Screen Elements

const messageEl = document.querySelector("#screen-result #message");
const scoreEl = document.querySelector("#screen-result .score");
const timeEl = document.querySelector("#screen-result .time");
const levelEl = document.querySelector("#screen-result .level");
const playAgainButton = document.querySelector(
  "#screen-result button#play-again"
);
const nextLevelButton = document.querySelector(
  "#screen-result button#next-level"
);

export const ResultScreenElements = {
  messageEl,
  scoreEl,
  timeEl,
  levelEl,
  playAgainButton,
  nextLevelButton,
};

const setPersistedActiveScreen = (newActiveScreen) => {
  sessionStorage.setItem("activeScreen", newActiveScreen);
};

export const getActiveScreen = () => {
  const activeScreen = sessionStorage.getItem("activeScreen");
  if (activeScreen) {
    return activeScreen;
  } else {
    return "screen-welcome";
  }
};

export const changeScreen = (screenName, initScreenEvents) => {
  setPersistedActiveScreen(screenName);
  const screensElements = document.querySelectorAll(".screen");
  screensElements.forEach((screen) => {
    screen.style.display = "none";
  });
  document.getElementById(screenName).style = "";
  initScreenEvents();
};

export const showUsernameError = () => {
  usernameErrorEl.style.display = "flex";
  setTimeout(() => {
    usernameErrorEl.style.display = "none";
  }, 3000);
};
