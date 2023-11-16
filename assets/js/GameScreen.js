import { GameScreenElements, changeScreen } from "./DOM.js"
import { initScreen as initResultScreen } from "./ResultScreen.js";

const { confirmButton, nextQuestionButton,
  headerQuestionNumber, headerScore, optionA,
  optionB, optionC, optionD, questionNumberEl, questionTextEl,
  headerTime, optionsEl
} = GameScreenElements;

//we are using state.js for reach state on all screens
import { getScore, setScore, setTime, getSelectedLevel } from './State.js'

const fetchQuetions = async () => {
  let URL = "/assets/json/Questions.json";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("hata oluştu", error);
  }
};

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

export const getRandomQuestions = async () => {
  // 10 elemanlı rastgele (0-56 arası) benzersiz sayılardan oluşan array döndürür.
  let questionNumbers = generateRandomUniqueQuestionNumbers();

  let questions = await fetchQuetions();

  const randomQuestions = questionNumbers.map((questionNumber) => {
    return questions[questionNumber];
  });

  return randomQuestions;
};

let limits = {
  easy: 4,
  medium: 3,
  hard: 1
}

let timerInterval;
let time = 0;
let questions = [];
let activeQuestionIndex = 0;
let tempSelectedOption = null;
let scorePerQuestion = 10;
let wrongs = 0;


const startTimeTick = () => {
  timerInterval = setInterval(() => {
    time += 100;
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    headerTime.innerHTML = `Time: ${minutes}:${seconds}`;
  }, 100);

}

const renderActiveQuestion = () => {

  //render question content
  const activeQuestion = questions[activeQuestionIndex];
  questionNumberEl.innerHTML = activeQuestionIndex + 1;
  questionTextEl.innerHTML = activeQuestion.question;

  //render question options
  optionA.innerText = 'A) ' + activeQuestion.options.a
  optionB.innerText = 'B) ' + activeQuestion.options.b
  optionC.innerText = 'C) ' + activeQuestion.options.c
  optionD.innerText = 'D) ' + activeQuestion.options.d

  //render header content
  headerQuestionNumber.innerHTML = `Question ${activeQuestionIndex + 1} of ${questions.length}`
  headerScore.innerHTML = `Score: ${getScore()}`

  //change next question button text for last question
  if (activeQuestionIndex == questions.length - 1) {
    nextQuestionButton.innerText = "Finish"
  } else {
    nextQuestionButton.innerText = "Next"
  }
};

const clearOptions = () => {
  const options = Array.from(optionsEl.children);
  options.forEach((option) => {
    option.classList.remove("selected");
    option.classList.remove("correct");
    option.classList.remove("wrong");
  });
}

const nextQuestion = () => {
  if (activeQuestionIndex + 1 < questions.length) {
    activeQuestionIndex++;
    renderActiveQuestion();
  }
  else {
    clearInterval(timerInterval);
    setTime(time);
  }
  clearOptions();
};

const checkOption = () => {
  const activeQuestion = questions[activeQuestionIndex];
  const correctOption = activeQuestion["correct-answer"];

  if (tempSelectedOption == correctOption) {
    setScore(getScore() + scorePerQuestion);
    let correctOptionEl = document.getElementById(correctOption);
    correctOptionEl.classList.add("correct");
  } else {
    //yanlış yapma durumu
    let correctOptionEl = document.getElementById(correctOption);
    correctOptionEl.classList.add("correct");
    let selectedOptionEl = document.getElementById(tempSelectedOption);
    selectedOptionEl.classList.add("wrong");
    wrongs++;
    if (wrongs > limits[getSelectedLevel()]) {
      clearInterval(timerInterval);
      setTime(time);
      changeScreen("screen-result", () => {
        activeQuestionIndex = 0;
        clearEvents();
        initResultScreen();
      });
    }

  }

  renderActiveQuestion();
}

export const initGame = async () => {
  questions = await getRandomQuestions();
  renderActiveQuestion();
  startTimeTick();
};



const handleConfirmButton = () => {
  checkOption();
  confirmButton.style.display = "none";
}

const handleNextQuestionButton = () => {
  if (activeQuestionIndex + 1 == questions.length) {
    changeScreen("screen-result", () => {
      activeQuestionIndex = 0;
      clearEvents();
      initResultScreen();
    });
  } else nextQuestion();
}

const handleOptionClick = (e) => {
  if (e.target.id) { //tıklanılan yerde id varsa (bir option tıklanmışsa)

    if (!e.target.classList.contains("selected")) { // tıklanılan option zaten seçili değilse
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
}


export const initScreen = () => {

  confirmButton.addEventListener("click", handleConfirmButton);

  nextQuestionButton.addEventListener("click", handleNextQuestionButton);

  optionsEl.addEventListener("click", handleOptionClick);

  initGame();
};

function clearEvents() {
  confirmButton.removeEventListener("click", handleConfirmButton);
  nextQuestionButton.removeEventListener("click", handleNextQuestionButton);
  optionsEl.removeEventListener("click", handleOptionClick);
}



