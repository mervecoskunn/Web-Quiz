/* We imported the elements we selected in Dom.js to use in our welcomeScreen.js file. */
import{WelcomeScreenElements} from './DOM.js';
/*
 We will add properties with addEventListener to manipulate the elements we have previously selected in a function.
 */

 const { rulesButtonEl, rulesModalCloseButtonEl, rulesModalEl, soundButton, levelButtons, inputUsername, startButton } = WelcomeScreenElements;

export const initEvents = () => {
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

}