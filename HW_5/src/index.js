// import * as restService from './rest.js';
//main 
const title = document.getElementById('title')
//main

//progress
const progressInner = document.getElementById('progress-inner')
const questionNumber = document.getElementById('question-number')
const questionTotal = document.getElementById('question-total')
const nextButton = document.getElementById('next-button')
//progress


//content
const question = document.getElementById('question')
// const data = await restService.get(`questions/${question}`);
const answers = document.getElementById('answers')
// const result = await restService.get(`answers/${currentQuestion}`);
//content
// let questions = [];
// let answersQ = []

let questionsCount = data.questions.length
let count = 0

// window.addEventListener('DOMContentLoaded',() => renderQuiz());







nextButton.onclick = () => {
  count = count < questionsCount ? count + 1 : count
  renderQuiz(questionsCount, count)

}

//render Quiz



function renderQuiz(total, count) {
  renderProgress(total, count)
  if (count < total) {
    const answers = data.questions[count].answers
    const answersData = createAnswers(answers)
    renderQuestion(count)
    renderAnswers(answersData)
  }
}
renderQuiz(questionsCount,count)
//end 

//render total progress of questions, question number, progress bar
function renderProgress(total, count) {
  const progressBar = 100 / total * count
  questionNumber.innerHTML = count
  questionTotal.innerHTML = total
  progressInner.style.width = `${progressBar}%`
}

//end

// render questions 
function renderQuestion(count) {
  question.innerHTML = data.questions[count].question
}

//end


// render and insert answers from data base into DOM
function createAnswers(answers) {
  const answersData = []
  answers.forEach((answer, index) => {
    const answerElem = `
    <div class="quiz-list__option" data-id="${index+1}">${answer}</div>
  `
    answersData.push(answerElem)
  })

  return answersData.join('')
}
const answersData = createAnswers(data.questions[0].answers)

function renderAnswers(htmlString) {
  answers.innerHTML = htmlString
}


//end

answers.onclick = (event) => {
  const target = event.target
  if (target.classList.contains('quiz-list__option')) {
    const answerNumber = target.dataset.id
    const isValid = validAnswer(count,answerNumber)
    console.log(isValid)
  }

}

function validAnswer(count, answer) {
  const correct = data.questions[count].correct
  return correct == answer
}



// async function getQuestions() {
//   return await restService.get('questions');
// }

// async function calculateResult(answers) {
//   return await restService.post('calculate-result', {answers});
// }

// async function checkAnswer(answerId, questionId) {
//   return await restService.post('check-answer', {answerId, questionId});
// }









