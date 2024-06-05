const quizData = [
  {
    question: "What is inheritance in Java?",
    a: "A way to share code between different classes",
    b: "A mechanism to achieve run-time polymorphism",
    c: "A method to call other methods",
    d: "None of the above",
    correct: "a",
    explanation: "Inheritance is a mechanism in Java where one class acquires the properties and behaviors of a parent class."
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    a: "extend",
    b: "implements",
    c: "inherits",
    d: "extends",
    correct: "d",
    explanation: "The 'extends' keyword is used to inherit a class in Java."
  },
  {
    question: "Which class is the parent class of all classes in Java?",
    a: "Object",
    b: "Class",
    c: "System",
    d: "None",
    correct: "a",
    explanation: "The 'Object' class is the parent class of all classes in Java."
  }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">${currentQuizData.question}</div>
    <div class="answers">
      <label><input type="radio" name="answer" value="a"> ${currentQuizData.a}</label>
      <label><input type="radio" name="answer" value="b"> ${currentQuizData.b}</label>
      <label><input type="radio" name="answer" value="c"> ${currentQuizData.c}</label>
      <label><input type="radio" name="answer" value="d"> ${currentQuizData.d}</label>
    </div>
  `;
}

function getSelected() {
  const answerElements = document.getElementsByName('answer');
  let selectedAnswer;
  answerElements.forEach((answer) => {
    if (answer.checked) {
      selectedAnswer = answer.value;
    }
  });
  return selectedAnswer;
}

submitButton.addEventListener('click', () => {
  const selectedAnswer = getSelected();
  if (selectedAnswer) {
    if (selectedAnswer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quizContainer.innerHTML = '';
      resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
      submitButton.classList.add('hide');
      retryButton.classList.remove('hide');
      showAnswerButton.classList.remove('hide');
    }
  } else {
    alert('Please select an answer before submitting.');
  }
});

retryButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.innerHTML = '';
  submitButton.classList.remove('hide');
  retryButton.classList.add('hide');
  showAnswerButton.classList.add('hide');
  loadQuiz();
});

showAnswerButton.addEventListener('click', () => {
  let answerText = quizData.map((q, index) => {
    return `<div><strong>Question ${index + 1}:</strong> ${q.question}<br>
            <strong>Answer:</strong> ${q[q.correct]}<br>
            <strong>Explanation:</strong> ${q.explanation}</div>`;
  }).join('<br>');
  resultContainer.innerHTML = answerText;
});

loadQuiz();

