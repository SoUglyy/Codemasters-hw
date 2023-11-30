
//main 

import * as restService from './rest.js'

const quizBlock = document.getElementById('quiz')
const resultBlock = document.getElementById('result')

//main

//progress

const progressInner = document.getElementById('progress-inner')
const questionNumber = document.getElementById('question-number')
const questionTotal = document.getElementById('question-total')
const nextButton = document.getElementById('next-button')

//progress

//content

const data = await restService.get(`questions/`)
const question = document.getElementById('question')
const options = document.querySelectorAll('quiz-list__option')
const answers = document.getElementById('answers')

//result

const correctAnswers = document.getElementById('correct-answers')
const totalAnswers = document.getElementById('total-answers')

//result

let questionsCount = data.length;
let count = 0;
let resultCount = 0;

nextButton.onclick = () => {
  count = count < questionsCount ? count + 1 : count;
  renderQuiz(questionsCount, count);

}

//render Quiz

function renderQuiz(total, count) {

  renderProgress(total, count);
  if (count + 1 === total) {
    changeButtonResult();
  }
  if (count < total) {
    const answers = data[count].answers;
    const answersData = createAnswers(answers);
    renderQuestion(count);
    renderAnswers(answersData);
    disableButton(true);
  } else if (count === total) {
    renderResults();
  }
}
renderQuiz(questionsCount, count);
//end 

//render total progress of questions, question number, progress bar
function renderProgress(total, count) {
  const progressBar = 100 / total * count;
  questionNumber.innerHTML = count;
  questionTotal.innerHTML = total;
  progressInner.style.width = `${progressBar}%`;

}

//end




// render questions 
function renderQuestion(count) {
  question.innerHTML = data[count].question;
}
//end


// render and insert answers from data base into DOM
function createAnswers(answers) {
  const answersData = [];
  answers.forEach((answer, index) => {
    const answerElem = `
    <div class="quiz-list__option" data-id="${index}">${answer}</div>
  `;
    answersData.push(answerElem);
   
  })

  return answersData.join('');
}
// const answersData = createAnswers(data.questions[0].answers)

function renderAnswers(htmlString) {
  answers.innerHTML = htmlString;
}

//end

// render click event on answer



// })
// }
answers.onclick = (event) => {

  const target = event.target;
  if (target.classList.contains('quiz-list__option')) {
    // const answerNumber = target.dataset.id
    if (target.dataset.id == data[count].correct){
      target.classList.add('quiz-list__option--true');
      resultCount++
    } else {
      target.classList.add('quiz-list__option--false');
      
    }
    console.log(target);
    console.log(options);
    
    
    // const isValid = validAnswer(count, answerNumber)
    // const answerClass = isValid ? 'quiz-list__option--true' : 'quiz-list__option--false'
    // target.classList.add(answerClass)
    disableButton(false)
    
    // resultCount = isValid ? resultCount + 1 : resultCount
  }

}

const  disabledOptions = () =>{
  options.forEach (item => {
  item.classList.add('disabled');
    if(item.dataset.id === data[count].correct){
      item.classList.add('quiz-list__option--true');
    }
  })
 
}
disabledOptions()
// function validAnswer(count, answer) {
//   const correct = data[count].correct
//   return correct == answer
// }



function disableButton(isDisable) {
  if (isDisable) {
    nextButton.classList.add('quiz__button--disable');
  } else {
    nextButton.classList.remove('quiz__button--disable');

  }

}


function changeButtonResult() {
  nextButton.innerText = 'Узнать результат';
  nextButton.dataset.result = 'result';
}

//end

// render reslut 
function renderResults() {
  quizBlock.classList.add('hidden');
  resultBlock.classList.remove('hidden');
  correctAnswers.innerHTML = resultCount;
  totalAnswers.innerHTML = questionsCount;
}



// add answer disable, and function to show right answer when user picked the wrong answer
// add webpack
// linter



//









