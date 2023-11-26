import {
  WelcomeScreenElements,
  changeScreen,
  showUsernameError,
} from "./DOM.js";
import { initScreen as initGameScreen } from "./GameScreen.js";

const {
  rulesButtonEl,
  rulesModalCloseButtonEl,
  rulesModalEl,
  levelButtons,
  inputUsername,
  startButton,
} = WelcomeScreenElements;

import { getUsername, setSelectedLevel, setUsername } from "./State.js";


// username validation function
const checkUsername = (username) => {
  // pattern for username only letters
  let regex = /^[A-Za-z]+$/;
  // delete spaces start and end of username
  username = username.trim();
  // if username is not empty and length is greater than 3 and username matches regex, return true
  if (username && username.length >= 3 && regex.test(username)) {
    return true;
  } else {
    // if username is not valid, show error
    showUsernameError();
    // return false
    return false;
  }
};

export const initScreen = () => {
  // rules button click event
  rulesButtonEl.addEventListener("click", () => {
    // add open class to modal
    rulesModalEl.classList.add("open");
  });
  // rules modal close button click event
  rulesModalCloseButtonEl.addEventListener("click", () => {
    // remove open class from modal
    rulesModalEl.classList.remove("open");
  });

  //select level event
  levelButtons.forEach((levelButton) => {
    //add click event to all level buttons
    levelButton.addEventListener("click", () => {
      //set selected level to session storage
      setSelectedLevel(levelButton.getAttribute("data-level"));
      //remove active class from all level buttons
      levelButtons.forEach((levelButton) =>
        levelButton.classList.remove("active")
      );
      //add active class to clicked level button
      levelButton.classList.add("active");
    });
  });
 // input username keyup event
  inputUsername.addEventListener("keyup", (e) => {
    // if enter key is pressed and username is valid, change screen to game screen
    if (e.key == "Enter" && checkUsername(e.target.value)) {
      //same as start button click event
      changeScreen("screen-game", () => {
        // init game screen events
        initGameScreen();
      });
    }
    // set username to session storage per keyup
    setUsername(e.target.value);
  });

  startButton.addEventListener("click", () => {
    // get username from session storage
    const username = getUsername();
    // check if username is valid
    if (checkUsername(username)) {
      // if username is valid, change screen to game screen
      changeScreen("screen-game", () => {
        // init game screen events
        initGameScreen();
      });
    }
  });
};
