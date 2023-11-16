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
  
  const checkUsername = (username) => {
    //check username is exist and length >= 3
    if (username && username.length >= 3) {
      return true;
    } else {
      showUsernameError();
      return false;
    }
  };
  
  export const initScreen = () => {
    // tıklanma olayı
    rulesButtonEl.addEventListener("click", () => {
      // modal'a open class'ı ekle
      rulesModalEl.classList.add("open");
    });
    // tıklanma olayı
    rulesModalCloseButtonEl.addEventListener("click", () => {
      // modal'dan open class'ı sil
      rulesModalEl.classList.remove("open");
    });
  
    //select level event
    levelButtons.forEach((levelButton) => {
      levelButton.addEventListener("click", () => {
        setSelectedLevel(levelButton.getAttribute("data-level"));
        levelButtons.forEach((levelButton) =>
          levelButton.classList.remove("active")
        );
        levelButton.classList.add("active");
      });
    });
  
    inputUsername.addEventListener("keyup", (e) => {
      if (e.key == "Enter" && checkUsername(e.target.value)) {
        //Start butonuna basılınca ne oluyorsa aynısı olsun
        changeScreen("screen-game", () => {
          initGameScreen();
        });
      }
      setUsername(e.target.value);
    });
  
    startButton.addEventListener("click", () => {
      const username = getUsername();
      checkUsername(username) &&
        changeScreen("screen-game", () => {
          initGameScreen();
        });
    });
  };
  