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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ prepareData),\n/* harmony export */   \"prepareData\": () => (/* binding */ prepareData)\n/* harmony export */ });\n/* harmony import */ var _utils_getPlural__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getPlural */ \"./src/utils/getPlural.ts\");\n\nfunction withLeadingSign(val) {\n    return val >= 0 ? `+${val}` : `${val}`;\n}\nfunction createLeaders(currentSprint, commits, users) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const leaders = {\n        alias: \"leaders\",\n        data: {\n            title: \"Больше всего коммитов\",\n            subtitle: `${sprintName}`,\n            emoji: \"👑\",\n            users: [],\n        },\n    };\n    const usersMap = new Map();\n    if (currentSprint && commits && users) {\n        commits.forEach((commit) => {\n            if (commit.timestamp >= currentSprint.startAt &&\n                commit.timestamp <= currentSprint.finishAt) {\n                const author = typeof commit.author !== \"number\"\n                    ? commit.author\n                    : users.get(commit.author);\n                if (!author) {\n                    console.warn(\"автор не найден\");\n                    return;\n                }\n                const usersMapEntry = usersMap.get(author);\n                if (!usersMapEntry) {\n                    const set = new Set();\n                    usersMap.set(author, set.add(commit));\n                }\n                else {\n                    usersMapEntry.add(commit);\n                }\n            }\n        });\n    }\n    for (const val of usersMap) {\n        const user = val[0];\n        const commitsSet = val[1];\n        leaders.data.users.push({\n            id: user.id,\n            name: user.name,\n            avatar: user.avatar,\n            valueText: `${commitsSet.size}`,\n        });\n    }\n    leaders.data.users.sort((a, b) => {\n        const verdict1 = parseInt(b.valueText) - parseInt(a.valueText);\n        if (verdict1 === 0) {\n            return a.id - b.id;\n        }\n        return verdict1;\n    });\n    return leaders;\n}\nfunction createVote(currentSprint, comments, users) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const slide = {\n        alias: \"vote\",\n        data: {\n            title: \"Самый 🔎 внимательный разработчик\",\n            emoji: \"🔎\",\n            subtitle: sprintName,\n            users: [],\n        },\n    };\n    const usersMap = new Map();\n    if (currentSprint && comments && users) {\n        comments.forEach((comment) => {\n            if (comment.createdAt >= currentSprint.startAt &&\n                comment.createdAt <= currentSprint.finishAt) {\n                const author = typeof comment.author !== \"number\"\n                    ? comment.author\n                    : users.get(comment.author);\n                if (!author) {\n                    console.warn(\"автор не найден\");\n                    return;\n                }\n                const currentLikesCount = usersMap.get(author);\n                usersMap.set(author, (currentLikesCount || 0) + comment.likes.length);\n            }\n        });\n    }\n    for (const val of usersMap) {\n        const user = val[0];\n        const likesCount = val[1];\n        slide.data.users.push({\n            id: user.id,\n            name: user.name,\n            avatar: user.avatar,\n            valueText: `${likesCount} ${(0,_utils_getPlural__WEBPACK_IMPORTED_MODULE_0__.default)(likesCount, [\n                \"голос\",\n                \"голоса\",\n                \"голосов\",\n            ])}`,\n        });\n    }\n    slide.data.users.sort((a, b) => parseInt(b.valueText) - parseInt(a.valueText));\n    return slide;\n}\nfunction createChart(currentSprint, users, sprints, commits) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const slide = {\n        alias: \"chart\",\n        data: {\n            subtitle: sprintName,\n            title: \"Коммиты\",\n            users: users || [],\n            values: [],\n        },\n    };\n    const sprintsMap = new Map();\n    if (currentSprint && sprints && commits) {\n        commits.forEach((commit) => {\n            for (const val of sprints) {\n                const sprint = val[1];\n                if (!sprintsMap.has(sprint)) {\n                    sprintsMap.set(sprint, 0);\n                }\n                if (commit.timestamp >= sprint.startAt &&\n                    commit.timestamp <= sprint.finishAt) {\n                    const currentCommitsCount = sprintsMap.get(sprint) || 0;\n                    sprintsMap.set(sprint, currentCommitsCount + 1);\n                    break;\n                }\n            }\n        });\n    }\n    for (const val of sprintsMap) {\n        const sprint = val[0];\n        const commitsCount = val[1];\n        const obj = {\n            title: `${sprint.id}`,\n            value: commitsCount,\n            hint: sprint.name,\n        };\n        if ((currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.id) === sprint.id) {\n            obj.active = true;\n        }\n        slide.data.values.push(obj);\n    }\n    slide.data.values.sort((a, b) => parseInt(a.title) - parseInt(b.title));\n    return slide;\n}\nfunction createDiagram(currentSprint, sprints, commits, summarys) {\n    const commitsPlurals = [\n        \"коммит\",\n        \"коммита\",\n        \"коммитов\",\n    ];\n    const slide = {\n        alias: \"diagram\",\n        data: {\n            title: \"Размер коммитов\",\n            subtitle: (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\",\n            totalText: \"\",\n            differenceText: \"\",\n            categories: [],\n        },\n    };\n    let prevSprint;\n    if (currentSprint && sprints && commits) {\n        sprints.forEach((sprint) => {\n            if (sprint.finishAt <= currentSprint.startAt) {\n                if (!prevSprint) {\n                    prevSprint = sprint;\n                    return;\n                }\n                if (prevSprint.startAt < sprint.startAt) {\n                    prevSprint = sprint;\n                }\n            }\n        });\n        const commitsInCurrent = [];\n        const commitsInPrev = [];\n        const categories = [\n            {\n                title: \"> 1001 строки\",\n                min: 1001,\n                max: Infinity,\n                currentCommitsCount: 0,\n                prevCommitsCount: 0,\n            },\n            {\n                title: \"501 — 1000 строк\",\n                min: 501,\n                max: 1000,\n                currentCommitsCount: 0,\n                prevCommitsCount: 0,\n            },\n            {\n                title: \"101 — 500 строк\",\n                min: 101,\n                max: 500,\n                currentCommitsCount: 0,\n                prevCommitsCount: 0,\n            },\n            {\n                title: \"1 — 100 строк\",\n                min: 1,\n                max: 100,\n                currentCommitsCount: 0,\n                prevCommitsCount: 0,\n            },\n        ];\n        const putInCategory = (categories, commit, inPrev) => {\n            let size = 0;\n            if (Array.isArray(commit.summaries)) {\n                commit.summaries.forEach((summaryId) => {\n                    const summary = summarys === null || summarys === void 0 ? void 0 : summarys.get(summaryId);\n                    size += ((summary === null || summary === void 0 ? void 0 : summary.added) || 0) + ((summary === null || summary === void 0 ? void 0 : summary.removed) || 0);\n                });\n            }\n            else {\n                size = commit.summaries.added + commit.summaries.removed;\n            }\n            for (const category of categories) {\n                if (size >= category.min && size <= category.max) {\n                    inPrev ? category.prevCommitsCount++ : category.currentCommitsCount++;\n                    break;\n                }\n            }\n            return categories;\n        };\n        commits.forEach((commit) => {\n            if (commit.timestamp <= currentSprint.finishAt &&\n                commit.timestamp >= currentSprint.startAt) {\n                commitsInCurrent.push(commit);\n                putInCategory(categories, commit);\n            }\n            if (prevSprint &&\n                commit.timestamp <= prevSprint.finishAt &&\n                commit.timestamp >= prevSprint.startAt) {\n                commitsInPrev.push(commit);\n                putInCategory(categories, commit, true);\n            }\n        });\n        slide.data.totalText = `${commitsInCurrent.length} ${(0,_utils_getPlural__WEBPACK_IMPORTED_MODULE_0__.default)(commitsInCurrent.length, commitsPlurals)}`;\n        const totalDiff = commitsInCurrent.length - commitsInPrev.length;\n        slide.data.differenceText = `${withLeadingSign(totalDiff)} с прошлого спринта`;\n        categories.forEach((category) => {\n            const sizeDiff = category.currentCommitsCount - category.prevCommitsCount;\n            slide.data.categories.push({\n                title: category.title,\n                valueText: `${category.currentCommitsCount} ${(0,_utils_getPlural__WEBPACK_IMPORTED_MODULE_0__.default)(category.currentCommitsCount, commitsPlurals)}`,\n                differenceText: `${withLeadingSign(sizeDiff)} ${(0,_utils_getPlural__WEBPACK_IMPORTED_MODULE_0__.default)(Math.abs(sizeDiff), commitsPlurals)}`,\n            });\n        });\n    }\n    return slide;\n}\nfunction createActivity(currentSprint, commits) {\n    const WEEK_DAYS = [\n        \"sun\",\n        \"mon\",\n        \"tue\",\n        \"wed\",\n        \"thu\",\n        \"fri\",\n        \"sat\",\n    ];\n    const slide = {\n        alias: \"activity\",\n        data: {\n            title: \"Коммиты, 1 неделя\",\n            subtitle: (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\",\n            data: {\n                fri: new Array(24).fill(0),\n                mon: new Array(24).fill(0),\n                sat: new Array(24).fill(0),\n                sun: new Array(24).fill(0),\n                thu: new Array(24).fill(0),\n                tue: new Array(24).fill(0),\n                wed: new Array(24).fill(0),\n            },\n        },\n    };\n    if (currentSprint && commits) {\n        commits.forEach((commit) => {\n            if (commit.timestamp >= currentSprint.startAt &&\n                commit.timestamp <= currentSprint.finishAt) {\n                const commitDate = new Date(commit.timestamp);\n                const hour = commitDate.getHours();\n                const weekDayNumber = commitDate.getDay();\n                slide.data.data[WEEK_DAYS[weekDayNumber]][hour]++;\n            }\n        });\n    }\n    return slide;\n}\nfunction prepareData(entities, selected) {\n    const commits = new Map();\n    const users = new Map();\n    const sprints = new Map();\n    const projects = new Map();\n    const issues = new Map();\n    const comments = new Map();\n    const summarys = new Map();\n    entities.forEach((entity) => {\n        switch (entity.type) {\n            case \"Commit\":\n                commits.set(entity.id, entity);\n                break;\n            case \"Comment\":\n                comments.set(entity.id, entity);\n                break;\n            case \"Issue\":\n                issues.set(entity.id, entity);\n                break;\n            case \"Project\":\n                projects.set(entity.id, entity);\n                break;\n            case \"Sprint\":\n                sprints.set(entity.id, entity);\n                break;\n            case \"User\":\n                users.set(entity.id, entity);\n                break;\n            case \"Summary\":\n                summarys.set(entity.id, entity);\n                break;\n        }\n    });\n    let currentSprint = undefined;\n    for (const val of sprints) {\n        const id = val[0];\n        const sprint = val[1];\n        if (id === selected.sprintId) {\n            currentSprint = sprint;\n            break;\n        }\n    }\n    const leadersSlide = createLeaders(currentSprint, commits, users);\n    const voteSlide = createVote(currentSprint, comments, users);\n    const chartSlide = createChart(currentSprint, leadersSlide.data.users, sprints, commits);\n    const diagramSlide = createDiagram(currentSprint, sprints, commits, summarys);\n    const activitySlide = createActivity(currentSprint, commits);\n    return [leadersSlide, voteSlide, chartSlide, diagramSlide, activitySlide];\n}\n\n// export function _test() {\n//   const thisWindow: any = window;\n//   console.time(\"test\");\n//   console.log(prepareData(thisWindow._data_, { sprintId: 977 }));\n//   console.timeEnd(\"test\");\n// }\n\n\n//# sourceURL=webpack://yndx-shri-2021-task-2/./src/index.ts?");

/***/ }),

/***/ "./src/utils/getPlural.ts":
/*!********************************!*\
  !*** ./src/utils/getPlural.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getPlural),\n/* harmony export */   \"getPlural\": () => (/* binding */ getPlural)\n/* harmony export */ });\n/**\n * http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms\n */\nfunction getPlural(n, form) {\n    return form[n % 10 == 1 && n % 100 != 11\n        ? 0\n        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)\n            ? 1\n            : 2];\n}\n\n\n\n//# sourceURL=webpack://yndx-shri-2021-task-2/./src/utils/getPlural.ts?");

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