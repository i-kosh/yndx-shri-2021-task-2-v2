/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/plural-ru/index.js":
/*!*****************************************!*\
  !*** ./node_modules/plural-ru/index.js ***!
  \*****************************************/
/***/ ((module) => {

eval("\n\nvar slice = Array.prototype.slice;\n\nfunction getPluralNoun(num) {\n    var forms = slice.call(arguments, 1);\n\n    var str;\n\n    switch (forms.length) {\n        case 1:\n            throw new Error('Not enough forms');\n            break;\n\n        case 2:\n            str = num > 1 ? forms[1] : forms[0];\n            break;\n\n        default:\n            str = forms[getNounPluralForm(num)];\n            break;\n    }\n\n    return str.replace(/%d/g, num);\n}\n\nfunction getPluralVerb(num) {\n    var forms = slice.call(arguments, 1);\n    var str = forms[getVerbPluralForm(num)];\n\n    return str.replace(/%d/g, num);\n}\n\nfunction getVerbPluralForm(a) {\n    if (a > 1000000) {\n        return 2;\n    }\n\n    if (a > 1000 && a < 1000000 && /000$/.test(a)) {\n        a /= 1000;\n    }\n\n    if (a % 10 === 1 && a % 100 !== 11 || /1000$/.test((a).toString())) {\n        return 0;\n    } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {\n        return 1;\n    } else {\n        return 2;\n    }\n}\n\nfunction getNounPluralForm(a) {\n    if (a % 10 === 1 && a % 100 !== 11) {\n        return 0;\n    } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {\n        return 1;\n    } else {\n        return 2;\n    }\n}\n\nmodule.exports = getPluralNoun;\nmodule.exports.noun = getPluralNoun;\nmodule.exports.verb = getPluralVerb;\n\n\n//# sourceURL=webpack://yndx-shri-2021-task-2/./node_modules/plural-ru/index.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ prepareData),\n/* harmony export */   \"prepareData\": () => (/* binding */ prepareData)\n/* harmony export */ });\n/* harmony import */ var plural_ru__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plural-ru */ \"./node_modules/plural-ru/index.js\");\n/* harmony import */ var plural_ru__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plural_ru__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction createLeaders(currentSprint, commits, users) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const leaders = {\n        alias: \"leaders\",\n        data: {\n            title: \"Больше всего коммитов\",\n            subtitle: `${sprintName}`,\n            emoji: \"👑\",\n            users: [],\n        },\n    };\n    const usersMap = new Map();\n    if (currentSprint && commits && users) {\n        commits.forEach((commit) => {\n            if (commit.timestamp >= currentSprint.startAt &&\n                commit.timestamp <= currentSprint.finishAt) {\n                const author = typeof commit.author !== \"number\"\n                    ? commit.author\n                    : users.get(commit.author);\n                if (!author) {\n                    console.warn(\"автор не найден\");\n                    return;\n                }\n                const usersMapEntry = usersMap.get(author);\n                if (!usersMapEntry) {\n                    const set = new Set();\n                    usersMap.set(author, set.add(commit));\n                }\n                else {\n                    usersMapEntry.add(commit);\n                }\n            }\n        });\n    }\n    for (const val of usersMap) {\n        const user = val[0];\n        const commitsSet = val[1];\n        leaders.data.users.push({\n            id: user.id,\n            name: user.name,\n            avatar: user.avatar,\n            valueText: `${commitsSet.size}`,\n        });\n    }\n    leaders.data.users.sort((a, b) => {\n        const verdict1 = parseInt(b.valueText) - parseInt(a.valueText);\n        if (verdict1 === 0) {\n            return a.id - b.id;\n        }\n        return verdict1;\n    });\n    return leaders;\n}\nfunction createVote(currentSprint, comments, users) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const slide = {\n        alias: \"vote\",\n        data: {\n            title: \"Самый 🔎 внимательный разработчик\",\n            emoji: \"🔎\",\n            subtitle: sprintName,\n            users: [],\n        },\n    };\n    const usersMap = new Map();\n    if (currentSprint && comments && users) {\n        comments.forEach((comment) => {\n            if (comment.createdAt >= currentSprint.startAt &&\n                comment.createdAt <= currentSprint.finishAt) {\n                const author = typeof comment.author !== \"number\"\n                    ? comment.author\n                    : users.get(comment.author);\n                if (!author) {\n                    console.warn(\"автор не найден\");\n                    return;\n                }\n                const currentLikesCount = usersMap.get(author);\n                usersMap.set(author, (currentLikesCount || 0) + comment.likes.length);\n            }\n        });\n    }\n    for (const val of usersMap) {\n        const user = val[0];\n        const likesCount = val[1];\n        slide.data.users.push({\n            id: user.id,\n            name: user.name,\n            avatar: user.avatar,\n            valueText: `${likesCount} ${(0,plural_ru__WEBPACK_IMPORTED_MODULE_0__.noun)(likesCount, \"голос\", \"голоса\", \"голосов\")}`,\n        });\n    }\n    slide.data.users.sort((a, b) => parseInt(b.valueText) - parseInt(a.valueText));\n    return slide;\n}\nfunction createChart(currentSprint, users, sprints, commits) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const slide = {\n        alias: \"chart\",\n        data: {\n            subtitle: sprintName,\n            title: \"Коммиты\",\n            users: users || [],\n            values: [],\n        },\n    };\n    const sprintsMap = new Map();\n    if (currentSprint && sprints && commits) {\n        commits.forEach((commit) => {\n            for (const val of sprints) {\n                const sprint = val[1];\n                if (!sprintsMap.has(sprint)) {\n                    sprintsMap.set(sprint, 0);\n                }\n                if (commit.timestamp >= sprint.startAt &&\n                    commit.timestamp <= sprint.finishAt) {\n                    const currentCommitsCount = sprintsMap.get(sprint) || 0;\n                    sprintsMap.set(sprint, currentCommitsCount + 1);\n                    break;\n                }\n            }\n        });\n    }\n    for (const val of sprintsMap) {\n        const sprint = val[0];\n        const commitsCount = val[1];\n        const obj = {\n            title: `${sprint.id}`,\n            value: commitsCount,\n            hint: sprint.name,\n        };\n        if ((currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.id) === sprint.id) {\n            obj.active = true;\n        }\n        slide.data.values.push(obj);\n    }\n    slide.data.values.sort((a, b) => parseInt(a.title) - parseInt(b.title));\n    return slide;\n}\nfunction prepareData(entities, selected) {\n    const commits = new Map();\n    const users = new Map();\n    const sprints = new Map();\n    const projects = new Map();\n    const issues = new Map();\n    const comments = new Map();\n    const summarys = new Map();\n    entities.forEach((entity) => {\n        switch (entity.type) {\n            case \"Commit\":\n                commits.set(entity.id, entity);\n                break;\n            case \"Comment\":\n                comments.set(entity.id, entity);\n                break;\n            case \"Issue\":\n                issues.set(entity.id, entity);\n                break;\n            case \"Project\":\n                projects.set(entity.id, entity);\n                break;\n            case \"Sprint\":\n                sprints.set(entity.id, entity);\n                break;\n            case \"User\":\n                users.set(entity.id, entity);\n                break;\n            case \"Summary\":\n                summarys.set(entity.id, entity);\n                break;\n        }\n    });\n    let currentSprint = undefined;\n    for (const val of sprints) {\n        const id = val[0];\n        const sprint = val[1];\n        if (id === selected.sprintId) {\n            currentSprint = sprint;\n            break;\n        }\n    }\n    const leadersSlide = createLeaders(currentSprint, commits, users);\n    const voteSlide = createVote(currentSprint, comments, users);\n    const chartSlide = createChart(currentSprint, leadersSlide.data.users, sprints, commits);\n    return [leadersSlide, voteSlide, chartSlide];\n}\n\n// export function _test() {\n//   const thisWindow: any = window;\n//   console.time(\"test\");\n//   console.log(prepareData(thisWindow._data_, { sprintId: 977 }));\n//   console.timeEnd(\"test\");\n// }\n\n\n//# sourceURL=webpack://yndx-shri-2021-task-2/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});