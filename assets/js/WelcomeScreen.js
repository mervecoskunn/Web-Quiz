/* We imported the elements we selected in Dom.js to use in our welcomeScreen.js file. */
import{
    WelcomeScreenElements,changeScreen
} from './DOM.js';
import { initScreen as initGameScreen } from './GameScreen.js';



 const { rulesButtonEl, rulesModalCloseButtonEl, rulesModalEl, soundButton, levelButtons, inputUsername, startButton } = WelcomeScreenElements;




/*
 We will add properties with addEventListener to manipulate the elements we have previously selected in a function.
 */
export const initScreen = () => {
    /* Click event */
    rulesButtonEl.addEventListener("click",()=>{
        /*add open class to modal */
        rulesModalEl.classList.add("open");
    })
    /* click event */
    rulesModalCloseButtonEl.addEventListener("click",()=>{
        /*delete class open from modal */
        rulesModalEl.classList.remove("open");
    })
    soundButton.addEventListener("click", () => {
        if (soundButton.innerHTML == "volume_off") {
            soundButton.innerHTML = "volume_up"
            audioEl.play();
        } else {
            soundButton.innerHTML = "volume_off"
            audioEl.pause();
        }
    })
    // select level event
    levelButtons.forEach((levelButton) =>{
        levelButton.addEventListener ("click", ()=>{
            SetSelectedLevel(levelButton.getAttribute("data-level"))
            levelButtons.forEach((levelButton)=>levelButton.classList.remove("active"))
            levelButton.classList.add("active")
        })
    })
    inputUsername.addEventListener("keyup", (e) => {
        if (e.key == "Enter" && e.target.value.length >= 3) {
            
            changeScreen("screen-game", ()=>{
                initGameScreen();
            })
        }
        setUsername(e.target.value)
    })

    startButton.addEventListener("click",()=> {
        getUsername().length >=3 && changeScreen("screen-game",()=>{
            initGameScreen();
        }) 
    })


}