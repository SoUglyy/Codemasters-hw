// main

const wrapper = document.querySelector('.wrapper') as HTMLDivElement
const quizBlock = document.getElementById('quiz') as HTMLDivElement
const resultBlock = document.getElementById('result') as HTMLDivElement

// main

// progress

const progressInner = document.getElementById('progress-inner') as HTMLDivElement
const questionNumber: unknown = <HTMLElement>document.getElementById('question-number')
const questionTotal: unknown = <HTMLElement>document.getElementById('question-total')
const restartButton = document.getElementById('restart-button') as HTMLButtonElement
const nextButton = document.getElementById('next-button') as HTMLButtonElement

// progress

// content

const data = await restService.get('questions/')
const question = document.getElementById('question') as HTMLDivElement
const answers = document.getElementById('answers') as HTMLDivElement
const timerLeft = document.querySelector('.quiz-timer__left') as HTMLDivElement

// result

const correctAnswers: unknown = <HTMLElement>document.getElementById('correct-answers')
const totalAnswers: unknown = <HTMLElement>document.getElementById('total-answers')

// result

const questionsCount: number = data.length
let count: number = 0
let resultCount: number = 0
let countdown: any
let timerCount: number = 2

// timer
const timerDispaly = () => {
  countdown = setInterval(() => {
    timerCount--
    timerLeft.innerHTML = `${timerCount}s`
    if (timerCount === 0) {
      clearInterval(countdown)
      timerDisplayModal()
    }

  }, 1000)
}

function timerDisplayModal(): void {
  const theEnd = document.createElement('div') as HTMLDivElement
  theEnd.classList.add('quiz-timer')
  wrapper.append(theEnd)
  theEnd.innerHTML = `
  <dialog>
  <div class="quiz-timer__end">
    <span class="quiz-timer__text">Время вышло!</span>
    <button class="btn quiz-timer__button" onclick="location.reload(); return false;">Начать заново</button>
  </div>
</dialog>
  `
  const modal = document.querySelector('dialog') as HTMLDialogElement | null
  modal.showModal()

}
// end
// render Quiz
function renderQuiz(total: number, count: number): void {
  renderProgress(total, count)
  if (count + 1 === total) {
    changeButtonResult()
  }
  if (count < total) {
    const answers: any[] = data[count].answers
    const answersData: string = createAnswers(answers)
    renderQuestion(count)
    renderAnswers(answersData)
    disableButton(true)
  } else if (count === total) {
    renderResults()
  }
  clearInterval(countdown)
  timerDispaly()
}
renderQuiz(questionsCount, count)
// end

// render total progress of questions, question number, progress bar
function renderProgress(total: number, count: number): void {
  const progressBar: number = 100 / total * count
  questionNumber.innerHTML = count
  questionTotal.innerHTML = total
  progressInner.style.width = `${progressBar}%`
}

// end

// render questions
function renderQuestion(count: number): void {
  question.innerHTML = data[count].question
}
// end

// render and insert answers from data base into DOM
function createAnswers(answers: any[]): string {
  const answersData: string[] = []

  answers.forEach((answer, index) => {
    const answerElem: string = `
    <div class="quiz-list__option" data-id="${index}">${answer}</div>
  `
    answersData.push(answerElem)
  })

  return answersData.join('')
}

function renderAnswers(htmlString: string): void {
  answers.innerHTML = htmlString
}

// end

// render click event on answer

answers.onclick = (event: Event) => {
  const target: HTMLElement = event.target as HTMLElement
  if (target.classList.contains('quiz-list__option')) {
    if (target.dataset.id == data[count].correct) { // if set ===  it doesnt work
      target.classList.add('quiz-list__option--true')
      answers.classList.add('disabled')
      resultCount++
    } else {
      target.classList.add('quiz-list__option--false')
      answers.classList.add('disabled')
      const showTrueAnswer: HTMLElement | null = document.querySelector(`.quiz-list__option[data-id="${data[count].correct}"]`)
      showTrueAnswer.classList.add('quiz-list__option--true')
    }
    disableButton(false)
  }
}

// end

// quiz buttons

function disableButton(isDisable: boolean): void {
  if (isDisable) {
    nextButton.classList.add('quiz__button--disable')
  } else {
    nextButton.classList.remove('quiz__button--disable')
  }
}

nextButton.onclick = () => {
  count = count < questionsCount ? count + 1 : count
  renderQuiz(questionsCount, count)
  answers.classList.remove('disabled')
}

restartButton.onclick = () => {
  location.reload()
}
function changeButtonResult(): void {
  nextButton.innerText = 'Узнать результат'
  nextButton.dataset.result = 'result'
}

// end

// render reslut
function renderResults(): void {
  quizBlock.classList.add('hidden')
  resultBlock.classList.remove('hidden')
  correctAnswers.innerHTML = resultCount
  totalAnswers.innerHTML = questionsCount
}




// end