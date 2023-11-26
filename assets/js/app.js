import { changeScreen, getActiveScreen } from "./DOM.js";
import { initScreen as initWelcomeScreen } from "./WelcomeScreen.js";
import { initScreen as initGameScreen } from "./GameScreen.js";
import { initScreen as initResultScreen } from "./ResultScreen.js";
import { getIsSoundOn, setIsSoundOn } from "./State.js";

//global events initialization for all screens
initGlobalEvents();

//get active screen from session storage
let activeScreen = getActiveScreen();


//change screen based on active screen from session storage. İf active screen is not set in session storage, welcome screen is default screen
changeScreen(activeScreen, () => {
  //this function is called after screen is changed to call initScreen function of the screen
  switch (activeScreen) {
    case "screen-game":
      initGameScreen();
      break;
    case "screen-result":
      initResultScreen();
      break;
    default:
      initWelcomeScreen();
      break;
  }
}); // welcome screen is default screen


//global events initialization for all screens
function initGlobalEvents() {
  // sound on/off button
  const volumeButtons = document.querySelectorAll("span.volume");
  
  // for all volume buttons
  volumeButtons.forEach((volumeButton) => {
    // set initial volume icon based on isSoundOn value from session storage
    let isSoundOn = getIsSoundOn();
    //render icon based on isSoundOn value
    if (isSoundOn) {
      volumeButton.innerHTML = "volume_up";
    } else {
      volumeButton.innerHTML = "volume_off";
    }
    // add click event to volume button
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
