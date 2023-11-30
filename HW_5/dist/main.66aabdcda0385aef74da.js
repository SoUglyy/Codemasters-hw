/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest.js */ \"./src/rest.js\");\n\n//main \n\n\n\nconst quizBlock = document.getElementById('quiz');\nconst resultBlock = document.getElementById('result');\n//main\n\n//progress\nconst progressInner = document.getElementById('progress-inner');\nconst questionNumber = document.getElementById('question-number');\nconst questionTotal = document.getElementById('question-total');\nconst nextButton = document.getElementById('next-button');\n//progress\n\n\n//content\nconst data = await _rest_js__WEBPACK_IMPORTED_MODULE_0__.get(`questions/`);\nconst question = document.getElementById('question');\nconst options = document.querySelectorAll('quiz-list__option');\nconst array1 = Array.from(options)\nconsole.log(array1)\nconst answers = document.getElementById('answers');\n//result\nconst correctAnswers = document.getElementById('correct-answers');\nconst totalAnswers = document.getElementById('total-answers');\n//result\nlet questionsCount = data.length;\nlet count = 0;\nlet resultCount = 0;\n\nnextButton.onclick = () => {\n  count = count < questionsCount ? count + 1 : count;\n  renderQuiz(questionsCount, count);\n\n}\n\n//render Quiz\n\nfunction renderQuiz(total, count) {\n\n  renderProgress(total, count);\n  if (count + 1 === total) {\n    changeButtonResult();\n  }\n  if (count < total) {\n    const answers = data[count].answers;\n    const answersData = createAnswers(answers);\n    renderQuestion(count);\n    renderAnswers(answersData);\n    disableButton(true);\n  } else if (count === total) {\n    renderResults();\n  }\n}\nrenderQuiz(questionsCount, count);\n//end \n\n//render total progress of questions, question number, progress bar\nfunction renderProgress(total, count) {\n  const progressBar = 100 / total * count;\n  questionNumber.innerHTML = count;\n  questionTotal.innerHTML = total;\n  progressInner.style.width = `${progressBar}%`;\n\n}\n\n//end\n\n\n\n\n// render questions \nfunction renderQuestion(count) {\n  question.innerHTML = data[count].question\n}\n//end\n\n\n// render and insert answers from data base into DOM\nfunction createAnswers(answers) {\n  const answersData = []\n  answers.forEach((answer, index) => {\n    const answerElem = `\n    <div class=\"quiz-list__option\" data-id=\"${index}\">${answer}</div>\n  `\n    answersData.push(answerElem)\n   \n  })\n\n  return answersData.join('')\n}\n// const answersData = createAnswers(data.questions[0].answers)\n\nfunction renderAnswers(htmlString) {\n  answers.innerHTML = htmlString\n}\n\n//end\n\n// render click event on answer\n\n\n\n// })\n// }\nanswers.onclick = (event) => {\n\n  const target = event.target\n  if (target.classList.contains('quiz-list__option')) {\n    // const answerNumber = target.dataset.id\n    if (target.dataset.id == data[count].correct){\n      target.classList.add('quiz-list__option--true')\n      resultCount++\n    } else {\n      target.classList.add('quiz-list__option--false')\n      \n    }\n    console.log(target)\n    console.log(options)\n    \n    \n    // const isValid = validAnswer(count, answerNumber)\n    // const answerClass = isValid ? 'quiz-list__option--true' : 'quiz-list__option--false'\n    // target.classList.add(answerClass)\n    disableButton(false)\n    \n    // resultCount = isValid ? resultCount + 1 : resultCount\n  }\n\n}\n\nconst  disabledOptions = () =>{\n  options.forEach (item => {\n  item.classList.add('disabled')\n    if(item.dataset.id === data[count].correct){\n      item.classList.add('quiz-list__option--true')\n    }\n  })\n \n}\ndisabledOptions()\n// function validAnswer(count, answer) {\n//   const correct = data[count].correct\n//   return correct == answer\n// }\n\n\n\nfunction disableButton(isDisable) {\n  if (isDisable) {\n    nextButton.classList.add('quiz__button--disable')\n  } else {\n    nextButton.classList.remove('quiz__button--disable')\n\n  }\n\n}\n\n\nfunction changeButtonResult() {\n  nextButton.innerText = 'Узнать результат'\n  nextButton.dataset.result = 'result'\n}\n\n//end\n\n// render reslut \nfunction renderResults() {\n  quizBlock.classList.add('hidden')\n  resultBlock.classList.remove('hidden')\n  correctAnswers.innerHTML = resultCount\n  totalAnswers.innerHTML = questionsCount\n}\n\n\n\n// add answer disable, and function to show right answer when user picked the wrong answer\n// add webpack\n// linter\n\n\n\n//\n\n\n\n\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://hw51/./src/index.js?");

/***/ }),

/***/ "./src/rest.js":
/*!*********************!*\
  !*** ./src/rest.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   get: () => (/* binding */ get)\n/* harmony export */ });\nconst SERVER_URL = 'http://localhost:3000/';\r\n\r\nasync function get(url) {\r\n  const api = `${SERVER_URL}${url}`;\r\n\r\n  return (await fetch(api)).json();\r\n}\r\n\r\n\r\n// const renderQuiz = async () =>{\r\n//     const api = await fetch(SERVER_URL);\r\n//     const quiz = await api.json()\r\n// }\r\n\n\n//# sourceURL=webpack://hw51/./src/rest.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;