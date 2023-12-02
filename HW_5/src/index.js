"use strict";
// main
import * as restService from './services/rest.js'
var wrapper = document.querySelector('.wrapper');
var quizBlock = document.getElementById('quiz');
var resultBlock = document.getElementById('result');
// main
// progress
var progressInner = document.getElementById('progress-inner');
var questionNumber = document.getElementById('question-number');
var questionTotal = document.getElementById('question-total');
var restartButton = document.getElementById('restart-button');
var nextButton = document.getElementById('next-button');
// progress
// content
var data = await restService.get('questions/');
var question = document.getElementById('question');
var answers = document.getElementById('answers');
var timerLeft = document.querySelector('.quiz-timer__left');
// result
var correctAnswers = document.getElementById('correct-answers');
var totalAnswers = document.getElementById('total-answers');
// result
var questionsCount = data.length;
var count = 0;
var resultCount = 0;
var countdown;
var timerCount = 60;
// timer
// end
var timerDispaly = function () {
    countdown = setInterval(function () {
        timerCount--;
        timerLeft.innerHTML = "".concat(timerCount, "s");
        if (timerCount === 0) {
            clearInterval(countdown);
            timerDisplayModal();
        }
    }, 1000);
};
// render Quiz
function timerDisplayModal() {
    var theEnd = document.createElement('div');
    theEnd.classList.add('quiz-timer');
    wrapper.append(theEnd);
    theEnd.innerHTML = "\n  <dialog>\n  <div class=\"quiz-timer__end\">\n    <span class=\"quiz-timer__text\">\u0412\u0440\u0435\u043C\u044F \u0432\u044B\u0448\u043B\u043E!</span>\n    <button class=\"btn quiz-timer__button\" onclick=\"location.reload(); return false;\">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E</button>\n  </div>\n</dialog>\n  ";
    var modal = document.querySelector('dialog');
    modal.showModal();
}
function renderQuiz(total, count) {
    renderProgress(total, count);
    if (count + 1 === total) {
        changeButtonResult();
    }
    if (count < total) {
        var answers_1 = data[count].answers;
        var answersData = createAnswers(answers_1);
        renderQuestion(count);
        renderAnswers(answersData);
        disableButton(true);
    }
    else if (count === total) {
        renderResults();
    }
    clearInterval(countdown);
    timerDispaly();
}
renderQuiz(questionsCount, count);
// end
// render total progress of questions, question number, progress bar
function renderProgress(total, count) {
    var progressBar = 100 / total * count;
    questionNumber.innerHTML = count;
    questionTotal.innerHTML = total;
    progressInner.style.width = "".concat(progressBar, "%");
}
// end
// render questions
function renderQuestion(count) {
    question.innerHTML = data[count].question;
}
// end
// render and insert answers from data base into DOM
function createAnswers(answers) {
    var answersData = [];
    answers.forEach(function (answer, index) {
        var answerElem = "\n    <div class=\"quiz-list__option\" data-id=\"".concat(index, "\">").concat(answer, "</div>\n  ");
        answersData.push(answerElem);
    });
    return answersData.join('');
}
function renderAnswers(htmlString) {
    answers.innerHTML = htmlString;
}
// end
// render click event on answer
answers.onclick = function (event) {
    var target = event.target;
    if (target.classList.contains('quiz-list__option')) {
        if (target.dataset.id == data[count].correct) { // if set ===  it doesnt work
            target.classList.add('quiz-list__option--true');
            answers.classList.add('disabled');
            resultCount++;
        }
        else {
            target.classList.add('quiz-list__option--false');
            answers.classList.add('disabled');
            var showTrueAnswer = document.querySelector(".quiz-list__option[data-id=\"".concat(data[count].correct, "\"]"));
            showTrueAnswer.classList.add('quiz-list__option--true');
        }
        disableButton(false);
    }
};
// end
// quiz buttons
function disableButton(isDisable) {
    if (isDisable) {
        nextButton.classList.add('quiz__button--disable');
    }
    else {
        nextButton.classList.remove('quiz__button--disable');
    }
}
nextButton.onclick = function () {
    count = count < questionsCount ? count + 1 : count;
    renderQuiz(questionsCount, count);
    answers.classList.remove('disabled');
};
restartButton.onclick = function () {
    location.reload();
};
function changeButtonResult() {
    nextButton.innerText = 'Узнать результат';
    nextButton.dataset.result = 'result';
}
// end
// render reslut
function renderResults() {
    quizBlock.classList.add('hidden');
    resultBlock.classList.remove('hidden');
    correctAnswers.innerHTML = resultCount;
    totalAnswers.innerHTML = questionsCount;
}
// end
