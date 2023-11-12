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
    startButton
}


let activeScreen = "screen-welcome";

export const changeScreen = (screenName) => {
    activeScreen = screenName;

    const screensElements = document.querySelectorAll(".screen");
    screensElements.forEach((screen) => {
        screen.style.display = "none";
    })
    console.log(screenName);
    document.getElementById(screenName).style = "";


}
