import { initEvents as initWelcomeScreenEvents } from './WelcomeScreen.js'
import { changeScreen } from './DOM.js'

changeScreen("screen-welcome") // welcome screen

initWelcomeScreenEvents();