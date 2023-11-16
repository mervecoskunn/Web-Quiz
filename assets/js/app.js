import { changeScreen, getActiveScreen, audioEl } from "./DOM.js";
import { initScreen as initWelcomeScreen } from "./WelcomeScreen.js";
import { initScreen as initGameScreen } from "./GameScreen.js";
import { initScreen as initResultScreen } from "./ResultScreen.js";

initGlobalEvents();

let activeScreen = getActiveScreen();

changeScreen(activeScreen, () => {
    switch (activeScreen) {
        case "screen-game":
            initGameScreen();
            break;
        case "screen-result":
            initResultScreen();
        default:
            initWelcomeScreen();
            break;
    }
}); // welcome screen is default screen




function initGlobalEvents() {
    const volumeButtons = document.querySelectorAll("span.volume");

    volumeButtons.forEach((volumeButton) => {
        volumeButton.addEventListener("click", () => {
            if (volumeButton.innerHTML == "volume_off") {
                volumeButton.innerHTML = "volume_up"
                audioEl.play();
            } else {
                volumeButton.innerHTML = "volume_off"
                audioEl.pause();
            }
        })
    });
}