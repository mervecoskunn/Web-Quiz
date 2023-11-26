import {
  GameScreenElements,
  changeScreen,
  wrongAudioEl,
  correctAudioEl,
} from "./DOM.js";
import { initScreen as initResultScreen } from "./ResultScreen.js";
import { initScreen as initWelcomeScreen } from './WelcomeScreen.js';

// Game Screen Elements from DOM.js
const {
  confirmButton,
  nextQuestionButton,
  headerQuestionNumber,
  headerScore,
  optionA,
  optionB,
  optionC,
  optionD,
  questionNumberEl,
  questionTextEl,
  headerTime,
  optionsEl,
  wrongsEl,
  blockerEl,
  homeButtonEl
} = GameScreenElements;


// import get/set functions from State.js to read and write data to session storage
import {
  getScore,
  setScore,
  setTime,
  getSelectedLevel,
  getIsSoundOn,
  getWrongCount,
  setWrongCount,
} from "./State.js";

//show blocker
const showBlocker = () => {
  blockerEl.style.display = "block";
};
//hide blocker
const hideBlocker = () => {
  blockerEl.style.display = "none";
};

// fetch questions from json file
const fetchQuestions = async () => {
  let URL = "/assets/json/Questions.json";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("hata oluştu", error);
  }
};
// generate random unique question numbers array for select unique 10 questions
export const generateRandomUniqueQuestionNumbers = () => {
  const randomUniqueQuestionNumbers = [];
  while (randomUniqueQuestionNumbers.length < 10) {
    const randomNumber = Math.floor(Math.random() * 56);
    if (!randomUniqueQuestionNumbers.includes(randomNumber)) {
      randomUniqueQuestionNumbers.push(randomNumber);
    }
  }
  return randomUniqueQuestionNumbers;
};
// this function use fetchQuestions and generateRandomUniqueQuestionNumbers functions to get random questions
export const getRandomQuestions = async () => {
  let questionNumbers = generateRandomUniqueQuestionNumbers();
  let questions = await fetchQuestions();

  // number array to question array
  const randomQuestions = questionNumbers.map((questionNumber) => {
    return questions[questionNumber];
  });
  //returns 10 random questions
  return randomQuestions;
};
//level  limits
let limits = {
  easy: 4,
  medium: 3,
  hard: 1,
};
// time interval for timer
let timerInterval;
// time for timer
let time = 0;
// questions array
let questions = [];
// active question index
let activeQuestionIndex = 0;
// temp selected option
let tempSelectedOption = null;
// score per question
let scorePerQuestion = 10;

// start time tick for timer and render time
const startTimeTick = () => {
  //set interval call the function every 100 miliseconds
  //we set the interval to timerInterval variable to stop when we need with clearInterval function
  timerInterval = setInterval(() => {
    time += 100;
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    headerTime.innerHTML = `Time: ${minutes}:${seconds}`;
  }, 100);
};
// render active question
const renderActiveQuestion = () => {
  //render question content
  const activeQuestion = questions[activeQuestionIndex];
  questionNumberEl.innerHTML = activeQuestionIndex + 1;
  questionTextEl.innerHTML = activeQuestion.question;

  //render question options
  optionA.innerText = "A) " + activeQuestion.options.a;
  optionB.innerText = "B) " + activeQuestion.options.b;
  optionC.innerText = "C) " + activeQuestion.options.c;
  optionD.innerText = "D) " + activeQuestion.options.d;

  //render header content
  headerQuestionNumber.innerHTML = `Question ${activeQuestionIndex + 1} of ${
    questions.length
  }`;
  headerScore.innerHTML = `Score: ${getScore()}`;

  //change next question button text for last question
  if (activeQuestionIndex == questions.length - 1) {
    nextQuestionButton.innerText = "Finish";
  } else {
    nextQuestionButton.innerText = "Next";
  }
};

// clear options for next question or next level
const clearOptions = () => {
  //select all options and convert to array to use forEach function
  const options = Array.from(optionsEl.children);
  //clear the 'selected', 'correct', 'wrong' classes from all options
  options.forEach((option) => {
    option.classList.remove("selected");
    option.classList.remove("correct");
    option.classList.remove("wrong");
  });
};

// next question function
const nextQuestion = () => {
  //increase active question index
  activeQuestionIndex++;
  //render active question
  renderActiveQuestion();
  //clear options
  clearOptions();
};

