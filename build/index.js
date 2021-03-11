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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ prepareData),\n/* harmony export */   \"prepareData\": () => (/* binding */ prepareData)\n/* harmony export */ });\nfunction createLeaders(currentSprint, commits, users) {\n    const sprintName = (currentSprint === null || currentSprint === void 0 ? void 0 : currentSprint.name) || \"\";\n    const leaders = {\n        alias: \"leaders\",\n        data: {\n            title: \"Больше всего коммитов\",\n            subtitle: `${sprintName}`,\n            emoji: \"👑\",\n            users: [],\n        },\n    };\n    const usersMap = new Map();\n    if (currentSprint && commits && users) {\n        commits.forEach((commit) => {\n            if (commit.timestamp >= currentSprint.startAt &&\n                commit.timestamp <= currentSprint.finishAt) {\n                const author = typeof commit.author !== \"number\"\n                    ? commit.author\n                    : users.get(commit.author);\n                if (!author) {\n                    console.warn(\"автор не найден\");\n                    return;\n                }\n                const usersMapEntry = usersMap.get(author);\n                if (!usersMapEntry) {\n                    const set = new Set();\n                    usersMap.set(author, set.add(commit));\n                }\n                else {\n                    usersMapEntry.add(commit);\n                }\n            }\n        });\n    }\n    for (const val of usersMap) {\n        const user = val[0];\n        const commitsSet = val[1];\n        leaders.data.users.push({\n            avatar: user.avatar,\n            id: user.id,\n            name: user.name,\n            valueText: `${commitsSet.size}`,\n        });\n    }\n    leaders.data.users.sort((a, b) => parseInt(b.valueText) - parseInt(a.valueText));\n    return leaders;\n}\nfunction prepareData(entities, selected) {\n    const commits = new Map();\n    const users = new Map();\n    const sprints = new Map();\n    const projects = new Map();\n    const issues = new Map();\n    const comments = new Map();\n    const summarys = new Map();\n    entities.forEach((entity) => {\n        switch (entity.type) {\n            case \"Commit\":\n                commits.set(entity.id, entity);\n                break;\n            case \"Comment\":\n                comments.set(entity.id, entity);\n                break;\n            case \"Issue\":\n                issues.set(entity.id, entity);\n                break;\n            case \"Project\":\n                projects.set(entity.id, entity);\n                break;\n            case \"Sprint\":\n                sprints.set(entity.id, entity);\n                break;\n            case \"User\":\n                users.set(entity.id, entity);\n                break;\n            case \"Summary\":\n                summarys.set(entity.id, entity);\n                break;\n        }\n    });\n    let currentSprint = undefined;\n    for (const val of sprints) {\n        const id = val[0];\n        const sprint = val[1];\n        if (id === selected.sprintId) {\n            currentSprint = sprint;\n            break;\n        }\n    }\n    return [createLeaders(currentSprint, commits, users)];\n}\n\n// export function _test() {\n//   const thisWindow: any = window;\n//   console.time(\"test\");\n//   console.log(prepareData(thisWindow._data_, { sprintId: 977 }));\n//   console.timeEnd(\"test\");\n// }\n\n\n//# sourceURL=webpack://yndx-shri-2021-task-2/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});