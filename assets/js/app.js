import { changeScreen, getActiveScreen, audioEl } from "./DOM.js";
import { initScreen as initWelcomeScreen } from "./WelcomeScreen.js";
import { initScreen as initGameScreen } from "./GameScreen.js";
import { initScreen as initResultScreen } from "./ResultScreen.js";
import { getIsSoundOn, setIsSoundOn } from "./State.js";

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
    // set initial volume icon based on isSoundOn value from session storage
    let isSoundOn = getIsSoundOn();
    if (isSoundOn) {
      volumeButton.innerHTML = "volume_up";
    } else {
      volumeButton.innerHTML = "volume_off";
    }


    volumeButton.addEventListener("click", () => {
        // get current value of isSoundOn from session storage per click
      let isSoundOn = getIsSoundOn();
      if (isSoundOn) {
        volumeButton.innerHTML = "volume_off";
      } else {
        volumeButton.innerHTML = "volume_up";
      }
      // set opposite value (true/false)
      setIsSoundOn(!isSoundOn);
    });

  });
}