// check option function for check selected option is correct or wrong
const checkOption = () => {
  //get active question
  const activeQuestion = questions[activeQuestionIndex];
  // get correct option from active question
  const correctOption = activeQuestion["correct-answer"];
  //check selected option is correct or wrong
  if (tempSelectedOption == correctOption) {
    //if isSoundOn is true, play correct sound
    getIsSoundOn() && correctAudioEl.play();
    //increase score
    setScore(getScore() + scorePerQuestion);
    //render green color to correct option
    let correctOptionEl = document.getElementById(correctOption);
    correctOptionEl.classList.add("correct");
  } else {
    //if selected option is wrong

    //if isSoundOn is true, play wrong sound
    getIsSoundOn() && wrongAudioEl.play();
    //render green color to correct option and red color to selected option
    let correctOptionEl = document.getElementById(correctOption);
    correctOptionEl.classList.add("correct");
    //render red color to selected option
    let selectedOptionEl = document.getElementById(tempSelectedOption);
    selectedOptionEl.classList.add("wrong");
    //increase wrong count
    let wrongCount = getWrongCount();
    setWrongCount(wrongCount + 1);
    //render wrong count
    renderWrongs();
    //check wrong count is equal to limit for selected level
    if (wrongCount + 1 > limits[getSelectedLevel()]) {
      //after 1 second
      setTimeout(() => {
        //stop timer
        clearInterval(timerInterval);
        //set time to session storage for use in result screen
        setTime(time);
        //change screen to result screen
        changeScreen("screen-result", () => {
          //after change screen, active question index is 0
          activeQuestionIndex = 0;
          // clear game screen events
          clearEvents();
          //init result screen events
          initResultScreen();
        });
      }, 1000);
    }
  }
  // render the active question
  renderActiveQuestion();
};

// render wrong count
const renderWrongs = () => {
  let wrongCount = getWrongCount();
  wrongsEl.innerHTML = `Wrongs: ${wrongCount}/${limits[getSelectedLevel()]}`;
};

// init game function
export const initGame = async () => {
  // get 10 random questions and set to questions array
  questions = await getRandomQuestions();
  // render active question, for game start render first question
  renderActiveQuestion();
  // clear options for game start
  clearOptions();
  // reset timer for game start
  time = 0;
  clearInterval(timerInterval); // Fixed bug: 2x,3x speed increase timer on next levels. We stop timer before start timer.
  // start timer
  startTimeTick();
  // render wrong count, for game start render 0/limit
  renderWrongs();
  // hide blocker
  hideBlocker();
};

// confirm button click function
const handleConfirmButton = () => {
  // check selected option
  checkOption();
  // hide confirm button
  confirmButton.style.display = "none";
  // disable to select option again after confirm
  showBlocker();
};

// next question button click function
const handleNextQuestionButton = () => {
  // active question index is last question index
  if (activeQuestionIndex + 1 == questions.length) {
    // go to result screen
    changeScreen("screen-result", () => {
      // reset active question index
      activeQuestionIndex = 0;
      // stop timer
      clearInterval(timerInterval);
      // set time to session storage for use in result screen
      setTime(time);
      // clear game screen events
      clearEvents();
      //init result screen events
      initResultScreen();
    }); // if its not last question, go to next question
  } else nextQuestion();
  // enable to select option again after next question
  hideBlocker();
};

const handleOptionClick = (e) => {
  if (e.target.id) {
    //tıklanılan yerde id varsa (bir option tıklanmışsa)
    if (!e.target.classList.contains("selected")) {
      // tıklanılan option zaten seçili değilse
      clearOptions();
    }
    e.target.classList.toggle("selected"); // seçili elemanın "selected" class'ını toggle'la (ekle/kaldır)
    if (e.target.classList.contains("selected")) {
      tempSelectedOption = e.target.id;
      confirmButton.style.display = "block";
    } else {
      tempSelectedOption = null;
      confirmButton.style.display = "none";
    }
  }
};

// home button click function
const handleHomeButton = ()=>{
  //when click home button, go to welcome screen
  changeScreen("screen-welcome", () => {
    //after change screen, active question index is 0
    activeQuestionIndex = 0;
    // reset wrong count
    setWrongCount(0);
    // reset score
    setScore(0);
    // timer is stop
    clearInterval(timerInterval);
    // clear option if selected or confirmed
    clearOptions();
    // clear all events for game screen
    clearEvents();
    // init welcome screen events or functions
    initWelcomeScreen();
  });
}

export const initScreen = () => {

  // add event listeners to buttons
  homeButtonEl.addEventListener("click",handleHomeButton); //add click event to home button

  confirmButton.addEventListener("click", handleConfirmButton);

  nextQuestionButton.addEventListener("click", handleNextQuestionButton);

  optionsEl.addEventListener("click", handleOptionClick);
  // run initGame function for game start
  initGame();
};
// when change screen, clear all events for game screen
function clearEvents() {
  homeButtonEl.removeEventListener("click",handleHomeButton);
  confirmButton.removeEventListener("click", handleConfirmButton);
  nextQuestionButton.removeEventListener("click", handleNextQuestionButton);
  optionsEl.removeEventListener("click", handleOptionClick);
}
