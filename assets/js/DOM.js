/*The process of accessing the elements we want to manipulate by giving them the correct root and assigning them to a variable */
export const audioEl = document.querySelector('audio#game-music');

const rulesButtonEl = document.getElementById("rules-button");
const rulesModalEl = document.getElementById("rules-modal");
const rulesModalCloseButtonEl = document.querySelector("#rules-modal span");
const soundButton = document.querySelector("#screen-welcome #header span");
const inputUsername = document.querySelector("#screen-welcome input#input-username");
const startButton = document.querySelector("#screen-welcome button#start-button");

const levelButtons = document.querySelectorAll("#screen-welcome .level-buttons .level-button");
/* In order to manipulate the elements we assign to the variable, we must export them and we can use them this way. */
export const WelcomeScreenElements = {
    rulesButtonEl,
    rulesModalEl,
    rulesModalCloseButtonEl,
    soundButton,
    levelButtons,
    inputUsername,
    startButton,
}
/* active screen is saved to session storage and this information is kept up to date until the session is closed. */
const setPersistedActiveScreen = (newActiveScreen) => {
    sessionStorage.setItem("activeScreen", newActiveScreen);
  }; 
/* Active screen opens when session storage is added or welcome screen opens in all other cases. */
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
