import {
    WelcomeScreenElements, changeScreen
} from './DOM.js';
import { initScreen as initGameScreen } from './GameScreen.js';

const { rulesButtonEl, rulesModalCloseButtonEl, rulesModalEl, levelButtons, inputUsername, startButton } = WelcomeScreenElements;

import {
    getUsername,
    setSelectedLevel,
    setUsername
} from './State.js'



export const initScreen = () => {
    // click event
    rulesButtonEl.addEventListener("click", () => {
        // add "open" class to modal
        rulesModalEl.classList.add("open");
    })
    // click event
    rulesModalCloseButtonEl.addEventListener("click", () => {
        // delete "open" class to modal
        rulesModalEl.classList.remove("open");
    })

    //select level event
    levelButtons.forEach((levelButton) => {
        levelButton.addEventListener("click", () => {
            setSelectedLevel(levelButton.getAttribute("data-level"))
            levelButtons.forEach((levelButton) => levelButton.classList.remove("active"))
            levelButton.classList.add("active")
        })
    })

    inputUsername.addEventListener("keyup", (e) => {
        if (e.key == "Enter" && e.target.value.length >= 3) {
            //when user press "Enter", perform same as click start button.
            changeScreen("screen-game", () => {
                initGameScreen();
            })
        }
        setUsername(e.target.value)
    })

    startButton.addEventListener("click", () => {
        getUsername().length >= 3 && changeScreen("screen-game", () => {
            initGameScreen();
        })
    })
}