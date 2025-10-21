// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question-number");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const nextButton = document.getElementById("next");

// Quiz Data
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

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
nextButton.addEventListener("click", handleNextQuestion);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  nextButton.style.display = "none"; // hide next button initially
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  const explanationDiv = document.getElementById("explanation");
  explanationDiv.textContent = "";
  explanationDiv.style.display = "none";

  nextButton.style.display = "none"; // hide next button until answer selected

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // highlight correct and incorrect
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  // update score
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // show explanation
  const explanationDiv = document.getElementById("explanation");
  explanationDiv.textContent = currentQuestion.explanation;
  explanationDiv.style.display = "block";

  // show next button now
  nextButton.style.display = "inline-block";
}

function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a true anime geek!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
