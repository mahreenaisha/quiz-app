// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question-number");
const totalQuestionsSpan = document.getElementById("total-questions"); //cant find this in the html doc
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// array of 5 diff objects (list is called array in js)
//all the objects have the same fields i.e. the question and a list of answers
//each answer has a "text" and "correct" field
const quizQuestions = [
  {
    question: "Who is the main character of Naruto?",
    answers: [
      { text: "Sasuke Uchiha", correct: false },
      { text: "Naruto Uzumaki", correct: true },
      { text: "Kakashi Hatake", correct: false },
      { text: "Sakura Haruno", correct: false },
    ],
    explanation: "Naruto Uzumaki is the main character — a ninja who dreams of becoming Hokage.",
  },
  {
    question: "In Attack on Titan, what are the giant humanoid creatures called?",
    answers: [
      { text: "Demons", correct: false },
      { text: "Titans", correct: true },
      { text: "Giants", correct: false },
      { text: "Monsters", correct: false },
    ],
    explanation: "The giant creatures in the show are called Titans — they are central to the story’s mystery.",
  },
  {
    question: "What is the name of the school in My Hero Academia?",
    answers: [
      { text: "Konoha Academy", correct: false },
      { text: "UA High School", correct: true },
      { text: "Hero Academy", correct: false },
      { text: "Saiyan High", correct: false },
    ],
    explanation: "UA High School trains young students to become professional heroes.",
  },
  {
    question: "In One Piece, what is Luffy’s dream?",
    answers: [
      { text: "To become a Marine", correct: false },
      { text: "To become the Pirate King", correct: true },
      { text: "To find Dragon Balls", correct: false },
      { text: "To defeat Goku", correct: false },
    ],
    explanation: "Monkey D. Luffy dreams of becoming the Pirate King by finding the legendary treasure, One Piece.",
  },
  {
    question: "What is Goku’s signature attack in Dragon Ball?",
    answers: [
      { text: "Rasengan", correct: false },
      { text: "Kamehameha", correct: true },
      { text: "Chidori", correct: false },
      { text: "Detroit Smash", correct: false },
    ],
    explanation: "The Kamehameha is Goku’s iconic energy blast attack, taught to him by Master Roshi.",
  },
];

//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
// anserDisabled is used for the reason that we wont be able to click the answer button twice before going to the next question
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //reset vars
  //when you start the quiz, we want to begin from first question (index 0)
  currentQuestionIndex = 0;
  score = 0;
  //text content is used when the value will be displayed in the app
  //score must be reset to 0
  scoreSpan.textContent = 0;

  //.active is the class
  //removing and adding .active class
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  //displays the first question
  showQuestion();
}

function showQuestion() {
  //reset state
  //making the answer buttons clickable
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  //text content because it will be shown on the screen
  //Question 1 of 5
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  //eg: 50%
  //.style lets you modify the inline css of an element from js
  //.width specifically controls the horizontal size of the element
  //But CSS needs the width in a string with a unit, like "40%" or "80%".
  //If either side is a string, JavaScript converts the other side to a string too and joins them together.
  progressBar.style.width = progressPercent + "%";

  //question text
  questionText.textContent = currentQuestion.question;

  //innerHTML gets/sets the HTML inside the element
  //setting it to empty string to clear out any existing content
  answersContainer.innerHTML = "";

  //currentQuestion.answers is an array of answer objects
  //forEach iterates the array
  //answer => { ... } is an arrow function
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    //classList is a convenient API to add/remove/toggle CSS classes.
    button.classList.add("answer-btn");

    //what is dataset? its a property of the button element that allows you to store custom data
    //stored as strings "true" or "false"
    //dataset object is designed to store custom HTML data attributes
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    //<div id="answers-container">
    //   <button class="answer-btn" data-correct="true">Paris</button>
    // </div>

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //optimisation check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Highlight correct/wrong answers
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  // Update score if correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Show explanation
  const explanationDiv = document.getElementById("explanation");
  explanationDiv.textContent = currentQuestion.explanation;
  explanationDiv.style.display = "block";

  // Move to next question after 2 seconds
  setTimeout(() => {
    explanationDiv.textContent = ""; // clear explanation
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 3000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}