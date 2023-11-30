import * as restService from './rest';

const quizBlock: HTMLElement = document.getElementById('quiz');
const resultBlock: HTMLElement = document.getElementById('result');

const progressInner: HTMLElement = document.getElementById('progress-inner');
const questionNumber: HTMLElement = document.getElementById('question-number');
const questionTotal: HTMLElement = document.getElementById('question-total');
const nextButton: HTMLElement = document.getElementById('next-button');

const data: any[] = await restService.get(`questions/`);
const question: HTMLElement = document.getElementById('question');
const options: NodeListOf<HTMLElement> = document.querySelectorAll('quiz-list__option');
const answers: HTMLElement = document.getElementById('answers');

const correctAnswers: HTMLElement = document.getElementById('correct-answers');
const totalAnswers: HTMLElement = document.getElementById('total-answers');

let questionsCount: number = data.length;
let count: number = 0;
let resultCount: number = 0;

nextButton.onclick = () => {
  count = count < questionsCount ? count + 1 : count;
  renderQuiz(questionsCount, count);
}

function renderQuiz(total: number, count: number): void {
  renderProgress(total, count);
  if (count + 1 === total) {
    changeButtonResult();
  }
  if (count < total) {
    const answers: string[] = data[count].answers;
    const answersData: string = createAnswers(answers);
    renderQuestion(count);
    renderAnswers(answersData);
    disableButton(true);
  } else if (count === total) {
    renderResults();
  }
}

renderQuiz(questionsCount, count);

function renderProgress(total: number, count: number): void {
  const progressBar: number = 100 / total * count;
  questionNumber.innerHTML = count.toString();
  questionTotal.innerHTML = total.toString();
  progressInner.style.width = `${progressBar}%`;
}

function renderQuestion(count: number): void {
  question.innerHTML = data[count].question;
}

function createAnswers(answers: string[]): string {
  const answersData: string[] = [];
  answers.forEach((answer, index) => {
    const answerElem: string = `
    <div class="quiz-list__option" data-id="${index + 1}">${answer}</div>
  `;
    answersData.push(answerElem);
  });

  return answersData.join('');
}

function renderAnswers(htmlString: string): void {
  answers.innerHTML = htmlString;
}

options.forEach(item => item.setAttribute('onclick', 'optionSelected(this)'));

function optionSelected(count: number, answer: HTMLElement): void {
  const userAnswer: string = answer.textContent;
  if (userAnswer === data[count].correct) {
    answer.classList.add('quiz-list__option--true');
  } else {
    answer.classList.add('quiz-list__option--false');
    options.forEach(item => {
      if (item.textContent === data[count].correct) {
        setTimeout(() => {
          item.classList.add('quiz-list__option--correct');
        }, 100);
      }
    });
  }
}

answers.onclick = (event) => {
  const target: HTMLElement = event.target;
  if (target.classList.contains('quiz-list__option')) {
    const answerNumber: string = target.dataset.id;
    const isValid: boolean = validAnswer(count, answerNumber);
    const answerClass: string = isValid ? 'quiz-list__option--true' : 'quiz-list__option--false';

    target.classList.add(answerClass);
    disableButton(false);
    resultCount = isValid ? resultCount + 1 : resultCount;
  }
}

function validAnswer(count: number, answer: string): boolean {
  const correct: string = data[count].correct;
  return correct == answer;
}

function disableButton(isDisable: boolean): void {
  if (isDisable) {
    nextButton.classList.add('quiz__button--disable');
  } else {
    nextButton.classList.remove('quiz__button--disable');
  }
}

function changeButtonResult(): void {
  nextButton.innerText = 'Узнать результат';
  nextButton.dataset.result = 'result';
}