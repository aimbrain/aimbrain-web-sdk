(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Aimbrain"] = factory();
	else
		root["Aimbrain"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var voiceUi = __webpack_require__(1);
	exports.voiceUi = voiceUi;
	var voiceRecording = __webpack_require__(11);
	exports.voiceRecording = voiceRecording;
	var faceUi = __webpack_require__(27);
	exports.faceUi = faceUi;
	var faceRecording = __webpack_require__(35);
	exports.faceRecording = faceRecording;
	var video = __webpack_require__(38);
	exports.video = video;
	var storage = __webpack_require__(39);
	exports.storage = storage;
	var session_1 = __webpack_require__(40);
	exports.session = session_1.session;
	var api_1 = __webpack_require__(19);
	exports.api = api_1.api;
	var voice_1 = __webpack_require__(17);
	exports.voice = voice_1.voice;
	var facial_1 = __webpack_require__(36);
	exports.facial = facial_1.facial;
	var behaviour_1 = __webpack_require__(43);
	exports.behaviour = behaviour_1.behaviour;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var object = __webpack_require__(2);
	var DialogEvent;
	(function (DialogEvent) {
	    DialogEvent[DialogEvent["CloseClicked"] = 0] = "CloseClicked";
	    DialogEvent[DialogEvent["RecordClicked"] = 1] = "RecordClicked";
	    DialogEvent[DialogEvent["StopClicked"] = 2] = "StopClicked";
	})(DialogEvent = exports.DialogEvent || (exports.DialogEvent = {}));
	__webpack_require__(3);
	var dialogHtml = __webpack_require__(10);
	function appendHtml(element, html) {
	    var temporary = document.createElement("div");
	    temporary.innerHTML = html;
	    return element.appendChild(temporary.firstChild);
	}
	var dialogElement;
	var dialogOptions;
	function el(cls) {
	    if (dialogElement) {
	        return dialogElement.getElementsByClassName(cls)[0];
	    }
	    return null;
	}
	function open(eventCallback, tokenText, options) {
	    console.log('open voice ui');
	    if (options == null) {
	        options = {};
	    }
	    dialogOptions = object.defaults(options, {
	        headerText: "",
	        capturingText: "",
	        progressStartText: "",
	        progressTimerText: ""
	    });
	    if (!dialogElement) {
	        dialogElement = appendHtml(document.body, dialogHtml);
	        el("aimbrain-voice-close").addEventListener("click", function (event) {
	            eventCallback(DialogEvent.CloseClicked);
	        });
	        el("aimbrain-voice-record-button").addEventListener("click", function (event) {
	            eventCallback(DialogEvent.RecordClicked);
	        });
	        el("aimbrain-voice-stop-button").addEventListener("click", function (event) {
	            eventCallback(DialogEvent.StopClicked);
	        });
	    }
	    el("aimbrain-voice-token").innerHTML = tokenText;
	    showProgress(false);
	}
	exports.open = open;
	function showProgress(status) {
	    if (status === false) {
	        el("aimbrain-voice-header-label").innerHTML = dialogOptions.headerText;
	        el("aimbrain-voice-capturing-label").innerHTML = "";
	        el("aimbrain-voice-progress-label").innerHTML = dialogOptions.progressStartText;
	    }
	    else {
	        el("aimbrain-voice-header-label").innerHTML = "";
	        el("aimbrain-voice-capturing-label").innerHTML = dialogOptions.capturingText;
	        var progress = dialogOptions.progressTimerText.replace("{s}", status);
	        el("aimbrain-voice-progress-label").innerHTML = progress;
	    }
	    el("aimbrain-voice-record-button").style.display = status === false ? "block" : "none";
	    el("aimbrain-voice-stop-button").style.display = status === false ? "none" : "block";
	}
	exports.showProgress = showProgress;
	function close() {
	    if (dialogElement) {
	        console.log('close voice ui');
	        dialogElement.parentNode.removeChild(dialogElement);
	        dialogElement = null;
	        dialogOptions = null;
	    }
	}
	exports.close = close;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Assigns own properties of `source` object to the `target` object for all
	 * properties that resolve to `undefined`.
	 *
	 * Example:
	 *   defaults({ 'a': 1 }, { 'b': 2 })         => { 'a': 1, 'b': 2 }
	 *   defaults({ 'a': 1, 'b': 2 }, { 'b': 3 }) => { 'a': 1, 'b': 2 }
	 */
	function defaults(target, source) {
	    var output = Object(target);
	    for (var i in source) {
	        if (source.hasOwnProperty(i) && !output.hasOwnProperty(i)) {
	            output[i] = source[i];
	        }
	    }
	    return output;
	}
	exports.defaults = defaults;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./popup.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./popup.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".aimbrain-dialog-wrapper {\n    position: fixed;\n    background-color: rgba(0, 0, 0, .75);\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 100;\n    font-size: 14px;\n}\n\n.aimbrain-dialog-voice {\n    top: 50%;\n    left: 50%;\n    position: absolute;\n    transform: translate(-50%, -50%);\n    z-index: 9999;\n    box-shadow: 2px 2px 25px rgba(0, 0, 0, .25);\n    box-sizing: border-box;\n}\n\n.aimbrain-dialog-voice {\n    background-color: #fff;\n    color: #000;\n    width: 360px;\n    height: 480px;\n    display: flex;\n    flex-direction: column;\n}\n\n.aimbrain-dialog-voice {\n    font-family: Arial, \"Helvetica Neue\", Helvetica, sans-serif;\n}\n\n.aimbrain-voice-close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 50px;\n    height: 50px;\n    margin: 5px;\n    background-image: url(" + __webpack_require__(6) + ");\n    background-size: 75%;\n    background-position: center;\n    background-repeat: no-repeat;\n    cursor: pointer;\n}\n\n.aimbrain-voice-close:active {\n    opacity: 0.75;\n}\n\n.aimbrain-voice-header-label {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    min-height: 60px;\n    max-width: 60%;\n    margin-top: 10px;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.aimbrain-voice-token {\n    text-align: center;\n    font-size: 32px;\n    font-weight: 200;\n    max-width: 80%;\n    margin-left: auto;\n    margin-right: auto;\n    flex-grow: 1;  \n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n}\n\n.aimbrain-voice-capturing-label {\n    text-align: center;\n    font-size: 16px;\n    min-height: 50px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n\n.aimbrain-voice-controls {\n    min-height: 90px;\n    position: relative;\n    display: flex;\n    align-items: center;\n    padding-left: 28px;\n}\n\n.aimbrain-voice-record-button {\n    position: absolute;\n    width: 60px;\n    height: 60px;\n    background-image: url(" + __webpack_require__(7) + ");\n    background-size: 60%;\n    background-position: center;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    z-index: 9999;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.aimbrain-voice-stop-button {\n    position: absolute;\n    width: 60px;\n    height: 60px;\n    background-image: url(" + __webpack_require__(8) + ");\n    background-size: 60%;\n    background-position: center;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    z-index: 9999;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.aimbrain-voice-progress-label {\n    max-width: 30%;\n    text-align: center;\n}\n\n.aimbrain-voice-record-button:active, aimbrain-voice-stop-button:active  {\n    opacity: 0.75;\n}\n", ""]);
	
	// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMiAxNGMxLjY2IDAgMi45OS0xLjM0IDIuOTktM0wxNSA1YzAtMS42Ni0xLjM0LTMtMy0zUzkgMy4zNCA5IDV2NmMwIDEuNjYgMS4zNCAzIDMgM3ptNS4zLTNjMCAzLTIuNTQgNS4xLTUuMyA1LjFTNi43IDE0IDYuNyAxMUg1YzAgMy40MSAyLjcyIDYuMjMgNiA2LjcyVjIxaDJ2LTMuMjhjMy4yOC0uNDggNi0zLjMgNi02LjcyaC0xLjd6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik02IDZoMTJ2MTJINnoiLz4KPC9zdmc+"

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"aimbrain-dialog-wrapper\">\n\t<div class=\"aimbrain-dialog-voice\">\n\t\t<div class=\"aimbrain-voice-close\"></div>\n\t\t<div class=\"aimbrain-voice-header-label\"></div>\n        <div class=\"aimbrain-voice-token\"></div>\n        <div class=\"aimbrain-voice-capturing-label\"></div>\n        <div class=\"aimbrain-voice-controls\">\n            <div class=\"aimbrain-voice-progress-label\"></div>\n\t\t    <div class=\"aimbrain-voice-record-button\"></div>\n            <div class=\"aimbrain-voice-stop-button\"></div>\n        </div>\n\t</div>\n</div>\n";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var blob_1 = __webpack_require__(12);
	var audio = __webpack_require__(15);
	var ui = __webpack_require__(1);
	var _1 = __webpack_require__(17);
	exports.recordingDuration = 5000;
	var timerIntervalId;
	var recordingStart = 0;
	function recordVoice(token, options) {
	    if (!audio.isSupported()) {
	        console.log("not supported");
	        return Promise.reject(_1.voice.RecordingError.NotSupported);
	    }
	    return new Promise(function (resolve, reject) {
	        ui.open(function (event) {
	            switch (event) {
	                case ui.DialogEvent.CloseClicked:
	                    cancelRecording();
	                    reject(_1.voice.RecordingError.PopupClosed);
	                    break;
	                case ui.DialogEvent.RecordClicked:
	                    if (audio.isSupported()) {
	                        audio.initAudio().then(function (result) {
	                            recordingStart = Date.now();
	                            startProgressTimer();
	                            capture(result, exports.recordingDuration).then(function (result) {
	                                stopProgressTimer();
	                                ui.close();
	                                resolve(result);
	                            }, function (e) {
	                                audio.stopRecording();
	                                reject(_1.voice.RecordingError.RecordingError);
	                            });
	                        }).catch(function (error) {
	                            cancelRecording();
	                            reject(_1.voice.RecordingError.NoDevice);
	                            console.log(error);
	                        });
	                    }
	                    else {
	                        audio.stopRecording();
	                        reject(_1.voice.RecordingError.NotSupported);
	                    }
	                    break;
	                case ui.DialogEvent.StopClicked:
	                    cancelRecording();
	                    reject(_1.voice.RecordingError.PopupClosed);
	                    break;
	            }
	        }, token, options);
	    });
	}
	exports.recordVoice = recordVoice;
	/**
	 * Captures audio and returns a Base64 encoded WAV file
	 */
	function capture(stream, duration) {
	    return audio.recordSample(stream, duration)
	        .then(function (sample) { return blob_1.blobToBase64(sample); })
	        .then(function (result) { return Promise.resolve([result]); });
	}
	function startProgressTimer() {
	    ui.showProgress(Math.round(exports.recordingDuration / 1000).toString());
	    timerIntervalId = setInterval(function () {
	        var currentTime = Date.now();
	        if (recordingStart !== 0
	            && recordingStart + exports.recordingDuration >= currentTime) {
	            var timeLeft = Math.round((exports.recordingDuration - (currentTime - recordingStart)) / 1000);
	            ui.showProgress(timeLeft.toString());
	        }
	        if (recordingStart + exports.recordingDuration < currentTime && timerIntervalId) {
	            ui.showProgress("0");
	            clearInterval(timerIntervalId);
	        }
	    }, 1000);
	}
	function stopProgressTimer() {
	    if (timerIntervalId) {
	        clearInterval(timerIntervalId);
	        timerIntervalId = null;
	    }
	}
	function cancelRecording() {
	    console.log("cancel recording");
	    audio.stopRecording();
	    stopProgressTimer();
	    ui.close();
	}
	exports.cancelRecording = cancelRecording;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var global_1 = __webpack_require__(13);
	var promise_1 = __webpack_require__(14);
	var URL = global_1.global.URL || global_1.global.webkitURL;
	/**
	 * Forces a download of a blob
	 */
	function downloadBlob(blob, filename) {
	    var url = URL.createObjectURL(blob);
	    var link = document.createElement("a");
	    link.href = url;
	    link.download = filename;
	    link.style.display = "none";
	    document.body.appendChild(link);
	    link.click();
	    setTimeout(function () {
	        document.body.removeChild(link);
	        URL.revokeObjectURL(url);
	    }, 0);
	}
	exports.downloadBlob = downloadBlob;
	/**
	 * Encodes blob as Base64
	 */
	function blobToBase64(blob) {
	    return new promise_1.Promise(function (resolve, reject) {
	        var reader = new FileReader();
	        reader.readAsDataURL(blob);
	        reader.addEventListener("loadend", function () {
	            resolve(reader.result.split(",")[1]);
	        });
	        reader.addEventListener("error", reject);
	    });
	}
	exports.blobToBase64 = blobToBase64;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Global object
	 */
	exports.global = Function("return this")() || {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var global_1 = __webpack_require__(13);
	// Default to a Promise from global space
	if (global_1.global && global_1.global.Promise) {
	    exports.Promise = global_1.global.Promise;
	}
	function getPromiseContructor() {
	    return exports.Promise;
	}
	exports.getPromiseContructor = getPromiseContructor;
	function setPromiseContructor(P) {
	    exports.Promise = P;
	}
	exports.setPromiseContructor = setPromiseContructor;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var promise_1 = __webpack_require__(14);
	var global_1 = __webpack_require__(13);
	var wav = __webpack_require__(16);
	function dummyGetUserMedia(constraints, successCallback, errorCallback) {
	    errorCallback(new MediaStreamError());
	}
	var AudioContext = global_1.global.AudioContext || global_1.global.webkitAudioContext;
	var getUserMedia = (navigator.getUserMedia
	    || navigator.webkitGetUserMedia
	    || navigator.mozGetUserMedia
	    || dummyGetUserMedia).bind(navigator);
	/**
	 * Checks whether browser supports audio recording
	 */
	function isSupported() {
	    return !!(getUserMedia && AudioContext);
	}
	exports.isSupported = isSupported;
	/**
	 * getUserMedia options
	 */
	var STREAM_OPTIONS = {
	    video: false,
	    audio: {
	        optional: [],
	        mandatory: {
	            googEchoCancellation: false,
	            googAutoGainControl: false,
	            googNoiseSuppression: false,
	            googHighpassFilter: false,
	        },
	    },
	};
	var audioContext;
	function initAudio() {
	    console.log('init audio');
	    if (!isSupported()) {
	        var err = new Error("Audio capture is not supported on this platform");
	        return promise_1.Promise.reject(err);
	    }
	    return new promise_1.Promise(function (resolve, reject) {
	        getUserMedia(STREAM_OPTIONS, function (stream) { resolve(stream); }, reject);
	    });
	}
	exports.initAudio = initAudio;
	var recorderCleanup;
	var recorderTimeout;
	/**
	 * Records a sample of specified length in miliseconds
	 */
	function recordSample(stream, duration) {
	    return new promise_1.Promise(function (resolve, reject) {
	        if (audioContext == null) {
	            console.log("new audio context");
	            audioContext = new AudioContext();
	        }
	        // Create an audio stream source
	        var source = audioContext.createMediaStreamSource(stream);
	        // Create a gain node
	        var gain = audioContext.createGain();
	        // Create a script processor
	        var createScriptProcessor = audioContext.createScriptProcessor
	            || audioContext.createJavaScriptNode;
	        var processor = createScriptProcessor
	            .call(audioContext, 2048, 1, 1);
	        // Connect nodes
	        // [source] -> [gain] -> [processor] -> [context.destination]
	        source.connect(gain);
	        gain.connect(processor);
	        processor.connect(audioContext.destination);
	        //  Listen for data
	        var samples = [];
	        var audioProcessListener = function (e) {
	            var channel = e.inputBuffer.getChannelData(0);
	            for (var i = 0; i < channel.length; i++) {
	                samples.push(channel[i]);
	            }
	        };
	        processor.addEventListener("audioprocess", audioProcessListener);
	        recorderCleanup = function () {
	            console.log("recorder cleanup");
	            stream.getAudioTracks()[0].stop();
	            processor.removeEventListener("audioprocess", audioProcessListener);
	            processor.disconnect(audioContext.destination);
	            gain.disconnect(processor);
	            source.disconnect(gain);
	            if (audioContext.close) {
	                console.log("close audio context");
	                audioContext.close();
	                audioContext = null;
	            }
	        };
	        recorderTimeout = setTimeout(function () {
	            console.log("record time end");
	            var blob = wav.encodeWAV(samples, audioContext.sampleRate, 1);
	            recorderCleanup();
	            recorderCleanup = null;
	            recorderTimeout = null;
	            resolve(blob);
	        }, duration);
	    });
	}
	exports.recordSample = recordSample;
	function stopRecording() {
	    console.log("record stop");
	    try {
	        if (recorderTimeout) {
	            clearTimeout(recorderTimeout);
	            recorderTimeout = null;
	        }
	        if (recorderCleanup) {
	            recorderCleanup();
	            recorderCleanup = null;
	        }
	    }
	    catch (e) {
	        console.log(e);
	    }
	}
	exports.stopRecording = stopRecording;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Appends float data to DataView as 16-bit PCM data
	 */
	function writeDataViewFloatAsPCM(output, offset, input) {
	    for (var i = 0; i < input.length; i++, offset += 2) {
	        var s = Math.max(-1, Math.min(1, input[i]));
	        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
	    }
	}
	/**
	 * Appends string data to DataView
	 */
	function writeDataViewString(output, offset, string) {
	    for (var i = 0; i < string.length; i++) {
	        output.setUint8(offset + i, string.charCodeAt(i));
	    }
	}
	/**
	 * Encodes float samples as a WAV Blob
	 */
	function encodeWAV(input, sampleRate, channels) {
	    var buffer = new ArrayBuffer(44 + input.length * 2);
	    var view = new DataView(buffer);
	    // RIFF identifier
	    writeDataViewString(view, 0, "RIFF");
	    // RIFF chunk length
	    view.setUint32(4, 36 + input.length * 2, true);
	    // RIFF type
	    writeDataViewString(view, 8, "WAVE");
	    // format chunk identifier
	    writeDataViewString(view, 12, "fmt ");
	    // format chunk length
	    view.setUint32(16, 16, true);
	    // sample format (raw)
	    view.setUint16(20, 1, true);
	    // channel count
	    view.setUint16(22, channels, true);
	    // sample rate
	    view.setUint32(24, sampleRate, true);
	    // byte rate (sample rate * block align)
	    view.setUint32(28, sampleRate * 4, true);
	    // block align (channel count * bytes per sample)
	    view.setUint16(32, channels * 2, true);
	    // bits per sample
	    view.setUint16(34, 16, true);
	    // data chunk identifier
	    writeDataViewString(view, 36, "data");
	    // data chunk length
	    view.setUint32(40, input.length * 2, true);
	    writeDataViewFloatAsPCM(view, 44, input);
	    return new Blob([view], {
	        type: "audio/wav",
	    });
	}
	exports.encodeWAV = encodeWAV;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var calls = __webpack_require__(18);
	var audio = __webpack_require__(15);
	var recording = __webpack_require__(11);
	/**
	 * [[include:voice-module.md]]
	 */
	var voice;
	(function (voice) {
	    /**
	     * Check if voice module is supported by current browser.
	     * @return if voice module can be used.
	     */
	    function isSupported() {
	        return audio.isSupported();
	    }
	    voice.isSupported = isSupported;
	    /**
	     * All enrollment token keys
	     * @returns Returns all enrollment token keys to be used with [[getEnrollmentToken]]
	     */
	    function getEnrollmentTokenKeys() {
	        return ["enroll-1", "enroll-2", "enroll-3", "enroll-4", "enroll-5"];
	    }
	    voice.getEnrollmentTokenKeys = getEnrollmentTokenKeys;
	    /**
	     * @param tokenKey token key which identifies token
	     * @param serialize flag to return serialised request instead of performing API call
	     * @return Return promise which resolves to:
	     * * string containing enrollment voice token if serialize parameter was false
	     * * string with serialized request body if serialize parameter was true
	     */
	    function getEnrollmentToken(tokenKey, metadata, serialize) {
	        return calls.getEnrollmentChallengeText(tokenKey, metadata, serialize);
	    }
	    voice.getEnrollmentToken = getEnrollmentToken;
	    /**
	     * @param serialize flag to return serialised request instead of performing API call
	     * @return Promise which resolves to:
	     * * string containing authentication token if serialize parameter was false
	     * * string with serialized request body if serialize parameter was true
	     */
	    function getAuthenticationToken(metadata, serialize) {
	        return calls.getAuthenticationChallengeText(metadata, serialize);
	    }
	    voice.getAuthenticationToken = getAuthenticationToken;
	    /**
	     * Enroll using recorded voice.
	     * @param data recording created using [[recordVoice]]
	     * @param serialize flag to request serialised request instead of performing API call
	     * @param metadata
	     */
	    function enrollWithData(data, metadata, serialize) {
	        return calls.enrollWithData(data, metadata, serialize);
	    }
	    voice.enrollWithData = enrollWithData;
	    /**
	     * Voice authentication.
	     * @param data recording created using [[recordVoice]]
	     * @param serialize flag to request serialised request instead of performing API call
	     * @param metadata
	     */
	    function authenticateWithData(data, metadata, serialize) {
	        return calls.authenticateWithData(data, metadata, serialize);
	    }
	    voice.authenticateWithData = authenticateWithData;
	    /**
	     * Error codes used when recording fails
	     */
	    var RecordingError;
	    (function (RecordingError) {
	        /**
	         * Recording popup was closed by user.
	         */
	        RecordingError[RecordingError["PopupClosed"] = 0] = "PopupClosed";
	        /**
	         * Recording is not supported by browser.
	         */
	        RecordingError[RecordingError["NotSupported"] = -1] = "NotSupported";
	        /**
	         * No recording device is present.
	         */
	        RecordingError[RecordingError["NoDevice"] = -2] = "NoDevice";
	        /**
	         * Error while trying to record
	         */
	        RecordingError[RecordingError["RecordingError"] = -3] = "RecordingError";
	    })(RecordingError = voice.RecordingError || (voice.RecordingError = {}));
	    /**
	     * Displays voice recording poup.
	     * @param token voice token shown to user
	     * @return Promise resolving to string array with base64 encoded audio recording
	     */
	    function recordVoice(token, options) {
	        return recording.recordVoice(token, options);
	    }
	    voice.recordVoice = recordVoice;
	})(voice = exports.voice || (exports.voice = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var promise_1 = __webpack_require__(14);
	var api_1 = __webpack_require__(19);
	var state = __webpack_require__(26);
	function enrollWithData(data, metadata, serialize) {
	    var session = state.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.enrollVoice(session.getId(), data, metadata).serialize());
	    }
	    else {
	        return api_1.api.enrollVoice(session.getId(), data, metadata).send();
	    }
	    ;
	}
	exports.enrollWithData = enrollWithData;
	function authenticateWithData(data, metadata, serialize) {
	    var session = state.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.authenticateVoice(session.getId(), data, metadata).serialize());
	    }
	    else {
	        return api_1.api.authenticateVoice(session.session, data, metadata).send()
	            .then(function (result) {
	            state.setCachedSessionScore(result.score);
	            return result;
	        });
	        ;
	    }
	    ;
	}
	exports.authenticateWithData = authenticateWithData;
	function getEnrollmentChallengeText(token, metadata, serialize) {
	    var session = state.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.getVoiceChallenge(session.getId(), token, metadata).serialize());
	    }
	    else {
	        return api_1.api.getVoiceChallenge(session.getId(), token, metadata).send().then(function (result) {
	            return promise_1.Promise.resolve(result.token);
	        });
	    }
	}
	exports.getEnrollmentChallengeText = getEnrollmentChallengeText;
	function getAuthenticationChallengeText(metadata, serialize) {
	    var session = state.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.getVoiceChallenge(session.getId(), "auth", metadata).serialize());
	    }
	    else {
	        return api_1.api.getVoiceChallenge(session.getId(), "auth", metadata).send().then(function (result) {
	            return promise_1.Promise.resolve(result.token);
	        });
	    }
	}
	exports.getAuthenticationChallengeText = getAuthenticationChallengeText;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var request = __webpack_require__(20);
	/**
	 * [[include:api-module.md]]
	 */
	var api;
	(function (api) {
	    /**
	     * Module enrollment status.
	     */
	    var EnrollmentStatus;
	    (function (EnrollmentStatus) {
	        /**
	         * Not enrolled to the module yet.
	         */
	        EnrollmentStatus[EnrollmentStatus["NotEnrolled"] = 0] = "NotEnrolled";
	        /**
	         * Enrolled to module.
	         */
	        EnrollmentStatus[EnrollmentStatus["Enrolled"] = 1] = "Enrolled";
	        /**
	         * Biometric template is being built. API user should retry API call after short delay.
	         */
	        EnrollmentStatus[EnrollmentStatus["Building"] = 2] = "Building";
	    })(EnrollmentStatus = api.EnrollmentStatus || (api.EnrollmentStatus = {}));
	    ;
	    /**
	     * API call error code.
	     */
	    var ErrorCode;
	    (function (ErrorCode) {
	        /**
	         * Internal error while parsing response.
	         */
	        ErrorCode[ErrorCode["UnrecognizedResponse"] = 1] = "UnrecognizedResponse";
	        /**
	         * The call requires session active session.
	         */
	        ErrorCode[ErrorCode["NoOpenSession"] = 2] = "NoOpenSession";
	        /**
	         * Error while sending request
	         */
	        ErrorCode[ErrorCode["RequestError"] = 3] = "RequestError";
	        /**
	         * API was called with invalid parameters.
	         */
	        ErrorCode[ErrorCode["BadRequest"] = 400] = "BadRequest";
	        /**
	         * Invalid API key or secret used while making API call.
	         */
	        ErrorCode[ErrorCode["InvalidKeyOrSignature"] = 401] = "InvalidKeyOrSignature";
	        /**
	         * Current session id is not valid.
	         */
	        ErrorCode[ErrorCode["InvalidSessionId"] = 403] = "InvalidSessionId";
	        /**
	         * Authorization call failed.
	         */
	        ErrorCode[ErrorCode["AuthorizationFailed"] = 422] = "AuthorizationFailed";
	        /**
	         * Enrollemnt call failed.
	         */
	        ErrorCode[ErrorCode["EnrollmentFailed"] = 422] = "EnrollmentFailed";
	        /**
	         * User is not enrolled when call needs finished enrollment.
	         */
	        ErrorCode[ErrorCode["NotEnrolledYet"] = 424] = "NotEnrolledYet";
	        /**
	         * Internal server error while performing operation.
	         */
	        ErrorCode[ErrorCode["ServerError"] = 500] = "ServerError";
	    })(ErrorCode = api.ErrorCode || (api.ErrorCode = {}));
	    ;
	    /**
	    * Sets server url to be used for API calls.
	    * Must be called before any API call is invoked.
	    * @param url server url
	    */
	    function setBaseUrl(url) {
	        request.setBaseUrl(url);
	    }
	    api.setBaseUrl = setBaseUrl;
	    /**
	     * Sets Aimbrain API key/secret pair.
	     * Must be called before any API call is invoked.
	     * @param key api key
	     * @param secret api sercret
	     */
	    function setKeyAndSecret(key, secret) {
	        request.setApiCredentials(key, secret);
	    }
	    api.setKeyAndSecret = setKeyAndSecret;
	    /**
	     * Make request to create new session.
	     * @param userId user identifier
	     * @param browserName used browser name
	     * @param browserOS operating system used
	     * @param screenWidth screen width
	     * @param screenHeight screen height
	     * @return Created request object
	     */
	    function createSession(userId, browserName, browserOS, screenHeight, screenWidth, metadata) {
	        var payload = {
	            userId: userId,
	            device: browserName,
	            system: browserOS,
	            screenHeight: screenHeight,
	            screenWidth: screenWidth,
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/sessions",
	            body: payload,
	        });
	    }
	    api.createSession = createSession;
	    /**
	     * Make request to send collected behavioural events.
	     * @param sessionId session identifier
	     * @param events events to be sent
	     * @param mouseEvents mouse events to be sent
	     * @param keyUpDownEvents key events to be sent
	     * @return Created request object
	     */
	    function sendEvents(sessionId, mouseEvents, keyUpDownEvents, metadata) {
	        var payload = {
	            session: sessionId,
	            mouseEvents: mouseEvents,
	            keyUpDownEvents: keyUpDownEvents
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/behavioural",
	            body: payload,
	        });
	    }
	    api.sendEvents = sendEvents;
	    /**
	     * Make request to retrieve voice token.
	     * @param sessionId session identifier
	     * @param tokenType token type
	     * @param metadata metadata string to be sent with the request
	     * @return Created request object
	     */
	    function getVoiceChallenge(sessionId, tokenType, metadata) {
	        var payload = {
	            session: sessionId,
	            tokentype: tokenType,
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/voice/token",
	            body: payload,
	        });
	    }
	    api.getVoiceChallenge = getVoiceChallenge;
	    /**
	     * Make request to send voice recording for enrollment.
	     * @param sessionId session identifier
	     * @param samples recorded voice data array encoded as base64 string.
	     * @param metadata metadata string to be sent with the request
	     * @return Created request object
	     */
	    function enrollVoice(sessionId, samples, metadata) {
	        var payload = {
	            session: sessionId,
	            voices: samples,
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/voice/enroll",
	            body: payload,
	        });
	    }
	    api.enrollVoice = enrollVoice;
	    /**
	     * Make request to send voice recording for authentication.
	     * @param sessionId session identifier
	     * @param samples recorded voice data array encoded as base64 string.
	     * @param metadata metadata string to be sent with the request
	     * @return Created request object
	     */
	    function authenticateVoice(sessionId, samples, metadata) {
	        var payload = {
	            session: sessionId,
	            voices: samples,
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/voice/auth",
	            body: payload,
	        });
	    }
	    api.authenticateVoice = authenticateVoice;
	    /**
	     * Make request to send face video for enrollment.
	     * @param sessionId session identifier
	     * @param samples recorded video data array encoded as base64 string.
	     * @param metadata metadata string to be sent with the request
	     * @return Created request object
	     */
	    function enrollFace(sessionId, data, metadata) {
	        var payload = {
	            session: sessionId,
	            faces: data,
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/face/enroll",
	            body: payload,
	        });
	    }
	    api.enrollFace = enrollFace;
	    /**
	     * Make request to send face video for authentication.
	     * @param sessionId session identifier
	     * @param samples recorded video data array encoded as base64 string.
	     * @param metadata metadata string to be sent with the request
	     * @return Created request object
	     */
	    function authenticateFace(sessionId, data, metadata) {
	        var payload = {
	            session: sessionId,
	            faces: data,
	        };
	        if (metadata) {
	            payload.metadata = metadata;
	        }
	        return request.createRequest({
	            method: "post",
	            uri: "/v1/face/auth",
	            body: payload,
	        });
	    }
	    api.authenticateFace = authenticateFace;
	})(api = exports.api || (exports.api = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var request_1 = __webpack_require__(21);
	var hmac_1 = __webpack_require__(22);
	var base64 = __webpack_require__(25);
	/**
	 * @hidden Signs API request. Signing is done by adding HTTP header
	 * `X-aimbrain-signature` to a request.
	 * @param req request to be signed
	 */
	function signRequest(request) {
	    // HMAC signature message
	    var message = [
	        request.method.toUpperCase(),
	        request.uri.toLowerCase(),
	        JSON.stringify(request.body),
	    ].join("\n");
	    // Generate the signature
	    var signature = base64.encode(hmac_1.hmacSha256(exports.apiSecret, message, true));
	    // Add a signature header
	    request.headers["X-aimbrain-apikey"] = exports.apiKey;
	    request.headers["X-aimbrain-signature"] = signature;
	    return request;
	}
	function setBaseUrl(url) {
	    exports.baseUrl = url;
	}
	exports.setBaseUrl = setBaseUrl;
	function setApiCredentials(key, secret) {
	    exports.apiKey = key;
	    exports.apiSecret = secret;
	}
	exports.setApiCredentials = setApiCredentials;
	function createRequest(config) {
	    config.baseUrl = exports.baseUrl;
	    var request = new request_1.Request(config);
	    request.headers["Content-Type"] = "application/json";
	    if (exports.apiKey != null && exports.apiSecret != null) {
	        signRequest(request);
	    }
	    return request;
	}
	exports.createRequest = createRequest;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var promise_1 = __webpack_require__(14);
	var object = __webpack_require__(2);
	var UnrecognizedResponseError = 1;
	var RequestError = 3;
	/**
	 * Request class.
	 *
	 * Encapsulates a request to an API endpoint, with ability to serialize it
	 * without actually making a request.
	 *
	 * Has a Promise-like .then() method, for ease of use.
	 *
	 * .send() will explicitly send a request.
	 * .serialize() will return the request payload without sending a request.
	 */
	var Request = (function () {
	    function Request(config) {
	        /**
	         * Array of middlewares
	         */
	        this.middleware = [];
	        // Initialize from config
	        if (config) {
	            object.defaults(this, config);
	        }
	        this.headers = this.headers || {};
	        this.uri = this.uri || "";
	    }
	    /**
	     * Handles an API response while making a request to an API endpoint.
	     */
	    Request.prototype.then = function (onResolve, onReject) {
	        return this.send().then(onResolve, onReject);
	    };
	    /**
	     * Handles an API response without making a request.
	     *
	     * Useful as a middleware for the request.
	     *
	     * NOTE: Beware of heavy type-casting! This function mutates the object
	     * while changing its signature.
	     */
	    Request.prototype.use = function (onResolve, onReject) {
	        this.middleware.push({ onResolve: onResolve, onReject: onReject });
	        return this;
	    };
	    /**
	     * Makes a request to an API endpoint.
	     * Returns a Promise wrapping a response of a generic type T.
	     */
	    Request.prototype.send = function () {
	        var _this = this;
	        // Return a cached promise
	        if (this.promise) {
	            return this.promise;
	        }
	        // Create an XHR object
	        var xhr = new XMLHttpRequest();
	        // Open it
	        xhr.open(this.method, this.baseUrl + this.uri);
	        // Set headers
	        for (var i in this.headers) {
	            if (this.headers.hasOwnProperty(i)) {
	                xhr.setRequestHeader(i, this.headers[i]);
	            }
	        }
	        // Create a response promise
	        this.promise = new promise_1.Promise(function (resolve, reject) {
	            xhr.addEventListener("load", function () {
	                var response;
	                try {
	                    response = JSON.parse(xhr.responseText);
	                    if (xhr.status !== 200) {
	                        response.errorCode = xhr.status;
	                    }
	                }
	                catch (e) {
	                    response = {
	                        error: xhr.response,
	                        errorCode: UnrecognizedResponseError
	                    };
	                }
	                if (xhr.status !== 200) {
	                    return reject(response);
	                }
	                else {
	                    return resolve(response);
	                }
	            });
	            xhr.addEventListener("error", function (e) {
	                reject({
	                    errorCode: RequestError,
	                    error: e
	                });
	            });
	            // Send with JSON payload
	            if (_this.body) {
	                var body = JSON.stringify(_this.body);
	                try {
	                    return xhr.send(body);
	                }
	                catch (e) {
	                    reject({
	                        errorCode: RequestError,
	                        error: e
	                    });
	                }
	            }
	            // Send without payload
	            try {
	                return xhr.send();
	            }
	            catch (e) {
	                reject({
	                    errorCode: RequestError,
	                    error: e
	                });
	            }
	        });
	        // Apply middleware to the promise
	        this.middleware.forEach(function (_a) {
	            var onResolve = _a.onResolve, onReject = _a.onReject;
	            _this.promise = _this.promise.then(onResolve, onReject);
	        });
	        // Return a promise
	        return this.promise;
	    };
	    /**
	     * Serializes the payload to be sent to an API endpoint.
	     */
	    Request.prototype.serialize = function () {
	        return JSON.stringify(this.body);
	    };
	    return Request;
	}());
	exports.Request = Request;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var sha256_1 = __webpack_require__(23);
	var convert = __webpack_require__(24);
	/**
	 * HMAC signature function
	 *
	 * All parameters with number[] are uint8array
	 */
	function hmac(blockSize, hashFn, key, message) {
	    var blockSizeBytes = blockSize / 8 | 0;
	    // Pre-process the key
	    if (key.length < blockSizeBytes) {
	        // Add zero-padding
	        for (var i = key.length; i & blockSizeBytes; i++) {
	            key.push(0);
	        }
	    }
	    else if (key.length > blockSizeBytes) {
	        // Truncate by applying a hashing function
	        key = hashFn(key);
	    }
	    // Create an outer padding key
	    var outerKey = [];
	    for (var i = 0; i < blockSizeBytes; i++) {
	        outerKey.push(0x5c ^ key[i]);
	    }
	    // Create an inner padding key
	    var innerKey = [];
	    for (var i = 0; i < blockSizeBytes; i++) {
	        innerKey.push(0x36 ^ key[i]);
	    }
	    // Apply hashing
	    return hashFn(outerKey.concat(hashFn(innerKey.concat(message))));
	}
	exports.hmac = hmac;
	function hmacSha256(key, message, toUint8) {
	    if (toUint8 === void 0) { toUint8 = false; }
	    if (typeof key === "string") {
	        key = convert.stringToUint8Array(key);
	    }
	    if (typeof message === "string") {
	        message = convert.stringToUint8Array(message);
	    }
	    var output = hmac(512, function (x) { return sha256_1.default(x, true); }, key, message);
	    if (toUint8) {
	        return output;
	    }
	    return convert.uint8ArrayToHex(output);
	}
	exports.hmacSha256 = hmacSha256;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var convert = __webpack_require__(24);
	// Initial hash
	var H = [
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
	];
	// Block coefficients
	var K = [
	    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
	];
	/**
	 * SHA-256 block hasher
	 *
	 * NOTE: Block size is 512 (0x80)
	 */
	function sha256Block(block, h) {
	    var tmp;
	    var a;
	    var b;
	    var w = block.slice(0);
	    var h0 = h[0];
	    var h1 = h[1];
	    var h2 = h[2];
	    var h3 = h[3];
	    var h4 = h[4];
	    var h5 = h[5];
	    var h6 = h[6];
	    var h7 = h[7];
	    for (var i = 0; i < 64; i++) {
	        if (i < 16) {
	            tmp = w[i];
	        }
	        else {
	            a = w[(i + 1) & 15];
	            b = w[(i + 14) & 15];
	            tmp = w[i & 15] = ((a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14)
	                + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13)
	                + w[i & 15] + w[(i + 9) & 15]) | 0;
	        }
	        tmp += h7
	            + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7)
	            + (h6 ^ h4 & (h5 ^ h6)) + K[i];
	        h7 = h6;
	        h6 = h5;
	        h5 = h4;
	        h4 = h3 + tmp | 0;
	        h3 = h2;
	        h2 = h1;
	        h1 = h0;
	        h0 = (tmp + ((h1 & h2) ^ (h3 & (h1 ^ h2)))
	            + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10)) | 0;
	    }
	    h[0] = h[0] + h0 | 0;
	    h[1] = h[1] + h1 | 0;
	    h[2] = h[2] + h2 | 0;
	    h[3] = h[3] + h3 | 0;
	    h[4] = h[4] + h4 | 0;
	    h[5] = h[5] + h5 | 0;
	    h[6] = h[6] + h6 | 0;
	    h[7] = h[7] + h7 | 0;
	    return h;
	}
	function sha256(input, toUint8) {
	    if (toUint8 === void 0) { toUint8 = false; }
	    var bytes = input;
	    if (typeof input === "string") {
	        bytes = convert.stringToUint8Array(input);
	    }
	    // Save initial length
	    var initialLength = bytes.length;
	    // Pre-processing: add '1' bit to the end of the message
	    bytes.push(0x80);
	    // Convert to words
	    var words = convert.uint8ArrayToUint32Array(bytes);
	    // Pre-processing: Add zero padding
	    // NOTE: Leave 64 bits for the "length" (skip 2 iterations)
	    for (var i = words.length + 2; i & 0x0f; i++) {
	        words.push(0);
	    }
	    // Pre-processing: Append a 64-bit length
	    words.push(initialLength / 0x100000000 | 0);
	    words.push(initialLength * 8 | 0);
	    // Apply hashing function to all blocks
	    var hash = H.slice(0);
	    for (var i = 0; i < words.length; i += 0x10) {
	        hash = sha256Block(words.slice(i, i + 0x10), hash);
	    }
	    // Return the result
	    if (toUint8) {
	        return convert.uint32ArrayToUint8Array(hash);
	    }
	    return convert.uint32ArrayToHex(hash);
	}
	exports.default = sha256;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function stringToHex(input) {
	    return uint8ArrayToHex(stringToUint8Array(input));
	}
	exports.stringToHex = stringToHex;
	function stringToUint8Array(input) {
	    var output = [];
	    for (var i = 0; i < input.length; i++) {
	        output.push(input.charCodeAt(i));
	    }
	    return output;
	}
	exports.stringToUint8Array = stringToUint8Array;
	function stringToUint32Array(input) {
	    return uint8ArrayToUint32Array(stringToUint8Array(input));
	}
	exports.stringToUint32Array = stringToUint32Array;
	;
	function hexToString(input) {
	    return uint8ArrayToString(hexToUint8Array(input));
	}
	exports.hexToString = hexToString;
	function hexToUint8Array(input) {
	    var output = [];
	    for (var i = 0; i < input.length; i += 2) {
	        output.push(parseInt(input.substr(i, 2), 16));
	    }
	    return output;
	}
	exports.hexToUint8Array = hexToUint8Array;
	function hexToUint32Array(input) {
	    return uint8ArrayToUint32Array(hexToUint8Array(input));
	}
	exports.hexToUint32Array = hexToUint32Array;
	function uint8ArrayToString(input) {
	    return input.map(function (x) { return String.fromCharCode(x); }).join("");
	}
	exports.uint8ArrayToString = uint8ArrayToString;
	function uint8ArrayToHex(input) {
	    var output = "";
	    for (var i = 0; i < input.length; i++) {
	        output += (input[i] < 0x10 ? "0" : "") + input[i].toString(16);
	    }
	    return output;
	}
	exports.uint8ArrayToHex = uint8ArrayToHex;
	function uint8ArrayToUint32Array(input) {
	    var output = [];
	    var length = input.length;
	    var tmp = 0;
	    var i = 0;
	    for (i = 0; i < length || (i & 3) !== 0; i++) {
	        tmp <<= 8;
	        if (i < length) {
	            tmp |= input[i];
	        }
	        if ((i & 3) === 3) {
	            output.push(tmp);
	            tmp = 0;
	        }
	    }
	    return output;
	}
	exports.uint8ArrayToUint32Array = uint8ArrayToUint32Array;
	function uint32ArrayToString(input, outputLenght) {
	    return uint8ArrayToString(uint32ArrayToUint8Array(input, outputLenght));
	}
	exports.uint32ArrayToString = uint32ArrayToString;
	function uint32ArrayToHex(input, outputLenght) {
	    return uint8ArrayToHex(uint32ArrayToUint8Array(input, outputLenght));
	}
	exports.uint32ArrayToHex = uint32ArrayToHex;
	function uint32ArrayToUint8Array(input, outputLength) {
	    var output = [];
	    var length = input.length;
	    for (var i = 0; i < length; i++) {
	        var value = input[i];
	        for (var i_1 = 3; i_1 >= 0; i_1--) {
	            output.push(value >> 8 * i_1 & 0xff);
	        }
	    }
	    if (outputLength) {
	        return output.slice(0, outputLength);
	    }
	    return output;
	}
	exports.uint32ArrayToUint8Array = uint32ArrayToUint8Array;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var convert = __webpack_require__(24);
	var BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	function encode(input) {
	    if (typeof input === "string") {
	        input = convert.stringToUint8Array(input);
	    }
	    var output = "";
	    for (var i = 0; i < input.length;) {
	        var chr1 = input[i++];
	        var chr2 = input[i++];
	        var chr3 = input[i++];
	        var enc1 = chr1 >> 2;
	        var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        var enc4 = chr3 & 63;
	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        }
	        else if (isNaN(chr3)) {
	            enc4 = 64;
	        }
	        output += BASE64.charAt(enc1) + BASE64.charAt(enc2)
	            + BASE64.charAt(enc3) + BASE64.charAt(enc4);
	    }
	    return output;
	}
	exports.encode = encode;
	function decode(input, toUint8) {
	    if (toUint8 === void 0) { toUint8 = false; }
	    var output = [];
	    // Clean up input
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	    for (var i = 0; i < input.length;) {
	        var enc1 = BASE64.indexOf(input.charAt(i++));
	        var enc2 = BASE64.indexOf(input.charAt(i++));
	        var enc3 = BASE64.indexOf(input.charAt(i++));
	        var enc4 = BASE64.indexOf(input.charAt(i++));
	        var chr1 = (enc1 << 2) | (enc2 >> 4);
	        var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        var chr3 = ((enc3 & 3) << 6) | enc4;
	        output.push(chr1);
	        if (enc3 !== 64) {
	            output.push(chr2);
	        }
	        if (enc4 !== 64) {
	            output.push(chr3);
	        }
	    }
	    if (toUint8) {
	        return output;
	    }
	    return convert.uint8ArrayToString(output);
	}
	exports.decode = decode;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var global_1 = __webpack_require__(13);
	var api_1 = __webpack_require__(19);
	var Session = (function () {
	    function Session(userId, session, behaviour, face, voice) {
	        this.userId = userId;
	        this.session = session;
	        this.behaviour = behaviour;
	        this.face = face;
	        this.voice = voice;
	    }
	    Session.prototype.getId = function () {
	        return this.session;
	    };
	    Session.prototype.isBehaviouralEnrolled = function () {
	        return this.behaviour === api_1.api.EnrollmentStatus.Enrolled;
	    };
	    Session.prototype.isBehaviouralBuilding = function () {
	        return this.behaviour === api_1.api.EnrollmentStatus.Building;
	    };
	    Session.prototype.isFacialEnrolled = function () {
	        return this.face === api_1.api.EnrollmentStatus.Enrolled;
	    };
	    Session.prototype.isFacialBuilding = function () {
	        return this.face === api_1.api.EnrollmentStatus.Building;
	    };
	    Session.prototype.isVoiceEnrolled = function () {
	        return this.voice === api_1.api.EnrollmentStatus.Enrolled;
	    };
	    Session.prototype.isVoiceBuilding = function () {
	        return this.voice === api_1.api.EnrollmentStatus.Building;
	    };
	    return Session;
	}());
	exports.Session = Session;
	var sessionKey = "aimbrain_session";
	var scoreKey = "aimbrain_score";
	var storage = global_1.global.sessionStorage;
	var cachedSession;
	var cachedScore;
	function getCachedSessionScore() {
	    if (cachedScore) {
	        return cachedScore;
	    }
	    var serialized;
	    serialized = storage.getItem(scoreKey);
	    if (serialized) {
	        cachedScore = parseFloat(serialized);
	        return cachedScore;
	    }
	    return null;
	}
	exports.getCachedSessionScore = getCachedSessionScore;
	function setCachedSessionScore(score) {
	    cachedScore = score;
	    storage.setItem(scoreKey, score.toString());
	}
	exports.setCachedSessionScore = setCachedSessionScore;
	function getCachedSession() {
	    if (cachedSession) {
	        return cachedSession;
	    }
	    var serialized;
	    if (storage) {
	        serialized = storage.getItem(sessionKey);
	    }
	    if (serialized) {
	        var _a = JSON.parse(serialized), userId = _a.userId, sessionId = _a.sessionId, behaviour = _a.behaviour, face = _a.face, voice = _a.voice;
	        cachedSession = new Session(userId, sessionId, behaviour, face, voice);
	        return cachedSession;
	    }
	    return null;
	}
	exports.getCachedSession = getCachedSession;
	function setCachedSession(session) {
	    cachedSession = session;
	    if (storage) {
	        var serialized = JSON.stringify({
	            userId: session.userId,
	            sessionId: session.session,
	            face: session.face,
	            voice: session.voice,
	            behaviour: session.behaviour
	        });
	        storage.setItem(sessionKey, serialized);
	    }
	}
	exports.setCachedSession = setCachedSession;
	function clearCache() {
	    cachedSession = null;
	    cachedScore = null;
	    if (storage) {
	        storage.removeItem(sessionKey);
	        storage.removeItem(scoreKey);
	    }
	}
	exports.clearCache = clearCache;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var object = __webpack_require__(2);
	var DialogStatus;
	(function (DialogStatus) {
	    DialogStatus[DialogStatus["Initialising"] = 0] = "Initialising";
	    DialogStatus[DialogStatus["Ready"] = 1] = "Ready";
	    DialogStatus[DialogStatus["Progress"] = 2] = "Progress";
	})(DialogStatus = exports.DialogStatus || (exports.DialogStatus = {}));
	var DialogEvent;
	(function (DialogEvent) {
	    DialogEvent[DialogEvent["CloseClicked"] = 0] = "CloseClicked";
	    DialogEvent[DialogEvent["RecordClicked"] = 1] = "RecordClicked";
	    DialogEvent[DialogEvent["StopClicked"] = 2] = "StopClicked";
	})(DialogEvent = exports.DialogEvent || (exports.DialogEvent = {}));
	__webpack_require__(28);
	var dialogHtml = __webpack_require__(34);
	function appendHtml(element, html) {
	    var temporary = document.createElement("div");
	    temporary.innerHTML = html;
	    return element.appendChild(temporary.firstChild);
	}
	var dialogElement;
	var dialogReady;
	var dialogOptions;
	function el(cls) {
	    if (dialogElement) {
	        return dialogElement.getElementsByClassName(cls)[0];
	    }
	    return null;
	}
	function open(eventCallback, options) {
	    console.log('open face ui');
	    if (options == null) {
	        options = {};
	    }
	    dialogOptions = object.defaults(options, {
	        headerText: "",
	        hintText: "",
	        capturingText: "",
	        progressTimerText: ""
	    });
	    if (!dialogElement) {
	        dialogElement = appendHtml(document.body, dialogHtml);
	        el("aimbrain-face-close").addEventListener("click", function (event) {
	            eventCallback(DialogEvent.CloseClicked);
	        });
	        el("aimbrain-face-record-button").addEventListener("click", function (event) {
	            if (dialogReady) {
	                eventCallback(DialogEvent.RecordClicked);
	            }
	        });
	        el("aimbrain-face-stop-button").addEventListener("click", function (event) {
	            eventCallback(DialogEvent.StopClicked);
	        });
	    }
	    dialogReady = false;
	    setStatus(DialogStatus.Initialising);
	}
	exports.open = open;
	function setStatus(status, progress) {
	    if (dialogElement) {
	        switch (status) {
	            case DialogStatus.Initialising:
	                dialogReady = false;
	                el("aimbrain-face-record-button").style.display = "none";
	                el("aimbrain-face-stop-button").style.display = "none";
	                el("aimbrain-face-header-label").innerHTML = dialogOptions.headerText;
	                el("aimbrain-face-hint-label").innerHTML = dialogOptions.hintText;
	                break;
	            case DialogStatus.Ready:
	                dialogReady = true;
	                el("aimbrain-face-record-button").style.display = "block";
	                el("aimbrain-face-stop-button").style.display = "none";
	                el("aimbrain-face-header-label").innerHTML = dialogOptions.headerText;
	                el("aimbrain-face-hint-label").innerHTML = dialogOptions.hintText;
	                break;
	            case DialogStatus.Progress:
	                dialogReady = true;
	                el("aimbrain-face-header-label").innerHTML = "";
	                el("aimbrain-face-hint-label").innerHTML = dialogOptions.capturingText;
	                var progressText = dialogOptions.progressTimerText.replace("{s}", progress);
	                el("aimbrain-face-progress-label").innerHTML = progressText;
	                el("aimbrain-face-record-button").style.display = "none";
	                el("aimbrain-face-stop-button").style.display = "block";
	                break;
	        }
	    }
	}
	exports.setStatus = setStatus;
	function getVideoElement() {
	    if (dialogElement) {
	        return el("aimbrain-face-video");
	    }
	    else {
	        return null;
	    }
	}
	exports.getVideoElement = getVideoElement;
	function getCanvasElement() {
	    if (dialogElement) {
	        return el("aimbrain-face-canvas");
	    }
	    else {
	        return null;
	    }
	}
	exports.getCanvasElement = getCanvasElement;
	function close() {
	    console.log('close face ui');
	    if (dialogElement) {
	        dialogElement.parentNode.removeChild(dialogElement);
	        dialogElement = null;
	        dialogOptions = null;
	    }
	}
	exports.close = close;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./popup.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./popup.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".aimbrain-dialog-wrapper {\n    position: fixed;\n    background-color: rgba(0, 0, 0, .75);\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 100;\n    font-size:14px;\n}\n\n.aimbrain-dialog-face {\n    top: 50%;\n    left: 50%;\n    position: absolute;\n    transform: translate(-50%, -50%);\n    z-index: 9999;\n    box-shadow: 2px 2px 25px rgba(0, 0, 0, .25);\n    box-sizing: border-box;\n    color: #fff;\n}\n\n.aimbrain-dialog-face {\n    background-color: #000;\n    width: 360px;\n    height: 480px;\n    display: flex;\n    flex-direction: column;\n}\n\n.aimbrain-dialog-face {\n    font-family: Arial, \"Helvetica Neue\", Helvetica, sans-serif;\n}\n\n.aimbrain-face-close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 50px;\n    height: 50px;\n    margin: 5px;\n    background-image: url(" + __webpack_require__(30) + ");\n    background-size: 75%;\n    background-position: center;\n    background-repeat: no-repeat;\n    cursor: pointer;\n}\n\n.aimbrain-face-close:active {\n    opacity: 0.75;\n}\n\n.aimbrain-face-video-wrapper {\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    overflow: hidden;\n    padding: 0;\n    margin: 0;\n}\n\n.aimbrain-face-video {\n    height: 480px;\n    margin: 0;\n    position: relative;\n    left: 50%;\n    transform: translate(-50%, 0%);\n}\n\n.aimbrain-face-viewfinder {\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    overflow: hidden;\n    padding: 0;\n    margin: 0;\n    \n    background-image: url(" + __webpack_require__(31) + ");\n    position: absolute;\n    background-size: 100% 100%;\n}\n\n.aimbrain-face-header-label {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    min-height: 70px;\n    max-width: 60%;\n    margin-left: auto;\n    margin-right: auto;\n    z-index: 10;\n}\n\n.aimbrain-face-filler {   \n    flex-grow: 1;  \n    display: flex;\n}\n\n.aimbrain-face-hint-label {\n    text-align: center;\n    font-size: 16px; \n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    z-index: 10;\n}\n\n.aimbrain-face-controls {\n    min-height: 70px;\n    position: relative;\n    display: flex;\n    align-items: center;\n    padding-left: 28px;\n    z-index: 10;\n}\n\n.aimbrain-face-record-button {\n    position: absolute;\n    width: 60px;\n    height: 60px;\n    background-image: url(" + __webpack_require__(32) + ");\n    background-size: 50%;\n    background-position: center;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    z-index: 9999;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.aimbrain-face-stop-button {\n    position: absolute;\n    width: 60px;\n    height: 60px;\n    background-image: url(" + __webpack_require__(33) + ");\n    background-size: 60%;\n    background-position: center;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    z-index: 9999;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.aimbrain-face-progress-label {\n    max-width: 30%;\n    text-align: center;\n}\n\n.aimbrain-face-record-button:active, .aimbrain-face-stop-button:active  {\n    opacity: 0.75;\n}\n\n.aimbrain-face-canvas {\n    display: block;\n    width: 240px;\n    height: 320px;\n    z-index: -1;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n\n", ""]);
	
	// exports


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB2aWV3Qm94PSIwIDAgOTM3LjUgMTI1MCIKICAgZmlsbD0iIzAwMDAwMCIKICAgb3BhY2l0eT0iMC42IgogICBoZWlnaHQ9IjEyNTAiCiAgIHdpZHRoPSI5MzcuNSIKICAgdmVyc2lvbj0iMS4xIj4KICA8cGF0aAogICAgIGQ9Ik0gMCw2MjUgMCwwIDQ2OC43NSwwIDkzNy41LDAgbCAwLDYyNSAwLDYyNSAtNDY4Ljc1LDAgTCAwLDEyNTAgMCw2MjUgWiBtIDQ4OC40Mzc1LDQyNC45ODMgYyAzNy40NDc2MywtMi40ODczIDczLjA1MDA3LC0xMS45NTA2IDEwNi4wMDEyOSwtMjguMTc1OCAxNC40OTczOCwtNy4xMzg0IDE5LjI2ODMyLC05Ljg4NzMgMzMuMDYxMjEsLTE5LjA0ODYgNTkuMjkwMTIsLTM5LjM4MTE2IDEwMS43NDUyNSwtOTkuNzk0ODUgMTE4LjQxOTY5LC0xNjguNTExMTYgNC40NTc3NSwtMTguMzcwNzUgNi43MDQ1NiwtMzMuNjEyODggNy44MTIxOCwtNTIuOTk3NDQgMC44MzQ2OSwtMTQuNjA3NTYgMC44NDUwNywtMzEyLjE1NTE1IDAuMDExMywtMzI2LjUxMzg4IC0xLjE3MjI1LC0yMC4xOTAwMyAtMy41MjAxMiwtMzUuODk2MjMgLTguMTc3MjUsLTU0LjcwMjQ2IEMgNzI1LjU1MzU2LDMxOS4yMTk2MSA2NjguNzc5MTksMjQ5LjU3NjczIDU5My40Mzc1LDIxMy40MjM1MiA1NTguNzg2ODcsMTk2Ljc5NjE5IDUyMy44MzkyMywxODcuODQ2MzcgNDg1LDE4NS42NTM1NCBjIC03Mi4yMTkwMywtNC4wNzc0NSAtMTMyLjIxNzksMTEuNTMwMiAtMTg3LjUsNDguNzc0ODMgLTYzLjIyOTQsNDIuNTk4ODcgLTEwNy44MDk2LDExMS42NjU5NiAtMTIwLjI4NjMsMTg2LjM1Njg0IC0zLjk2MTUsMjMuNzE1MjQgLTMuNjc1MTYsOS44MDY4OCAtMy45Mjc2LDE5MC43NzcyOSAtMC4yMzM5NywxNjcuNzMxNzUgLTAuMTcwMDksMTczLjU5NDE5IDIuMDgzOTksMTkxLjI1IDEwLjM3MTUyLDgxLjIzODI1IDU1LjgxMTA4LDE1NC4zMzE2OSAxMjQuNDY3MDQsMjAwLjIxNTkgNDAuNjE3NDQsMjcuMTQ1NSA4OC40NjM3Nyw0My40NTA0IDEzNy42NjI4Nyw0Ni45MTI0IDEwLjQ5MjQ0LDAuNzM4MyA0MC4wODgxOSwwLjc2MjggNTAuOTM3NSwwLjA0MyB6IiAvPgo8L3N2Zz4K"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMuMiIvPgogICAgPHBhdGggZD0iTTkgMkw3LjE3IDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC0zLjE3TDE1IDJIOXptMyAxNWMtMi43NiAwLTUtMi4yNC01LTVzMi4yNC01IDUtNSA1IDIuMjQgNSA1LTIuMjQgNS01IDV6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik02IDZoMTJ2MTJINnoiLz4KPC9zdmc+"

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"aimbrain-dialog-wrapper\">\n    <div class=\"aimbrain-dialog-face\">\n        <div class=\"aimbrain-face-video-wrapper\">\n            <video autoplay class=\"aimbrain-face-video\"></video>\n        </div>\n        <div class=\"aimbrain-face-viewfinder\"></div>\n        <canvas width=\"360\" height=\"480\" class=\"aimbrain-face-canvas\"></canvas>\n        <div class=\"aimbrain-face-close\"></div>\n        <div class=\"aimbrain-face-header-label\"></div>\n        <div class=\"aimbrain-face-filler\"></div>\n        <div class=\"aimbrain-face-hint-label\"></div>\n        <div class=\"aimbrain-face-controls\">\n            <div class=\"aimbrain-face-progress-label\"></div>\n\t\t    <div class=\"aimbrain-face-record-button\"></div>\n            <div class=\"aimbrain-face-stop-button\"></div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ui = __webpack_require__(27);
	var _1 = __webpack_require__(36);
	var video = __webpack_require__(38);
	exports.defaultDuration = 3000;
	exports.defaultImages = 3;
	var timerIntervalId;
	var recordingStarted = 0;
	function recordFace(options, captureImages, imageCount) {
	    if (imageCount === void 0) { imageCount = exports.defaultImages; }
	    var captureVideo = !captureImages;
	    if (captureVideo && !video.isVideoSupported()) {
	        console.log("video not supported");
	        return Promise.reject(_1.facial.RecordingError.NotSupported);
	    }
	    if (captureImages && !video.isImagingSupported()) {
	        console.log("iamges not supported");
	        return Promise.reject(_1.facial.RecordingError.NotSupported);
	    }
	    return new Promise(function (resolve, reject) {
	        ui.open(function (event) {
	            switch (event) {
	                case ui.DialogEvent.CloseClicked:
	                    cancelRecording();
	                    reject(_1.facial.RecordingError.PopupClosed);
	                    break;
	                case ui.DialogEvent.RecordClicked:
	                    if (captureVideo && video.isVideoSupported()) {
	                        startProgressTimer(exports.defaultDuration);
	                        video.captureVideo(exports.defaultDuration).then(function (result) {
	                            stopProgressTimer();
	                            ui.close();
	                            resolve(result);
	                        }, function (e) {
	                            console.log(e);
	                            stopProgressTimer();
	                            ui.close();
	                            reject(_1.facial.RecordingError.UnexpectedError);
	                        });
	                    }
	                    else if (captureImages && video.isImagingSupported()) {
	                        var duration = Math.min(imageCount * 1000, exports.defaultDuration);
	                        startProgressTimer(duration);
	                        video.captureImages(duration, imageCount).then(function (result) {
	                            stopProgressTimer();
	                            ui.close();
	                            resolve(result);
	                        }, function (e) {
	                            console.log(e);
	                            stopProgressTimer();
	                            ui.close();
	                            reject(_1.facial.RecordingError.UnexpectedError);
	                        });
	                    }
	                    else {
	                        ui.close();
	                        reject(_1.facial.RecordingError.NotSupported);
	                    }
	                    break;
	                case ui.DialogEvent.StopClicked:
	                    cancelRecording();
	                    reject(_1.facial.RecordingError.PopupClosed);
	                    break;
	            }
	        }, options);
	        video.initVideo(captureVideo, ui.getVideoElement(), ui.getCanvasElement()).then(function () {
	            ui.setStatus(ui.DialogStatus.Ready);
	        }).catch(function (e) {
	            console.log(e);
	            ui.close();
	            reject(_1.facial.RecordingError.NoDevice);
	        });
	    });
	}
	exports.recordFace = recordFace;
	function startProgressTimer(duration) {
	    ui.setStatus(ui.DialogStatus.Progress, Math.round(duration / 1000).toString());
	    recordingStarted = Date.now();
	    timerIntervalId = setInterval(function () {
	        var currentTime = Date.now();
	        if (recordingStarted !== 0
	            && recordingStarted + duration >= currentTime) {
	            var timeLeft = Math.round((duration - (currentTime - recordingStarted)) / 1000);
	            ui.setStatus(ui.DialogStatus.Progress, timeLeft.toString());
	        }
	        if (recordingStarted + duration < currentTime && timerIntervalId) {
	            clearInterval(timerIntervalId);
	            ui.setStatus(ui.DialogStatus.Progress, "0");
	        }
	    }, 1000);
	}
	function stopProgressTimer() {
	    if (timerIntervalId) {
	        clearInterval(timerIntervalId);
	        timerIntervalId = null;
	    }
	}
	function cancelRecording() {
	    console.log("cancel recording");
	    video.stopRecording();
	    stopProgressTimer();
	    ui.close();
	}
	exports.cancelRecording = cancelRecording;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var calls = __webpack_require__(37);
	var video = __webpack_require__(38);
	var recording = __webpack_require__(35);
	/**
	 * [[include:facial-module.md]]
	 */
	var facial;
	(function (facial) {
	    /**
	     * Face capture mode
	     */
	    var RecordingMode;
	    (function (RecordingMode) {
	        /**
	         * Recording captures video.
	         */
	        RecordingMode[RecordingMode["Video"] = 0] = "Video";
	        /**
	         * Recording captures image list.
	         */
	        RecordingMode[RecordingMode["Images"] = 1] = "Images";
	    })(RecordingMode = facial.RecordingMode || (facial.RecordingMode = {}));
	    /**
	     * Check if face module is supported by current browser.
	     * @param mode Recording mode to be used
	     * @return if face module can be used with supplied mode.
	     */
	    function isSupported(mode) {
	        switch (mode) {
	            case RecordingMode.Video:
	                return video.isVideoSupported();
	            case RecordingMode.Images:
	                return video.isImagingSupported();
	            default:
	                return false;
	        }
	    }
	    facial.isSupported = isSupported;
	    /**
	     * Face enrollment
	     * @param data recording created using [[recordFaceVideo]]
	     * @param metadata
	     * @param serialize flag to request serialised API call body instead of performing API call
	     */
	    function enrollWithData(data, metadata, serialize) {
	        return calls.enrollWithData(data, metadata, serialize);
	    }
	    facial.enrollWithData = enrollWithData;
	    /**
	     * Face authentication
	     * @param data recording created using [[recordFaceVideo]]
	     * @param metadata
	     * @param serialize flag to request serialised API call body instead of performing API call
	     */
	    function authenticateWithData(data, metadata, serialize) {
	        return calls.authenticateWithData(data, metadata, serialize);
	    }
	    facial.authenticateWithData = authenticateWithData;
	    /**
	     * Error codes used when recording fails
	     */
	    var RecordingError;
	    (function (RecordingError) {
	        /**
	         * User closed popup.
	         */
	        RecordingError[RecordingError["PopupClosed"] = 0] = "PopupClosed";
	        /**
	         * Recording is not supported by browser
	         */
	        RecordingError[RecordingError["NotSupported"] = -1] = "NotSupported";
	        /**
	         * No recording device is present
	         */
	        RecordingError[RecordingError["NoDevice"] = -2] = "NoDevice";
	        /**
	         * Error while trying to record
	         */
	        RecordingError[RecordingError["UnexpectedError"] = -3] = "UnexpectedError";
	    })(RecordingError = facial.RecordingError || (facial.RecordingError = {}));
	    /**
	     * Displays face recording popup and records face video.
	     * @param options recording dialog display options
	     * @return Promise resolving to string array with base64 encoded video recording
	     */
	    function recordFaceVideo(options) {
	        return recording.recordFace(options, false);
	    }
	    facial.recordFaceVideo = recordFaceVideo;
	    /**
	     * Displays face recording popup and records face images.
	     * @param options recording dialog display options
	     * @param imageCount number of images to be recorded
	     * @return Promise resolving to string array with base64 encoded recorded images.
	     */
	    function recordFaceImages(options, imageCount) {
	        if (imageCount === void 0) { imageCount = 1; }
	        return recording.recordFace(options, true, imageCount);
	    }
	    facial.recordFaceImages = recordFaceImages;
	})(facial = exports.facial || (exports.facial = {}));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var promise_1 = __webpack_require__(14);
	var api_1 = __webpack_require__(19);
	var state = __webpack_require__(26);
	function enrollWithData(data, metadata, serialize) {
	    var session = state.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.enrollFace(session.getId(), data, metadata).serialize());
	    }
	    else {
	        return api_1.api.enrollFace(session.getId(), data, metadata).send();
	    }
	    ;
	}
	exports.enrollWithData = enrollWithData;
	function authenticateWithData(data, metadata, serialize) {
	    var session = state.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.authenticateFace(session.getId(), data, metadata).serialize());
	    }
	    else {
	        return api_1.api.authenticateFace(session.getId(), data, metadata).send()
	            .then(function (result) {
	            state.setCachedSessionScore(result.score);
	            return result;
	        });
	    }
	    ;
	}
	exports.authenticateWithData = authenticateWithData;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var global_1 = __webpack_require__(13);
	var blob = __webpack_require__(12);
	var getUserMedia;
	var imagesSupported;
	var videoSupported;
	var recordingOptions;
	var videoElement;
	var canvasElement;
	var videoStream;
	var imageWidth = 240;
	var imageHeight = 320;
	var videoOptionCandidates = [
	    true,
	    { facingMode: "user", width: { exact: 640 }, height: { exact: 360 } },
	    { facingMode: "user", width: { exact: 352 }, height: { exact: 288 } },
	    { facingMode: "user", width: { exact: 320 }, height: { exact: 320 } }
	];
	var imageOptionCandidates = [
	    true,
	    { facingMode: "user", width: 640, height: 480 }
	];
	var recordingStarted = 0;
	var canvasIntervalId = 0;
	if (navigator.getUserMedia) {
	    // other
	    getUserMedia = navigator.getUserMedia;
	    imagesSupported = true;
	}
	else if (navigator.mozGetUserMedia) {
	    // mozila
	    getUserMedia = navigator.mozGetUserMedia;
	    imagesSupported = true;
	}
	else {
	    // unsupported
	    imagesSupported = false;
	}
	if (global_1.global.MediaRecorder) {
	    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
	        recordingOptions = { mimeType: "video/webm; codecs=vp9" };
	        videoSupported = true;
	    }
	    else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
	        recordingOptions = { mimeType: "video/webm; codecs=vp8" };
	        videoSupported = true;
	    }
	    else {
	        videoSupported = false; // no encoding, fallback to images
	    }
	}
	else {
	    videoSupported = false; // no MediaRecorder, fallback to images
	}
	function isVideoSupported() {
	    return videoSupported;
	}
	exports.isVideoSupported = isVideoSupported;
	function isImagingSupported() {
	    return imagesSupported;
	}
	exports.isImagingSupported = isImagingSupported;
	function getUserMediaWithOptions(options, success, failure) {
	    var optionCandidates = options.slice(0);
	    function initUserMedia() {
	        if (optionCandidates.length == 0) {
	            failure();
	        }
	        else {
	            var options_1 = {
	                video: optionCandidates.pop(),
	                audio: false
	            };
	            getUserMedia.call(navigator, options_1, function (stream) {
	                success(stream);
	            }, function (e) {
	                console.log('Failed media with options ' + JSON.stringify(options_1));
	                console.log(e);
	                initUserMedia();
	            });
	        }
	    }
	    initUserMedia();
	}
	function initVideo(videoCapture, videoEl, canvasEl) {
	    return new Promise(function (resolve, reject) {
	        videoElement = videoEl;
	        canvasElement = canvasEl;
	        getUserMediaWithOptions(videoCapture ? videoOptionCandidates : imageOptionCandidates, function (stream) {
	            videoStream = stream;
	            if (typeof videoElement.srcObject == "object") {
	                videoElement.srcObject = stream;
	            }
	            else {
	                videoElement.src = URL.createObjectURL(stream);
	            }
	            if (imagesSupported) {
	                canvasElement.setAttribute('width', imageWidth.toString());
	                canvasElement.setAttribute('height', imageHeight.toString());
	            }
	            resolve();
	        }, function () {
	            reject(new Error('Failed to initialize video'));
	        });
	    });
	}
	exports.initVideo = initVideo;
	function captureVideo(duration) {
	    return new Promise(function (resolve, reject) {
	        var recordedChunks = [];
	        var mediaRecorder = new MediaRecorder(videoStream, recordingOptions);
	        var video = [];
	        recordingStarted = 0;
	        mediaRecorder.ondataavailable = function (event) {
	            if (recordingStarted === 0) {
	                recordingStarted = Date.now();
	            }
	            if (recordingStarted + duration <= Date.now()) {
	                try {
	                    stopRecording();
	                }
	                catch (e) {
	                    console.log(e);
	                }
	                blob.blobToBase64(new Blob(recordedChunks, {
	                    type: "video/webm",
	                })).then(function (result) {
	                    video[0] = result;
	                    resolve(video);
	                });
	            }
	            else if (event.data.size > 0) {
	                recordedChunks.push(event.data);
	            }
	        };
	        mediaRecorder.start(500);
	    });
	}
	exports.captureVideo = captureVideo;
	function base64ImageFromCanvas(el) {
	    return new Promise(function (resolve, reject) {
	        if (el.toBlob) {
	            canvasElement.toBlob(function (value) {
	                blob.blobToBase64(value).then(function (result) {
	                    resolve(result);
	                }).catch(reject);
	            }, "image/jpeg", 0.95);
	        }
	        else {
	            var dataURL = el.toDataURL("image/jpeg");
	            var imageOnly = dataURL.substr(dataURL.indexOf(',') + 1);
	            resolve(imageOnly);
	        }
	    });
	}
	function captureImages(duration, imageCount) {
	    return new Promise(function (resolve, reject) {
	        var counter = 0;
	        var images = [];
	        canvasIntervalId = setInterval(function () {
	            function stopAndResolve() {
	                clearInterval(canvasIntervalId);
	                canvasIntervalId = 0;
	                stopRecording();
	                resolve(images);
	            }
	            if (counter >= imageCount) {
	                stopAndResolve();
	            }
	            else {
	                try {
	                    var srcWidth = videoElement.videoWidth;
	                    var srcHeight = videoElement.videoHeight;
	                    var srcAsp = srcWidth / srcHeight;
	                    var dstAsp = imageWidth / imageHeight;
	                    var srcX = (srcWidth - srcHeight * dstAsp) / 2;
	                    var srcY = 0;
	                    var srcW = srcHeight * dstAsp;
	                    var context = canvasElement.getContext("2d");
	                    context.drawImage(videoElement, srcX, srcY, srcW, srcHeight, 0, 0, imageWidth, imageHeight);
	                    base64ImageFromCanvas(canvasElement).then(function (result) {
	                        images.push(result);
	                        counter++;
	                        if (counter >= imageCount) {
	                            stopAndResolve();
	                        }
	                    })
	                        .catch(function (e) {
	                        stopRecording();
	                        reject(e);
	                    });
	                }
	                catch (e) {
	                    stopRecording();
	                    reject(e);
	                }
	            }
	        }, duration / imageCount);
	    });
	}
	exports.captureImages = captureImages;
	function stopRecording() {
	    try {
	        clearInterval(canvasIntervalId);
	        canvasIntervalId = 0;
	        videoStream.getTracks().forEach(function (track) {
	            track.stop();
	        });
	        videoStream = null;
	        videoElement = null;
	        canvasElement = null;
	    }
	    catch (e) {
	        console.log(e);
	    }
	}
	exports.stopRecording = stopRecording;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var global_1 = __webpack_require__(13);
	var promise_1 = __webpack_require__(14);
	var MouseEventType;
	(function (MouseEventType) {
	    MouseEventType[MouseEventType["UP"] = 0] = "UP";
	    MouseEventType[MouseEventType["DOWN"] = 1] = "DOWN";
	    MouseEventType[MouseEventType["MOVE"] = 2] = "MOVE";
	})(MouseEventType = exports.MouseEventType || (exports.MouseEventType = {}));
	var KeyDirection;
	(function (KeyDirection) {
	    KeyDirection[KeyDirection["UP"] = 0] = "UP";
	    KeyDirection[KeyDirection["DOWN"] = 1] = "DOWN";
	})(KeyDirection = exports.KeyDirection || (exports.KeyDirection = {}));
	;
	var mouseEventStore = "mouseEvents";
	var keyEventStore = "keyEvents";
	var dbName = "aimbrain-sdk";
	var dbVersion = 1;
	var sdkDb;
	function isSupported() {
	    return getDBFactory() != null;
	}
	exports.isSupported = isSupported;
	function getDBFactory() {
	    return global_1.global.indexedDB;
	}
	exports.getDBFactory = getDBFactory;
	function dropSdkDB() {
	    if (sdkDb) {
	        sdkDb.close();
	    }
	    sdkDb = null;
	    getDBFactory().deleteDatabase(dbName);
	}
	exports.dropSdkDB = dropSdkDB;
	function getSdkDB() {
	    if (sdkDb) {
	        return promise_1.Promise.resolve(sdkDb);
	    }
	    return new promise_1.Promise(function (resolve, reject) {
	        var openRequest = getDBFactory().open(dbName, dbVersion);
	        openRequest.onsuccess = function (evt) {
	            sdkDb = this.result;
	            sdkDb.onversionchange = function (event) {
	                console.log("Version change, closing db");
	                if (sdkDb) {
	                    sdkDb.close();
	                }
	                sdkDb = null;
	            };
	            resolve(sdkDb);
	        };
	        openRequest.onerror = function (evt) {
	            reject(evt);
	        };
	        function upgradeV0toV1(db) {
	            var mouseEvents = db.createObjectStore(mouseEventStore, { autoIncrement: true });
	            mouseEvents.createIndex("by_timestamp", "t");
	            var keyEvents = db.createObjectStore(keyEventStore, { autoIncrement: true });
	            keyEvents.createIndex("by_timestamp", "t");
	        }
	        openRequest.onupgradeneeded = function (evt) {
	            var dbRequest = evt.currentTarget;
	            var db = dbRequest.result;
	            for (var ver = evt.oldVersion; ver <= evt.newVersion; ver++) {
	                if (ver == 0) {
	                    upgradeV0toV1(db);
	                }
	            }
	        };
	    });
	}
	exports.getSdkDB = getSdkDB;
	function addMouseEvent(event) {
	    return add(mouseEventStore, event);
	}
	exports.addMouseEvent = addMouseEvent;
	function addKeyEvent(event) {
	    return add(keyEventStore, event);
	}
	exports.addKeyEvent = addKeyEvent;
	function add(objectStore, object) {
	    return getSdkDB().then(function (database) {
	        return new promise_1.Promise(function (resolve, reject) {
	            var transaction = database.transaction(objectStore, "readwrite");
	            transaction.oncomplete = function (evt) {
	                resolve();
	            };
	            transaction.onerror = function (evt) {
	                reject(event);
	            };
	            transaction
	                .objectStore(objectStore)
	                .add(object);
	        });
	    });
	}
	function removeStoredEvents(mouseEvents, keyUpDownEvents) {
	    return getSdkDB().then(function (database) {
	        return new promise_1.Promise(function (resolve, reject) {
	            var transaction = database.transaction([mouseEventStore, keyEventStore], "readwrite");
	            transaction.oncomplete = function (evt) {
	                resolve();
	            };
	            transaction.onerror = function (evt) {
	                reject(event);
	            };
	            function deleteTimeRange(storeName, from, to) {
	                var store = transaction.objectStore(storeName);
	                var timestampIndex = store.index("by_timestamp");
	                var cursor = timestampIndex.openKeyCursor(IDBKeyRange.bound(from, to, false, false));
	                cursor.addEventListener("success", function (e) {
	                    var cursor = e.target.result;
	                    if (cursor) {
	                        store.delete(cursor.primaryKey);
	                        cursor.continue();
	                    }
	                });
	            }
	            if (mouseEvents.length > 0) {
	                var from = mouseEvents[0].t;
	                var to = mouseEvents[mouseEvents.length - 1].t;
	                deleteTimeRange(mouseEventStore, from, to);
	            }
	            if (keyUpDownEvents.length > 0) {
	                var from = keyUpDownEvents[0].t;
	                var to = keyUpDownEvents[keyUpDownEvents.length - 1].t;
	                deleteTimeRange(keyEventStore, from, to);
	            }
	        });
	    });
	}
	exports.removeStoredEvents = removeStoredEvents;
	function getStoredEvents() {
	    return getSdkDB().then(function (database) {
	        var transaction = database.transaction([mouseEventStore, keyEventStore], "readonly");
	        function getAll(store) {
	            return new promise_1.Promise(function (resolve, reject) {
	                var request = transaction.objectStore(store).openCursor();
	                var result = [];
	                request.addEventListener("success", function (e) {
	                    var cursor = e.target.result;
	                    if (cursor) {
	                        result.push(cursor.value);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(result);
	                    }
	                });
	                request.addEventListener("error", function (e) {
	                    reject(e);
	                });
	            });
	        }
	        return promise_1.Promise.all([
	            getAll(mouseEventStore),
	            getAll(keyEventStore)
	        ]);
	    });
	}
	exports.getStoredEvents = getStoredEvents;
	function clearStoredEvents() {
	    return getSdkDB().then(function (database) {
	        return new promise_1.Promise(function (resolve, reject) {
	            var transaction = database.transaction([mouseEventStore, keyEventStore], "readwrite");
	            transaction.oncomplete = function (evt) {
	                resolve();
	            };
	            transaction.onerror = function (evt) {
	                reject(event);
	            };
	            transaction.objectStore(mouseEventStore).clear();
	            transaction.objectStore(keyEventStore).clear();
	        });
	    });
	}
	exports.clearStoredEvents = clearStoredEvents;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_1 = __webpack_require__(19);
	var state_1 = __webpack_require__(26);
	var calls = __webpack_require__(41);
	/**
	 * [[include:session-module.md]]
	 */
	var session;
	(function (session_1) {
	    /**
	     * Create new session. Session must be created before making any other API call requiring session.
	     * @param userId unique user identifier
	     * @param metadata integration specific metadata
	     * @param serialize flag to request serialized request body instead of making API call
	     */
	    function establishSession(userId, metadata, serialize) {
	        return calls.createSession(userId, metadata, serialize);
	    }
	    session_1.establishSession = establishSession;
	    /**
	     * Sets current session identifier. Call does not invoke any API request and is meant
	     * to be used with request serialization.
	     * @param userId unique user identifier
	     * @param sessionId sessionId to be used in serialized requests
	     */
	    function setExistingSession(userId, sessionId) {
	        return state_1.setCachedSession(new state_1.Session(userId, sessionId, api_1.api.EnrollmentStatus.Enrolled, api_1.api.EnrollmentStatus.Enrolled, api_1.api.EnrollmentStatus.Enrolled));
	    }
	    session_1.setExistingSession = setExistingSession;
	    /**
	     * Clears current session
	     */
	    function clearSession() {
	        state_1.clearCache();
	    }
	    session_1.clearSession = clearSession;
	    /**
	     * @return True if session was established
	     */
	    function isSessionActive() {
	        return state_1.getCachedSession() != null;
	    }
	    session_1.isSessionActive = isSessionActive;
	    /**
	     * @return Current session identifier or null if there is no active session.
	     */
	    function getSessionId() {
	        if (state_1.getCachedSession()) {
	            return state_1.getCachedSession().getId();
	        }
	        return null;
	    }
	    session_1.getSessionId = getSessionId;
	    /**
	     * @return True if current session completed behavioural enrollment.
	     */
	    function isBehaviouralEnrolled() {
	        var session = state_1.getCachedSession();
	        return session == null ? false : session.isBehaviouralEnrolled();
	    }
	    session_1.isBehaviouralEnrolled = isBehaviouralEnrolled;
	    /**
	     * @return True if current session is currently building behavioural template.
	     */
	    function isBehaviouralBuilding() {
	        var session = state_1.getCachedSession();
	        return session == null ? false : session.isBehaviouralBuilding();
	    }
	    session_1.isBehaviouralBuilding = isBehaviouralBuilding;
	    /**
	     * @return True if current session completed facial enrollment.
	     */
	    function isFacialEnrolled() {
	        var session = state_1.getCachedSession();
	        return session == null ? false : session.isFacialEnrolled();
	    }
	    session_1.isFacialEnrolled = isFacialEnrolled;
	    /**
	     * @return True if current session is currently building face template.
	     */
	    function isFacialBuilding() {
	        var session = state_1.getCachedSession();
	        return session == null ? false : session.isFacialBuilding();
	    }
	    session_1.isFacialBuilding = isFacialBuilding;
	    /**
	     * @return True if current session completed voice enrollment.
	     */
	    function isVoiceEnrolled() {
	        var session = state_1.getCachedSession();
	        return session == null ? false : session.isVoiceEnrolled();
	    }
	    session_1.isVoiceEnrolled = isVoiceEnrolled;
	    /**
	     * @return True if current session is currently building voice template.
	     */
	    function isVoiceBuilding() {
	        var session = state_1.getCachedSession();
	        return session == null ? false : session.isVoiceBuilding();
	    }
	    session_1.isVoiceBuilding = isVoiceBuilding;
	})(session = exports.session || (exports.session = {}));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var browser = __webpack_require__(42);
	var promise_1 = __webpack_require__(14);
	var api_1 = __webpack_require__(19);
	var state = __webpack_require__(26);
	function createSession(userId, metadata, serialize) {
	    var request = api_1.api.createSession(userId, browser.browserName, browser.browserOS, browser.screenHeight, browser.screenWidth, metadata);
	    if (serialize) {
	        return promise_1.Promise.resolve(request.serialize());
	    }
	    return request.then(function (result) {
	        var session = new state.Session(userId, result.session, result.behaviour, result.face, result.voice);
	        state.setCachedSession(session);
	        return result;
	    });
	}
	exports.createSession = createSession;
	/**
	 * Ensure a user session.
	 *
	 * This function creates a session and caches it in session storage.
	 * Next time you call this function with the same userId, it returns the
	 * current user session without sending an API request.
	 */
	function ensureSessionCreated(userId, metadata) {
	    var session = state.getCachedSession();
	    if (session && session.userId === userId) {
	        return promise_1.Promise.resolve(session);
	    }
	    return createSession(userId, metadata, false);
	}
	exports.ensureSessionCreated = ensureSessionCreated;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var global_1 = __webpack_require__(13);
	/**
	 * Browser name
	 */
	exports.browserName = "Other";
	// Opera 8.0+
	var isOpera = (!!global_1.global.opr && !!global_1.global.opr.addons)
	    || !!global_1.global.opera
	    || navigator.userAgent.indexOf(" OPR/") >= 0;
	// Firefox 1.0+
	var isFirefox = typeof global_1.global.InstallTrigger !== "undefined";
	// Safari <= 9 "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(global_1.global.HTMLElement)
	    .indexOf("Constructor") > 0;
	// Internet Explorer 6-11
	var isIE = !!global_1.global.document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!global_1.global.StyleMedia;
	// Chrome 1+
	var isChrome = !!global_1.global.chrome && !!global_1.global.chrome.webstore;
	if (isOpera) {
	    exports.browserName = "Opera";
	}
	else if (isFirefox) {
	    exports.browserName = "Firefox";
	}
	else if (isEdge) {
	    exports.browserName = "Edge";
	}
	else if (isIE) {
	    exports.browserName = "isIE";
	}
	else if (isChrome) {
	    exports.browserName = "Chrome";
	}
	/**
	 * Browser operating system
	 */
	exports.browserOS = null;
	var userAgent = navigator.appVersion;
	if (userAgent.indexOf("Win") >= 0) {
	    exports.browserOS = "Windows";
	}
	else if (userAgent.indexOf("Mac") >= 0) {
	    if (userAgent.indexOf("iP") >= 0) {
	        exports.browserOS = "iOS";
	    }
	    else {
	        exports.browserOS = "macOS";
	    }
	}
	else if (userAgent.indexOf("Android") >= 0) {
	    exports.browserOS = "Android";
	}
	else if (userAgent.indexOf("Linux") >= 0) {
	    exports.browserOS = "Linux";
	}
	else if (userAgent.indexOf("X11") >= 0) {
	    exports.browserOS = "Unix-like";
	}
	/**
	 * Screen width
	 */
	exports.screenWidth = null;
	/**
	 * Screen height
	 */
	exports.screenHeight = null;
	if (global_1.global.screen) {
	    exports.screenWidth = global_1.global.screen.availHeight;
	    exports.screenHeight = global_1.global.screen.availWidth;
	}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var state_1 = __webpack_require__(26);
	var dom = __webpack_require__(44);
	var storage = __webpack_require__(39);
	var upload = __webpack_require__(45);
	var tracking = __webpack_require__(47);
	/**
	 * [[include:behaviour-module.md]]
	 */
	var behaviour;
	(function (behaviour) {
	    /**
	     * Check if behavioural module is supported by current browser.
	     * @return if behavioural module can be used.
	     */
	    function isSupported() {
	        return storage.isSupported();
	    }
	    behaviour.isSupported = isSupported;
	    /**
	    * Sets an identifier to for DOM element. Identifier must be unique.
	    * @param aimbrainId identifier string.
	    * @param element element to be identified.
	    */
	    function setAimbrainId(aimbrainId, element) {
	        dom.setElementSdkId(aimbrainId, element);
	    }
	    behaviour.setAimbrainId = setAimbrainId;
	    /**
	     * Marks array or single HTMLElement and its children untrackable (private).
	     * @param element element(s) to be marked untrackable.
	     */
	    function addToUntrackableList(el) {
	        dom.setIgnored(el instanceof HTMLElement ? [el] : el);
	    }
	    behaviour.addToUntrackableList = addToUntrackableList;
	    /**
	     * Removes array or single HTMLElement from untrackable (private) element list.
	     * @param element element(s) to be removed from untrackable list.
	     */
	    function removeFromUntrackableList(el) {
	        dom.unsetIgnored(el instanceof HTMLElement ? [el] : el);
	    }
	    behaviour.removeFromUntrackableList = removeFromUntrackableList;
	    /**
	     * Set salt used for sensitive view id hashing.
	     * @param value hexadecimal 128bit string value.
	     */
	    function setSensitiveSalt(value) {
	        dom.setSensitiveSalt(value);
	    }
	    behaviour.setSensitiveSalt = setSensitiveSalt;
	    /**
	     * Marks array or single HTMLElement and its children as sensitive.
	     * @param element element(s) to be marked sensitive.
	     */
	    function addToSensitiveList(el) {
	        dom.setSensitive(el instanceof HTMLElement ? [el] : el);
	    }
	    behaviour.addToSensitiveList = addToSensitiveList;
	    /**
	     * Removes array or single HTMLElement from sensitive element list.
	     * @param element element(s) to be removed from sensitive list.
	     */
	    function removeFromSensitiveList(el) {
	        dom.unsetSensitive(el instanceof HTMLElement ? [el] : el);
	    }
	    behaviour.removeFromSensitiveList = removeFromSensitiveList;
	    /**
	     * Send collected behavioural events.
	     * @param metadata integration specific metadata
	     * @param serialize flag to request serialized request body instead of making API call
	     */
	    function sendCollectedEvents(metadata, serialize) {
	        return upload.sendCollectedEvents(metadata, serialize);
	    }
	    behaviour.sendCollectedEvents = sendCollectedEvents;
	    /**
	     * Clear collected behavioural events.
	     */
	    function clearCollectedEvents() {
	        return storage.clearStoredEvents();
	    }
	    behaviour.clearCollectedEvents = clearCollectedEvents;
	    /**
	     * Starts tracking behavioural events.
	     */
	    function startTracking() {
	        tracking.startTracking();
	    }
	    behaviour.startTracking = startTracking;
	    /**
	     * Stops tracking behavioural events.
	     */
	    function stopTracking() {
	        tracking.stopTracking();
	    }
	    behaviour.stopTracking = stopTracking;
	    /**
	     * Recent score.
	     * @return Most recent behavioural score received when submitting
	     * behavioural events. This includes calls to [[sendCollectedEvents]] and
	     * calls made by background event sending.
	     */
	    function getScore() {
	        return state_1.getCachedSessionScore();
	    }
	    behaviour.getScore = getScore;
	    /**
	     * Starts invoking [[sendCollectedEvents]] periodically in background.
	     * @param interval sending interval in milliseconds. Defaults to 3000
	     */
	    function startSending(interval) {
	        upload.startBackgroundSending(interval);
	    }
	    behaviour.startSending = startSending;
	    /**
	     * Stops invoking [[sendCollectedEvents]] periodically in background.
	     */
	    function stopSending() {
	        upload.stopBackgroundSending();
	    }
	    behaviour.stopSending = stopSending;
	    /**
	     * Starts event tracking and background sending.
	     * @param interval sending interval in milliseconds. Defaults to 3000
	     */
	    function start(interval) {
	        startTracking();
	        startSending(interval);
	    }
	    behaviour.start = start;
	})(behaviour = exports.behaviour || (exports.behaviour = {}));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var sha256_1 = __webpack_require__(23);
	var convert_1 = __webpack_require__(24);
	var idAttribute = "data-aimbrain-id";
	var sensitiveAttribute = "data-aimbrain-sensitive";
	var ignoredAttribute = "data-aimbrain-ignored";
	exports.sensitiveSalt = "";
	function setSensitiveSalt(value) {
	    exports.sensitiveSalt = value;
	}
	exports.setSensitiveSalt = setSensitiveSalt;
	function getElementSdkId(element) {
	    var id = element.getAttribute(idAttribute);
	    if (!id) {
	        id = element.id;
	    }
	    if (id && isSensitive(element)) {
	        id = sha256_1.default(id + convert_1.hexToString(exports.sensitiveSalt));
	    }
	    return id ? id : null;
	}
	exports.getElementSdkId = getElementSdkId;
	function getElementIdChain(element) {
	    var result = [];
	    var sensitive = isSensitive(element);
	    while (element != null) {
	        var id = element.getAttribute(idAttribute);
	        if (!id) {
	            id = element.id;
	        }
	        if (id && sensitive) {
	            id = sha256_1.default(id + convert_1.hexToString(exports.sensitiveSalt));
	        }
	        if (id) {
	            result.push(id);
	        }
	        element = element.parentElement;
	    }
	    return result;
	}
	exports.getElementIdChain = getElementIdChain;
	function setElementSdkId(id, element) {
	    element.setAttribute(idAttribute, id);
	}
	exports.setElementSdkId = setElementSdkId;
	function isSensitive(element) {
	    if (element.getAttribute(sensitiveAttribute) === "true") {
	        return true;
	    }
	    else if (element.parentElement) {
	        return isSensitive(element.parentElement);
	    }
	    else {
	        return false;
	    }
	}
	exports.isSensitive = isSensitive;
	function setSensitive(elements) {
	    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
	        var e = _a[_i];
	        if (e) {
	            e.setAttribute(sensitiveAttribute, "true");
	        }
	    }
	}
	exports.setSensitive = setSensitive;
	function unsetSensitive(elements) {
	    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
	        var e = _a[_i];
	        if (e) {
	            e.removeAttribute(sensitiveAttribute);
	        }
	    }
	}
	exports.unsetSensitive = unsetSensitive;
	function isIgnored(element) {
	    if (element.getAttribute(ignoredAttribute) === "true") {
	        return true;
	    }
	    else if (element.parentElement) {
	        return isIgnored(element.parentElement);
	    }
	    else {
	        return false;
	    }
	}
	exports.isIgnored = isIgnored;
	function setIgnored(elements) {
	    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
	        var e = _a[_i];
	        if (e) {
	            e.setAttribute(ignoredAttribute, "true");
	        }
	    }
	}
	exports.setIgnored = setIgnored;
	function unsetIgnored(elements) {
	    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
	        var e = _a[_i];
	        if (e) {
	            e.removeAttribute(ignoredAttribute);
	        }
	    }
	}
	exports.unsetIgnored = unsetIgnored;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var storage_1 = __webpack_require__(39);
	var state_1 = __webpack_require__(26);
	var calls = __webpack_require__(46);
	exports.defaultSendingInterval = 3 * 1000;
	var sendingIntervalId;
	var sending = false;
	function sendCollectedEvents(metadata, serialize) {
	    if (serialize) {
	        return storage_1.getStoredEvents().then(function (events) {
	            var mouseEvents = events[0];
	            var keyEvents = events[1];
	            return calls.sendEvents(mouseEvents, keyEvents, metadata, serialize);
	        });
	    }
	    else {
	        return storage_1.getStoredEvents().then(function (events) {
	            var mouseEvents = events[0];
	            if (mouseEvents.length > 0) {
	                console.log("Sending mouse events from {0} to {1}", mouseEvents[0].t, mouseEvents[mouseEvents.length - 1].t);
	            }
	            var keyEvents = events[1];
	            if (keyEvents.length > 0) {
	                console.log("Sending key events from {0} to {1}", keyEvents[0].t, keyEvents[keyEvents.length - 1].t);
	            }
	            return calls.sendEvents(mouseEvents, keyEvents, metadata, false)
	                .then(function (result) {
	                state_1.setCachedSessionScore(result.score);
	                storage_1.removeStoredEvents(mouseEvents, keyEvents);
	                return result;
	            });
	        });
	    }
	}
	exports.sendCollectedEvents = sendCollectedEvents;
	function startBackgroundSending(interval) {
	    if (interval === void 0) { interval = exports.defaultSendingInterval; }
	    if (sending) {
	        return;
	    }
	    console.log("starting background upload");
	    sending = true;
	    sendingIntervalId = setInterval(function () {
	        console.log("background upload");
	        sendCollectedEvents(null, false);
	    }, interval);
	}
	exports.startBackgroundSending = startBackgroundSending;
	function stopBackgroundSending() {
	    sending = false;
	    if (sendingIntervalId) {
	        clearInterval(sendingIntervalId);
	        sendingIntervalId = null;
	        console.log("stopped background upload");
	    }
	}
	exports.stopBackgroundSending = stopBackgroundSending;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var promise_1 = __webpack_require__(14);
	var api_1 = __webpack_require__(19);
	var state_1 = __webpack_require__(26);
	function sendEvents(mouseEvents, keyEvents, metadata, serialize) {
	    var session = state_1.getCachedSession();
	    if (session == null) {
	        return promise_1.Promise.reject({
	            errorCode: api_1.api.ErrorCode.NoOpenSession,
	            error: "This call requires active session"
	        });
	    }
	    if (serialize) {
	        return promise_1.Promise.resolve(api_1.api.sendEvents(session.getId(), mouseEvents, keyEvents, metadata).serialize());
	    }
	    else {
	        return api_1.api.sendEvents(session.getId(), mouseEvents, keyEvents, metadata).send();
	    }
	    ;
	}
	exports.sendEvents = sendEvents;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var dom = __webpack_require__(44);
	var storage = __webpack_require__(39);
	var moveEventsGroupingInterval = 100;
	var moveGroupCounter = 0;
	var moveGroupStartTime = 0;
	exports.isTracking = false;
	function mouseDownListener(event) {
	    var element = event.target;
	    if (dom.isIgnored(element)) {
	        return;
	    }
	    var sensitive = dom.isSensitive(element);
	    var evt = {
	        docx: sensitive ? 0 : event.pageX,
	        docy: sensitive ? 0 : event.pageY,
	        elx: event.offsetX,
	        ely: event.offsetY,
	        btn: event.button,
	        t: Date.now(),
	        type: storage.MouseEventType.DOWN,
	        ids: dom.getElementIdChain(element),
	    };
	    storage.addMouseEvent(evt);
	}
	function mouseUpListener(event) {
	    var element = event.target;
	    if (dom.isIgnored(element)) {
	        return;
	    }
	    var sensitive = dom.isSensitive(element);
	    var evt = {
	        docx: sensitive ? 0 : event.pageX,
	        docy: sensitive ? 0 : event.pageY,
	        elx: event.offsetX,
	        ely: event.offsetY,
	        btn: event.button,
	        t: Date.now(),
	        type: storage.MouseEventType.UP,
	        ids: dom.getElementIdChain(element),
	    };
	    storage.addMouseEvent(evt);
	}
	function mouseMoveListener(event) {
	    var element = event.target;
	    if (dom.isIgnored(element)) {
	        return;
	    }
	    var currentTime = Date.now();
	    moveGroupCounter++;
	    if (currentTime - moveGroupStartTime < moveEventsGroupingInterval) {
	        return;
	    }
	    var sensitive = dom.isSensitive(element);
	    var evt = {
	        docx: sensitive ? 0 : event.pageX,
	        docy: sensitive ? 0 : event.pageY,
	        elx: event.offsetX,
	        ely: event.offsetY,
	        t: currentTime,
	        no: moveGroupCounter,
	        type: storage.MouseEventType.MOVE,
	        ids: dom.getElementIdChain(element),
	    };
	    moveGroupStartTime = currentTime;
	    moveGroupCounter = 0;
	    storage.addMouseEvent(evt);
	}
	function keyUpListener(event) {
	    var element = event.target;
	    if (dom.isIgnored(element)) {
	        return;
	    }
	    var evt = {
	        t: Date.now(),
	        key: event.key,
	        dir: storage.KeyDirection.UP,
	        ids: dom.getElementIdChain(element),
	    };
	    storage.addKeyEvent(evt);
	}
	function keyDownListener(event) {
	    var element = event.target;
	    if (dom.isIgnored(element)) {
	        return;
	    }
	    var evt = {
	        t: Date.now(),
	        key: event.key,
	        dir: storage.KeyDirection.DOWN,
	        ids: dom.getElementIdChain(element),
	    };
	    storage.addKeyEvent(evt);
	}
	function removeListeners() {
	    window.removeEventListener("mouseup", mouseUpListener);
	    window.removeEventListener("mousedown", mouseDownListener);
	    window.removeEventListener("mousemove", mouseMoveListener);
	    window.removeEventListener("keyup", keyUpListener);
	    window.removeEventListener("keydown", keyDownListener);
	}
	function addListeners() {
	    window.addEventListener("mouseup", mouseUpListener);
	    window.addEventListener("mousedown", mouseDownListener);
	    window.addEventListener("mousemove", mouseMoveListener);
	    window.addEventListener("keyup", keyUpListener);
	    window.addEventListener("keydown", keyDownListener);
	}
	function startTracking() {
	    if (!exports.isTracking) {
	        addListeners();
	        exports.isTracking = true;
	        console.log('started tracking');
	    }
	}
	exports.startTracking = startTracking;
	function stopTracking() {
	    if (exports.isTracking) {
	        removeListeners();
	        exports.isTracking = false;
	        console.log('stopped tracking');
	    }
	}
	exports.stopTracking = stopTracking;


/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NTAyODFkZDg1YmNlYmY2ZTk0MSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguZGV2ZWxvcG1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvaWNlL3VpLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL29iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdm9pY2UvcmVzL3BvcHVwLmNzcz80MTZlIiwid2VicGFjazovLy8uL3NyYy92b2ljZS9yZXMvcG9wdXAuY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvaWNlL3Jlcy9jbG9zZS1kYXJrLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvdm9pY2UvcmVzL21pYy1kYXJrLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvdm9pY2UvcmVzL3N0b3AtZGFyay5zdmciLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3NyYy92b2ljZS9yZXMvcG9wdXAuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdm9pY2UvcmVjb3JkaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2Jsb2IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZW52L2dsb2JhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wcm9taXNlLnRzIiwid2VicGFjazovLy8uL3NyYy92b2ljZS9hdWRpby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC93YXYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZvaWNlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy92b2ljZS9jYWxscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvcmVxdWVzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9yZXF1ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2htYWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvc2hhMjU2LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2NvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvYmFzZTY0LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXNzaW9uL3N0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9mYWNpYWwvdWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY2lhbC9yZXMvcG9wdXAuY3NzPzEzNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY2lhbC9yZXMvcG9wdXAuY3NzIiwid2VicGFjazovLy8uL3NyYy9mYWNpYWwvcmVzL2Nsb3NlLWxpZ2h0LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvZmFjaWFsL3Jlcy9mYWNlLW92ZXJsYXkuc3ZnIiwid2VicGFjazovLy8uL3NyYy9mYWNpYWwvcmVzL2NhbWVyYS1saWdodC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY2lhbC9yZXMvc3RvcC1saWdodC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY2lhbC9yZXMvcG9wdXAuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvZmFjaWFsL3JlY29yZGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmFjaWFsL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mYWNpYWwvY2FsbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY2lhbC92aWRlby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVoYXZpb3VyL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nlc3Npb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nlc3Npb24vY2FsbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZW52L2Jyb3dzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JlaGF2aW91ci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVoYXZpb3VyL2RvbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVoYXZpb3VyL3VwbG9hZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVoYXZpb3VyL2NhbGxzLnRzIiwid2VicGFjazovLy8uL3NyYy9iZWhhdmlvdXIvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNyQ0Esc0NBQXNDO0FBQzdCLDJCQUFPO0FBQ2hCLDhDQUFvRDtBQUMzQyx5Q0FBYztBQUN2QixzQ0FBc0M7QUFDN0IseUJBQU07QUFDZiw2Q0FBb0Q7QUFDM0MsdUNBQWE7QUFDdEIscUNBQXdDO0FBQy9CLHVCQUFLO0FBQ2QsdUNBQStDO0FBQ3RDLDJCQUFPO0FBRWhCLHlDQUFvQztBQUMzQixtQkFEQSxpQkFBTyxDQUNBO0FBQ2hCLHFDQUE0QjtBQUNaLGVBRFAsU0FBRyxDQUNPO0FBQ25CLHVDQUFnQztBQUN2QixpQkFEQSxhQUFLLENBQ0E7QUFDZCx3Q0FBa0M7QUFDekIsa0JBREEsZUFBTSxDQUNBO0FBQ2YsMkNBQXdDO0FBQy9CLHFCQURBLHFCQUFTLENBQ0E7Ozs7Ozs7OztBQ3ZCbEIscUNBQXlDO0FBRXpDLEtBQVksV0FJWDtBQUpELFlBQVksV0FBVztLQUNuQiw2REFBZ0I7S0FDaEIsK0RBQWlCO0tBQ2pCLDJEQUFlO0FBQ25CLEVBQUMsRUFKVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUl0QjtBQVNELG9CQUFPLENBQUMsQ0FBaUIsQ0FBQyxDQUFDO0FBQzNCLEtBQU0s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QVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7S0FDOUYsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7S0FDOUYsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7S0FDOUYsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7RUFDakcsQ0FBQztBQUVGOzs7O0lBSUc7QUFDSCxzQkFBcUIsS0FBZSxFQUFFLENBQVc7S0FDN0MsSUFBSSxHQUFXLENBQUM7S0FDaEIsSUFBSSxDQUFTLENBQUM7S0FDZCxJQUFJLENBQVMsQ0FBQztLQUNkLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBRWQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNULEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZixDQUFDO1NBQUMsSUFBSSxDQUFDLENBQUM7YUFDSixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3BCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDckIsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzttQkFDL0QsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7bUJBQ3BELENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNDLENBQUM7U0FDRCxHQUFHLElBQUksRUFBRTtlQUNILENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7ZUFDbEUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBRW5DLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDUixFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNSLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNsQixFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDUixFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2VBQ3BDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuRixDQUFDO0tBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVB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QUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO1NBQ2hDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7U0FDdkIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzVDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7U0FDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNkLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3JCLENBQUM7U0FDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQixJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ2QsQ0FBQztTQUNELE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2VBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwRCxDQUFDO0tBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixFQUFD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LENBQUMsQ0FBQyxDQUFDO1NBQ2IsZUFBZSxFQUFFLENBQUM7U0FDbEIsa0JBQVUsR0FBRyxLQUFLLENBQUM7U0FDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3BDLENBQUM7QUFDTCxFQUFDO0FBTkQscUNBTUMiLCJmaWxlIjoiYWltYnJhaW4td2ViLXNkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkFpbWJyYWluXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkFpbWJyYWluXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NTAyODFkZDg1YmNlYmY2ZTk0MSIsIlxuaW1wb3J0ICogYXMgdm9pY2VVaSBmcm9tIFwiLi92b2ljZS91aVwiO1xuZXhwb3J0IHsgdm9pY2VVaSB9O1xuaW1wb3J0ICogYXMgdm9pY2VSZWNvcmRpbmcgZnJvbSBcIi4vdm9pY2UvcmVjb3JkaW5nXCI7XG5leHBvcnQgeyB2b2ljZVJlY29yZGluZyB9O1xuaW1wb3J0ICogYXMgZmFjZVVpIGZyb20gXCIuL2ZhY2lhbC91aVwiO1xuZXhwb3J0IHsgZmFjZVVpIH07XG5pbXBvcnQgKiBhcyBmYWNlUmVjb3JkaW5nIGZyb20gXCIuL2ZhY2lhbC9yZWNvcmRpbmdcIjtcbmV4cG9ydCB7IGZhY2VSZWNvcmRpbmcgfTtcbmltcG9ydCAqIGFzIHZpZGVvIGZyb20gXCIuL2ZhY2lhbC92aWRlb1wiO1xuZXhwb3J0IHsgdmlkZW8gfTsgXG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gXCIuL2JlaGF2aW91ci9zdG9yYWdlXCI7XG5leHBvcnQgeyBzdG9yYWdlIH07IFxuXG5pbXBvcnQgeyBzZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xuZXhwb3J0IHsgc2Vzc2lvbiB9O1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vYXBpXCI7XG5leHBvcnQgeyBhcGkgYXMgYXBpIH07XG5pbXBvcnQgeyB2b2ljZSB9IGZyb20gXCIuL3ZvaWNlXCI7XG5leHBvcnQgeyB2b2ljZSB9O1xuaW1wb3J0IHsgZmFjaWFsIH0gZnJvbSBcIi4vZmFjaWFsXCI7XG5leHBvcnQgeyBmYWNpYWwgfTtcbmltcG9ydCB7IGJlaGF2aW91ciB9IGZyb20gXCIuL2JlaGF2aW91clwiO1xuZXhwb3J0IHsgYmVoYXZpb3VyIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguZGV2ZWxvcG1lbnQudHMiLCJpbXBvcnQgKiBhcyBvYmplY3QgZnJvbSBcIi4uL3V0aWwvb2JqZWN0XCI7XG5cbmV4cG9ydCBlbnVtIERpYWxvZ0V2ZW50IHtcbiAgICBDbG9zZUNsaWNrZWQgPSAwLFxuICAgIFJlY29yZENsaWNrZWQgPSAxLFxuICAgIFN0b3BDbGlja2VkID0gMlxufVxuXG5leHBvcnQgdHlwZSBEaWFsb2dPcHRpb25zID0ge1xuICAgIGhlYWRlclRleHQ/OiBzdHJpbmc7IFxuICAgIGNhcHR1cmluZ1RleHQ/OiBzdHJpbmc7XG4gICAgcHJvZ3Jlc3NTdGFydFRleHQ/OiBzdHJpbmc7XG4gICAgcHJvZ3Jlc3NUaW1lclRleHQ/OiBzdHJpbmc7IFxufTtcblxucmVxdWlyZShcIi4vcmVzL3BvcHVwLmNzc1wiKTtcbmNvbnN0IGRpYWxvZ0h0bWwgPSByZXF1aXJlKFwiLi9yZXMvcG9wdXAuaHRtbFwiKTtcblxuZnVuY3Rpb24gYXBwZW5kSHRtbChlbGVtZW50OiBOb2RlLCBodG1sKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHRlbXBvcmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGVtcG9yYXJ5LmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGVtcG9yYXJ5LmZpcnN0Q2hpbGQpIGFzIEhUTUxFbGVtZW50O1xufVxuXG5sZXQgZGlhbG9nRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5sZXQgZGlhbG9nT3B0aW9uczogRGlhbG9nT3B0aW9ucztcblxuZnVuY3Rpb24gZWwoY2xzOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBpZiAoZGlhbG9nRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZGlhbG9nRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNscylbMF1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuKGV2ZW50Q2FsbGJhY2s6IChldmVudDogRGlhbG9nRXZlbnQpID0+IHZvaWQsIHRva2VuVGV4dDogc3RyaW5nLCBvcHRpb25zPzogRGlhbG9nT3B0aW9ucykge1xuICAgIGNvbnNvbGUubG9nKCdvcGVuIHZvaWNlIHVpJyk7XG5cbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fVxuICAgIH1cblxuICAgIGRpYWxvZ09wdGlvbnMgPSBvYmplY3QuZGVmYXVsdHMob3B0aW9ucywgPERpYWxvZ09wdGlvbnM+eyAgICAgICBcbiAgICAgICAgaGVhZGVyVGV4dDogXCJcIixcbiAgICAgICAgY2FwdHVyaW5nVGV4dDogXCJcIixcbiAgICAgICAgcHJvZ3Jlc3NTdGFydFRleHQ6IFwiXCIsXG4gICAgICAgIHByb2dyZXNzVGltZXJUZXh0OiBcIlwiXG4gICAgfSk7XG5cbiAgICBpZiAoIWRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgZGlhbG9nRWxlbWVudCA9IGFwcGVuZEh0bWwoZG9jdW1lbnQuYm9keSwgZGlhbG9nSHRtbCk7ICAgICAgICBcbiAgICBcbiAgICAgICAgZWwoXCJhaW1icmFpbi12b2ljZS1jbG9zZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudENhbGxiYWNrKERpYWxvZ0V2ZW50LkNsb3NlQ2xpY2tlZCk7XG4gICAgICAgIH0pO1xuIFxuICAgICAgICBlbChcImFpbWJyYWluLXZvaWNlLXJlY29yZC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFjayhEaWFsb2dFdmVudC5SZWNvcmRDbGlja2VkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWwoXCJhaW1icmFpbi12b2ljZS1zdG9wLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudENhbGxiYWNrKERpYWxvZ0V2ZW50LlN0b3BDbGlja2VkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWwoXCJhaW1icmFpbi12b2ljZS10b2tlblwiKS5pbm5lckhUTUwgPSB0b2tlblRleHQ7XG4gICAgc2hvd1Byb2dyZXNzKGZhbHNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQcm9ncmVzcyhzdGF0dXM6IGZhbHNlIHwgc3RyaW5nKSB7XG4gICAgaWYgKHN0YXR1cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWwoXCJhaW1icmFpbi12b2ljZS1oZWFkZXItbGFiZWxcIikuaW5uZXJIVE1MID0gZGlhbG9nT3B0aW9ucy5oZWFkZXJUZXh0O1xuICAgICAgICBlbChcImFpbWJyYWluLXZvaWNlLWNhcHR1cmluZy1sYWJlbFwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBlbChcImFpbWJyYWluLXZvaWNlLXByb2dyZXNzLWxhYmVsXCIpLmlubmVySFRNTCA9IGRpYWxvZ09wdGlvbnMucHJvZ3Jlc3NTdGFydFRleHQ7ICAgIFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZWwoXCJhaW1icmFpbi12b2ljZS1oZWFkZXItbGFiZWxcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZWwoXCJhaW1icmFpbi12b2ljZS1jYXB0dXJpbmctbGFiZWxcIikuaW5uZXJIVE1MID0gZGlhbG9nT3B0aW9ucy5jYXB0dXJpbmdUZXh0O1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBkaWFsb2dPcHRpb25zLnByb2dyZXNzVGltZXJUZXh0LnJlcGxhY2UoXCJ7c31cIiwgc3RhdHVzKTtcbiAgICAgICAgZWwoXCJhaW1icmFpbi12b2ljZS1wcm9ncmVzcy1sYWJlbFwiKS5pbm5lckhUTUwgPSBwcm9ncmVzczsgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICAoPGFueT5lbChcImFpbWJyYWluLXZvaWNlLXJlY29yZC1idXR0b25cIikpLnN0eWxlLmRpc3BsYXkgPSBzdGF0dXMgPT09IGZhbHNlID8gXCJibG9ja1wiIDogXCJub25lXCI7XG4gICAgKDxhbnk+ZWwoXCJhaW1icmFpbi12b2ljZS1zdG9wLWJ1dHRvblwiKSkuc3R5bGUuZGlzcGxheSA9IHN0YXR1cyA9PT0gZmFsc2UgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGlmIChkaWFsb2dFbGVtZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbG9zZSB2b2ljZSB1aScpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQgPSBudWxsO1xuICAgICAgICBkaWFsb2dPcHRpb25zID0gbnVsbDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdm9pY2UvdWkudHMiLCJcbi8qKlxuICogQXNzaWducyBvd24gcHJvcGVydGllcyBvZiBgc291cmNlYCBvYmplY3QgdG8gdGhlIGB0YXJnZXRgIG9iamVjdCBmb3IgYWxsXG4gKiBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC5cbiAqXG4gKiBFeGFtcGxlOlxuICogICBkZWZhdWx0cyh7ICdhJzogMSB9LCB7ICdiJzogMiB9KSAgICAgICAgID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICogICBkZWZhdWx0cyh7ICdhJzogMSwgJ2InOiAyIH0sIHsgJ2InOiAzIH0pID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdHM8VD4odGFyZ2V0OiBUIHwgdm9pZCwgc291cmNlOiBUKTogVCB7XG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShpKSAmJiAhb3V0cHV0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBvdXRwdXRbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9vYmplY3QudHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wb3B1cC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wb3B1cC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcG9wdXAuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92b2ljZS9yZXMvcG9wdXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5haW1icmFpbi1kaWFsb2ctd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNzUpO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIHotaW5kZXg6IDEwMDtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4uYWltYnJhaW4tZGlhbG9nLXZvaWNlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgei1pbmRleDogOTk5OTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCAyNXB4IHJnYmEoMCwgMCwgMCwgLjI1KTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmFpbWJyYWluLWRpYWxvZy12b2ljZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICB3aWR0aDogMzYwcHg7XFxuICAgIGhlaWdodDogNDgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5haW1icmFpbi1kaWFsb2ctdm9pY2Uge1xcbiAgICBmb250LWZhbWlseTogQXJpYWwsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLWNsb3NlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBtYXJnaW46IDVweDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgcmVxdWlyZShcIi4vY2xvc2UtZGFyay5zdmdcIikgKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzUlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLWNsb3NlOmFjdGl2ZSB7XFxuICAgIG9wYWNpdHk6IDAuNzU7XFxufVxcblxcbi5haW1icmFpbi12b2ljZS1oZWFkZXItbGFiZWwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtaW4taGVpZ2h0OiA2MHB4O1xcbiAgICBtYXgtd2lkdGg6IDYwJTtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLXRva2VuIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDMycHg7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxuICAgIG1heC13aWR0aDogODAlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBmbGV4LWdyb3c6IDE7ICBcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLWNhcHR1cmluZy1sYWJlbCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLWNvbnRyb2xzIHtcXG4gICAgbWluLWhlaWdodDogOTBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDI4cHg7XFxufVxcblxcbi5haW1icmFpbi12b2ljZS1yZWNvcmQtYnV0dG9uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyByZXF1aXJlKFwiLi9taWMtZGFyay5zdmdcIikgKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNjAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgei1pbmRleDogOTk5OTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxufVxcblxcbi5haW1icmFpbi12b2ljZS1zdG9wLWJ1dHRvbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgcmVxdWlyZShcIi4vc3RvcC1kYXJrLnN2Z1wiKSArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA2MCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB6LWluZGV4OiA5OTk5O1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLXByb2dyZXNzLWxhYmVsIHtcXG4gICAgbWF4LXdpZHRoOiAzMCU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmFpbWJyYWluLXZvaWNlLXJlY29yZC1idXR0b246YWN0aXZlLCBhaW1icmFpbi12b2ljZS1zdG9wLWJ1dHRvbjphY3RpdmUgIHtcXG4gICAgb3BhY2l0eTogMC43NTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9zcmMvdm9pY2UvcmVzL3BvcHVwLmNzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJtYVd4c1BTSWpNREF3TURBd0lpQm9aV2xuYUhROUlqSTBJaUIyYVdWM1FtOTRQU0l3SURBZ01qUWdNalFpSUhkcFpIUm9QU0l5TkNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0S0lDQWdJRHh3WVhSb0lHUTlJazB4T1NBMkxqUXhUREUzTGpVNUlEVWdNVElnTVRBdU5Ua2dOaTQwTVNBMUlEVWdOaTQwTVNBeE1DNDFPU0F4TWlBMUlERTNMalU1SURZdU5ERWdNVGtnTVRJZ01UTXVOREVnTVRjdU5Ua2dNVGtnTVRrZ01UY3VOVGtnTVRNdU5ERWdNVEo2SWk4K0NpQWdJQ0E4Y0dGMGFDQmtQU0pOTUNBd2FESTBkakkwU0RCNklpQm1hV3hzUFNKdWIyNWxJaTgrQ2p3dmMzWm5QZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92b2ljZS9yZXMvY2xvc2UtZGFyay5zdmdcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJak1EQXdNREF3SWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLSUNBZ0lEeHdZWFJvSUdROUlrMHhNaUF4TkdNeExqWTJJREFnTWk0NU9TMHhMak0wSURJdU9Ua3RNMHd4TlNBMVl6QXRNUzQyTmkweExqTTBMVE10TXkwelV6a2dNeTR6TkNBNUlEVjJObU13SURFdU5qWWdNUzR6TkNBeklETWdNM3B0TlM0ekxUTmpNQ0F6TFRJdU5UUWdOUzR4TFRVdU15QTFMakZUTmk0M0lERTBJRFl1TnlBeE1VZzFZekFnTXk0ME1TQXlMamN5SURZdU1qTWdOaUEyTGpjeVZqSXhhREoyTFRNdU1qaGpNeTR5T0MwdU5EZ2dOaTB6TGpNZ05pMDJMamN5YUMweExqZDZJaTgrQ2lBZ0lDQThjR0YwYUNCa1BTSk5NQ0F3YURJMGRqSTBTREI2SWlCbWFXeHNQU0p1YjI1bElpOCtDand2YzNablBnPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZvaWNlL3Jlcy9taWMtZGFyay5zdmdcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJak1EQXdNREF3SWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLSUNBZ0lEeHdZWFJvSUdROUlrMHdJREJvTWpSMk1qUklNSG9pSUdacGJHdzlJbTV2Ym1VaUx6NEtJQ0FnSUR4d1lYUm9JR1E5SWswMklEWm9NVEoyTVRKSU5ub2lMejRLUEM5emRtYytcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZvaWNlL3Jlcy9zdG9wLWRhcmsuc3ZnXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImFpbWJyYWluLWRpYWxvZy13cmFwcGVyXFxcIj5cXG5cXHQ8ZGl2IGNsYXNzPVxcXCJhaW1icmFpbi1kaWFsb2ctdm9pY2VcXFwiPlxcblxcdFxcdDxkaXYgY2xhc3M9XFxcImFpbWJyYWluLXZvaWNlLWNsb3NlXFxcIj48L2Rpdj5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJhaW1icmFpbi12b2ljZS1oZWFkZXItbGFiZWxcXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tdm9pY2UtdG9rZW5cXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tdm9pY2UtY2FwdHVyaW5nLWxhYmVsXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImFpbWJyYWluLXZvaWNlLWNvbnRyb2xzXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhaW1icmFpbi12b2ljZS1wcm9ncmVzcy1sYWJlbFxcXCI+PC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XFxcImFpbWJyYWluLXZvaWNlLXJlY29yZC1idXR0b25cXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFpbWJyYWluLXZvaWNlLXN0b3AtYnV0dG9uXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcblxcdDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZvaWNlL3Jlcy9wb3B1cC5odG1sXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBibG9iVG9CYXNlNjQgfSBmcm9tIFwiLi4vdXRpbC9ibG9iXCI7XG5pbXBvcnQgKiBhcyBhdWRpbyBmcm9tIFwiLi9hdWRpb1wiO1xuaW1wb3J0ICogYXMgdWkgZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IHZvaWNlIH0gZnJvbSBcIi4vXCI7IFxuXG5leHBvcnQgY29uc3QgcmVjb3JkaW5nRHVyYXRpb24gPSA1MDAwO1xuXG5sZXQgdGltZXJJbnRlcnZhbElkOiBudW1iZXI7XG5sZXQgcmVjb3JkaW5nU3RhcnQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkVm9pY2UodG9rZW46IHN0cmluZywgb3B0aW9uczogYW55KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGlmICghYXVkaW8uaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh2b2ljZS5SZWNvcmRpbmdFcnJvci5Ob3RTdXBwb3J0ZWQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB1aS5vcGVuKChldmVudDogdWkuRGlhbG9nRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHVpLkRpYWxvZ0V2ZW50LkNsb3NlQ2xpY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsUmVjb3JkaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh2b2ljZS5SZWNvcmRpbmdFcnJvci5Qb3B1cENsb3NlZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSB1aS5EaWFsb2dFdmVudC5SZWNvcmRDbGlja2VkOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXVkaW8uaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW8uaW5pdEF1ZGlvKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkaW5nU3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvZ3Jlc3NUaW1lcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmUocmVzdWx0LCByZWNvcmRpbmdEdXJhdGlvbikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQcm9ncmVzc1RpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW8uc3RvcFJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qodm9pY2UuUmVjb3JkaW5nRXJyb3IuUmVjb3JkaW5nRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxSZWNvcmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qodm9pY2UuUmVjb3JkaW5nRXJyb3IuTm9EZXZpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW8uc3RvcFJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHZvaWNlLlJlY29yZGluZ0Vycm9yLk5vdFN1cHBvcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIHVpLkRpYWxvZ0V2ZW50LlN0b3BDbGlja2VkOlxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxSZWNvcmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHZvaWNlLlJlY29yZGluZ0Vycm9yLlBvcHVwQ2xvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRva2VuLCBvcHRpb25zKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBDYXB0dXJlcyBhdWRpbyBhbmQgcmV0dXJucyBhIEJhc2U2NCBlbmNvZGVkIFdBViBmaWxlXG4gKi9cbmZ1bmN0aW9uIGNhcHR1cmUoc3RyZWFtOiBNZWRpYVN0cmVhbSwgZHVyYXRpb246IG51bWJlcik6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gIGF1ZGlvLnJlY29yZFNhbXBsZShzdHJlYW0sIGR1cmF0aW9uKVxuICAgICAgICAudGhlbigoc2FtcGxlKSA9PiB7IHJldHVybiBibG9iVG9CYXNlNjQoc2FtcGxlKTsgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4geyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtyZXN1bHRdKTsgfSk7XG59XG4gXG5mdW5jdGlvbiBzdGFydFByb2dyZXNzVGltZXIoKSB7XG4gICAgdWkuc2hvd1Byb2dyZXNzKE1hdGgucm91bmQocmVjb3JkaW5nRHVyYXRpb24gLyAxMDAwKS50b1N0cmluZygpKTtcbiAgICB0aW1lckludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKHJlY29yZGluZ1N0YXJ0ICE9PSAwXG4gICAgICAgICAgICAmJiByZWNvcmRpbmdTdGFydCArIHJlY29yZGluZ0R1cmF0aW9uID49IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lTGVmdCA9IE1hdGgucm91bmQoKHJlY29yZGluZ0R1cmF0aW9uIC0gKGN1cnJlbnRUaW1lIC0gcmVjb3JkaW5nU3RhcnQpKSAvIDEwMDApO1xuICAgICAgICAgICAgdWkuc2hvd1Byb2dyZXNzKHRpbWVMZWZ0LnRvU3RyaW5nKCkpOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlY29yZGluZ1N0YXJ0ICsgcmVjb3JkaW5nRHVyYXRpb24gPCBjdXJyZW50VGltZSAmJiB0aW1lckludGVydmFsSWQpIHtcbiAgICAgICAgICAgIHVpLnNob3dQcm9ncmVzcyhcIjBcIik7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cbiAgICB9LCAxMDAwKTtcbn1cblxuZnVuY3Rpb24gc3RvcFByb2dyZXNzVGltZXIoKSB7XG4gICAgaWYgKHRpbWVySW50ZXJ2YWxJZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWxJZCk7XG4gICAgICAgIHRpbWVySW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsUmVjb3JkaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FuY2VsIHJlY29yZGluZ1wiKTtcbiAgICBhdWRpby5zdG9wUmVjb3JkaW5nKCk7IFxuICAgIHN0b3BQcm9ncmVzc1RpbWVyKCk7XG4gICAgdWkuY2xvc2UoKTsgICBcbn1cbiBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92b2ljZS9yZWNvcmRpbmcudHMiLCJpbXBvcnQgeyBnbG9iYWwgfSBmcm9tIFwiLi9lbnYvZ2xvYmFsXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcIi4vcHJvbWlzZVwiO1xuXG5jb25zdCBVUkw6IHtcbiAgICBjcmVhdGVPYmplY3RVUkwob2JqZWN0OiBhbnksIG9wdGlvbnM/OiBPYmplY3RVUkxPcHRpb25zKTogc3RyaW5nO1xuICAgIHJldm9rZU9iamVjdFVSTCh1cmw6IHN0cmluZyk6IHZvaWQ7XG59ID0gZ2xvYmFsLlVSTCB8fCBnbG9iYWwud2Via2l0VVJMO1xuXG4vKipcbiAqIEZvcmNlcyBhIGRvd25sb2FkIG9mIGEgYmxvYlxuICovXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRCbG9iKGJsb2I6IEJsb2IsIGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfSwgMCk7XG59XG5cbi8qKlxuICogRW5jb2RlcyBibG9iIGFzIEJhc2U2NFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxvYlRvQmFzZTY0KGJsb2I6IEJsb2IpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0LnNwbGl0KFwiLFwiKVsxXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHJlamVjdCk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9ibG9iLnRzIiwiXG4vKipcbiAqIEdsb2JhbCBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IGdsb2JhbDogYW55ID0gRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8IHt9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvZW52L2dsb2JhbC50cyIsImltcG9ydCB7IGdsb2JhbCB9IGZyb20gXCIuL2Vudi9nbG9iYWxcIjtcblxuZXhwb3J0IGxldCBQcm9taXNlOiBQcm9taXNlQ29uc3RydWN0b3I7XG5cbi8vIERlZmF1bHQgdG8gYSBQcm9taXNlIGZyb20gZ2xvYmFsIHNwYWNlXG5pZiAoZ2xvYmFsICYmIGdsb2JhbC5Qcm9taXNlKSB7XG4gICAgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvbWlzZUNvbnRydWN0b3IoKSB7XG4gICAgcmV0dXJuIFByb21pc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9taXNlQ29udHJ1Y3RvcihQOiBQcm9taXNlQ29uc3RydWN0b3IpIHtcbiAgICBQcm9taXNlID0gUDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL3Byb21pc2UudHMiLCJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcIi4uL3V0aWwvcHJvbWlzZVwiO1xuaW1wb3J0IHsgZ2xvYmFsIH0gZnJvbSBcIi4uL3V0aWwvZW52L2dsb2JhbFwiO1xuaW1wb3J0ICogYXMgd2F2IGZyb20gXCIuLi91dGlsL3dhdlwiO1xuXG50eXBlIGdldFVzZXJNZWRpYSA9IChjb25zdHJhaW50czogTWVkaWFTdHJlYW1Db25zdHJhaW50cyxcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IE5hdmlnYXRvclVzZXJNZWRpYVN1Y2Nlc3NDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrOiBOYXZpZ2F0b3JVc2VyTWVkaWFFcnJvckNhbGxiYWNrKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiBkdW1teUdldFVzZXJNZWRpYShjb25zdHJhaW50czogTWVkaWFTdHJlYW1Db25zdHJhaW50cyxcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IE5hdmlnYXRvclVzZXJNZWRpYVN1Y2Nlc3NDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrOiBOYXZpZ2F0b3JVc2VyTWVkaWFFcnJvckNhbGxiYWNrKSB7XG4gICAgZXJyb3JDYWxsYmFjayhuZXcgTWVkaWFTdHJlYW1FcnJvcigpKTtcbn1cblxuY29uc3QgQXVkaW9Db250ZXh0ID0gZ2xvYmFsLkF1ZGlvQ29udGV4dCB8fCBnbG9iYWwud2Via2l0QXVkaW9Db250ZXh0O1xuY29uc3QgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWEgPSAobmF2aWdhdG9yLmdldFVzZXJNZWRpYVxuICAgIHx8IChuYXZpZ2F0b3IgYXMgYW55KS53ZWJraXRHZXRVc2VyTWVkaWFcbiAgICB8fCAobmF2aWdhdG9yIGFzIGFueSkubW96R2V0VXNlck1lZGlhXG4gICAgfHwgZHVtbXlHZXRVc2VyTWVkaWEpLmJpbmQobmF2aWdhdG9yKTtcblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBicm93c2VyIHN1cHBvcnRzIGF1ZGlvIHJlY29yZGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuICEhKGdldFVzZXJNZWRpYSAmJiBBdWRpb0NvbnRleHQpO1xufVxuXG4vKipcbiAqIGdldFVzZXJNZWRpYSBvcHRpb25zXG4gKi9cbmNvbnN0IFNUUkVBTV9PUFRJT05TID0ge1xuICAgIHZpZGVvOiBmYWxzZSxcbiAgICBhdWRpbzoge1xuICAgICAgICBvcHRpb25hbDogW10sXG4gICAgICAgIG1hbmRhdG9yeToge1xuICAgICAgICAgICAgZ29vZ0VjaG9DYW5jZWxsYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgZ29vZ0F1dG9HYWluQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBnb29nTm9pc2VTdXBwcmVzc2lvbjogZmFsc2UsXG4gICAgICAgICAgICBnb29nSGlnaHBhc3NGaWx0ZXI6IGZhbHNlLFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5sZXQgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0QXVkaW8oKTogUHJvbWlzZTxNZWRpYVN0cmVhbT4ge1xuICAgIGNvbnNvbGUubG9nKCdpbml0IGF1ZGlvJyk7XG4gICAgaWYgKCFpc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcIkF1ZGlvIGNhcHR1cmUgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZ2V0VXNlck1lZGlhKDxNZWRpYVN0cmVhbUNvbnN0cmFpbnRzPlNUUkVBTV9PUFRJT05TLCAoc3RyZWFtKSA9PiB7IHJlc29sdmUoc3RyZWFtKTsgfSwgcmVqZWN0KTtcbiAgICB9KTtcbn1cblxubGV0IHJlY29yZGVyQ2xlYW51cDogKCkgPT4gdm9pZDtcbmxldCByZWNvcmRlclRpbWVvdXQ6IG51bWJlcjtcblxuLyoqXG4gKiBSZWNvcmRzIGEgc2FtcGxlIG9mIHNwZWNpZmllZCBsZW5ndGggaW4gbWlsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZFNhbXBsZShzdHJlYW06IE1lZGlhU3RyZWFtLCBkdXJhdGlvbjogbnVtYmVyKTogUHJvbWlzZTxCbG9iPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGF1ZGlvQ29udGV4dCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBhdWRpbyBjb250ZXh0XCIpO1xuICAgICAgICAgICAgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuIGF1ZGlvIHN0cmVhbSBzb3VyY2VcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gICAgICAgIC8vIENyZWF0ZSBhIGdhaW4gbm9kZVxuICAgICAgICBjb25zdCBnYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgLy8gQ3JlYXRlIGEgc2NyaXB0IHByb2Nlc3NvclxuICAgICAgICBjb25zdCBjcmVhdGVTY3JpcHRQcm9jZXNzb3IgPSBhdWRpb0NvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yXG4gICAgICAgICAgICB8fCAoYXVkaW9Db250ZXh0IGFzIGFueSkuY3JlYXRlSmF2YVNjcmlwdE5vZGU7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NvcjogU2NyaXB0UHJvY2Vzc29yTm9kZSA9IGNyZWF0ZVNjcmlwdFByb2Nlc3NvclxuICAgICAgICAgICAgLmNhbGwoYXVkaW9Db250ZXh0LCAyMDQ4LCAxLCAxKTtcblxuICAgICAgICAvLyBDb25uZWN0IG5vZGVzXG4gICAgICAgIC8vIFtzb3VyY2VdIC0+IFtnYWluXSAtPiBbcHJvY2Vzc29yXSAtPiBbY29udGV4dC5kZXN0aW5hdGlvbl1cbiAgICAgICAgc291cmNlLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChwcm9jZXNzb3IpO1xuICAgICAgICBwcm9jZXNzb3IuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgICAgIC8vICBMaXN0ZW4gZm9yIGRhdGFcbiAgICAgICAgY29uc3Qgc2FtcGxlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgY29uc3QgYXVkaW9Qcm9jZXNzTGlzdGVuZXIgPSAoZTogQXVkaW9Qcm9jZXNzaW5nRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFubmVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2FtcGxlcy5wdXNoKGNoYW5uZWxbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwcm9jZXNzb3IuYWRkRXZlbnRMaXN0ZW5lcihcImF1ZGlvcHJvY2Vzc1wiLCBhdWRpb1Byb2Nlc3NMaXN0ZW5lcik7XG5cbiAgICAgICAgcmVjb3JkZXJDbGVhbnVwID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRlciBjbGVhbnVwXCIpO1xuICAgICAgICAgICAgc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uc3RvcCgpO1xuICAgICAgICAgICAgcHJvY2Vzc29yLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhdWRpb3Byb2Nlc3NcIiwgYXVkaW9Qcm9jZXNzTGlzdGVuZXIpO1xuICAgICAgICAgICAgcHJvY2Vzc29yLmRpc2Nvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgIGdhaW4uZGlzY29ubmVjdChwcm9jZXNzb3IpO1xuICAgICAgICAgICAgc291cmNlLmRpc2Nvbm5lY3QoZ2Fpbik7XG5cbiAgICAgICAgICAgIGlmIChhdWRpb0NvbnRleHQuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIGF1ZGlvIGNvbnRleHRcIik7XG4gICAgICAgICAgICAgICAgYXVkaW9Db250ZXh0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYXVkaW9Db250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29yZGVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmQgdGltZSBlbmRcIik7XG4gICAgICAgICAgICBjb25zdCBibG9iID0gd2F2LmVuY29kZVdBVihzYW1wbGVzLCBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSwgMSk7XG4gICAgICAgICAgICByZWNvcmRlckNsZWFudXAoKTtcbiAgICAgICAgICAgIHJlY29yZGVyQ2xlYW51cCA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmRlclRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgcmVzb2x2ZShibG9iKTtcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFJlY29yZGluZygpIHtcbiAgICBjb25zb2xlLmxvZyhcInJlY29yZCBzdG9wXCIpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChyZWNvcmRlclRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChyZWNvcmRlclRpbWVvdXQpO1xuICAgICAgICAgICAgcmVjb3JkZXJUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkZXJDbGVhbnVwKSB7XG4gICAgICAgICAgICByZWNvcmRlckNsZWFudXAoKTtcbiAgICAgICAgICAgIHJlY29yZGVyQ2xlYW51cCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92b2ljZS9hdWRpby50cyIsIlxuLyoqXG4gKiBBcHBlbmRzIGZsb2F0IGRhdGEgdG8gRGF0YVZpZXcgYXMgMTYtYml0IFBDTSBkYXRhXG4gKi9cbmZ1bmN0aW9uIHdyaXRlRGF0YVZpZXdGbG9hdEFzUENNKG91dHB1dDogRGF0YVZpZXcsIG9mZnNldDogbnVtYmVyLCBpbnB1dDogbnVtYmVyW10pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrICwgb2Zmc2V0ICs9IDIpIHtcbiAgICAgICAgbGV0IHMgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgaW5wdXRbaV0pKTtcbiAgICAgICAgb3V0cHV0LnNldEludDE2KG9mZnNldCwgcyA8IDAgPyBzICogMHg4MDAwIDogcyAqIDB4N0ZGRiwgdHJ1ZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEFwcGVuZHMgc3RyaW5nIGRhdGEgdG8gRGF0YVZpZXdcbiAqL1xuZnVuY3Rpb24gd3JpdGVEYXRhVmlld1N0cmluZyhvdXRwdXQ6IERhdGFWaWV3LCBvZmZzZXQ6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvdXRwdXQuc2V0VWludDgob2Zmc2V0ICsgaSwgc3RyaW5nLmNoYXJDb2RlQXQoaSkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFbmNvZGVzIGZsb2F0IHNhbXBsZXMgYXMgYSBXQVYgQmxvYlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlV0FWKGlucHV0OiBudW1iZXJbXSwgc2FtcGxlUmF0ZTogbnVtYmVyLCBjaGFubmVsczogbnVtYmVyKSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDQ0ICsgaW5wdXQubGVuZ3RoICogMik7XG4gICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICAgIC8vIFJJRkYgaWRlbnRpZmllclxuICAgIHdyaXRlRGF0YVZpZXdTdHJpbmcodmlldywgMCwgXCJSSUZGXCIpO1xuICAgIC8vIFJJRkYgY2h1bmsgbGVuZ3RoXG4gICAgdmlldy5zZXRVaW50MzIoNCwgMzYgKyBpbnB1dC5sZW5ndGggKiAyLCB0cnVlKTtcbiAgICAvLyBSSUZGIHR5cGVcbiAgICB3cml0ZURhdGFWaWV3U3RyaW5nKHZpZXcsIDgsIFwiV0FWRVwiKTtcbiAgICAvLyBmb3JtYXQgY2h1bmsgaWRlbnRpZmllclxuICAgIHdyaXRlRGF0YVZpZXdTdHJpbmcodmlldywgMTIsIFwiZm10IFwiKTtcbiAgICAvLyBmb3JtYXQgY2h1bmsgbGVuZ3RoXG4gICAgdmlldy5zZXRVaW50MzIoMTYsIDE2LCB0cnVlKTtcbiAgICAvLyBzYW1wbGUgZm9ybWF0IChyYXcpXG4gICAgdmlldy5zZXRVaW50MTYoMjAsIDEsIHRydWUpO1xuICAgIC8vIGNoYW5uZWwgY291bnRcbiAgICB2aWV3LnNldFVpbnQxNigyMiwgY2hhbm5lbHMsIHRydWUpO1xuICAgIC8vIHNhbXBsZSByYXRlXG4gICAgdmlldy5zZXRVaW50MzIoMjQsIHNhbXBsZVJhdGUsIHRydWUpO1xuICAgIC8vIGJ5dGUgcmF0ZSAoc2FtcGxlIHJhdGUgKiBibG9jayBhbGlnbilcbiAgICB2aWV3LnNldFVpbnQzMigyOCwgc2FtcGxlUmF0ZSAqIDQsIHRydWUpO1xuICAgIC8vIGJsb2NrIGFsaWduIChjaGFubmVsIGNvdW50ICogYnl0ZXMgcGVyIHNhbXBsZSlcbiAgICB2aWV3LnNldFVpbnQxNigzMiwgY2hhbm5lbHMgKiAyLCB0cnVlKTtcbiAgICAvLyBiaXRzIHBlciBzYW1wbGVcbiAgICB2aWV3LnNldFVpbnQxNigzNCwgMTYsIHRydWUpO1xuICAgIC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllclxuICAgIHdyaXRlRGF0YVZpZXdTdHJpbmcodmlldywgMzYsIFwiZGF0YVwiKTtcbiAgICAvLyBkYXRhIGNodW5rIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDQwLCBpbnB1dC5sZW5ndGggKiAyLCB0cnVlKTtcbiAgICB3cml0ZURhdGFWaWV3RmxvYXRBc1BDTSh2aWV3LCA0NCwgaW5wdXQpO1xuICAgIHJldHVybiBuZXcgQmxvYihbdmlld10sIHtcbiAgICAgICAgdHlwZTogXCJhdWRpby93YXZcIixcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL3dhdi50cyIsImltcG9ydCB7IGFwaSB9IGZyb20gXCIuLy4uL2FwaVwiO1xuaW1wb3J0ICogYXMgY2FsbHMgZnJvbSBcIi4vY2FsbHNcIjtcbmltcG9ydCAqIGFzIGF1ZGlvIGZyb20gXCIuL2F1ZGlvXCI7XG5pbXBvcnQgKiBhcyByZWNvcmRpbmcgZnJvbSBcIi4vcmVjb3JkaW5nXCI7XG5cbi8qKlxuICogW1tpbmNsdWRlOnZvaWNlLW1vZHVsZS5tZF1dXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2Ugdm9pY2Uge1xuXG4gICAgLyoqXG4gICAgICogVG9rZW4gbmFtZXMgdG8gYmUgdXNlZCB3aXRoIFtbZ2V0RW5yb2xsbWVudFRva2VuXV1cbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBFbnJvbGxtZW50VG9rZW5LZXkgPSBcImVucm9sbC0xXCIgfCBcImVucm9sbC0yXCIgfCBcImVucm9sbC0zXCIgfCBcImVucm9sbC00XCIgfCBcImVucm9sbC01XCI7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB2b2ljZSBtb2R1bGUgaXMgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgYnJvd3Nlci5cbiAgICAgKiBAcmV0dXJuIGlmIHZvaWNlIG1vZHVsZSBjYW4gYmUgdXNlZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBhdWRpby5pc1N1cHBvcnRlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbCBlbnJvbGxtZW50IHRva2VuIGtleXNcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGFsbCBlbnJvbGxtZW50IHRva2VuIGtleXMgdG8gYmUgdXNlZCB3aXRoIFtbZ2V0RW5yb2xsbWVudFRva2VuXV1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0RW5yb2xsbWVudFRva2VuS2V5cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbXCJlbnJvbGwtMVwiLCBcImVucm9sbC0yXCIsIFwiZW5yb2xsLTNcIiwgXCJlbnJvbGwtNFwiLCBcImVucm9sbC01XCJdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0b2tlbktleSB0b2tlbiBrZXkgd2hpY2ggaWRlbnRpZmllcyB0b2tlblxuICAgICAqIEBwYXJhbSBzZXJpYWxpemUgZmxhZyB0byByZXR1cm4gc2VyaWFsaXNlZCByZXF1ZXN0IGluc3RlYWQgb2YgcGVyZm9ybWluZyBBUEkgY2FsbFxuICAgICAqIEByZXR1cm4gUmV0dXJuIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgdG86IFxuICAgICAqICogc3RyaW5nIGNvbnRhaW5pbmcgZW5yb2xsbWVudCB2b2ljZSB0b2tlbiBpZiBzZXJpYWxpemUgcGFyYW1ldGVyIHdhcyBmYWxzZVxuICAgICAqICogc3RyaW5nIHdpdGggc2VyaWFsaXplZCByZXF1ZXN0IGJvZHkgaWYgc2VyaWFsaXplIHBhcmFtZXRlciB3YXMgdHJ1ZVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRFbnJvbGxtZW50VG9rZW4odG9rZW5LZXk6IEVucm9sbG1lbnRUb2tlbktleSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplPzogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBjYWxscy5nZXRFbnJvbGxtZW50Q2hhbGxlbmdlVGV4dCh0b2tlbktleSwgbWV0YWRhdGEsIHNlcmlhbGl6ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNlcmlhbGl6ZSBmbGFnIHRvIHJldHVybiBzZXJpYWxpc2VkIHJlcXVlc3QgaW5zdGVhZCBvZiBwZXJmb3JtaW5nIEFQSSBjYWxsXG4gICAgICogQHJldHVybiBQcm9taXNlIHdoaWNoIHJlc29sdmVzIHRvOiBcbiAgICAgKiAqIHN0cmluZyBjb250YWluaW5nIGF1dGhlbnRpY2F0aW9uIHRva2VuIGlmIHNlcmlhbGl6ZSBwYXJhbWV0ZXIgd2FzIGZhbHNlXG4gICAgICogKiBzdHJpbmcgd2l0aCBzZXJpYWxpemVkIHJlcXVlc3QgYm9keSBpZiBzZXJpYWxpemUgcGFyYW1ldGVyIHdhcyB0cnVlXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEF1dGhlbnRpY2F0aW9uVG9rZW4obWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplPzogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBjYWxscy5nZXRBdXRoZW50aWNhdGlvbkNoYWxsZW5nZVRleHQobWV0YWRhdGEsIHNlcmlhbGl6ZSk7XG4gICAgfVxuICAgICAgIFxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdG8gW1tWb2ljZUVucm9sbG1lbnRSZXN1bHRdXS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nKTogUHJvbWlzZTxhcGkuVm9pY2VFbnJvbGxtZW50UmVzdWx0PjtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuICBQcm9taXNlIHJlc29sdmluZyB0byBzdHJpbmcgd2l0aCBBUEkgcmVxdWVzdCBib2R5LlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlbnJvbGxXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplOiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG4gICAgLyoqXG4gICAgICogRW5yb2xsIHVzaW5nIHJlY29yZGVkIHZvaWNlLiBcbiAgICAgKiBAcGFyYW0gZGF0YSByZWNvcmRpbmcgY3JlYXRlZCB1c2luZyBbW3JlY29yZFZvaWNlXV1cbiAgICAgKiBAcGFyYW0gc2VyaWFsaXplIGZsYWcgdG8gcmVxdWVzdCBzZXJpYWxpc2VkIHJlcXVlc3QgaW5zdGVhZCBvZiBwZXJmb3JtaW5nIEFQSSBjYWxsXG4gICAgICogQHBhcmFtIG1ldGFkYXRhXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGVucm9sbFdpdGhEYXRhKGRhdGE6IHN0cmluZ1tdLCBtZXRhZGF0YT86IHN0cmluZywgc2VyaWFsaXplPyk6IFByb21pc2U8YXBpLlZvaWNlRW5yb2xsbWVudFJlc3VsdD4gfCBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gY2FsbHMuZW5yb2xsV2l0aERhdGEoZGF0YSwgbWV0YWRhdGEsIHNlcmlhbGl6ZSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdG8gW1tBdXRoZW50aWNhdGlvblJlc3VsdF1dLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWNhdGVXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE/OiBzdHJpbmcpOiBQcm9taXNlPGFwaS5BdXRoZW50aWNhdGlvblJlc3VsdD47XG4gICAgLyoqXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0byBbW0F1dGhlbnRpY2F0aW9uUmVzdWx0XV0uXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZVdpdGhEYXRhKGRhdGE6IHN0cmluZ1tdLCBtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU6IGZhbHNlKTogUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+XG4gICAgLyoqXG4gICAgICogQHJldHVybiAgUHJvbWlzZSByZXNvbHZpbmcgdG8gc3RyaW5nIHdpdGggQVBJIHJlcXVlc3QgYm9keS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZTogdHJ1ZSk6IFByb21pc2U8c3RyaW5nPlxuICAgIC8qKlxuICAgICAqIFZvaWNlIGF1dGhlbnRpY2F0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRhIHJlY29yZGluZyBjcmVhdGVkIHVzaW5nIFtbcmVjb3JkVm9pY2VdXVxuICAgICAqIEBwYXJhbSBzZXJpYWxpemUgZmxhZyB0byByZXF1ZXN0IHNlcmlhbGlzZWQgcmVxdWVzdCBpbnN0ZWFkIG9mIHBlcmZvcm1pbmcgQVBJIGNhbGxcbiAgICAgKiBAcGFyYW0gbWV0YWRhdGFcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nLCBzZXJpYWxpemU/KTogUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+IHwgUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxzLmF1dGhlbnRpY2F0ZVdpdGhEYXRhKGRhdGEsIG1ldGFkYXRhLCBzZXJpYWxpemUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgZm9yIHZvaWNlIHJlY29yZGluZyBwb3B1cFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIFZvaWNlRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0b3AgbGFiZWwgaW4gdm9pY2UgcmVjb3JkaW5nIHBvcHVwIHZpc2libGUgYmVmb3JlIHJlY29yZGluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGVscFRleHQ/OiBzdHJpbmc7XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogVGV4dCBzaG93biBkdXJpbmcgY2FwdHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgY2FwdHVyaW5nVGV4dD86IHN0cmluZztcbiAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb2dyZXNzIHRleHQgYmVmb3JlIHJlY29yZGluZy5cbiAgICAgICAgICovXG4gICAgICAgIHByb2dyZXNzU3RhcnRUZXh0Pzogc3RyaW5nO1xuICAgIFxuICAgICAgICAgLyoqXG4gICAgICAgICAgKiBQcm9ncmVzcyB0ZXh0IHdoaWNoIGlzIHNob3duIHdoZW4gdm9pY2UgcmVjb3JkaW5nIGlzIHN0YXJ0ZWQuXG4gICAgICAgICAgKiBVc2Uge3N9IHBhdHRlcm4gaW5zaWRlIHRoZSBsYWJlbCB0byBzaG93IHRpbWVyIHZhbHVlIGFueXdoZXJlIGluIGxhYmVsLlxuICAgICAgICAgICovXG4gICAgICAgIHByb2dyZXNzVGltZXJUZXh0Pzogc3RyaW5nOyBcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEVycm9yIGNvZGVzIHVzZWQgd2hlbiByZWNvcmRpbmcgZmFpbHNcbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBSZWNvcmRpbmdFcnJvciB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNvcmRpbmcgcG9wdXAgd2FzIGNsb3NlZCBieSB1c2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgUG9wdXBDbG9zZWQgPSAwLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNvcmRpbmcgaXMgbm90IHN1cHBvcnRlZCBieSBicm93c2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgTm90U3VwcG9ydGVkID0gLTEsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vIHJlY29yZGluZyBkZXZpY2UgaXMgcHJlc2VudC5cbiAgICAgICAgICovXG4gICAgICAgIE5vRGV2aWNlID0gLTIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVycm9yIHdoaWxlIHRyeWluZyB0byByZWNvcmRcbiAgICAgICAgICovXG4gICAgICAgIFJlY29yZGluZ0Vycm9yID0gLTMsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgdm9pY2UgcmVjb3JkaW5nIHBvdXAuXG4gICAgICogQHBhcmFtIHRva2VuIHZvaWNlIHRva2VuIHNob3duIHRvIHVzZXJcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHRvIHN0cmluZyBhcnJheSB3aXRoIGJhc2U2NCBlbmNvZGVkIGF1ZGlvIHJlY29yZGluZ1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiByZWNvcmRWb2ljZSh0b2tlbjogc3RyaW5nLCBvcHRpb25zOiBWb2ljZURpYWxvZ09wdGlvbnMpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIHJldHVybiByZWNvcmRpbmcucmVjb3JkVm9pY2UodG9rZW4sIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92b2ljZS9pbmRleC50cyIsImltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSBcIi4vLi4vdXRpbC9lbnYvYnJvd3NlclwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCIuLy4uL3V0aWwvcHJvbWlzZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vLi4vYXBpXCI7XG5pbXBvcnQgKiBhcyBzdGF0ZSBmcm9tIFwiLi8uLi9zZXNzaW9uL3N0YXRlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnJvbGxXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplOiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG5leHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZTogZmFsc2UpOiBQcm9taXNlPGFwaS5Wb2ljZUVucm9sbG1lbnRSZXN1bHQ+XG5leHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcpOiBQcm9taXNlPGFwaS5Wb2ljZUVucm9sbG1lbnRSZXN1bHQ+XG5leHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZT86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4gfCBQcm9taXNlPGFwaS5Wb2ljZUVucm9sbG1lbnRSZXN1bHQ+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gc3RhdGUuZ2V0Q2FjaGVkU2Vzc2lvbigpO1xuICAgIGlmIChzZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHtcbiAgICAgICAgICAgIGVycm9yQ29kZTogYXBpLkVycm9yQ29kZS5Ob09wZW5TZXNzaW9uLFxuICAgICAgICAgICAgZXJyb3I6IFwiVGhpcyBjYWxsIHJlcXVpcmVzIGFjdGl2ZSBzZXNzaW9uXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzZXJpYWxpemUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhcGkuZW5yb2xsVm9pY2Uoc2Vzc2lvbi5nZXRJZCgpLCBkYXRhLCBtZXRhZGF0YSkuc2VyaWFsaXplKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcGkuZW5yb2xsVm9pY2Uoc2Vzc2lvbi5nZXRJZCgpLCBkYXRhLCBtZXRhZGF0YSkuc2VuZCgpOyBcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZTogdHJ1ZSk6IFByb21pc2U8c3RyaW5nPlxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZVdpdGhEYXRhKGRhdGE6IHN0cmluZ1tdLCBtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU6IGZhbHNlKTogUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+XG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcpOiBQcm9taXNlPGFwaS5BdXRoZW50aWNhdGlvblJlc3VsdD5cbmV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWNhdGVXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplPzogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPiB8IFByb21pc2U8YXBpLkF1dGhlbnRpY2F0aW9uUmVzdWx0PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IHN0YXRlLmdldENhY2hlZFNlc3Npb24oKTtcbiAgICBpZiAoc2Vzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7XG4gICAgICAgICAgICBlcnJvckNvZGU6IGFwaS5FcnJvckNvZGUuTm9PcGVuU2Vzc2lvbixcbiAgICAgICAgICAgIGVycm9yOiBcIlRoaXMgY2FsbCByZXF1aXJlcyBhY3RpdmUgc2Vzc2lvblwiXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYXBpLmF1dGhlbnRpY2F0ZVZvaWNlKHNlc3Npb24uZ2V0SWQoKSwgZGF0YSwgbWV0YWRhdGEpLnNlcmlhbGl6ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYXBpLmF1dGhlbnRpY2F0ZVZvaWNlKHNlc3Npb24uc2Vzc2lvbiwgZGF0YSwgbWV0YWRhdGEpLnNlbmQoKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0YXRlLnNldENhY2hlZFNlc3Npb25TY29yZShyZXN1bHQuc2NvcmUpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KTs7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVucm9sbG1lbnRDaGFsbGVuZ2VUZXh0KHRva2VuOiBzdHJpbmcsIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZT86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBzdGF0ZS5nZXRDYWNoZWRTZXNzaW9uKCk7XG4gICAgaWYgKHNlc3Npb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe1xuICAgICAgICAgICAgZXJyb3JDb2RlOiBhcGkuRXJyb3JDb2RlLk5vT3BlblNlc3Npb24sXG4gICAgICAgICAgICBlcnJvcjogXCJUaGlzIGNhbGwgcmVxdWlyZXMgYWN0aXZlIHNlc3Npb25cIlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFwaS5nZXRWb2ljZUNoYWxsZW5nZShzZXNzaW9uLmdldElkKCksIHRva2VuLCBtZXRhZGF0YSkuc2VyaWFsaXplKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcGkuZ2V0Vm9pY2VDaGFsbGVuZ2Uoc2Vzc2lvbi5nZXRJZCgpLCB0b2tlbiwgbWV0YWRhdGEpLnNlbmQoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0LnRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aGVudGljYXRpb25DaGFsbGVuZ2VUZXh0KG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZT86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBzdGF0ZS5nZXRDYWNoZWRTZXNzaW9uKCk7XG4gICAgaWYgKHNlc3Npb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe1xuICAgICAgICAgICAgZXJyb3JDb2RlOiBhcGkuRXJyb3JDb2RlLk5vT3BlblNlc3Npb24sXG4gICAgICAgICAgICBlcnJvcjogXCJUaGlzIGNhbGwgcmVxdWlyZXMgYWN0aXZlIHNlc3Npb25cIlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFwaS5nZXRWb2ljZUNoYWxsZW5nZShzZXNzaW9uLmdldElkKCksIFwiYXV0aFwiLCBtZXRhZGF0YSkuc2VyaWFsaXplKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcGkuZ2V0Vm9pY2VDaGFsbGVuZ2Uoc2Vzc2lvbi5nZXRJZCgpLCBcImF1dGhcIiwgbWV0YWRhdGEpLnNlbmQoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0LnRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZvaWNlL2NhbGxzLnRzIiwiaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG4vKipcbiAqIFtbaW5jbHVkZTphcGktbW9kdWxlLm1kXV1cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBhcGkge1xuXG4gICAgLyoqXG4gICAgICogTW9kdWxlIGVucm9sbG1lbnQgc3RhdHVzLlxuICAgICAqL1xuICAgIGV4cG9ydCBlbnVtIEVucm9sbG1lbnRTdGF0dXMge1xuICAgICAgICAvKipcbiAgICAgICAgICogTm90IGVucm9sbGVkIHRvIHRoZSBtb2R1bGUgeWV0LlxuICAgICAgICAgKi9cbiAgICAgICAgTm90RW5yb2xsZWQgPSAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogRW5yb2xsZWQgdG8gbW9kdWxlLlxuICAgICAgICAgKi9cbiAgICAgICAgRW5yb2xsZWQgPSAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogQmlvbWV0cmljIHRlbXBsYXRlIGlzIGJlaW5nIGJ1aWx0LiBBUEkgdXNlciBzaG91bGQgcmV0cnkgQVBJIGNhbGwgYWZ0ZXIgc2hvcnQgZGVsYXkuXG4gICAgICAgICAqL1xuICAgICAgICBCdWlsZGluZyA9IDIsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFQSSBjYWxsIGVycm9yIGNvZGUuIFxuICAgICAqL1xuICAgIGV4cG9ydCBlbnVtIEVycm9yQ29kZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBlcnJvciB3aGlsZSBwYXJzaW5nIHJlc3BvbnNlLlxuICAgICAgICAgKi9cbiAgICAgICAgVW5yZWNvZ25pemVkUmVzcG9uc2UgPSAxLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2FsbCByZXF1aXJlcyBzZXNzaW9uIGFjdGl2ZSBzZXNzaW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgTm9PcGVuU2Vzc2lvbiA9IDIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVycm9yIHdoaWxlIHNlbmRpbmcgcmVxdWVzdFxuICAgICAgICAgKi9cbiAgICAgICAgUmVxdWVzdEVycm9yID0gMyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQVBJIHdhcyBjYWxsZWQgd2l0aCBpbnZhbGlkIHBhcmFtZXRlcnMuXG4gICAgICAgICAqL1xuICAgICAgICBCYWRSZXF1ZXN0ID0gNDAwLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZhbGlkIEFQSSBrZXkgb3Igc2VjcmV0IHVzZWQgd2hpbGUgbWFraW5nIEFQSSBjYWxsLlxuICAgICAgICAgKi9cbiAgICAgICAgSW52YWxpZEtleU9yU2lnbmF0dXJlID0gNDAxLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDdXJyZW50IHNlc3Npb24gaWQgaXMgbm90IHZhbGlkLlxuICAgICAgICAgKi9cbiAgICAgICAgSW52YWxpZFNlc3Npb25JZCA9IDQwMyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXV0aG9yaXphdGlvbiBjYWxsIGZhaWxlZC5cbiAgICAgICAgICovXG4gICAgICAgIEF1dGhvcml6YXRpb25GYWlsZWQgPSA0MjIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVucm9sbGVtbnQgY2FsbCBmYWlsZWQuXG4gICAgICAgICAqL1xuICAgICAgICBFbnJvbGxtZW50RmFpbGVkID0gNDIyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VyIGlzIG5vdCBlbnJvbGxlZCB3aGVuIGNhbGwgbmVlZHMgZmluaXNoZWQgZW5yb2xsbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIE5vdEVucm9sbGVkWWV0ID0gNDI0LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igd2hpbGUgcGVyZm9ybWluZyBvcGVyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBTZXJ2ZXJFcnJvciA9IDUwMFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXN1bHQgZm9yIHNlc3Npb24gY3JlYXRpb24gY2FsbC5cbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBTZXNzaW9uUmVzdWx0ID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2Vzc2lvbiBpZGVudGlmaWVyXG4gICAgICAgICAqL1xuICAgICAgICBzZXNzaW9uOiBzdHJpbmc7XG4gXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvdXJhbCBtb2R1bGUgZW5yb2xsbWVudCBzdGF0dXMuXG4gICAgICAgICAqL1xuICAgICAgICBiZWhhdmlvdXI6IFxuICAgICAgICBFbnJvbGxtZW50U3RhdHVzLk5vdEVucm9sbGVkIHwgXG4gICAgICAgIEVucm9sbG1lbnRTdGF0dXMuRW5yb2xsZWQgfFxuICAgICAgICBFbnJvbGxtZW50U3RhdHVzLkJ1aWxkaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGYWNpYWwgbW9kdWxlIGVucm9sbG1lbnQgc3RhdHVzLlxuICAgICAgICAgKi9cbiAgICAgICAgZmFjZTpcbiAgICAgICAgRW5yb2xsbWVudFN0YXR1cy5Ob3RFbnJvbGxlZCB8XG4gICAgICAgIEVucm9sbG1lbnRTdGF0dXMuRW5yb2xsZWQgfFxuICAgICAgICBFbnJvbGxtZW50U3RhdHVzLkJ1aWxkaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWb2ljZSBtb2R1bGUgZW5yb2xsbWVudCBzdGF0dXMuXG4gICAgICAgICAqL1xuICAgICAgICB2b2ljZTpcbiAgICAgICAgRW5yb2xsbWVudFN0YXR1cy5Ob3RFbnJvbGxlZCB8XG4gICAgICAgIEVucm9sbG1lbnRTdGF0dXMuRW5yb2xsZWQgfFxuICAgICAgICBFbnJvbGxtZW50U3RhdHVzLkJ1aWxkaW5nO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXN1bHQgZm9yIHN1Y2Nlc2Z1bGwgYmVoYXZpb3VyIGV2ZW50IHNlbmRpbmcgY2FsbC5cbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBTZW5kQmVoYXZpb3VyUmVzdWx0ID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3VycmVudCBiZWhhdmlvdXJhbCBzY29yZS5cbiAgICAgICAgICovXG4gICAgICAgIHNjb3JlOiBudW1iZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvdXJhbCBtb2R1bGUgZW5yb2xsbWVudCBzdGF0dXMuXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0dXM6IEVucm9sbG1lbnRTdGF0dXMuTm90RW5yb2xsZWQgfCBFbnJvbGxtZW50U3RhdHVzLkVucm9sbGVkO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXN1bHQgZm9yIHN1Y2Nlc2Z1bGwgQVBJIGF1dGhlbnRpY2F0aW9uIGNhbGwuXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgQXV0aGVudGljYXRpb25SZXN1bHQgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdWJtaXR0ZWQgZGF0YSBzY29yZVxuICAgICAgICAgKi9cbiAgICAgICAgc2NvcmU6IG51bWJlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1Ym1pdHRlZCBkYXRhIGxpdmVuZXNzXG4gICAgICAgICAqL1xuICAgICAgICBsaXZlbGluZXNzOiBudW1iZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc3VsdCBmb3Igc3VjY2VzZnVsbCBmYWNpYWwgZW5yb2xsbWVudCBBUEkgY2FsbFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIEZhY2lhbEVucm9sbG1lbnRSZXN1bHQgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOdW1iZXIgb2YgaW1hZ2VzIC8gdmlkZW9zIGVucm9sbGVkIHN1Y2Nlc2Z1bGx5XG4gICAgICAgICAqL1xuICAgICAgICBpbWFnZXNDb3VudDogbnVtYmVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXN1bHQgZm9yIHN1Y2Nlc2Z1bGwgdm9pY2UgZW5yb2xsbWVudCBBUEkgY2FsbFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIFZvaWNlRW5yb2xsbWVudFJlc3VsdCA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNhbXBsZXMgZW5yb2xsZWQgc3VjY2VzZnVsbHkuXG4gICAgICAgICAqL1xuICAgICAgICB2b2ljZVNhbXBsZXM6IG51bWJlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzdWx0IGZvciBzdWNjZXNmdWxsIHZvaWNlIHRva2VuIEFQSSBjYWxsXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgVm9pY2VUb2tlblJlc3VsdCA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZvaWNlIHRva2VuXG4gICAgICAgICAqL1xuICAgICAgICB0b2tlbjogc3RyaW5nO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXN1bHQgZm9yIGZhaWxlZCBBUEkgY2FsbFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIEFwaUNhbGxFcnJvciA9IHtcbiAgICAgICAgZXJyb3JDb2RlOlxuICAgICAgICBFcnJvckNvZGUuVW5yZWNvZ25pemVkUmVzcG9uc2UgfFxuICAgICAgICBFcnJvckNvZGUuQmFkUmVxdWVzdCB8XG4gICAgICAgIEVycm9yQ29kZS5JbnZhbGlkS2V5T3JTaWduYXR1cmUgfFxuICAgICAgICBFcnJvckNvZGUuSW52YWxpZFNlc3Npb25JZCB8XG4gICAgICAgIEVycm9yQ29kZS5TZXJ2ZXJFcnJvcjtcbiAgICAgICAgZXJyb3I6IHN0cmluZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzcG9uc2UgZm9yIGZhaWxlZCBlbnJvbGxtZW50IEFQSSBjYWxsXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgRW5yb2xsbWVudEVycm9yID0ge1xuICAgICAgICBlcnJvckNvZGU6XG4gICAgICAgIEVycm9yQ29kZS5VbnJlY29nbml6ZWRSZXNwb25zZSB8XG4gICAgICAgIEVycm9yQ29kZS5Ob09wZW5TZXNzaW9uIHxcbiAgICAgICAgRXJyb3JDb2RlLkJhZFJlcXVlc3QgfFxuICAgICAgICBFcnJvckNvZGUuSW52YWxpZEtleU9yU2lnbmF0dXJlIHxcbiAgICAgICAgRXJyb3JDb2RlLkludmFsaWRTZXNzaW9uSWQgfFxuICAgICAgICBFcnJvckNvZGUuRW5yb2xsbWVudEZhaWxlZCB8XG4gICAgICAgIEVycm9yQ29kZS5TZXJ2ZXJFcnJvcjtcbiAgICAgICAgZXJyb3I6IHN0cmluZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzcG9uc2UgZm9yIGZhaWxlZCBhdXRoZW50aWNhdGlvbiBBUEkgY2FsbFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIEF1dGhlbnRpY2F0aW9uRXJyb3IgPSB7XG4gICAgICAgIGVycm9yQ29kZTpcbiAgICAgICAgRXJyb3JDb2RlLlVucmVjb2duaXplZFJlc3BvbnNlIHxcbiAgICAgICAgRXJyb3JDb2RlLkJhZFJlcXVlc3QgfFxuICAgICAgICBFcnJvckNvZGUuSW52YWxpZEtleU9yU2lnbmF0dXJlIHxcbiAgICAgICAgRXJyb3JDb2RlLkludmFsaWRTZXNzaW9uSWQgfFxuICAgICAgICBFcnJvckNvZGUuQXV0aG9yaXphdGlvbkZhaWxlZCB8XG4gICAgICAgIEVycm9yQ29kZS5Ob3RFbnJvbGxlZFlldCB8XG4gICAgICAgIEVycm9yQ29kZS5TZXJ2ZXJFcnJvcjtcbiAgICAgICAgZXJyb3I6IHN0cmluZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgKiBTZXRzIHNlcnZlciB1cmwgdG8gYmUgdXNlZCBmb3IgQVBJIGNhbGxzLlxuICAgICogTXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBBUEkgY2FsbCBpcyBpbnZva2VkLlxuICAgICogQHBhcmFtIHVybCBzZXJ2ZXIgdXJsXG4gICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0QmFzZVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICByZXF1ZXN0LnNldEJhc2VVcmwodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIEFpbWJyYWluIEFQSSBrZXkvc2VjcmV0IHBhaXIuXG4gICAgICogTXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFueSBBUEkgY2FsbCBpcyBpbnZva2VkLlxuICAgICAqIEBwYXJhbSBrZXkgYXBpIGtleVxuICAgICAqIEBwYXJhbSBzZWNyZXQgYXBpIHNlcmNyZXRcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0S2V5QW5kU2VjcmV0KGtleTogc3RyaW5nLCBzZWNyZXQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICByZXF1ZXN0LnNldEFwaUNyZWRlbnRpYWxzKGtleSwgc2VjcmV0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHJlcXVlc3QgdG8gY3JlYXRlIG5ldyBzZXNzaW9uLlxuICAgICAqIEBwYXJhbSB1c2VySWQgdXNlciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIGJyb3dzZXJOYW1lIHVzZWQgYnJvd3NlciBuYW1lXG4gICAgICogQHBhcmFtIGJyb3dzZXJPUyBvcGVyYXRpbmcgc3lzdGVtIHVzZWRcbiAgICAgKiBAcGFyYW0gc2NyZWVuV2lkdGggc2NyZWVuIHdpZHRoXG4gICAgICogQHBhcmFtIHNjcmVlbkhlaWdodCBzY3JlZW4gaGVpZ2h0XG4gICAgICogQHJldHVybiBDcmVhdGVkIHJlcXVlc3Qgb2JqZWN0XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlc3Npb24odXNlcklkLCBicm93c2VyTmFtZSwgYnJvd3Nlck9TLFxuICAgICAgICBzY3JlZW5IZWlnaHQsIHNjcmVlbldpZHRoLCBtZXRhZGF0YT8pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgICAgICBkZXZpY2U6IGJyb3dzZXJOYW1lLFxuICAgICAgICAgICAgc3lzdGVtOiBicm93c2VyT1MsXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQsXG4gICAgICAgICAgICBzY3JlZW5XaWR0aCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBwYXlsb2FkLm1ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcXVlc3QuY3JlYXRlUmVxdWVzdDxTZXNzaW9uUmVzdWx0Pih7XG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgICAgdXJpOiBcIi92MS9zZXNzaW9uc1wiLFxuICAgICAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSByZXF1ZXN0IHRvIHNlbmQgY29sbGVjdGVkIGJlaGF2aW91cmFsIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0gc2Vzc2lvbklkIHNlc3Npb24gaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBldmVudHMgZXZlbnRzIHRvIGJlIHNlbnRcbiAgICAgKiBAcGFyYW0gbW91c2VFdmVudHMgbW91c2UgZXZlbnRzIHRvIGJlIHNlbnRcbiAgICAgKiBAcGFyYW0ga2V5VXBEb3duRXZlbnRzIGtleSBldmVudHMgdG8gYmUgc2VudFxuICAgICAqIEByZXR1cm4gQ3JlYXRlZCByZXF1ZXN0IG9iamVjdFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzZW5kRXZlbnRzKHNlc3Npb25JZDogc3RyaW5nLCBtb3VzZUV2ZW50czogQXJyYXk8T2JqZWN0Piwga2V5VXBEb3duRXZlbnRzOiBBcnJheTxPYmplY3Q+LCBtZXRhZGF0YT8pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgc2Vzc2lvbjogc2Vzc2lvbklkLFxuICAgICAgICAgICAgbW91c2VFdmVudHM6IG1vdXNlRXZlbnRzLFxuICAgICAgICAgICAga2V5VXBEb3duRXZlbnRzOiBrZXlVcERvd25FdmVudHNcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBwYXlsb2FkLm1ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcXVlc3QuY3JlYXRlUmVxdWVzdDxTZW5kQmVoYXZpb3VyUmVzdWx0Pih7XG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgICAgdXJpOiBcIi92MS9iZWhhdmlvdXJhbFwiLFxuICAgICAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSByZXF1ZXN0IHRvIHJldHJpZXZlIHZvaWNlIHRva2VuLlxuICAgICAqIEBwYXJhbSBzZXNzaW9uSWQgc2Vzc2lvbiBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHRva2VuVHlwZSB0b2tlbiB0eXBlXG4gICAgICogQHBhcmFtIG1ldGFkYXRhIG1ldGFkYXRhIHN0cmluZyB0byBiZSBzZW50IHdpdGggdGhlIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIENyZWF0ZWQgcmVxdWVzdCBvYmplY3RcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Vm9pY2VDaGFsbGVuZ2Uoc2Vzc2lvbklkOiBzdHJpbmcsIHRva2VuVHlwZSwgbWV0YWRhdGE/KSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICAgIHNlc3Npb246IHNlc3Npb25JZCxcbiAgICAgICAgICAgIHRva2VudHlwZTogdG9rZW5UeXBlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHBheWxvYWQubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVxdWVzdC5jcmVhdGVSZXF1ZXN0PFZvaWNlVG9rZW5SZXN1bHQ+KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgICAgICB1cmk6IFwiL3YxL3ZvaWNlL3Rva2VuXCIsXG4gICAgICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHJlcXVlc3QgdG8gc2VuZCB2b2ljZSByZWNvcmRpbmcgZm9yIGVucm9sbG1lbnQuXG4gICAgICogQHBhcmFtIHNlc3Npb25JZCBzZXNzaW9uIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gc2FtcGxlcyByZWNvcmRlZCB2b2ljZSBkYXRhIGFycmF5IGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZy5cbiAgICAgKiBAcGFyYW0gbWV0YWRhdGEgbWV0YWRhdGEgc3RyaW5nIHRvIGJlIHNlbnQgd2l0aCB0aGUgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gQ3JlYXRlZCByZXF1ZXN0IG9iamVjdFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlbnJvbGxWb2ljZShzZXNzaW9uSWQ6IHN0cmluZywgc2FtcGxlczogc3RyaW5nW10sIG1ldGFkYXRhPykge1xuICAgICAgICBjb25zdCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgICBzZXNzaW9uOiBzZXNzaW9uSWQsXG4gICAgICAgICAgICB2b2ljZXM6IHNhbXBsZXMsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgcGF5bG9hZC5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0LmNyZWF0ZVJlcXVlc3Q8Vm9pY2VFbnJvbGxtZW50UmVzdWx0Pih7XG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgICAgdXJpOiBcIi92MS92b2ljZS9lbnJvbGxcIixcbiAgICAgICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgcmVxdWVzdCB0byBzZW5kIHZvaWNlIHJlY29yZGluZyBmb3IgYXV0aGVudGljYXRpb24uXG4gICAgICogQHBhcmFtIHNlc3Npb25JZCBzZXNzaW9uIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gc2FtcGxlcyByZWNvcmRlZCB2b2ljZSBkYXRhIGFycmF5IGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZy5cbiAgICAgKiBAcGFyYW0gbWV0YWRhdGEgbWV0YWRhdGEgc3RyaW5nIHRvIGJlIHNlbnQgd2l0aCB0aGUgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gQ3JlYXRlZCByZXF1ZXN0IG9iamVjdFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWNhdGVWb2ljZShzZXNzaW9uSWQ6IHN0cmluZywgc2FtcGxlczogc3RyaW5nW10sIG1ldGFkYXRhPykge1xuICAgICAgICBjb25zdCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgICBzZXNzaW9uOiBzZXNzaW9uSWQsXG4gICAgICAgICAgICB2b2ljZXM6IHNhbXBsZXMsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgcGF5bG9hZC5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0LmNyZWF0ZVJlcXVlc3Q8QXV0aGVudGljYXRpb25SZXN1bHQ+KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgICAgICB1cmk6IFwiL3YxL3ZvaWNlL2F1dGhcIixcbiAgICAgICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgcmVxdWVzdCB0byBzZW5kIGZhY2UgdmlkZW8gZm9yIGVucm9sbG1lbnQuXG4gICAgICogQHBhcmFtIHNlc3Npb25JZCBzZXNzaW9uIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gc2FtcGxlcyByZWNvcmRlZCB2aWRlbyBkYXRhIGFycmF5IGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZy5cbiAgICAgKiBAcGFyYW0gbWV0YWRhdGEgbWV0YWRhdGEgc3RyaW5nIHRvIGJlIHNlbnQgd2l0aCB0aGUgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gQ3JlYXRlZCByZXF1ZXN0IG9iamVjdFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlbnJvbGxGYWNlKHNlc3Npb25JZDogc3RyaW5nLCBkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE/KSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICAgIHNlc3Npb246IHNlc3Npb25JZCxcbiAgICAgICAgICAgIGZhY2VzOiBkYXRhLFxuICAgICAgICB9O1xuICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHBheWxvYWQubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVxdWVzdC5jcmVhdGVSZXF1ZXN0PEZhY2lhbEVucm9sbG1lbnRSZXN1bHQ+KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgICAgICB1cmk6IFwiL3YxL2ZhY2UvZW5yb2xsXCIsXG4gICAgICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHJlcXVlc3QgdG8gc2VuZCBmYWNlIHZpZGVvIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICAgKiBAcGFyYW0gc2Vzc2lvbklkIHNlc3Npb24gaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBzYW1wbGVzIHJlY29yZGVkIHZpZGVvIGRhdGEgYXJyYXkgZW5jb2RlZCBhcyBiYXNlNjQgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBtZXRhZGF0YSBtZXRhZGF0YSBzdHJpbmcgdG8gYmUgc2VudCB3aXRoIHRoZSByZXF1ZXN0XG4gICAgICogQHJldHVybiBDcmVhdGVkIHJlcXVlc3Qgb2JqZWN0XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZUZhY2Uoc2Vzc2lvbklkOiBzdHJpbmcsIGRhdGE6IHN0cmluZ1tdLCBtZXRhZGF0YT8pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgc2Vzc2lvbjogc2Vzc2lvbklkLFxuICAgICAgICAgICAgZmFjZXM6IGRhdGEsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgcGF5bG9hZC5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0LmNyZWF0ZVJlcXVlc3Q8QXV0aGVudGljYXRpb25SZXN1bHQ+KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgICAgICB1cmk6IFwiL3YxL2ZhY2UvYXV0aFwiLFxuICAgICAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS9pbmRleC50cyIsIlxuaW1wb3J0IHsgUmVxdWVzdCwgUmVxdWVzdENvbmZpZyB9IGZyb20gXCIuLi91dGlsL3JlcXVlc3RcIjtcbmltcG9ydCB7IGhtYWNTaGEyNTYgfSBmcm9tIFwiLi4vdXRpbC9obWFjXCI7XG5pbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSBcIi4uL3V0aWwvYmFzZTY0XCIgXG5cbmV4cG9ydCBsZXQgYmFzZVVybDogc3RyaW5nOyBcbmV4cG9ydCBsZXQgYXBpS2V5OiBzdHJpbmc7XG5leHBvcnQgbGV0IGFwaVNlY3JldDogc3RyaW5nO1xuXG4vKipcbiAqIEBoaWRkZW4gU2lnbnMgQVBJIHJlcXVlc3QuIFNpZ25pbmcgaXMgZG9uZSBieSBhZGRpbmcgSFRUUCBoZWFkZXIgXG4gKiBgWC1haW1icmFpbi1zaWduYXR1cmVgIHRvIGEgcmVxdWVzdC4gIFxuICogQHBhcmFtIHJlcSByZXF1ZXN0IHRvIGJlIHNpZ25lZCBcbiAqL1xuZnVuY3Rpb24gc2lnblJlcXVlc3Q8VD4ocmVxdWVzdDogUmVxdWVzdDxUPikge1xuICAgIC8vIEhNQUMgc2lnbmF0dXJlIG1lc3NhZ2VcbiAgICBjb25zdCBtZXNzYWdlID0gW1xuICAgICAgICByZXF1ZXN0Lm1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgICByZXF1ZXN0LnVyaS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpLFxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICAvLyBHZW5lcmF0ZSB0aGUgc2lnbmF0dXJlXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gYmFzZTY0LmVuY29kZShobWFjU2hhMjU2KGFwaVNlY3JldCwgbWVzc2FnZSwgdHJ1ZSkpO1xuICAgIC8vIEFkZCBhIHNpZ25hdHVyZSBoZWFkZXJcbiAgICByZXF1ZXN0LmhlYWRlcnNbXCJYLWFpbWJyYWluLWFwaWtleVwiXSA9IGFwaUtleTtcbiAgICByZXF1ZXN0LmhlYWRlcnNbXCJYLWFpbWJyYWluLXNpZ25hdHVyZVwiXSA9IHNpZ25hdHVyZTtcbiAgICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEJhc2VVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBiYXNlVXJsID0gdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXBpQ3JlZGVudGlhbHMoa2V5OiBzdHJpbmcsIHNlY3JldDogc3RyaW5nKSB7XG4gICAgYXBpS2V5ID0ga2V5O1xuICAgIGFwaVNlY3JldCA9IHNlY3JldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3Q8VD4oY29uZmlnOiBSZXF1ZXN0Q29uZmlnKTogUmVxdWVzdDxUPiB7XG4gICAgY29uZmlnLmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3Q8VD4oY29uZmlnKTsgXG4gICAgcmVxdWVzdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7ICAgIFxuICAgIGlmIChhcGlLZXkgIT0gbnVsbCAmJiBhcGlTZWNyZXQgIT0gbnVsbCkge1xuICAgICAgICBzaWduUmVxdWVzdChyZXF1ZXN0KTtcbiAgICB9ICAgIFxuICAgIHJldHVybiByZXF1ZXN0O1xufSAgXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS9yZXF1ZXN0LnRzIiwiaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCIuLi91dGlsL3Byb21pc2VcIjtcbmltcG9ydCAqIGFzIG9iamVjdCBmcm9tIFwiLi4vdXRpbC9vYmplY3RcIjtcblxuLyoqXG4gKiBSZXF1ZXN0IGNvbmZpZ3VyYXRpb24gb2JqZWN0IGludGVyZmFjZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q29uZmlnIHtcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xuICAgIGhlYWRlcnM/OiB7XG4gICAgICAgIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBtZXRob2Q6IFwiZ2V0XCIgfCBcInBvc3RcIjtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgcXVlcnk/OiB7XG4gICAgICAgIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBib2R5PzogYW55O1xufVxuIFxuY29uc3QgVW5yZWNvZ25pemVkUmVzcG9uc2VFcnJvciA9IDE7XG5jb25zdCBSZXF1ZXN0RXJyb3IgPSAzO1xuXG4vKipcbiAqIFJlcXVlc3QgY2xhc3MuXG4gKlxuICogRW5jYXBzdWxhdGVzIGEgcmVxdWVzdCB0byBhbiBBUEkgZW5kcG9pbnQsIHdpdGggYWJpbGl0eSB0byBzZXJpYWxpemUgaXRcbiAqIHdpdGhvdXQgYWN0dWFsbHkgbWFraW5nIGEgcmVxdWVzdC5cbiAqXG4gKiBIYXMgYSBQcm9taXNlLWxpa2UgLnRoZW4oKSBtZXRob2QsIGZvciBlYXNlIG9mIHVzZS5cbiAqXG4gKiAuc2VuZCgpIHdpbGwgZXhwbGljaXRseSBzZW5kIGEgcmVxdWVzdC5cbiAqIC5zZXJpYWxpemUoKSB3aWxsIHJldHVybiB0aGUgcmVxdWVzdCBwYXlsb2FkIHdpdGhvdXQgc2VuZGluZyBhIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0PFRSZXM+IGltcGxlbWVudHMgUmVxdWVzdENvbmZpZyB7XG5cbiAgICAvKipcbiAgICAgKiBBIG1lbW9pemVkIHJlc3BvbnNlIHByb21pc2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlPFRSZXM+O1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgbWlkZGxld2FyZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIG1pZGRsZXdhcmU6ICh7XG4gICAgICAgIG9uUmVzb2x2ZTogKHgpID0+IGFueSxcbiAgICAgICAgb25SZWplY3Q/OiAoeCkgPT4gYW55LFxuICAgIH0pW10gPSBbXTtcblxuICAgIC8vIENvbnRlbnRzIG9mIFJlcXVlc3RDb25maWcgaW50ZXJmYWNlXG4gICAgYmFzZVVybDogc3RyaW5nO1xuICAgIGhlYWRlcnM/OiB7XG4gICAgICAgIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBtZXRob2Q6IFwiZ2V0XCIgfCBcInBvc3RcIjtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgcXVlcnk/OiB7XG4gICAgICAgIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBib2R5PzogYW55O1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnPzogUmVxdWVzdENvbmZpZykge1xuICAgICAgICAvLyBJbml0aWFsaXplIGZyb20gY29uZmlnXG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgIG9iamVjdC5kZWZhdWx0cyh0aGlzLCBjb25maWcpOyAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICB0aGlzLnVyaSA9IHRoaXMudXJpIHx8IFwiXCI7IFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYW4gQVBJIHJlc3BvbnNlIHdoaWxlIG1ha2luZyBhIHJlcXVlc3QgdG8gYW4gQVBJIGVuZHBvaW50LlxuICAgICAqL1xuICAgIHRoZW48VD4ob25SZXNvbHZlOiAodmFsdWU6IFRSZXMpID0+IFQsIG9uUmVqZWN0PzogKHJlYXNvbikgPT4gUHJvbWlzZUxpa2U8bmV2ZXI+KTogUHJvbWlzZTxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoKS50aGVuPFQ+KG9uUmVzb2x2ZSwgb25SZWplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYW4gQVBJIHJlc3BvbnNlIHdpdGhvdXQgbWFraW5nIGEgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIFVzZWZ1bCBhcyBhIG1pZGRsZXdhcmUgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogTk9URTogQmV3YXJlIG9mIGhlYXZ5IHR5cGUtY2FzdGluZyEgVGhpcyBmdW5jdGlvbiBtdXRhdGVzIHRoZSBvYmplY3RcbiAgICAgKiB3aGlsZSBjaGFuZ2luZyBpdHMgc2lnbmF0dXJlLlxuICAgICAqL1xuICAgIHVzZTxUPihvblJlc29sdmU6ICh2YWx1ZTogVFJlcykgPT4gVCwgb25SZWplY3Q/OiAocmVhc29uKSA9PiBUKTogUmVxdWVzdDxUPiB7XG4gICAgICAgIHRoaXMubWlkZGxld2FyZS5wdXNoKHsgb25SZXNvbHZlLCBvblJlamVjdCB9KTtcbiAgICAgICAgcmV0dXJuICh0aGlzIGFzIGFueSkgYXMgUmVxdWVzdDxUPjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHJlcXVlc3QgdG8gYW4gQVBJIGVuZHBvaW50LlxuICAgICAqIFJldHVybnMgYSBQcm9taXNlIHdyYXBwaW5nIGEgcmVzcG9uc2Ugb2YgYSBnZW5lcmljIHR5cGUgVC5cbiAgICAgKi9cbiAgICBzZW5kKCk6IFByb21pc2U8VFJlcz4ge1xuICAgICAgICAvLyBSZXR1cm4gYSBjYWNoZWQgcHJvbWlzZVxuICAgICAgICBpZiAodGhpcy5wcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSBhbiBYSFIgb2JqZWN0XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAvLyBPcGVuIGl0XG4gICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLmJhc2VVcmwgKyB0aGlzLnVyaSk7XG4gICAgICAgIC8vIFNldCBoZWFkZXJzXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5oZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5oZWFkZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYSByZXNwb25zZSBwcm9taXNlXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlPFRSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3JDb2RlID0geGhyLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogeGhyLnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlOiBVbnJlY29nbml6ZWRSZXNwb25zZUVycm9yIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlOiBSZXF1ZXN0RXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU2VuZCB3aXRoIEpTT04gcGF5bG9hZFxuICAgICAgICAgICAgaWYgKHRoaXMuYm9keSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmJvZHkpO1xuICAgICAgICAgICAgICAgIHRyeSB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhoci5zZW5kKGJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlOiBSZXF1ZXN0RXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbmQgd2l0aG91dCBwYXlsb2FkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4aHIuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNvZGU6IFJlcXVlc3RFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFwcGx5IG1pZGRsZXdhcmUgdG8gdGhlIHByb21pc2VcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlLmZvckVhY2goKHsgb25SZXNvbHZlLCBvblJlamVjdCB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb21pc2UgPSB0aGlzLnByb21pc2UudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJldHVybiBhIHByb21pc2VcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemVzIHRoZSBwYXlsb2FkIHRvIGJlIHNlbnQgdG8gYW4gQVBJIGVuZHBvaW50LlxuICAgICAqL1xuICAgIHNlcmlhbGl6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5ib2R5KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9yZXF1ZXN0LnRzIiwiaW1wb3J0IHNoYTI1NiBmcm9tIFwiLi9zaGEyNTZcIjtcbmltcG9ydCAqIGFzIGNvbnZlcnQgZnJvbSBcIi4vY29udmVydFwiO1xuXG50eXBlIGhhc2hGbiA9IChpbnB1dDogbnVtYmVyW10pID0+IG51bWJlcltdO1xudHlwZSB1aW50OG1peGVkID0gc3RyaW5nIHwgbnVtYmVyW107XG5cbi8qKlxuICogSE1BQyBzaWduYXR1cmUgZnVuY3Rpb25cbiAqXG4gKiBBbGwgcGFyYW1ldGVycyB3aXRoIG51bWJlcltdIGFyZSB1aW50OGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBobWFjKGJsb2NrU2l6ZTogbnVtYmVyLCBoYXNoRm46IGhhc2hGbiwga2V5OiBudW1iZXJbXSwgbWVzc2FnZTogbnVtYmVyW10pIHtcbiAgY29uc3QgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgLyA4IHwgMDtcbiAgLy8gUHJlLXByb2Nlc3MgdGhlIGtleVxuICBpZiAoa2V5Lmxlbmd0aCA8IGJsb2NrU2l6ZUJ5dGVzKSB7XG4gICAgLy8gQWRkIHplcm8tcGFkZGluZ1xuICAgIGZvciAobGV0IGkgPSBrZXkubGVuZ3RoOyBpICYgYmxvY2tTaXplQnl0ZXM7IGkrKykge1xuICAgICAga2V5LnB1c2goMCk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGtleS5sZW5ndGggPiBibG9ja1NpemVCeXRlcykge1xuICAgIC8vIFRydW5jYXRlIGJ5IGFwcGx5aW5nIGEgaGFzaGluZyBmdW5jdGlvblxuICAgIGtleSA9IGhhc2hGbihrZXkpO1xuICB9XG4gIC8vIENyZWF0ZSBhbiBvdXRlciBwYWRkaW5nIGtleVxuICBjb25zdCBvdXRlcktleTogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja1NpemVCeXRlczsgaSsrKSB7XG4gICAgb3V0ZXJLZXkucHVzaCgweDVjIF4ga2V5W2ldKTtcbiAgfVxuICAvLyBDcmVhdGUgYW4gaW5uZXIgcGFkZGluZyBrZXlcbiAgY29uc3QgaW5uZXJLZXk6IG51bWJlcltdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tTaXplQnl0ZXM7IGkrKykge1xuICAgIGlubmVyS2V5LnB1c2goMHgzNiBeIGtleVtpXSk7XG4gIH1cbiAgLy8gQXBwbHkgaGFzaGluZ1xuICByZXR1cm4gaGFzaEZuKG91dGVyS2V5LmNvbmNhdChoYXNoRm4oaW5uZXJLZXkuY29uY2F0KG1lc3NhZ2UpKSkpO1xufVxuXG4vKipcbiAqIEhNQUMgd2l0aCBTSEEtMjU2XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBobWFjU2hhMjU2KGtleTogdWludDhtaXhlZCwgbWVzc2FnZTogdWludDhtaXhlZCwgdG9VaW50ODogdHJ1ZSk6IG51bWJlcltdO1xuZXhwb3J0IGZ1bmN0aW9uIGhtYWNTaGEyNTYoa2V5OiB1aW50OG1peGVkLCBtZXNzYWdlOiB1aW50OG1peGVkLCB0b1VpbnQ4PzogZmFsc2UpOiBzdHJpbmc7XG5leHBvcnQgZnVuY3Rpb24gaG1hY1NoYTI1NihrZXksIG1lc3NhZ2UsIHRvVWludDggPSBmYWxzZSk6IHVpbnQ4bWl4ZWQge1xuICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGtleSA9IGNvbnZlcnQuc3RyaW5nVG9VaW50OEFycmF5KGtleSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbWVzc2FnZSA9IGNvbnZlcnQuc3RyaW5nVG9VaW50OEFycmF5KG1lc3NhZ2UpO1xuICB9XG4gIGNvbnN0IG91dHB1dCA9IGhtYWMoNTEyLCAoeCkgPT4gc2hhMjU2KHgsIHRydWUpLCBrZXksIG1lc3NhZ2UpO1xuICBpZiAodG9VaW50OCkge1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnQudWludDhBcnJheVRvSGV4KG91dHB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9obWFjLnRzIiwiaW1wb3J0ICogYXMgY29udmVydCBmcm9tIFwiLi9jb252ZXJ0XCI7XG5cbnR5cGUgdWludDhtaXhlZCA9IHN0cmluZyB8IG51bWJlcltdO1xuXG4vLyBJbml0aWFsIGhhc2hcbmNvbnN0IEggPSBbXG4gICAgMHg2YTA5ZTY2NywgMHhiYjY3YWU4NSwgMHgzYzZlZjM3MiwgMHhhNTRmZjUzYSwgMHg1MTBlNTI3ZiwgMHg5YjA1Njg4YywgMHgxZjgzZDlhYiwgMHg1YmUwY2QxOSxcbl07XG5cbi8vIEJsb2NrIGNvZWZmaWNpZW50c1xuY29uc3QgSyA9IFtcbiAgICAweDQyOGEyZjk4LCAweDcxMzc0NDkxLCAweGI1YzBmYmNmLCAweGU5YjVkYmE1LCAweDM5NTZjMjViLCAweDU5ZjExMWYxLCAweDkyM2Y4MmE0LCAweGFiMWM1ZWQ1LFxuICAgIDB4ZDgwN2FhOTgsIDB4MTI4MzViMDEsIDB4MjQzMTg1YmUsIDB4NTUwYzdkYzMsIDB4NzJiZTVkNzQsIDB4ODBkZWIxZmUsIDB4OWJkYzA2YTcsIDB4YzE5YmYxNzQsXG4gICAgMHhlNDliNjljMSwgMHhlZmJlNDc4NiwgMHgwZmMxOWRjNiwgMHgyNDBjYTFjYywgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMHg1Y2IwYTlkYywgMHg3NmY5ODhkYSxcbiAgICAweDk4M2U1MTUyLCAweGE4MzFjNjZkLCAweGIwMDMyN2M4LCAweGJmNTk3ZmM3LCAweGM2ZTAwYmYzLCAweGQ1YTc5MTQ3LCAweDA2Y2E2MzUxLCAweDE0MjkyOTY3LFxuICAgIDB4MjdiNzBhODUsIDB4MmUxYjIxMzgsIDB4NGQyYzZkZmMsIDB4NTMzODBkMTMsIDB4NjUwYTczNTQsIDB4NzY2YTBhYmIsIDB4ODFjMmM5MmUsIDB4OTI3MjJjODUsXG4gICAgMHhhMmJmZThhMSwgMHhhODFhNjY0YiwgMHhjMjRiOGI3MCwgMHhjNzZjNTFhMywgMHhkMTkyZTgxOSwgMHhkNjk5MDYyNCwgMHhmNDBlMzU4NSwgMHgxMDZhYTA3MCxcbiAgICAweDE5YTRjMTE2LCAweDFlMzc2YzA4LCAweDI3NDg3NzRjLCAweDM0YjBiY2I1LCAweDM5MWMwY2IzLCAweDRlZDhhYTRhLCAweDViOWNjYTRmLCAweDY4MmU2ZmYzLFxuICAgIDB4NzQ4ZjgyZWUsIDB4NzhhNTYzNmYsIDB4ODRjODc4MTQsIDB4OGNjNzAyMDgsIDB4OTBiZWZmZmEsIDB4YTQ1MDZjZWIsIDB4YmVmOWEzZjcsIDB4YzY3MTc4ZjIsXG5dO1xuXG4vKipcbiAqIFNIQS0yNTYgYmxvY2sgaGFzaGVyXG4gKlxuICogTk9URTogQmxvY2sgc2l6ZSBpcyA1MTIgKDB4ODApXG4gKi9cbmZ1bmN0aW9uIHNoYTI1NkJsb2NrKGJsb2NrOiBudW1iZXJbXSwgaDogbnVtYmVyW10pIHtcbiAgICBsZXQgdG1wOiBudW1iZXI7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgYjogbnVtYmVyO1xuICAgIGxldCB3ID0gYmxvY2suc2xpY2UoMCk7XG4gICAgbGV0IGgwID0gaFswXTtcbiAgICBsZXQgaDEgPSBoWzFdO1xuICAgIGxldCBoMiA9IGhbMl07XG4gICAgbGV0IGgzID0gaFszXTtcbiAgICBsZXQgaDQgPSBoWzRdO1xuICAgIGxldCBoNSA9IGhbNV07XG4gICAgbGV0IGg2ID0gaFs2XTtcbiAgICBsZXQgaDcgPSBoWzddO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICAgIGlmIChpIDwgMTYpIHtcbiAgICAgICAgICAgIHRtcCA9IHdbaV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhID0gd1soaSArIDEpICYgMTVdO1xuICAgICAgICAgICAgYiA9IHdbKGkgKyAxNCkgJiAxNV07XG4gICAgICAgICAgICB0bXAgPSB3W2kgJiAxNV0gPSAoKGEgPj4+IDcgXiBhID4+PiAxOCBeIGEgPj4+IDMgXiBhIDw8IDI1IF4gYSA8PCAxNClcbiAgICAgICAgICAgICAgICArIChiID4+PiAxNyBeIGIgPj4+IDE5IF4gYiA+Pj4gMTAgXiBiIDw8IDE1IF4gYiA8PCAxMylcbiAgICAgICAgICAgICAgICArIHdbaSAmIDE1XSArIHdbKGkgKyA5KSAmIDE1XSkgfCAwO1xuICAgICAgICB9XG4gICAgICAgIHRtcCArPSBoN1xuICAgICAgICAgICAgKyAoaDQgPj4+IDYgXiBoNCA+Pj4gMTEgXiBoNCA+Pj4gMjUgXiBoNCA8PCAyNiBeIGg0IDw8IDIxIF4gaDQgPDwgNylcbiAgICAgICAgICAgICsgKGg2IF4gaDQgJiAoaDUgXiBoNikpICsgS1tpXTtcblxuICAgICAgICBoNyA9IGg2O1xuICAgICAgICBoNiA9IGg1O1xuICAgICAgICBoNSA9IGg0O1xuICAgICAgICBoNCA9IGgzICsgdG1wIHwgMDtcbiAgICAgICAgaDMgPSBoMjtcbiAgICAgICAgaDIgPSBoMTtcbiAgICAgICAgaDEgPSBoMDtcbiAgICAgICAgaDAgPSAodG1wICsgKChoMSAmIGgyKSBeIChoMyAmIChoMSBeIGgyKSkpXG4gICAgICAgICAgICArIChoMSA+Pj4gMiBeIGgxID4+PiAxMyBeIGgxID4+PiAyMiBeIGgxIDw8IDMwIF4gaDEgPDwgMTkgXiBoMSA8PCAxMCkpIHwgMDtcbiAgICB9XG5cbiAgICBoWzBdID0gaFswXSArIGgwIHwgMDtcbiAgICBoWzFdID0gaFsxXSArIGgxIHwgMDtcbiAgICBoWzJdID0gaFsyXSArIGgyIHwgMDtcbiAgICBoWzNdID0gaFszXSArIGgzIHwgMDtcbiAgICBoWzRdID0gaFs0XSArIGg0IHwgMDtcbiAgICBoWzVdID0gaFs1XSArIGg1IHwgMDtcbiAgICBoWzZdID0gaFs2XSArIGg2IHwgMDtcbiAgICBoWzddID0gaFs3XSArIGg3IHwgMDtcblxuICAgIHJldHVybiBoO1xufVxuXG4vKipcbiAqIFNIQS0yNTYgaGFzaGluZyBmdW5jdGlvblxuICpcbiAqIEFjY2VwdGVkIGlucHV0OlxuICogICAtIHBsYWluIHRleHRcbiAqICAgLSB1bnNpZ25lZCA4LWJpdCBpbnRlZ2VyIGFycmF5XG4gKlxuICogT3V0cHV0OlxuICogICAtIGhleC1lbmNvZGVkIHN0cmluZ1xuICogICAtIHVuc2lnbmVkIDgtYml0IGludGVnZXIgYXJyYXlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hhMjU2KGlucHV0OiB1aW50OG1peGVkLCB0b1VpbnQ4OiB0cnVlKTogbnVtYmVyW107XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGEyNTYoaW5wdXQ6IHVpbnQ4bWl4ZWQsIHRvVWludDg/OiBmYWxzZSk6IHN0cmluZztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoYTI1NihpbnB1dCwgdG9VaW50OCA9IGZhbHNlKTogdWludDhtaXhlZCB7XG4gICAgbGV0IGJ5dGVzID0gaW5wdXQ7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBieXRlcyA9IGNvbnZlcnQuc3RyaW5nVG9VaW50OEFycmF5KGlucHV0KTtcbiAgICB9XG4gICAgLy8gU2F2ZSBpbml0aWFsIGxlbmd0aFxuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBieXRlcy5sZW5ndGg7XG4gICAgLy8gUHJlLXByb2Nlc3Npbmc6IGFkZCAnMScgYml0IHRvIHRoZSBlbmQgb2YgdGhlIG1lc3NhZ2VcbiAgICBieXRlcy5wdXNoKDB4ODApO1xuICAgIC8vIENvbnZlcnQgdG8gd29yZHNcbiAgICBjb25zdCB3b3JkcyA9IGNvbnZlcnQudWludDhBcnJheVRvVWludDMyQXJyYXkoYnl0ZXMpO1xuICAgIC8vIFByZS1wcm9jZXNzaW5nOiBBZGQgemVybyBwYWRkaW5nXG4gICAgLy8gTk9URTogTGVhdmUgNjQgYml0cyBmb3IgdGhlIFwibGVuZ3RoXCIgKHNraXAgMiBpdGVyYXRpb25zKVxuICAgIGZvciAobGV0IGkgPSB3b3Jkcy5sZW5ndGggKyAyOyBpICYgMHgwZjsgaSsrKSB7XG4gICAgICAgIHdvcmRzLnB1c2goMCk7XG4gICAgfVxuICAgIC8vIFByZS1wcm9jZXNzaW5nOiBBcHBlbmQgYSA2NC1iaXQgbGVuZ3RoXG4gICAgd29yZHMucHVzaChpbml0aWFsTGVuZ3RoIC8gMHgxMDAwMDAwMDAgfCAwKTtcbiAgICB3b3Jkcy5wdXNoKGluaXRpYWxMZW5ndGggKiA4IHwgMCk7XG4gICAgLy8gQXBwbHkgaGFzaGluZyBmdW5jdGlvbiB0byBhbGwgYmxvY2tzXG4gICAgbGV0IGhhc2ggPSBILnNsaWNlKDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpICs9IDB4MTApIHtcbiAgICAgICAgaGFzaCA9IHNoYTI1NkJsb2NrKHdvcmRzLnNsaWNlKGksIGkgKyAweDEwKSwgaGFzaCk7XG4gICAgfVxuICAgIC8vIFJldHVybiB0aGUgcmVzdWx0XG4gICAgaWYgKHRvVWludDgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnZlcnQudWludDMyQXJyYXlUb1VpbnQ4QXJyYXkoaGFzaCk7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0LnVpbnQzMkFycmF5VG9IZXgoaGFzaCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9zaGEyNTYudHMiLCJleHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9IZXgoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVpbnQ4QXJyYXlUb0hleChzdHJpbmdUb1VpbnQ4QXJyYXkoaW5wdXQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvVWludDhBcnJheShpbnB1dDogc3RyaW5nKTogbnVtYmVyW10ge1xuICAgIGxldCBvdXRwdXQ6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgICBvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvVWludDMyQXJyYXkoaW5wdXQ6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdWludDhBcnJheVRvVWludDMyQXJyYXkoc3RyaW5nVG9VaW50OEFycmF5KGlucHV0KSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9TdHJpbmcoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVpbnQ4QXJyYXlUb1N0cmluZyhoZXhUb1VpbnQ4QXJyYXkoaW5wdXQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvVWludDhBcnJheShpbnB1dDogc3RyaW5nKTogbnVtYmVyW10ge1xuICAgIGxldCBvdXRwdXQ6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBvdXRwdXQucHVzaChwYXJzZUludChpbnB1dC5zdWJzdHIoaSwgMiksIDE2KSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1VpbnQzMkFycmF5KGlucHV0OiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHVpbnQ4QXJyYXlUb1VpbnQzMkFycmF5KGhleFRvVWludDhBcnJheShpbnB1dCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdWludDhBcnJheVRvU3RyaW5nKGlucHV0OiBudW1iZXJbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlucHV0Lm1hcCgoeCkgPT4gU3RyaW5nLmZyb21DaGFyQ29kZSh4KSkuam9pbihcIlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ4QXJyYXlUb0hleChpbnB1dDogbnVtYmVyW10pOiBzdHJpbmcge1xuICAgIGxldCBvdXRwdXQgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb3V0cHV0ICs9IChpbnB1dFtpXSA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaW5wdXRbaV0udG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdWludDhBcnJheVRvVWludDMyQXJyYXkoaW5wdXQ6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG91dHB1dDogbnVtYmVyW10gPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG4gICAgbGV0IHRtcCA9IDA7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGggfHwgKGkgJiAzKSAhPT0gMDsgaSsrKSB7XG4gICAgICAgIHRtcCA8PD0gODtcbiAgICAgICAgaWYgKGkgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHRtcCB8PSBpbnB1dFtpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGkgJiAzKSA9PT0gMykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godG1wKTtcbiAgICAgICAgICAgIHRtcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQzMkFycmF5VG9TdHJpbmcoaW5wdXQ6IG51bWJlcltdLCBvdXRwdXRMZW5naHQ/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB1aW50OEFycmF5VG9TdHJpbmcodWludDMyQXJyYXlUb1VpbnQ4QXJyYXkoaW5wdXQsIG91dHB1dExlbmdodCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdWludDMyQXJyYXlUb0hleChpbnB1dDogbnVtYmVyW10sIG91dHB1dExlbmdodD86IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVpbnQ4QXJyYXlUb0hleCh1aW50MzJBcnJheVRvVWludDhBcnJheShpbnB1dCwgb3V0cHV0TGVuZ2h0KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50MzJBcnJheVRvVWludDhBcnJheShpbnB1dDogbnVtYmVyW10sIG91dHB1dExlbmd0aD86IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCBvdXRwdXQ6IG51bWJlcltdID0gW107XG4gICAgY29uc3QgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dFtpXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSA+PiA4ICogaSAmIDB4ZmYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvdXRwdXRMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dC5zbGljZSgwLCBvdXRwdXRMZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvY29udmVydC50cyIsImltcG9ydCAqIGFzIGNvbnZlcnQgZnJvbSBcIi4vY29udmVydFwiO1xuXG50eXBlIHVpbnQ4bWl4ZWQgPSBzdHJpbmcgfCBudW1iZXJbXSB8IFVpbnQ4QXJyYXk7XG5cbmNvbnN0IEJBU0U2NCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShpbnB1dDogdWludDhtaXhlZCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpbnB1dCA9IGNvbnZlcnQuc3RyaW5nVG9VaW50OEFycmF5KGlucHV0KTtcbiAgICB9XG4gICAgbGV0IG91dHB1dCA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7KSB7XG4gICAgICAgIGNvbnN0IGNocjEgPSBpbnB1dFtpKytdO1xuICAgICAgICBjb25zdCBjaHIyID0gaW5wdXRbaSsrXTtcbiAgICAgICAgY29uc3QgY2hyMyA9IGlucHV0W2krK107XG4gICAgICAgIGNvbnN0IGVuYzEgPSBjaHIxID4+IDI7XG4gICAgICAgIGNvbnN0IGVuYzIgPSAoKGNocjEgJiAzKSA8PCA0KSB8IChjaHIyID4+IDQpO1xuICAgICAgICBsZXQgZW5jMyA9ICgoY2hyMiAmIDE1KSA8PCAyKSB8IChjaHIzID4+IDYpO1xuICAgICAgICBsZXQgZW5jNCA9IGNocjMgJiA2MztcbiAgICAgICAgaWYgKGlzTmFOKGNocjIpKSB7XG4gICAgICAgICAgICBlbmMzID0gZW5jNCA9IDY0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTmFOKGNocjMpKSB7XG4gICAgICAgICAgICBlbmM0ID0gNjQ7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0ICs9IEJBU0U2NC5jaGFyQXQoZW5jMSkgKyBCQVNFNjQuY2hhckF0KGVuYzIpXG4gICAgICAgICAgICArIEJBU0U2NC5jaGFyQXQoZW5jMykgKyBCQVNFNjQuY2hhckF0KGVuYzQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKGlucHV0OiBzdHJpbmcsIHRvVWludDg6IHRydWUpOiBudW1iZXJbXTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUoaW5wdXQ6IHN0cmluZywgdG9VaW50OD86IGZhbHNlKTogc3RyaW5nO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZShpbnB1dCwgdG9VaW50OCA9IGZhbHNlKTogdWludDhtaXhlZCB7XG4gICAgY29uc3Qgb3V0cHV0OiBudW1iZXJbXSA9IFtdO1xuICAgIC8vIENsZWFuIHVwIGlucHV0XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZywgXCJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7KSB7XG4gICAgICAgIGNvbnN0IGVuYzEgPSBCQVNFNjQuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGNvbnN0IGVuYzIgPSBCQVNFNjQuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGNvbnN0IGVuYzMgPSBCQVNFNjQuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGNvbnN0IGVuYzQgPSBCQVNFNjQuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGNvbnN0IGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xuICAgICAgICBjb25zdCBjaHIyID0gKChlbmMyICYgMTUpIDw8IDQpIHwgKGVuYzMgPj4gMik7XG4gICAgICAgIGNvbnN0IGNocjMgPSAoKGVuYzMgJiAzKSA8PCA2KSB8IGVuYzQ7XG4gICAgICAgIG91dHB1dC5wdXNoKGNocjEpO1xuICAgICAgICBpZiAoZW5jMyAhPT0gNjQpIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGNocjIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmM0ICE9PSA2NCkge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goY2hyMyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRvVWludDgpIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnZlcnQudWludDhBcnJheVRvU3RyaW5nKG91dHB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9iYXNlNjQudHMiLCJpbXBvcnQgKiBhcyBicm93c2VyIGZyb20gXCIuLy4uL3V0aWwvZW52L2Jyb3dzZXJcIjtcbmltcG9ydCB7IGdsb2JhbCB9IGZyb20gXCIuLy4uL3V0aWwvZW52L2dsb2JhbFwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCIuLy4uL3V0aWwvcHJvbWlzZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vLi4vYXBpXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXNzaW9uIGltcGxlbWVudHMgYXBpLlNlc3Npb25SZXN1bHQge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHNlc3Npb246IHN0cmluZztcbiAgICBmYWNlOiBhcGkuRW5yb2xsbWVudFN0YXR1cztcbiAgICB2b2ljZTogYXBpLkVucm9sbG1lbnRTdGF0dXM7XG4gICAgYmVoYXZpb3VyOiBhcGkuRW5yb2xsbWVudFN0YXR1cztcblxuICAgIGNvbnN0cnVjdG9yKHVzZXJJZDogc3RyaW5nLCBzZXNzaW9uOiBzdHJpbmcsIGJlaGF2aW91cjogYXBpLkVucm9sbG1lbnRTdGF0dXMsIGZhY2U6IGFwaS5FbnJvbGxtZW50U3RhdHVzLCB2b2ljZTogYXBpLkVucm9sbG1lbnRTdGF0dXMpIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgICAgIHRoaXMuYmVoYXZpb3VyID0gYmVoYXZpb3VyO1xuICAgICAgICB0aGlzLmZhY2UgPSBmYWNlO1xuICAgICAgICB0aGlzLnZvaWNlID0gdm9pY2U7XG4gICAgfVxuXG4gICAgZ2V0SWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb247XG4gICAgfVxuXG4gICAgaXNCZWhhdmlvdXJhbEVucm9sbGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvdXIgPT09IGFwaS5FbnJvbGxtZW50U3RhdHVzLkVucm9sbGVkO1xuICAgIH1cblxuICAgIGlzQmVoYXZpb3VyYWxCdWlsZGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVoYXZpb3VyID09PSBhcGkuRW5yb2xsbWVudFN0YXR1cy5CdWlsZGluZztcbiAgICB9XG5cbiAgICBpc0ZhY2lhbEVucm9sbGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNlID09PSBhcGkuRW5yb2xsbWVudFN0YXR1cy5FbnJvbGxlZDtcbiAgICB9XG5cbiAgICBpc0ZhY2lhbEJ1aWxkaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNlID09PSBhcGkuRW5yb2xsbWVudFN0YXR1cy5CdWlsZGluZztcbiAgICB9XG5cbiAgICBpc1ZvaWNlRW5yb2xsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZvaWNlID09PSBhcGkuRW5yb2xsbWVudFN0YXR1cy5FbnJvbGxlZDtcbiAgICB9XG5cbiAgICBpc1ZvaWNlQnVpbGRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZvaWNlID09PSBhcGkuRW5yb2xsbWVudFN0YXR1cy5CdWlsZGluZztcbiAgICB9XG59XG5cbmNvbnN0IHNlc3Npb25LZXkgPSBcImFpbWJyYWluX3Nlc3Npb25cIjtcbmNvbnN0IHNjb3JlS2V5ID0gXCJhaW1icmFpbl9zY29yZVwiO1xuY29uc3Qgc3RvcmFnZTogU3RvcmFnZSA9IGdsb2JhbC5zZXNzaW9uU3RvcmFnZTtcblxubGV0IGNhY2hlZFNlc3Npb246IFNlc3Npb247XG5sZXQgY2FjaGVkU2NvcmU6IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhY2hlZFNlc3Npb25TY29yZSgpIHtcbiAgICBpZiAoY2FjaGVkU2NvcmUpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNjb3JlO1xuICAgIH1cbiAgICBsZXQgc2VyaWFsaXplZDtcbiAgICBzZXJpYWxpemVkID0gc3RvcmFnZS5nZXRJdGVtKHNjb3JlS2V5KTtcbiAgICBpZiAoc2VyaWFsaXplZCkgeyAgICAgXG4gICAgICAgIGNhY2hlZFNjb3JlID0gcGFyc2VGbG9hdChzZXJpYWxpemVkKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNjb3JlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENhY2hlZFNlc3Npb25TY29yZShzY29yZTogbnVtYmVyKSB7XG4gICAgY2FjaGVkU2NvcmUgPSBzY29yZTtcbiAgICBzdG9yYWdlLnNldEl0ZW0oc2NvcmVLZXksIHNjb3JlLnRvU3RyaW5nKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FjaGVkU2Vzc2lvbigpOiBTZXNzaW9uIHtcbiAgICBpZiAoY2FjaGVkU2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gY2FjaGVkU2Vzc2lvbjtcbiAgICB9XG4gICAgbGV0IHNlcmlhbGl6ZWQ7XG4gICAgaWYgKHN0b3JhZ2UpIHtcbiAgICAgICAgc2VyaWFsaXplZCA9IHN0b3JhZ2UuZ2V0SXRlbShzZXNzaW9uS2V5KTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZWQpIHsgICAgIFxuICAgICAgICBjb25zdCB7IHVzZXJJZCwgc2Vzc2lvbklkLCBiZWhhdmlvdXIsIGZhY2UsIHZvaWNlIH0gPSBKU09OLnBhcnNlKHNlcmlhbGl6ZWQpO1xuICAgICAgICBjYWNoZWRTZXNzaW9uID0gbmV3IFNlc3Npb24odXNlcklkLCBzZXNzaW9uSWQsIGJlaGF2aW91ciwgZmFjZSwgdm9pY2UpO1xuICAgICAgICByZXR1cm4gY2FjaGVkU2Vzc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDYWNoZWRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjYWNoZWRTZXNzaW9uID0gc2Vzc2lvbjtcbiAgICBpZiAoc3RvcmFnZSkge1xuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VySWQsXG4gICAgICAgICAgICBzZXNzaW9uSWQ6IHNlc3Npb24uc2Vzc2lvbixcbiAgICAgICAgICAgIGZhY2U6IHNlc3Npb24uZmFjZSxcbiAgICAgICAgICAgIHZvaWNlOiBzZXNzaW9uLnZvaWNlLFxuICAgICAgICAgICAgYmVoYXZpb3VyOiBzZXNzaW9uLmJlaGF2aW91clxuICAgICAgICB9KTsgXG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShzZXNzaW9uS2V5LCBzZXJpYWxpemVkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIGNhY2hlZFNlc3Npb24gPSBudWxsO1xuICAgIGNhY2hlZFNjb3JlID0gbnVsbDtcbiAgICBpZiAoc3RvcmFnZSkge1xuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oc2Vzc2lvbktleSk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShzY29yZUtleSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Nlc3Npb24vc3RhdGUudHMiLCJpbXBvcnQgKiBhcyBvYmplY3QgZnJvbSBcIi4uL3V0aWwvb2JqZWN0XCI7XG5cbmV4cG9ydCBlbnVtIERpYWxvZ1N0YXR1cyB7XG4gICAgSW5pdGlhbGlzaW5nID0gMCxcbiAgICBSZWFkeSA9IDEsXG4gICAgUHJvZ3Jlc3MgPSAyLFxufVxuXG5leHBvcnQgZW51bSBEaWFsb2dFdmVudCB7XG4gICAgQ2xvc2VDbGlja2VkID0gMCxcbiAgICBSZWNvcmRDbGlja2VkID0gMSxcbiAgICBTdG9wQ2xpY2tlZCA9IDJcbn1cblxuZXhwb3J0IHR5cGUgRGlhbG9nT3B0aW9ucyA9IHtcbiAgICBoZWFkZXJUZXh0Pzogc3RyaW5nOyBcbiAgICBoaW50VGV4dD86IHN0cmluZzsgXG4gICAgY2FwdHVyaW5nVGV4dD86IHN0cmluZzsgXG4gICAgcHJvZ3Jlc3NUaW1lclRleHQ/OiBzdHJpbmc7IFxufTtcblxucmVxdWlyZShcIi4vcmVzL3BvcHVwLmNzc1wiKTsgXG5jb25zdCBkaWFsb2dIdG1sID0gcmVxdWlyZShcIi4vcmVzL3BvcHVwLmh0bWxcIik7XG5cbmZ1bmN0aW9uIGFwcGVuZEh0bWwoZWxlbWVudDogTm9kZSwgaHRtbCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCB0ZW1wb3JhcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRlbXBvcmFyeS5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiBlbGVtZW50LmFwcGVuZENoaWxkKHRlbXBvcmFyeS5maXJzdENoaWxkKSBhcyBIVE1MRWxlbWVudDtcbn1cblxubGV0IGRpYWxvZ0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xubGV0IGRpYWxvZ1JlYWR5OiBib29sZWFuXG5sZXQgZGlhbG9nT3B0aW9uczogRGlhbG9nT3B0aW9ucztcblxuZnVuY3Rpb24gZWwoY2xzOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBpZiAoZGlhbG9nRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZGlhbG9nRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNscylbMF1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuKGV2ZW50Q2FsbGJhY2s6IChldmVudDogRGlhbG9nRXZlbnQpID0+IHZvaWQsIG9wdGlvbnM/OiBEaWFsb2dPcHRpb25zKSB7XG4gICAgY29uc29sZS5sb2coJ29wZW4gZmFjZSB1aScpO1xuXG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICBkaWFsb2dPcHRpb25zID0gb2JqZWN0LmRlZmF1bHRzKG9wdGlvbnMsIDxEaWFsb2dPcHRpb25zPnsgICAgICAgXG4gICAgICAgIGhlYWRlclRleHQ6IFwiXCIsIFxuICAgICAgICBoaW50VGV4dDogXCJcIiwgXG4gICAgICAgIGNhcHR1cmluZ1RleHQ6IFwiXCIsXG4gICAgICAgIHByb2dyZXNzVGltZXJUZXh0OiBcIlwiXG4gICAgfSk7XG5cbiAgICBpZiAoIWRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgZGlhbG9nRWxlbWVudCA9IGFwcGVuZEh0bWwoZG9jdW1lbnQuYm9keSwgZGlhbG9nSHRtbCk7ICAgICAgICBcbiAgICBcbiAgICAgICAgZWwoXCJhaW1icmFpbi1mYWNlLWNsb3NlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2soRGlhbG9nRXZlbnQuQ2xvc2VDbGlja2VkKTtcbiAgICAgICAgfSk7XG4gXG4gICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1yZWNvcmQtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChkaWFsb2dSZWFkeSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2soRGlhbG9nRXZlbnQuUmVjb3JkQ2xpY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1zdG9wLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudENhbGxiYWNrKERpYWxvZ0V2ZW50LlN0b3BDbGlja2VkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlhbG9nUmVhZHkgPSBmYWxzZTtcbiAgICBzZXRTdGF0dXMoRGlhbG9nU3RhdHVzLkluaXRpYWxpc2luZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0dXMoc3RhdHVzOiBEaWFsb2dTdGF0dXMsIHByb2dyZXNzPzogc3RyaW5nKSB7XG4gICAgaWYgKGRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgRGlhbG9nU3RhdHVzLkluaXRpYWxpc2luZzpcbiAgICAgICAgICAgICAgICBkaWFsb2dSZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICg8YW55PmVsKFwiYWltYnJhaW4tZmFjZS1yZWNvcmQtYnV0dG9uXCIpKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7ICAgXG4gICAgICAgICAgICAgICAgKDxhbnk+ZWwoXCJhaW1icmFpbi1mYWNlLXN0b3AtYnV0dG9uXCIpKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IFxuICAgICAgICAgICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1oZWFkZXItbGFiZWxcIikuaW5uZXJIVE1MID0gZGlhbG9nT3B0aW9ucy5oZWFkZXJUZXh0O1xuICAgICAgICAgICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1oaW50LWxhYmVsXCIpLmlubmVySFRNTCA9IGRpYWxvZ09wdGlvbnMuaGludFRleHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERpYWxvZ1N0YXR1cy5SZWFkeTpcbiAgICAgICAgICAgICAgICBkaWFsb2dSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgKDxhbnk+ZWwoXCJhaW1icmFpbi1mYWNlLXJlY29yZC1idXR0b25cIikpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7ICAgXG4gICAgICAgICAgICAgICAgKDxhbnk+ZWwoXCJhaW1icmFpbi1mYWNlLXN0b3AtYnV0dG9uXCIpKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IFxuICAgICAgICAgICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1oZWFkZXItbGFiZWxcIikuaW5uZXJIVE1MID0gZGlhbG9nT3B0aW9ucy5oZWFkZXJUZXh0O1xuICAgICAgICAgICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1oaW50LWxhYmVsXCIpLmlubmVySFRNTCA9IGRpYWxvZ09wdGlvbnMuaGludFRleHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERpYWxvZ1N0YXR1cy5Qcm9ncmVzczpcbiAgICAgICAgICAgICAgICBkaWFsb2dSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWwoXCJhaW1icmFpbi1mYWNlLWhlYWRlci1sYWJlbFwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGVsKFwiYWltYnJhaW4tZmFjZS1oaW50LWxhYmVsXCIpLmlubmVySFRNTCA9IGRpYWxvZ09wdGlvbnMuY2FwdHVyaW5nVGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUZXh0ID0gZGlhbG9nT3B0aW9ucy5wcm9ncmVzc1RpbWVyVGV4dC5yZXBsYWNlKFwie3N9XCIsIHByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICBlbChcImFpbWJyYWluLWZhY2UtcHJvZ3Jlc3MtbGFiZWxcIikuaW5uZXJIVE1MID0gcHJvZ3Jlc3NUZXh0OyAgIFxuICAgICAgICAgICAgICAgICg8YW55PmVsKFwiYWltYnJhaW4tZmFjZS1yZWNvcmQtYnV0dG9uXCIpKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7ICAgXG4gICAgICAgICAgICAgICAgKDxhbnk+ZWwoXCJhaW1icmFpbi1mYWNlLXN0b3AtYnV0dG9uXCIpKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiOyAgICBcbiAgICAgICAgICAgICAgICBicmVhazsgICAgXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWRlb0VsZW1lbnQoKTogSFRNTFZpZGVvRWxlbWVudCB7XG4gICAgaWYgKGRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIDxIVE1MVmlkZW9FbGVtZW50PmVsKFwiYWltYnJhaW4tZmFjZS12aWRlb1wiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYW52YXNFbGVtZW50KCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICBpZiAoZGlhbG9nRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gPEhUTUxDYW52YXNFbGVtZW50PmVsKFwiYWltYnJhaW4tZmFjZS1jYW52YXNcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgY29uc29sZS5sb2coJ2Nsb3NlIGZhY2UgdWknKTtcbiAgICBpZiAoZGlhbG9nRWxlbWVudCkge1xuICAgICAgICBkaWFsb2dFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQgPSBudWxsO1xuICAgICAgICBkaWFsb2dPcHRpb25zID0gbnVsbDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZmFjaWFsL3VpLnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcG9wdXAuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcG9wdXAuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcHVwLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmFjaWFsL3Jlcy9wb3B1cC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5haW1icmFpbi1kaWFsb2ctd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNzUpO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIHotaW5kZXg6IDEwMDtcXG4gICAgZm9udC1zaXplOjE0cHg7XFxufVxcblxcbi5haW1icmFpbi1kaWFsb2ctZmFjZSB7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIHotaW5kZXg6IDk5OTk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggMjVweCByZ2JhKDAsIDAsIDAsIC4yNSk7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4uYWltYnJhaW4tZGlhbG9nLWZhY2Uge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICB3aWR0aDogMzYwcHg7XFxuICAgIGhlaWdodDogNDgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5haW1icmFpbi1kaWFsb2ctZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uYWltYnJhaW4tZmFjZS1jbG9zZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgbWFyZ2luOiA1cHg7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHJlcXVpcmUoXCIuL2Nsb3NlLWxpZ2h0LnN2Z1wiKSArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA3NSU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYWltYnJhaW4tZmFjZS1jbG9zZTphY3RpdmUge1xcbiAgICBvcGFjaXR5OiAwLjc1O1xcbn1cXG5cXG4uYWltYnJhaW4tZmFjZS12aWRlby13cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuLmFpbWJyYWluLWZhY2UtdmlkZW8ge1xcbiAgICBoZWlnaHQ6IDQ4MHB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwJSk7XFxufVxcblxcbi5haW1icmFpbi1mYWNlLXZpZXdmaW5kZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgcmVxdWlyZShcIi4vZmFjZS1vdmVybGF5LnN2Z1wiKSArIFwiKTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG59XFxuXFxuLmFpbWJyYWluLWZhY2UtaGVhZGVyLWxhYmVsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWluLWhlaWdodDogNzBweDtcXG4gICAgbWF4LXdpZHRoOiA2MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgIHotaW5kZXg6IDEwO1xcbn1cXG5cXG4uYWltYnJhaW4tZmFjZS1maWxsZXIgeyAgIFxcbiAgICBmbGV4LWdyb3c6IDE7ICBcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmFpbWJyYWluLWZhY2UtaGludC1sYWJlbCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxNnB4OyBcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDEwO1xcbn1cXG5cXG4uYWltYnJhaW4tZmFjZS1jb250cm9scyB7XFxuICAgIG1pbi1oZWlnaHQ6IDcwcHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZy1sZWZ0OiAyOHB4O1xcbiAgICB6LWluZGV4OiAxMDtcXG59XFxuXFxuLmFpbWJyYWluLWZhY2UtcmVjb3JkLWJ1dHRvbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgcmVxdWlyZShcIi4vY2FtZXJhLWxpZ2h0LnN2Z1wiKSArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA1MCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB6LWluZGV4OiA5OTk5O1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLmFpbWJyYWluLWZhY2Utc3RvcC1idXR0b24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA2MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHJlcXVpcmUoXCIuL3N0b3AtbGlnaHQuc3ZnXCIpICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDYwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHotaW5kZXg6IDk5OTk7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG4uYWltYnJhaW4tZmFjZS1wcm9ncmVzcy1sYWJlbCB7XFxuICAgIG1heC13aWR0aDogMzAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5haW1icmFpbi1mYWNlLXJlY29yZC1idXR0b246YWN0aXZlLCAuYWltYnJhaW4tZmFjZS1zdG9wLWJ1dHRvbjphY3RpdmUgIHtcXG4gICAgb3BhY2l0eTogMC43NTtcXG59XFxuXFxuLmFpbWJyYWluLWZhY2UtY2FudmFzIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAyNDBweDtcXG4gICAgaGVpZ2h0OiAzMjBweDtcXG4gICAgei1pbmRleDogLTE7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbn1cXG5cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL3NyYy9mYWNpYWwvcmVzL3BvcHVwLmNzc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJalJrWkdSa1pHSWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLSUNBZ0lEeHdZWFJvSUdROUlrMHhPU0EyTGpReFRERTNMalU1SURVZ01USWdNVEF1TlRrZ05pNDBNU0ExSURVZ05pNDBNU0F4TUM0MU9TQXhNaUExSURFM0xqVTVJRFl1TkRFZ01Ua2dNVElnTVRNdU5ERWdNVGN1TlRrZ01Ua2dNVGtnTVRjdU5Ua2dNVE11TkRFZ01USjZJaTgrQ2lBZ0lDQThjR0YwYUNCa1BTSk5NQ0F3YURJMGRqSTBTREI2SWlCbWFXeHNQU0p1YjI1bElpOCtDand2YzNablBnPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ZhY2lhbC9yZXMvY2xvc2UtbGlnaHQuc3ZnXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lJSE4wWVc1a1lXeHZibVU5SW01dklqOCtDanh6ZG1jS0lDQWdlRzFzYm5NNmMzWm5QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlLSUNBZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWdvZ0lDQjJhV1YzUW05NFBTSXdJREFnT1RNM0xqVWdNVEkxTUNJS0lDQWdabWxzYkQwaUl6QXdNREF3TUNJS0lDQWdiM0JoWTJsMGVUMGlNQzQySWdvZ0lDQm9aV2xuYUhROUlqRXlOVEFpQ2lBZ0lIZHBaSFJvUFNJNU16Y3VOU0lLSUNBZ2RtVnljMmx2YmowaU1TNHhJajRLSUNBOGNHRjBhQW9nSUNBZ0lHUTlJazBnTUN3Mk1qVWdNQ3d3SURRMk9DNDNOU3d3SURrek55NDFMREFnYkNBd0xEWXlOU0F3TERZeU5TQXRORFk0TGpjMUxEQWdUQ0F3TERFeU5UQWdNQ3cyTWpVZ1dpQnRJRFE0T0M0ME16YzFMRFF5TkM0NU9ETWdZeUF6Tnk0ME5EYzJNeXd0TWk0ME9EY3pJRGN6TGpBMU1EQTNMQzB4TVM0NU5UQTJJREV3Tmk0d01ERXlPU3d0TWpndU1UYzFPQ0F4TkM0ME9UY3pPQ3d0Tnk0eE16ZzBJREU1TGpJMk9ETXlMQzA1TGpnNE56TWdNek11TURZeE1qRXNMVEU1TGpBME9EWWdOVGt1TWprd01USXNMVE01TGpNNE1URTJJREV3TVM0M05EVXlOU3d0T1RrdU56azBPRFVnTVRFNExqUXhPVFk1TEMweE5qZ3VOVEV4TVRZZ05DNDBOVGMzTlN3dE1UZ3VNemN3TnpVZ05pNDNNRFExTml3dE16TXVOakV5T0RnZ055NDRNVEl4T0N3dE5USXVPVGszTkRRZ01DNDRNelEyT1N3dE1UUXVOakEzTlRZZ01DNDRORFV3Tnl3dE16RXlMakUxTlRFMUlEQXVNREV4TXl3dE16STJMalV4TXpnNElDMHhMakUzTWpJMUxDMHlNQzR4T1RBd015QXRNeTQxTWpBeE1pd3RNelV1T0RrMk1qTWdMVGd1TVRjM01qVXNMVFUwTGpjd01qUTJJRU1nTnpJMUxqVTFNelUyTERNeE9TNHlNVGsyTVNBMk5qZ3VOemM1TVRrc01qUTVMalUzTmpjeklEVTVNeTQwTXpjMUxESXhNeTQwTWpNMU1pQTFOVGd1TnpnMk9EY3NNVGsyTGpjNU5qRTVJRFV5TXk0NE16a3lNeXd4T0RjdU9EUTJNemNnTkRnMUxERTROUzQyTlRNMU5DQmpJQzAzTWk0eU1Ua3dNeXd0TkM0d056YzBOU0F0TVRNeUxqSXhOemtzTVRFdU5UTXdNaUF0TVRnM0xqVXNORGd1TnpjME9ETWdMVFl6TGpJeU9UUXNOREl1TlRrNE9EY2dMVEV3Tnk0NE1EazJMREV4TVM0Mk5qVTVOaUF0TVRJd0xqSTROak1zTVRnMkxqTTFOamcwSUMwekxqazJNVFVzTWpNdU56RTFNalFnTFRNdU5qYzFNVFlzT1M0NE1EWTRPQ0F0TXk0NU1qYzJMREU1TUM0M056Y3lPU0F0TUM0eU16TTVOeXd4TmpjdU56TXhOelVnTFRBdU1UY3dNRGtzTVRjekxqVTVOREU1SURJdU1EZ3pPVGtzTVRreExqSTFJREV3TGpNM01UVXlMRGd4TGpJek9ESTFJRFUxTGpneE1UQTRMREUxTkM0ek16RTJPU0F4TWpRdU5EWTNNRFFzTWpBd0xqSXhOVGtnTkRBdU5qRTNORFFzTWpjdU1UUTFOU0E0T0M0ME5qTTNOeXcwTXk0ME5UQTBJREV6Tnk0Mk5qSTROeXcwTmk0NU1USTBJREV3TGpRNU1qUTBMREF1TnpNNE15QTBNQzR3T0RneE9Td3dMamMyTWpnZ05UQXVPVE0zTlN3d0xqQTBNeUI2SWlBdlBnbzhMM04yWno0S1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmFjaWFsL3Jlcy9mYWNlLW92ZXJsYXkuc3ZnXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqUmtaR1JrWkdJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtJQ0FnSUR4amFYSmpiR1VnWTNnOUlqRXlJaUJqZVQwaU1USWlJSEk5SWpNdU1pSXZQZ29nSUNBZ1BIQmhkR2dnWkQwaVRUa2dNa3czTGpFM0lEUklOR010TVM0eElEQXRNaUF1T1MweUlESjJNVEpqTUNBeExqRXVPU0F5SURJZ01tZ3hObU14TGpFZ01DQXlMUzQ1SURJdE1sWTJZekF0TVM0eExTNDVMVEl0TWkweWFDMHpMakUzVERFMUlESklPWHB0TXlBeE5XTXRNaTQzTmlBd0xUVXRNaTR5TkMwMUxUVnpNaTR5TkMwMUlEVXROU0ExSURJdU1qUWdOU0ExTFRJdU1qUWdOUzAxSURWNklpOCtDaUFnSUNBOGNHRjBhQ0JrUFNKTk1DQXdhREkwZGpJMFNEQjZJaUJtYVd4c1BTSnViMjVsSWk4K0Nqd3ZjM1puUGc9PVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmFjaWFsL3Jlcy9jYW1lcmEtbGlnaHQuc3ZnXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqUmtaR1JrWkdJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtJQ0FnSUR4d1lYUm9JR1E5SWswd0lEQm9NalIyTWpSSU1Ib2lJR1pwYkd3OUltNXZibVVpTHo0S0lDQWdJRHh3WVhSb0lHUTlJazAySURab01USjJNVEpJTm5vaUx6NEtQQzl6ZG1jK1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmFjaWFsL3Jlcy9zdG9wLWxpZ2h0LnN2Z1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImFpbWJyYWluLWRpYWxvZy13cmFwcGVyXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tZGlhbG9nLWZhY2VcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tZmFjZS12aWRlby13cmFwcGVyXFxcIj5cXG4gICAgICAgICAgICA8dmlkZW8gYXV0b3BsYXkgY2xhc3M9XFxcImFpbWJyYWluLWZhY2UtdmlkZW9cXFwiPjwvdmlkZW8+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImFpbWJyYWluLWZhY2Utdmlld2ZpbmRlclxcXCI+PC9kaXY+XFxuICAgICAgICA8Y2FudmFzIHdpZHRoPVxcXCIzNjBcXFwiIGhlaWdodD1cXFwiNDgwXFxcIiBjbGFzcz1cXFwiYWltYnJhaW4tZmFjZS1jYW52YXNcXFwiPjwvY2FudmFzPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tZmFjZS1jbG9zZVxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhaW1icmFpbi1mYWNlLWhlYWRlci1sYWJlbFxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhaW1icmFpbi1mYWNlLWZpbGxlclxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhaW1icmFpbi1mYWNlLWhpbnQtbGFiZWxcXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tZmFjZS1jb250cm9sc1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tZmFjZS1wcm9ncmVzcy1sYWJlbFxcXCI+PC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XFxcImFpbWJyYWluLWZhY2UtcmVjb3JkLWJ1dHRvblxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWltYnJhaW4tZmFjZS1zdG9wLWJ1dHRvblxcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmFjaWFsL3Jlcy9wb3B1cC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyB1aSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgZmFjaWFsIGFzIGZhY2UgfSBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHZpZGVvIGZyb20gXCIuL3ZpZGVvXCI7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RHVyYXRpb24gPSAzMDAwO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRJbWFnZXMgPSAzO1xuXG5sZXQgdGltZXJJbnRlcnZhbElkOiBudW1iZXI7XG5sZXQgcmVjb3JkaW5nU3RhcnRlZCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvcmRGYWNlKG9wdGlvbnM6IGFueSwgY2FwdHVyZUltYWdlczogYm9vbGVhbiwgaW1hZ2VDb3VudDogbnVtYmVyID0gZGVmYXVsdEltYWdlcyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBsZXQgY2FwdHVyZVZpZGVvID0gIWNhcHR1cmVJbWFnZXM7XG5cbiAgICBpZiAoY2FwdHVyZVZpZGVvICYmICF2aWRlby5pc1ZpZGVvU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZmFjZS5SZWNvcmRpbmdFcnJvci5Ob3RTdXBwb3J0ZWQpO1xuICAgIH1cblxuICAgIGlmIChjYXB0dXJlSW1hZ2VzICYmICF2aWRlby5pc0ltYWdpbmdTdXBwb3J0ZWQoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImlhbWdlcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZmFjZS5SZWNvcmRpbmdFcnJvci5Ob3RTdXBwb3J0ZWQpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB1aS5vcGVuKChldmVudDogdWkuRGlhbG9nRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHVpLkRpYWxvZ0V2ZW50LkNsb3NlQ2xpY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsUmVjb3JkaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWNlLlJlY29yZGluZ0Vycm9yLlBvcHVwQ2xvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIHVpLkRpYWxvZ0V2ZW50LlJlY29yZENsaWNrZWQ6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXB0dXJlVmlkZW8gJiYgdmlkZW8uaXNWaWRlb1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFByb2dyZXNzVGltZXIoZGVmYXVsdER1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvLmNhcHR1cmVWaWRlbyhkZWZhdWx0RHVyYXRpb24pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQcm9ncmVzc1RpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQcm9ncmVzc1RpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFjZS5SZWNvcmRpbmdFcnJvci5VbmV4cGVjdGVkRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2FwdHVyZUltYWdlcyAmJiB2aWRlby5pc0ltYWdpbmdTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gTWF0aC5taW4oaW1hZ2VDb3VudCAqIDEwMDAsIGRlZmF1bHREdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFByb2dyZXNzVGltZXIoZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW8uY2FwdHVyZUltYWdlcyhkdXJhdGlvbiwgaW1hZ2VDb3VudCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFByb2dyZXNzVGltZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFByb2dyZXNzVGltZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWNlLlJlY29yZGluZ0Vycm9yLlVuZXhwZWN0ZWRFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFjZS5SZWNvcmRpbmdFcnJvci5Ob3RTdXBwb3J0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSB1aS5EaWFsb2dFdmVudC5TdG9wQ2xpY2tlZDpcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsUmVjb3JkaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWNlLlJlY29yZGluZ0Vycm9yLlBvcHVwQ2xvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpOyBcblxuICAgICAgICB2aWRlby5pbml0VmlkZW8oY2FwdHVyZVZpZGVvLCB1aS5nZXRWaWRlb0VsZW1lbnQoKSwgdWkuZ2V0Q2FudmFzRWxlbWVudCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHVpLnNldFN0YXR1cyh1aS5EaWFsb2dTdGF0dXMuUmVhZHkpO1xuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB1aS5jbG9zZSgpO1xuICAgICAgICAgICAgcmVqZWN0KGZhY2UuUmVjb3JkaW5nRXJyb3IuTm9EZXZpY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnRQcm9ncmVzc1RpbWVyKGR1cmF0aW9uOiBudW1iZXIpIHtcbiAgICB1aS5zZXRTdGF0dXModWkuRGlhbG9nU3RhdHVzLlByb2dyZXNzLCBNYXRoLnJvdW5kKGR1cmF0aW9uIC8gMTAwMCkudG9TdHJpbmcoKSk7XG4gICAgcmVjb3JkaW5nU3RhcnRlZCA9IERhdGUubm93KCk7XG4gICAgdGltZXJJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChyZWNvcmRpbmdTdGFydGVkICE9PSAwXG4gICAgICAgICAgICAmJiByZWNvcmRpbmdTdGFydGVkICsgZHVyYXRpb24gPj0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVMZWZ0ID0gTWF0aC5yb3VuZCgoZHVyYXRpb24gLSAoY3VycmVudFRpbWUgLSByZWNvcmRpbmdTdGFydGVkKSkgLyAxMDAwKTtcbiAgICAgICAgICAgIHVpLnNldFN0YXR1cyh1aS5EaWFsb2dTdGF0dXMuUHJvZ3Jlc3MsIHRpbWVMZWZ0LnRvU3RyaW5nKCkpOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmIChyZWNvcmRpbmdTdGFydGVkICsgZHVyYXRpb24gPCBjdXJyZW50VGltZSAmJiB0aW1lckludGVydmFsSWQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbElkKTtcbiAgICAgICAgICAgIHVpLnNldFN0YXR1cyh1aS5EaWFsb2dTdGF0dXMuUHJvZ3Jlc3MsIFwiMFwiKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sIDEwMDApO1xufVxuXG5mdW5jdGlvbiBzdG9wUHJvZ3Jlc3NUaW1lcigpIHtcbiAgICBpZiAodGltZXJJbnRlcnZhbElkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbElkKTtcbiAgICAgICAgdGltZXJJbnRlcnZhbElkID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxSZWNvcmRpbmcoKSB7XG4gICAgY29uc29sZS5sb2coXCJjYW5jZWwgcmVjb3JkaW5nXCIpO1xuICAgIHZpZGVvLnN0b3BSZWNvcmRpbmcoKTsgXG4gICAgc3RvcFByb2dyZXNzVGltZXIoKTtcbiAgICB1aS5jbG9zZSgpOyAgIFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZhY2lhbC9yZWNvcmRpbmcudHMiLCJpbXBvcnQgeyBnZXRDYWNoZWRTZXNzaW9uIH0gZnJvbSBcIi4vLi4vc2Vzc2lvbi9zdGF0ZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vLi4vYXBpXCI7XG5pbXBvcnQgKiBhcyBjYWxscyBmcm9tIFwiLi9jYWxsc1wiO1xuaW1wb3J0ICogYXMgdmlkZW8gZnJvbSBcIi4vdmlkZW9cIjtcbmltcG9ydCAqIGFzIHJlY29yZGluZyBmcm9tIFwiLi9yZWNvcmRpbmdcIjtcblxuLyoqXG4gKiBbW2luY2x1ZGU6ZmFjaWFsLW1vZHVsZS5tZF1dXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgZmFjaWFsIHtcblxuICAgIC8qKlxuICAgICAqIEZhY2UgY2FwdHVyZSBtb2RlXG4gICAgICovXG4gICAgZXhwb3J0IGVudW0gUmVjb3JkaW5nTW9kZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNvcmRpbmcgY2FwdHVyZXMgdmlkZW8uXG4gICAgICAgICAqL1xuICAgICAgICBWaWRlbyA9IDAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY29yZGluZyBjYXB0dXJlcyBpbWFnZSBsaXN0LlxuICAgICAgICAgKi9cbiAgICAgICAgSW1hZ2VzID0gMVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGZhY2UgbW9kdWxlIGlzIHN1cHBvcnRlZCBieSBjdXJyZW50IGJyb3dzZXIuXG4gICAgICogQHBhcmFtIG1vZGUgUmVjb3JkaW5nIG1vZGUgdG8gYmUgdXNlZFxuICAgICAqIEByZXR1cm4gaWYgZmFjZSBtb2R1bGUgY2FuIGJlIHVzZWQgd2l0aCBzdXBwbGllZCBtb2RlLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1N1cHBvcnRlZChtb2RlOiBSZWNvcmRpbmdNb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBSZWNvcmRpbmdNb2RlLlZpZGVvOlxuICAgICAgICAgICAgICAgIHJldHVybiB2aWRlby5pc1ZpZGVvU3VwcG9ydGVkKCk7XG4gICAgICAgICAgICBjYXNlIFJlY29yZGluZ01vZGUuSW1hZ2VzOlxuICAgICAgICAgICAgICAgIHJldHVybiB2aWRlby5pc0ltYWdpbmdTdXBwb3J0ZWQoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0byBbW0ZhY2lhbEVucm9sbG1lbnRSZXN1bHRdXS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nKTogUHJvbWlzZTxhcGkuRmFjaWFsRW5yb2xsbWVudFJlc3VsdD47XG4gICAgLyoqXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0byBbW0ZhY2lhbEVucm9sbG1lbnRSZXN1bHRdXS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZTogZmFsc2UpOiBQcm9taXNlPGFwaS5GYWNpYWxFbnJvbGxtZW50UmVzdWx0PlxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdG8gc3RyaW5nIHdpdGggQVBJIHJlcXVlc3QgYm9keVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlbnJvbGxXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplOiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG4gICAgLyoqXG4gICAgICogRmFjZSBlbnJvbGxtZW50XG4gICAgICogQHBhcmFtIGRhdGEgcmVjb3JkaW5nIGNyZWF0ZWQgdXNpbmcgW1tyZWNvcmRGYWNlVmlkZW9dXVxuICAgICAqIEBwYXJhbSBtZXRhZGF0YSAgICAgXG4gICAgICogQHBhcmFtIHNlcmlhbGl6ZSBmbGFnIHRvIHJlcXVlc3Qgc2VyaWFsaXNlZCBBUEkgY2FsbCBib2R5IGluc3RlYWQgb2YgcGVyZm9ybWluZyBBUEkgY2FsbFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlbnJvbGxXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE/OiBzdHJpbmcsIHNlcmlhbGl6ZT8pOiBQcm9taXNlPGFwaS5GYWNpYWxFbnJvbGxtZW50UmVzdWx0PiB8IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBjYWxscy5lbnJvbGxXaXRoRGF0YShkYXRhLCBtZXRhZGF0YSwgc2VyaWFsaXplKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHRvIFtbQXV0aGVudGljYXRpb25SZXN1bHRdXS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nKTogUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdG8gW1tBdXRoZW50aWNhdGlvblJlc3VsdF1dLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWNhdGVXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplOiBmYWxzZSk6IFByb21pc2U8YXBpLkF1dGhlbnRpY2F0aW9uUmVzdWx0PlxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdG8gc3RyaW5nIHdpdGggQVBJIHJlcXVlc3QgYm9keVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWNhdGVXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplOiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG4gICAgLyoqXG4gICAgICogRmFjZSBhdXRoZW50aWNhdGlvblxuICAgICAqIEBwYXJhbSBkYXRhIHJlY29yZGluZyBjcmVhdGVkIHVzaW5nIFtbcmVjb3JkRmFjZVZpZGVvXV1cbiAgICAgKiBAcGFyYW0gbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gc2VyaWFsaXplIGZsYWcgdG8gcmVxdWVzdCBzZXJpYWxpc2VkIEFQSSBjYWxsIGJvZHkgaW5zdGVhZCBvZiBwZXJmb3JtaW5nIEFQSSBjYWxsXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZVdpdGhEYXRhKGRhdGE6IHN0cmluZ1tdLCBtZXRhZGF0YT86IHN0cmluZywgc2VyaWFsaXplPyk6IFByb21pc2U8YXBpLkF1dGhlbnRpY2F0aW9uUmVzdWx0PiB8IFByb21pc2U8c3RyaW5nPiAge1xuICAgICAgICByZXR1cm4gY2FsbHMuYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YSwgbWV0YWRhdGEsIHNlcmlhbGl6ZSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgZm9yIGZhY2UgcmVjb3JkaW5nIHBvcHVwXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgRmFjZURpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdG9wIGxhYmVsIGluIHJlY29yZGluZyBwb3B1cFxuICAgICAgICAgKi9cbiAgICAgICAgaGVhZGVyVGV4dD86IHN0cmluZztcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgYm90dG9tIGxhYmVsIGluIHJlY29yZGluZyAgcG9wdXBcbiAgICAgICAgICovXG4gICAgICAgIGhpbnRUZXh0Pzogc3RyaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgbGFiZWwgd2hpY2ggaXMgc2hvd24gd2hlbiByZWNvcmRpbmcgaXMgc3RhcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2FwdHVyaW5nVGV4dD86IHN0cmluZztcbiAgICAgICAgXG4gICAgICAgICAvKipcbiAgICAgICAgICAqIFByb2dyZXNzIHRleHQgd2hpY2ggaXMgc2hvd24gd2hlbiBmYWNlIHJlY29yZGluZyBpcyBzdGFydGVkLlxuICAgICAgICAgICogVXNlIHtzfSBwYXR0ZXJuIGluc2lkZSB0aGUgbGFiZWwgdG8gc2hvdyB0aW1lciB2YWx1ZSBhbnl3aGVyZSBpbiBsYWJlbC5cbiAgICAgICAgICAqL1xuICAgICAgICBwcm9ncmVzc1RpbWVyVGV4dD86IHN0cmluZzsgXG4gICAgfTtcbiAgICBcblxuICAgIC8qKlxuICAgICAqIEVycm9yIGNvZGVzIHVzZWQgd2hlbiByZWNvcmRpbmcgZmFpbHNcbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBSZWNvcmRpbmdFcnJvciB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VyIGNsb3NlZCBwb3B1cC5cbiAgICAgICAgICovXG4gICAgICAgIFBvcHVwQ2xvc2VkID0gMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjb3JkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgYnkgYnJvd3NlclxuICAgICAgICAgKi9cbiAgICAgICAgTm90U3VwcG9ydGVkID0gLTEsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vIHJlY29yZGluZyBkZXZpY2UgaXMgcHJlc2VudFxuICAgICAgICAgKi9cbiAgICAgICAgTm9EZXZpY2UgPSAtMixcblxuICAgICAgICAvKipcbiAgICAgICAgICogRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHJlY29yZFxuICAgICAgICAgKi8gICAgICAgIFxuICAgICAgICBVbmV4cGVjdGVkRXJyb3IgPSAtMyxcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBmYWNlIHJlY29yZGluZyBwb3B1cCBhbmQgcmVjb3JkcyBmYWNlIHZpZGVvLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIHJlY29yZGluZyBkaWFsb2cgZGlzcGxheSBvcHRpb25zXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0byBzdHJpbmcgYXJyYXkgd2l0aCBiYXNlNjQgZW5jb2RlZCB2aWRlbyByZWNvcmRpbmcgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlY29yZEZhY2VWaWRlbyhvcHRpb25zOiBGYWNlRGlhbG9nT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZy5yZWNvcmRGYWNlKG9wdGlvbnMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBmYWNlIHJlY29yZGluZyBwb3B1cCBhbmQgcmVjb3JkcyBmYWNlIGltYWdlcy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyByZWNvcmRpbmcgZGlhbG9nIGRpc3BsYXkgb3B0aW9uc1xuICAgICAqIEBwYXJhbSBpbWFnZUNvdW50IG51bWJlciBvZiBpbWFnZXMgdG8gYmUgcmVjb3JkZWRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHRvIHN0cmluZyBhcnJheSB3aXRoIGJhc2U2NCBlbmNvZGVkIHJlY29yZGVkIGltYWdlcy5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVjb3JkRmFjZUltYWdlcyhvcHRpb25zOiBGYWNlRGlhbG9nT3B0aW9ucywgaW1hZ2VDb3VudDogbnVtYmVyID0gMSk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZy5yZWNvcmRGYWNlKG9wdGlvbnMsIHRydWUsIGltYWdlQ291bnQpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9mYWNpYWwvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBicm93c2VyIGZyb20gXCIuLy4uL3V0aWwvZW52L2Jyb3dzZXJcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiLi8uLi91dGlsL3Byb21pc2VcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCIuLy4uL2FwaVwiO1xuaW1wb3J0ICogYXMgc3RhdGUgZnJvbSBcIi4vLi4vc2Vzc2lvbi9zdGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nLCBzZXJpYWxpemU/OiBmYWxzZSk6IFByb21pc2U8YXBpLkZhY2lhbEVucm9sbG1lbnRSZXN1bHQ+XG5leHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nLCBzZXJpYWxpemU/OiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG5leHBvcnQgZnVuY3Rpb24gZW5yb2xsV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nKTogUHJvbWlzZTxhcGkuRmFjaWFsRW5yb2xsbWVudFJlc3VsdD5cbmV4cG9ydCBmdW5jdGlvbiBlbnJvbGxXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE/OiBzdHJpbmcsIHNlcmlhbGl6ZT86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4gfCBQcm9taXNlPGFwaS5GYWNpYWxFbnJvbGxtZW50UmVzdWx0PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IHN0YXRlLmdldENhY2hlZFNlc3Npb24oKTtcbiAgICBpZiAoc2Vzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7XG4gICAgICAgICAgICBlcnJvckNvZGU6IGFwaS5FcnJvckNvZGUuTm9PcGVuU2Vzc2lvbixcbiAgICAgICAgICAgIGVycm9yOiBcIlRoaXMgY2FsbCByZXF1aXJlcyBhY3RpdmUgc2Vzc2lvblwiXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYXBpLmVucm9sbEZhY2Uoc2Vzc2lvbi5nZXRJZCgpLCBkYXRhLCBtZXRhZGF0YSkuc2VyaWFsaXplKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcGkuZW5yb2xsRmFjZShzZXNzaW9uLmdldElkKCksIGRhdGEsIG1ldGFkYXRhKS5zZW5kKCk7IFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWNhdGVXaXRoRGF0YShkYXRhOiBzdHJpbmdbXSwgbWV0YWRhdGE/OiBzdHJpbmcsIHNlcmlhbGl6ZT86IGZhbHNlKTogUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+XG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nLCBzZXJpYWxpemU/OiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nKTogUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+XG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlV2l0aERhdGEoZGF0YTogc3RyaW5nW10sIG1ldGFkYXRhPzogc3RyaW5nLCBzZXJpYWxpemU/OiBib29sZWFuKTogUHJvbWlzZTxzdHJpbmc+IHwgUHJvbWlzZTxhcGkuQXV0aGVudGljYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gc3RhdGUuZ2V0Q2FjaGVkU2Vzc2lvbigpO1xuICAgIGlmIChzZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHtcbiAgICAgICAgICAgIGVycm9yQ29kZTogYXBpLkVycm9yQ29kZS5Ob09wZW5TZXNzaW9uLFxuICAgICAgICAgICAgZXJyb3I6IFwiVGhpcyBjYWxsIHJlcXVpcmVzIGFjdGl2ZSBzZXNzaW9uXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzZXJpYWxpemUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhcGkuYXV0aGVudGljYXRlRmFjZShzZXNzaW9uLmdldElkKCksIGRhdGEsIG1ldGFkYXRhKS5zZXJpYWxpemUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFwaS5hdXRoZW50aWNhdGVGYWNlKHNlc3Npb24uZ2V0SWQoKSwgZGF0YSwgbWV0YWRhdGEpLnNlbmQoKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0YXRlLnNldENhY2hlZFNlc3Npb25TY29yZShyZXN1bHQuc2NvcmUpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9mYWNpYWwvY2FsbHMudHMiLCJpbXBvcnQgeyBnbG9iYWwgfSBmcm9tIFwiLi4vdXRpbC9lbnYvZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBibG9iIGZyb20gXCIuLi91dGlsL2Jsb2JcIjtcblxubGV0IGdldFVzZXJNZWRpYTogKGNvbnN0cmFpbnRzOiBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzLCBzdWNjZXNzQ2FsbGJhY2s6IE5hdmlnYXRvclVzZXJNZWRpYVN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjazogTmF2aWdhdG9yVXNlck1lZGlhRXJyb3JDYWxsYmFjaykgPT4gdm9pZDtcblxubGV0IGltYWdlc1N1cHBvcnRlZDogYm9vbGVhbjtcbmxldCB2aWRlb1N1cHBvcnRlZDogYm9vbGVhbjtcbmxldCByZWNvcmRpbmdPcHRpb25zOiBPYmplY3Q7XG5cbmxldCB2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQ7XG5sZXQgY2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG5sZXQgdmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtO1xuXG5jb25zdCBpbWFnZVdpZHRoID0gMjQwO1xuY29uc3QgaW1hZ2VIZWlnaHQgPSAzMjA7XG5cbmxldCB2aWRlb09wdGlvbkNhbmRpZGF0ZXMgPSBbXG4gICAgdHJ1ZSxcbiAgICB7IGZhY2luZ01vZGU6IFwidXNlclwiLCB3aWR0aDoge2V4YWN0OiA2NDB9LCBoZWlnaHQ6IHtleGFjdDogMzYwfSB9LFxuICAgIHsgZmFjaW5nTW9kZTogXCJ1c2VyXCIsIHdpZHRoOiB7ZXhhY3Q6IDM1Mn0sIGhlaWdodDoge2V4YWN0OiAyODh9IH0sXG4gICAgeyBmYWNpbmdNb2RlOiBcInVzZXJcIiwgd2lkdGg6IHtleGFjdDogMzIwfSwgaGVpZ2h0OiB7ZXhhY3Q6IDMyMH0gfVxuXTtcblxubGV0IGltYWdlT3B0aW9uQ2FuZGlkYXRlcyA9IFtcbiAgICB0cnVlLFxuICAgIHsgZmFjaW5nTW9kZTogXCJ1c2VyXCIsIHdpZHRoOiA2NDAsIGhlaWdodDogNDgwIH1cbl07XG5cbmxldCByZWNvcmRpbmdTdGFydGVkID0gMDtcbmxldCBjYW52YXNJbnRlcnZhbElkID0gMDtcblxuZGVjbGFyZSB2YXIgTWVkaWFSZWNvcmRlcjogYW55O1xuXG5pZiAobmF2aWdhdG9yLmdldFVzZXJNZWRpYSkge1xuICAgIC8vIG90aGVyXG4gICAgZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYTsgICAgXG4gICAgaW1hZ2VzU3VwcG9ydGVkID0gdHJ1ZTtcbn0gZWxzZSBpZiAoKDxhbnk+bmF2aWdhdG9yKS5tb3pHZXRVc2VyTWVkaWEpIHtcbiAgICAvLyBtb3ppbGFcbiAgICBnZXRVc2VyTWVkaWEgPSAoPGFueT5uYXZpZ2F0b3IpLm1vekdldFVzZXJNZWRpYTsgICAgXG4gICAgaW1hZ2VzU3VwcG9ydGVkID0gdHJ1ZTtcbn0gZWxzZSB7XG4gICAgLy8gdW5zdXBwb3J0ZWRcbiAgICBpbWFnZXNTdXBwb3J0ZWQgPSBmYWxzZTtcbn1cblxuaWYgKGdsb2JhbC5NZWRpYVJlY29yZGVyKSB7XG4gICAgaWYgKE1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkKFwidmlkZW8vd2VibTtjb2RlY3M9dnA5XCIpKSB7XG4gICAgICAgIHJlY29yZGluZ09wdGlvbnMgPSB7IG1pbWVUeXBlOiBcInZpZGVvL3dlYm07IGNvZGVjcz12cDlcIiB9O1xuICAgICAgICB2aWRlb1N1cHBvcnRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChNZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZChcInZpZGVvL3dlYm07Y29kZWNzPXZwOFwiKSkge1xuICAgICAgICByZWNvcmRpbmdPcHRpb25zID0geyBtaW1lVHlwZTogXCJ2aWRlby93ZWJtOyBjb2RlY3M9dnA4XCIgfTtcbiAgICAgICAgdmlkZW9TdXBwb3J0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZGVvU3VwcG9ydGVkID0gZmFsc2U7IC8vIG5vIGVuY29kaW5nLCBmYWxsYmFjayB0byBpbWFnZXNcbiAgICB9XG59IGVsc2Uge1xuICAgIHZpZGVvU3VwcG9ydGVkID0gZmFsc2U7IC8vIG5vIE1lZGlhUmVjb3JkZXIsIGZhbGxiYWNrIHRvIGltYWdlc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWaWRlb1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gdmlkZW9TdXBwb3J0ZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ltYWdpbmdTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIGltYWdlc1N1cHBvcnRlZDtcbn1cblxuXG5mdW5jdGlvbiBnZXRVc2VyTWVkaWFXaXRoT3B0aW9ucyhvcHRpb25zOiBBcnJheTxhbnk+LCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgbGV0IG9wdGlvbkNhbmRpZGF0ZXMgPSBvcHRpb25zLnNsaWNlKDApO1xuXG4gICAgZnVuY3Rpb24gaW5pdFVzZXJNZWRpYSgpIHtcbiAgICAgICAgaWYgKG9wdGlvbkNhbmRpZGF0ZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGZhaWx1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHZpZGVvOiBvcHRpb25DYW5kaWRhdGVzLnBvcCgpLFxuICAgICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXRVc2VyTWVkaWEuY2FsbChuYXZpZ2F0b3IsIG9wdGlvbnMsIGZ1bmN0aW9uIChzdHJlYW06IE1lZGlhU3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyhzdHJlYW0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIG1lZGlhIHdpdGggb3B0aW9ucyAnICsgSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIGluaXRVc2VyTWVkaWEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSBcbiAgICBpbml0VXNlck1lZGlhKCk7XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFZpZGVvKHZpZGVvQ2FwdHVyZTogYm9vbGVhbiwgdmlkZW9FbDogSFRNTFZpZGVvRWxlbWVudCwgY2FudmFzRWw6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gdmlkZW9FbDtcbiAgICAgICAgY2FudmFzRWxlbWVudCA9IGNhbnZhc0VsO1xuICAgICAgICBnZXRVc2VyTWVkaWFXaXRoT3B0aW9ucyh2aWRlb0NhcHR1cmUgPyB2aWRlb09wdGlvbkNhbmRpZGF0ZXMgOiBpbWFnZU9wdGlvbkNhbmRpZGF0ZXMsIChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICB2aWRlb1N0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmlkZW9FbGVtZW50LnNyY09iamVjdCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbWFnZXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjYW52YXNFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbWFnZVdpZHRoLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGNhbnZhc0VsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbWFnZUhlaWdodC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgdmlkZW8nKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwdHVyZVZpZGVvKGR1cmF0aW9uOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkZWRDaHVua3MgPSBbXTtcbiAgICAgICAgY29uc3QgbWVkaWFSZWNvcmRlciA9IG5ldyBNZWRpYVJlY29yZGVyKHZpZGVvU3RyZWFtLCByZWNvcmRpbmdPcHRpb25zKTtcbiAgICAgICAgY29uc3QgdmlkZW86IHN0cmluZ1tdID0gW107XG4gICAgICAgIHJlY29yZGluZ1N0YXJ0ZWQgPSAwO1xuICAgICAgICBtZWRpYVJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKHJlY29yZGluZ1N0YXJ0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZWNvcmRpbmdTdGFydGVkID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWNvcmRpbmdTdGFydGVkICsgZHVyYXRpb24gPD0gRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BSZWNvcmRpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBibG9iLmJsb2JUb0Jhc2U2NChuZXcgQmxvYihyZWNvcmRlZENodW5rcywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInZpZGVvL3dlYm1cIixcbiAgICAgICAgICAgICAgICB9KSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvWzBdID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZpZGVvKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmRhdGEuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZWNvcmRlZENodW5rcy5wdXNoKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBtZWRpYVJlY29yZGVyLnN0YXJ0KDUwMCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NEltYWdlRnJvbUNhbnZhcyhlbDogSFRNTENhbnZhc0VsZW1lbnQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChlbC50b0Jsb2IpIHtcbiAgICAgICAgICAgIGNhbnZhc0VsZW1lbnQudG9CbG9iKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGJsb2IuYmxvYlRvQmFzZTY0KHZhbHVlKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpOyAgICBcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSwgXCJpbWFnZS9qcGVnXCIsIDAuOTUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRhdGFVUkwgPSBlbC50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIpO1xuICAgICAgICAgICAgdmFyIGltYWdlT25seSA9IGRhdGFVUkwuc3Vic3RyKGRhdGFVUkwuaW5kZXhPZignLCcpICsgMSk7XG4gICAgICAgICAgICByZXNvbHZlKGltYWdlT25seSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVJbWFnZXMoZHVyYXRpb246IG51bWJlciwgaW1hZ2VDb3VudDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBjb3VudGVyOiBudW1iZXIgPSAwO1xuICAgICAgICBjb25zdCBpbWFnZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGNhbnZhc0ludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBmdW5jdGlvbiBzdG9wQW5kUmVzb2x2ZSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNhbnZhc0ludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgIGNhbnZhc0ludGVydmFsSWQgPSAwO1xuICAgICAgICAgICAgICAgIHN0b3BSZWNvcmRpbmcoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGltYWdlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IGltYWdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICBzdG9wQW5kUmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjV2lkdGggPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjSGVpZ2h0ID0gdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmNBc3AgPSBzcmNXaWR0aCAvIHNyY0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHN0QXNwID0gaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmNYID0gKHNyY1dpZHRoIC0gc3JjSGVpZ2h0ICogZHN0QXNwKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyY1kgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmNXID0gc3JjSGVpZ2h0ICogZHN0QXNwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodmlkZW9FbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjWCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNZLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY1csIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQpOyAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJhc2U2NEltYWdlRnJvbUNhbnZhcyhjYW52YXNFbGVtZW50KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA+PSBpbWFnZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcEFuZFJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcFJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkdXJhdGlvbiAvIGltYWdlQ291bnQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFJlY29yZGluZygpIHtcbiAgICB0cnkge1xuICAgICAgICBjbGVhckludGVydmFsKGNhbnZhc0ludGVydmFsSWQpO1xuICAgICAgICBjYW52YXNJbnRlcnZhbElkID0gMDtcbiAgICAgICAgdmlkZW9TdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZGVvU3RyZWFtID0gbnVsbDsgXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQgPSBudWxsOyAgICAgICAgXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9mYWNpYWwvdmlkZW8udHMiLCJpbXBvcnQgeyBnbG9iYWwgfSBmcm9tIFwiLi4vLi4vc3JjL3V0aWwvZW52L2dsb2JhbFwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCIuLy4uL3V0aWwvcHJvbWlzZVwiO1xuXG5leHBvcnQgZW51bSBNb3VzZUV2ZW50VHlwZSB7XG4gICAgVVAgPSAwLFxuICAgIERPV04gPSAxLFxuICAgIE1PVkUgPSAyLFxufVxuXG5leHBvcnQgZW51bSBLZXlEaXJlY3Rpb24ge1xuICAgIFVQID0gMCxcbiAgICBET1dOID0gMSxcbn1cbiBcbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VFdmVudCB7XG4gICAgLy8gdGltZSBldmVudCB3YXMgbG9nZ2VkXG4gICAgdDogbnVtYmVyO1xuICAgIC8vIHggcG9zaXRpb24gaW4gZG9jdW1lbnRcbiAgICBkb2N4OiBudW1iZXI7XG4gICAgLy8geSBwb3NpdGlvbiBpbiBkb2N1bWVudFxuICAgIGRvY3k6IG51bWJlcjtcbiAgICAvLyB4IHBvc2l0aW9uIGluIGVsZW1lbnRcbiAgICBlbHg6IG51bWJlcjtcbiAgICAvLyB5IHBvc2l0aW9uIGluIGVsZW1lbnRcbiAgICBlbHk6IG51bWJlcjtcbiAgICAvLyB0eXBlIHVwL2Rvd24vbW92ZVxuICAgIHR5cGU6IE1vdXNlRXZlbnRUeXBlO1xuICAgIC8vIGVsZW1lbnQgZGF0YS1haW1icmFpbi1pZFxuICAgIGlkcz86IHN0cmluZ1tdO1xuICAgIC8vIG51bWJlciBvZiBldmVudHMgbG9nZ2VkIGluIGxhc3QgMjAwbXMgaWYgZXZlbnQgaXMgbW91c2UgbW92ZVxuICAgIG5vPzogbnVtYmVyO1xuICAgIC8vIGJ1dHRvbiBpZGVudGlmaWVyIGlmIGV2ZW50IGlzIG1vdXNlIHVwL2Rvd25cbiAgICBidG4/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2V5RXZlbnQge1xuICAgIC8vIHRpbWUgZXZlbnQgd2FzIGxvZ2dlZFxuICAgIHQ6IG51bWJlcjtcbiAgICAvLyBrZXkgaWRlbnRpZmllclxuICAgIGtleTogc3RyaW5nO1xuICAgIC8vIGRpcmVjdGlvbiB1cC9kb3duXG4gICAgZGlyOiBLZXlEaXJlY3Rpb247XG4gICAgLy8gZWxlbWVudCBpZFxuICAgIGlkcz86IHN0cmluZ1tdO1xufTtcblxuaW50ZXJmYWNlIElEQkN1cnNvcldpdGhWYWx1ZSBleHRlbmRzIElEQkN1cnNvciB7XG4gICAgcmVhZG9ubHkgdmFsdWU6IE9iamVjdDtcbn1cblxuY29uc3QgbW91c2VFdmVudFN0b3JlID0gXCJtb3VzZUV2ZW50c1wiO1xuY29uc3Qga2V5RXZlbnRTdG9yZSA9IFwia2V5RXZlbnRzXCI7XG5cbmNvbnN0IGRiTmFtZSA9IFwiYWltYnJhaW4tc2RrXCI7XG5jb25zdCBkYlZlcnNpb24gPSAxO1xuXG5sZXQgc2RrRGI6IElEQkRhdGFiYXNlO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIGdldERCRmFjdG9yeSgpICE9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREQkZhY3RvcnkoKTogSURCRmFjdG9yeSB7XG4gICAgcmV0dXJuIGdsb2JhbC5pbmRleGVkREI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcm9wU2RrREIoKSB7XG4gICAgaWYgKHNka0RiKSB7XG4gICAgICAgIHNka0RiLmNsb3NlKCk7XG4gICAgfVxuICAgIHNka0RiID0gbnVsbDtcbiAgICBnZXREQkZhY3RvcnkoKS5kZWxldGVEYXRhYmFzZShkYk5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2RrREIoKTogUHJvbWlzZTxJREJEYXRhYmFzZT4ge1xuICAgIGlmIChzZGtEYikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNka0RiKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElEQkRhdGFiYXNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gZ2V0REJGYWN0b3J5KCkub3BlbihkYk5hbWUsIGRiVmVyc2lvbik7XG4gICAgICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHNka0RiID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgICAgICBzZGtEYi5vbnZlcnNpb25jaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyc2lvbiBjaGFuZ2UsIGNsb3NpbmcgZGJcIik7XG4gICAgICAgICAgICAgICAgaWYgKHNka0RiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNka0RiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNka0RiID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNvbHZlKHNka0RiKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICByZWplY3QoZXZ0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiB1cGdyYWRlVjB0b1YxKGRiOiBJREJEYXRhYmFzZSkge1xuICAgICAgICAgICAgdmFyIG1vdXNlRXZlbnRzID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUobW91c2VFdmVudFN0b3JlLCB7IGF1dG9JbmNyZW1lbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICBtb3VzZUV2ZW50cy5jcmVhdGVJbmRleChcImJ5X3RpbWVzdGFtcFwiLCBcInRcIik7XG4gICAgICAgICAgICB2YXIga2V5RXZlbnRzID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoa2V5RXZlbnRTdG9yZSwgeyBhdXRvSW5jcmVtZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAga2V5RXZlbnRzLmNyZWF0ZUluZGV4KFwiYnlfdGltZXN0YW1wXCIsIFwidFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRiUmVxdWVzdCA9IDxJREJPcGVuREJSZXF1ZXN0PmV2dC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgZGIgPSBkYlJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgICAgZm9yIChsZXQgdmVyID0gZXZ0Lm9sZFZlcnNpb247IHZlciA8PSBldnQubmV3VmVyc2lvbjsgdmVyKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodmVyID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXBncmFkZVYwdG9WMShkYik7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1vdXNlRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gYWRkKG1vdXNlRXZlbnRTdG9yZSwgZXZlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkS2V5RXZlbnQoZXZlbnQ6IEtleUV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGFkZChrZXlFdmVudFN0b3JlLCBldmVudCk7XG59XG5cbmZ1bmN0aW9uIGFkZChvYmplY3RTdG9yZTogc3RyaW5nLCBvYmplY3Q6IE9iamVjdCkge1xuICAgIHJldHVybiBnZXRTZGtEQigpLnRoZW4oKGRhdGFiYXNlKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGRhdGFiYXNlLnRyYW5zYWN0aW9uKG9iamVjdFN0b3JlLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0cmFuc2FjdGlvblxuICAgICAgICAgICAgICAgIC5vYmplY3RTdG9yZShvYmplY3RTdG9yZSlcbiAgICAgICAgICAgICAgICAuYWRkKG9iamVjdCk7ICAgIFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVN0b3JlZEV2ZW50cyhtb3VzZUV2ZW50czogQXJyYXk8TW91c2VFdmVudD4sIGtleVVwRG93bkV2ZW50czogQXJyYXk8S2V5RXZlbnQ+KSB7XG4gICAgcmV0dXJuIGdldFNka0RCKCkudGhlbigoZGF0YWJhc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gZGF0YWJhc2UudHJhbnNhY3Rpb24oW21vdXNlRXZlbnRTdG9yZSwga2V5RXZlbnRTdG9yZV0sIFwicmVhZHdyaXRlXCIpO1xuXG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlbGV0ZVRpbWVSYW5nZShzdG9yZU5hbWU6IHN0cmluZywgZnJvbTogTnVtYmVyLCB0bzogbnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgdGltZXN0YW1wSW5kZXggPSBzdG9yZS5pbmRleChcImJ5X3RpbWVzdGFtcFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgY3Vyc29yID0gdGltZXN0YW1wSW5kZXgub3BlbktleUN1cnNvcihJREJLZXlSYW5nZS5ib3VuZChmcm9tLCB0bywgZmFsc2UsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgY3Vyc29yLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWNjZXNzXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvcjogSURCQ3Vyc29yID0gKDxJREJSZXF1ZXN0PmUudGFyZ2V0KS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLmRlbGV0ZShjdXJzb3IucHJpbWFyeUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW91c2VFdmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbW91c2VFdmVudHNbMF0udDtcbiAgICAgICAgICAgICAgICB2YXIgdG8gPSBtb3VzZUV2ZW50c1ttb3VzZUV2ZW50cy5sZW5ndGggLSAxXS50O1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRpbWVSYW5nZShtb3VzZUV2ZW50U3RvcmUsIGZyb20sIHRvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtleVVwRG93bkV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBrZXlVcERvd25FdmVudHNbMF0udDtcbiAgICAgICAgICAgICAgICB2YXIgdG8gPSBrZXlVcERvd25FdmVudHNba2V5VXBEb3duRXZlbnRzLmxlbmd0aCAtIDFdLnQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlVGltZVJhbmdlKGtleUV2ZW50U3RvcmUsIGZyb20sIHRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZWRFdmVudHMoKTogUHJvbWlzZTxbQXJyYXk8TW91c2VFdmVudD4sIEFycmF5PEtleUV2ZW50Pl0+IHtcbiAgICByZXR1cm4gZ2V0U2RrREIoKS50aGVuKChkYXRhYmFzZSkgPT4ge1xuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGRhdGFiYXNlLnRyYW5zYWN0aW9uKFttb3VzZUV2ZW50U3RvcmUsIGtleUV2ZW50U3RvcmVdLCBcInJlYWRvbmx5XCIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbDxUPihzdG9yZTogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxUPj4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5PFQ+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlKS5vcGVuQ3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBBcnJheTxUPiA9IFtdO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcInN1Y2Nlc3NcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3Vyc29yOiBJREJDdXJzb3IgPSAoPElEQlJlcXVlc3Q+ZS50YXJnZXQpLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goKDxJREJDdXJzb3JXaXRoVmFsdWU+Y3Vyc29yKS52YWx1ZSBhcyBUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZ2V0QWxsPE1vdXNlRXZlbnQ+KG1vdXNlRXZlbnRTdG9yZSksIFxuICAgICAgICAgICAgZ2V0QWxsPEtleUV2ZW50PihrZXlFdmVudFN0b3JlKVxuICAgICAgICBdKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU3RvcmVkRXZlbnRzKCkge1xuICAgIHJldHVybiBnZXRTZGtEQigpLnRoZW4oKGRhdGFiYXNlKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGRhdGFiYXNlLnRyYW5zYWN0aW9uKFttb3VzZUV2ZW50U3RvcmUsIGtleUV2ZW50U3RvcmVdLCBcInJlYWR3cml0ZVwiKTtcblxuICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb3VzZUV2ZW50U3RvcmUpLmNsZWFyKCk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShrZXlFdmVudFN0b3JlKS5jbGVhcigpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iZWhhdmlvdXIvc3RvcmFnZS50cyIsImltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiLi8uLi91dGlsL3Byb21pc2VcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCIuLy4uL2FwaVwiO1xuaW1wb3J0IHsgU2Vzc2lvbiwgZ2V0Q2FjaGVkU2Vzc2lvbiwgc2V0Q2FjaGVkU2Vzc2lvbiwgY2xlYXJDYWNoZSwgIH0gZnJvbSBcIi4vc3RhdGVcIjtcbmltcG9ydCAqIGFzIGNhbGxzIGZyb20gXCIuL2NhbGxzXCI7XG5cbi8qKlxuICogW1tpbmNsdWRlOnNlc3Npb24tbW9kdWxlLm1kXV1cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBzZXNzaW9uIHtcbiAgICAgICBcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHRvIFtbU2Vzc2lvblJlc3BvbnNlXV1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZXN0YWJsaXNoU2Vzc2lvbih1c2VySWQ6IHN0cmluZywgbWV0YWRhdGE/OiBzdHJpbmcsIHNlcmlhbGl6ZT86IGZhbHNlKTogUHJvbWlzZTxhcGkuU2Vzc2lvblJlc3VsdD47ICAgIFxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdG8gc3RyaW5nIHdpdGggQVBJIHJlcXVlc3QgYm9keVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlc3RhYmxpc2hTZXNzaW9uKHVzZXJJZDogc3RyaW5nLCBtZXRhZGF0YT86IHN0cmluZywgc2VyaWFsaXplPzogdHJ1ZSk6IFByb21pc2U8c3RyaW5nPjsgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBzZXNzaW9uLiBTZXNzaW9uIG11c3QgYmUgY3JlYXRlZCBiZWZvcmUgbWFraW5nIGFueSBvdGhlciBBUEkgY2FsbCByZXF1aXJpbmcgc2Vzc2lvbi5cbiAgICAgKiBAcGFyYW0gdXNlcklkIHVuaXF1ZSB1c2VyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gbWV0YWRhdGEgaW50ZWdyYXRpb24gc3BlY2lmaWMgbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gc2VyaWFsaXplIGZsYWcgdG8gcmVxdWVzdCBzZXJpYWxpemVkIHJlcXVlc3QgYm9keSBpbnN0ZWFkIG9mIG1ha2luZyBBUEkgY2FsbFxuICAgICAqLyAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBlc3RhYmxpc2hTZXNzaW9uKHVzZXJJZDogc3RyaW5nLCBtZXRhZGF0YT8sIHNlcmlhbGl6ZT8pOiBQcm9taXNlPGFwaS5TZXNzaW9uUmVzdWx0PiB8IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBjYWxscy5jcmVhdGVTZXNzaW9uKHVzZXJJZCwgbWV0YWRhdGEsIHNlcmlhbGl6ZSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgY3VycmVudCBzZXNzaW9uIGlkZW50aWZpZXIuIENhbGwgZG9lcyBub3QgaW52b2tlIGFueSBBUEkgcmVxdWVzdCBhbmQgaXMgbWVhbnQgXG4gICAgICogdG8gYmUgdXNlZCB3aXRoIHJlcXVlc3Qgc2VyaWFsaXphdGlvbi5cbiAgICAgKiBAcGFyYW0gdXNlcklkIHVuaXF1ZSB1c2VyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gc2Vzc2lvbklkIHNlc3Npb25JZCB0byBiZSB1c2VkIGluIHNlcmlhbGl6ZWQgcmVxdWVzdHNcbiAgICAgKi8gXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldEV4aXN0aW5nU2Vzc2lvbih1c2VySWQ6IHN0cmluZywgc2Vzc2lvbklkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHNldENhY2hlZFNlc3Npb24obmV3IFNlc3Npb24odXNlcklkLCBzZXNzaW9uSWQsIGFwaS5FbnJvbGxtZW50U3RhdHVzLkVucm9sbGVkLCBhcGkuRW5yb2xsbWVudFN0YXR1cy5FbnJvbGxlZCwgYXBpLkVucm9sbG1lbnRTdGF0dXMuRW5yb2xsZWQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgY3VycmVudCBzZXNzaW9uXG4gICAgICovIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBjbGVhclNlc3Npb24oKSB7XG4gICAgICAgIGNsZWFyQ2FjaGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgc2Vzc2lvbiB3YXMgZXN0YWJsaXNoZWRcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gaXNTZXNzaW9uQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZ2V0Q2FjaGVkU2Vzc2lvbigpICE9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBDdXJyZW50IHNlc3Npb24gaWRlbnRpZmllciBvciBudWxsIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSBzZXNzaW9uLiBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0U2Vzc2lvbklkKCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBpZiAoZ2V0Q2FjaGVkU2Vzc2lvbigpKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q2FjaGVkU2Vzc2lvbigpLmdldElkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBUcnVlIGlmIGN1cnJlbnQgc2Vzc2lvbiBjb21wbGV0ZWQgYmVoYXZpb3VyYWwgZW5yb2xsbWVudC4gXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzQmVoYXZpb3VyYWxFbnJvbGxlZCgpIHtcbiAgICAgICAgbGV0IHNlc3Npb24gPSBnZXRDYWNoZWRTZXNzaW9uKCk7XG4gICAgICAgIHJldHVybiBzZXNzaW9uID09IG51bGwgPyBmYWxzZSA6IHNlc3Npb24uaXNCZWhhdmlvdXJhbEVucm9sbGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBUcnVlIGlmIGN1cnJlbnQgc2Vzc2lvbiBpcyBjdXJyZW50bHkgYnVpbGRpbmcgYmVoYXZpb3VyYWwgdGVtcGxhdGUuIFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc0JlaGF2aW91cmFsQnVpbGRpbmcoKSB7XG4gICAgICAgIGxldCBzZXNzaW9uID0gZ2V0Q2FjaGVkU2Vzc2lvbigpO1xuICAgICAgICByZXR1cm4gc2Vzc2lvbiA9PSBudWxsID8gZmFsc2UgOiBzZXNzaW9uLmlzQmVoYXZpb3VyYWxCdWlsZGluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiBjdXJyZW50IHNlc3Npb24gY29tcGxldGVkIGZhY2lhbCBlbnJvbGxtZW50LiBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gaXNGYWNpYWxFbnJvbGxlZCgpIHtcbiAgICAgICAgbGV0IHNlc3Npb24gPSBnZXRDYWNoZWRTZXNzaW9uKCk7XG4gICAgICAgIHJldHVybiBzZXNzaW9uID09IG51bGwgPyBmYWxzZSA6IHNlc3Npb24uaXNGYWNpYWxFbnJvbGxlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiBjdXJyZW50IHNlc3Npb24gaXMgY3VycmVudGx5IGJ1aWxkaW5nIGZhY2UgdGVtcGxhdGUuIFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc0ZhY2lhbEJ1aWxkaW5nKCkge1xuICAgICAgICBsZXQgc2Vzc2lvbiA9IGdldENhY2hlZFNlc3Npb24oKTtcbiAgICAgICAgcmV0dXJuIHNlc3Npb24gPT0gbnVsbCA/IGZhbHNlIDogc2Vzc2lvbi5pc0ZhY2lhbEJ1aWxkaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBUcnVlIGlmIGN1cnJlbnQgc2Vzc2lvbiBjb21wbGV0ZWQgdm9pY2UgZW5yb2xsbWVudC4gXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzVm9pY2VFbnJvbGxlZCgpIHtcbiAgICAgICAgbGV0IHNlc3Npb24gPSBnZXRDYWNoZWRTZXNzaW9uKCk7XG4gICAgICAgIHJldHVybiBzZXNzaW9uID09IG51bGwgPyBmYWxzZSA6IHNlc3Npb24uaXNWb2ljZUVucm9sbGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBUcnVlIGlmIGN1cnJlbnQgc2Vzc2lvbiBpcyBjdXJyZW50bHkgYnVpbGRpbmcgdm9pY2UgdGVtcGxhdGUuIFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1ZvaWNlQnVpbGRpbmcoKSB7XG4gICAgICAgIGxldCBzZXNzaW9uID0gZ2V0Q2FjaGVkU2Vzc2lvbigpO1xuICAgICAgICByZXR1cm4gc2Vzc2lvbiA9PSBudWxsID8gZmFsc2UgOiBzZXNzaW9uLmlzVm9pY2VCdWlsZGluZygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXNzaW9uL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tIFwiLi8uLi91dGlsL2Vudi9icm93c2VyXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcIi4vLi4vdXRpbC9wcm9taXNlXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwiLi8uLi9hcGlcIjtcbmltcG9ydCAqIGFzIHN0YXRlIGZyb20gXCIuL3N0YXRlXCI7XG5cbi8qKlxuICogQ3JlYXRlIGEgdXNlciBzZXNzaW9uLlxuICpcbiAqIERpc3JlZ2FyZHMgYW55IHByZXZpb3VzbHkgc3RvcmVkIHNlc3Npb25zIGFuZCBjcmVhdGVzIGEgY29tcGxldGVseSBuZXcgb25lLlxuICovIFxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlc3Npb24odXNlcklkOiBzdHJpbmcsIG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZT86IHRydWUpOiBQcm9taXNlPHN0cmluZz47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2Vzc2lvbih1c2VySWQ6IHN0cmluZywgbWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplPzogZmFsc2UpOiBQcm9taXNlPGFwaS5TZXNzaW9uUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXNzaW9uKHVzZXJJZDogc3RyaW5nLCBtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU/KTogIFByb21pc2U8YXBpLlNlc3Npb25SZXN1bHQ+IHwgUHJvbWlzZTxzdHJpbmc+ICB7XG4gICAgbGV0IHJlcXVlc3QgPSBhcGkuY3JlYXRlU2Vzc2lvbih1c2VySWQsIGJyb3dzZXIuYnJvd3Nlck5hbWUsIGJyb3dzZXIuYnJvd3Nlck9TLFxuICAgICAgICBicm93c2VyLnNjcmVlbkhlaWdodCwgYnJvd3Nlci5zY3JlZW5XaWR0aCwgbWV0YWRhdGEpO1xuXG4gICAgaWYgKHNlcmlhbGl6ZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3Quc2VyaWFsaXplKCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IHN0YXRlLlNlc3Npb24odXNlcklkLCByZXN1bHQuc2Vzc2lvbiwgcmVzdWx0LmJlaGF2aW91ciwgcmVzdWx0LmZhY2UsIHJlc3VsdC52b2ljZSk7XG4gICAgICAgIHN0YXRlLnNldENhY2hlZFNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59XG5cbi8qKlxuICogRW5zdXJlIGEgdXNlciBzZXNzaW9uLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIHNlc3Npb24gYW5kIGNhY2hlcyBpdCBpbiBzZXNzaW9uIHN0b3JhZ2UuXG4gKiBOZXh0IHRpbWUgeW91IGNhbGwgdGhpcyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHVzZXJJZCwgaXQgcmV0dXJucyB0aGVcbiAqIGN1cnJlbnQgdXNlciBzZXNzaW9uIHdpdGhvdXQgc2VuZGluZyBhbiBBUEkgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVNlc3Npb25DcmVhdGVkKHVzZXJJZDogc3RyaW5nLCBtZXRhZGF0YT86IHN0cmluZyk6IFByb21pc2U8YXBpLlNlc3Npb25SZXN1bHQ+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gc3RhdGUuZ2V0Q2FjaGVkU2Vzc2lvbigpO1xuICAgIGlmIChzZXNzaW9uICYmIHNlc3Npb24udXNlcklkID09PSB1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZXNzaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZVNlc3Npb24odXNlcklkLCBtZXRhZGF0YSwgZmFsc2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Nlc3Npb24vY2FsbHMudHMiLCJpbXBvcnQgeyBnbG9iYWwgfSBmcm9tIFwiLi9nbG9iYWxcIjtcblxuLyoqXG4gKiBCcm93c2VyIG5hbWVcbiAqL1xuZXhwb3J0IGxldCBicm93c2VyTmFtZTogc3RyaW5nID0gXCJPdGhlclwiO1xuXG4vLyBPcGVyYSA4LjArXG5jb25zdCBpc09wZXJhID0gKCEhZ2xvYmFsLm9wciAmJiAhIWdsb2JhbC5vcHIuYWRkb25zKVxuICAgIHx8ICEhZ2xvYmFsLm9wZXJhXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiIE9QUi9cIikgPj0gMDtcbi8vIEZpcmVmb3ggMS4wK1xuY29uc3QgaXNGaXJlZm94ID0gdHlwZW9mIGdsb2JhbC5JbnN0YWxsVHJpZ2dlciAhPT0gXCJ1bmRlZmluZWRcIjtcbi8vIFNhZmFyaSA8PSA5IFwiW29iamVjdCBIVE1MRWxlbWVudENvbnN0cnVjdG9yXVwiXG5jb25zdCBpc1NhZmFyaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChnbG9iYWwuSFRNTEVsZW1lbnQpXG4gICAgLmluZGV4T2YoXCJDb25zdHJ1Y3RvclwiKSA+IDA7XG4vLyBJbnRlcm5ldCBFeHBsb3JlciA2LTExXG5jb25zdCBpc0lFID0gISFnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuLy8gRWRnZSAyMCtcbmNvbnN0IGlzRWRnZSA9ICFpc0lFICYmICEhZ2xvYmFsLlN0eWxlTWVkaWE7XG4vLyBDaHJvbWUgMStcbmNvbnN0IGlzQ2hyb21lID0gISFnbG9iYWwuY2hyb21lICYmICEhZ2xvYmFsLmNocm9tZS53ZWJzdG9yZTtcblxuaWYgKGlzT3BlcmEpIHtcbiAgICBicm93c2VyTmFtZSA9IFwiT3BlcmFcIjtcbn1cbmVsc2UgaWYgKGlzRmlyZWZveCkge1xuICAgIGJyb3dzZXJOYW1lID0gXCJGaXJlZm94XCI7XG59XG5lbHNlIGlmIChpc0VkZ2UpIHtcbiAgICBicm93c2VyTmFtZSA9IFwiRWRnZVwiO1xufVxuZWxzZSBpZiAoaXNJRSkge1xuICAgIGJyb3dzZXJOYW1lID0gXCJpc0lFXCI7XG59XG5lbHNlIGlmIChpc0Nocm9tZSkge1xuICAgIGJyb3dzZXJOYW1lID0gXCJDaHJvbWVcIjtcbn1cblxuLyoqXG4gKiBCcm93c2VyIG9wZXJhdGluZyBzeXN0ZW1cbiAqL1xuZXhwb3J0IGxldCBicm93c2VyT1M6IHN0cmluZyA9IG51bGw7XG5jb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcblxuaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwiV2luXCIpID49IDApIHtcbiAgICBicm93c2VyT1MgPSBcIldpbmRvd3NcIjtcbn1cbmVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwiTWFjXCIpID49IDApIHtcbiAgICBpZiAodXNlckFnZW50LmluZGV4T2YoXCJpUFwiKSA+PSAwKSB7XG4gICAgICAgIGJyb3dzZXJPUyA9IFwiaU9TXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYnJvd3Nlck9TID0gXCJtYWNPU1wiO1xuICAgIH1cbn1cbmVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwiQW5kcm9pZFwiKSA+PSAwKSB7XG4gICAgYnJvd3Nlck9TID0gXCJBbmRyb2lkXCI7XG59XG5lbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIkxpbnV4XCIpID49IDApIHtcbiAgICBicm93c2VyT1MgPSBcIkxpbnV4XCI7XG59XG5lbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIlgxMVwiKSA+PSAwKSB7XG4gICAgYnJvd3Nlck9TID0gXCJVbml4LWxpa2VcIjtcbn1cblxuLyoqXG4gKiBTY3JlZW4gd2lkdGhcbiAqL1xuZXhwb3J0IGxldCBzY3JlZW5XaWR0aDogbnVtYmVyID0gbnVsbDtcblxuLyoqXG4gKiBTY3JlZW4gaGVpZ2h0XG4gKi9cbmV4cG9ydCBsZXQgc2NyZWVuSGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuXG5pZiAoZ2xvYmFsLnNjcmVlbikge1xuICAgIHNjcmVlbldpZHRoID0gZ2xvYmFsLnNjcmVlbi5hdmFpbEhlaWdodDtcbiAgICBzY3JlZW5IZWlnaHQgPSBnbG9iYWwuc2NyZWVuLmF2YWlsV2lkdGg7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9lbnYvYnJvd3Nlci50cyIsImltcG9ydCB7IGdldFN0b3JlZEV2ZW50cywgcmVtb3ZlU3RvcmVkRXZlbnRzIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVkU2Vzc2lvbiwgZ2V0Q2FjaGVkU2Vzc2lvblNjb3JlIH0gZnJvbSBcIi4vLi4vc2Vzc2lvbi9zdGF0ZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vLi4vYXBpXCI7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2VcIjtcbmltcG9ydCAqIGFzIHVwbG9hZCBmcm9tIFwiLi91cGxvYWRcIjtcbmltcG9ydCAqIGFzIHRyYWNraW5nIGZyb20gXCIuL3RyYWNraW5nXCI7XG5cbi8qKlxuICogW1tpbmNsdWRlOmJlaGF2aW91ci1tb2R1bGUubWRdXVxuICovXG5leHBvcnQgbmFtZXNwYWNlIGJlaGF2aW91ciB7XG5cbiAgICAvKipcbiAgICAgKiBSZXByZXNlbnRzIGVpdGhlciBzaW5nbGUgRE9NIGVsZW1lbnQgb3IgRE9NIGVsZW1lbnQgbGlzdC5cbiAgICAgKi9cbiAgICB0eXBlIE9uZU9yTWFueUhUTUxFbGVtZW50cyA9IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IE5vZGVMaXN0O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYmVoYXZpb3VyYWwgbW9kdWxlIGlzIHN1cHBvcnRlZCBieSBjdXJyZW50IGJyb3dzZXIuXG4gICAgICogQHJldHVybiBpZiBiZWhhdmlvdXJhbCBtb2R1bGUgY2FuIGJlIHVzZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3RvcmFnZS5pc1N1cHBvcnRlZCgpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBTZXRzIGFuIGlkZW50aWZpZXIgdG8gZm9yIERPTSBlbGVtZW50LiBJZGVudGlmaWVyIG11c3QgYmUgdW5pcXVlLlxuICAgICAqIEBwYXJhbSBhaW1icmFpbklkIGlkZW50aWZpZXIgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBlbGVtZW50IGVsZW1lbnQgdG8gYmUgaWRlbnRpZmllZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0QWltYnJhaW5JZChhaW1icmFpbklkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGRvbS5zZXRFbGVtZW50U2RrSWQoYWltYnJhaW5JZCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFya3MgYXJyYXkgb3Igc2luZ2xlIEhUTUxFbGVtZW50IGFuZCBpdHMgY2hpbGRyZW4gdW50cmFja2FibGUgKHByaXZhdGUpLlxuICAgICAqIEBwYXJhbSBlbGVtZW50IGVsZW1lbnQocykgdG8gYmUgbWFya2VkIHVudHJhY2thYmxlLlxuICAgICAqLyBcbiAgICBleHBvcnQgZnVuY3Rpb24gYWRkVG9VbnRyYWNrYWJsZUxpc3QoZWw6IE9uZU9yTWFueUhUTUxFbGVtZW50cykge1xuICAgICAgICBkb20uc2V0SWdub3JlZChlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW2VsXSA6IGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFycmF5IG9yIHNpbmdsZSBIVE1MRWxlbWVudCBmcm9tIHVudHJhY2thYmxlIChwcml2YXRlKSBlbGVtZW50IGxpc3QuXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudChzKSB0byBiZSByZW1vdmVkIGZyb20gdW50cmFja2FibGUgbGlzdC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlRnJvbVVudHJhY2thYmxlTGlzdChlbDogT25lT3JNYW55SFRNTEVsZW1lbnRzKSB7XG4gICAgICAgIGRvbS51bnNldElnbm9yZWQoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IFtlbF0gOiBlbCk7ICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgc2FsdCB1c2VkIGZvciBzZW5zaXRpdmUgdmlldyBpZCBoYXNoaW5nLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBoZXhhZGVjaW1hbCAxMjhiaXQgc3RyaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRTZW5zaXRpdmVTYWx0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgZG9tLnNldFNlbnNpdGl2ZVNhbHQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmtzIGFycmF5IG9yIHNpbmdsZSBIVE1MRWxlbWVudCBhbmQgaXRzIGNoaWxkcmVuIGFzIHNlbnNpdGl2ZS5cbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50KHMpIHRvIGJlIG1hcmtlZCBzZW5zaXRpdmUuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFkZFRvU2Vuc2l0aXZlTGlzdChlbDogT25lT3JNYW55SFRNTEVsZW1lbnRzKSB7XG4gICAgICAgIGRvbS5zZXRTZW5zaXRpdmUoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IFtlbF0gOiBlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhcnJheSBvciBzaW5nbGUgSFRNTEVsZW1lbnQgZnJvbSBzZW5zaXRpdmUgZWxlbWVudCBsaXN0LlxuICAgICAqIEBwYXJhbSBlbGVtZW50IGVsZW1lbnQocykgdG8gYmUgcmVtb3ZlZCBmcm9tIHNlbnNpdGl2ZSBsaXN0LlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiByZW1vdmVGcm9tU2Vuc2l0aXZlTGlzdChlbDogT25lT3JNYW55SFRNTEVsZW1lbnRzKSB7XG4gICAgICAgIGRvbS51bnNldFNlbnNpdGl2ZShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW2VsXSA6IGVsKTtcbiAgICB9XG4gXG4gICAgLyoqXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0byBbW1NlbmRCZWhhdmlvdXJSZXN1bHRdXVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzZW5kQ29sbGVjdGVkRXZlbnRzKG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZT86IGZhbHNlKTogUHJvbWlzZTxhcGkuU2VuZEJlaGF2aW91clJlc3VsdD4gXG4gICAgLyoqXG4gICAgICogR2V0IHNlcmlhbGlzZWQgc2VuZCBldmVudCBhcGkgY2FsbC5cbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHRvIEFQSSByZXF1ZXN0IGJvZHkgc2VyaWFsaXplZCB0byBzdHJpbmdcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2VuZENvbGxlY3RlZEV2ZW50cyhtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU/OiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+ICAgICAgXG4gICAgLyoqXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0byBbW1NlbmRCZWhhdmlvdXJSZXN1bHRdXVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzZW5kQ29sbGVjdGVkRXZlbnRzKG1ldGFkYXRhOiBzdHJpbmcpOiBQcm9taXNlPGFwaS5TZW5kQmVoYXZpb3VyUmVzdWx0PiAgICAgIFxuICAgIC8qKlxuICAgICAqIFNlbmQgY29sbGVjdGVkIGJlaGF2aW91cmFsIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0gbWV0YWRhdGEgaW50ZWdyYXRpb24gc3BlY2lmaWMgbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gc2VyaWFsaXplIGZsYWcgdG8gcmVxdWVzdCBzZXJpYWxpemVkIHJlcXVlc3QgYm9keSBpbnN0ZWFkIG9mIG1ha2luZyBBUEkgY2FsbFxuICAgICAqLyAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNlbmRDb2xsZWN0ZWRFdmVudHMobWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplPyk6IFByb21pc2U8c3RyaW5nPiB8IFByb21pc2U8YXBpLlNlbmRCZWhhdmlvdXJSZXN1bHQ+ICB7XG4gICAgICAgIHJldHVybiB1cGxvYWQuc2VuZENvbGxlY3RlZEV2ZW50cyhtZXRhZGF0YSwgc2VyaWFsaXplKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBjb2xsZWN0ZWQgYmVoYXZpb3VyYWwgZXZlbnRzLlxuICAgICAqLyAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29sbGVjdGVkRXZlbnRzKCkgIHtcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuY2xlYXJTdG9yZWRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdHJhY2tpbmcgYmVoYXZpb3VyYWwgZXZlbnRzLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzdGFydFRyYWNraW5nKCkge1xuICAgICAgICB0cmFja2luZy5zdGFydFRyYWNraW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgdHJhY2tpbmcgYmVoYXZpb3VyYWwgZXZlbnRzLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzdG9wVHJhY2tpbmcoKSB7XG4gICAgICAgIHRyYWNraW5nLnN0b3BUcmFja2luZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY2VudCBzY29yZS5cbiAgICAgKiBAcmV0dXJuIE1vc3QgcmVjZW50IGJlaGF2aW91cmFsIHNjb3JlIHJlY2VpdmVkIHdoZW4gc3VibWl0dGluZyBcbiAgICAgKiBiZWhhdmlvdXJhbCBldmVudHMuIFRoaXMgaW5jbHVkZXMgY2FsbHMgdG8gW1tzZW5kQ29sbGVjdGVkRXZlbnRzXV0gYW5kXG4gICAgICogY2FsbHMgbWFkZSBieSBiYWNrZ3JvdW5kIGV2ZW50IHNlbmRpbmcuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFNjb3JlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBnZXRDYWNoZWRTZXNzaW9uU2NvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgaW52b2tpbmcgW1tzZW5kQ29sbGVjdGVkRXZlbnRzXV0gcGVyaW9kaWNhbGx5IGluIGJhY2tncm91bmQuXG4gICAgICogQHBhcmFtIGludGVydmFsIHNlbmRpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLiBEZWZhdWx0cyB0byAzMDAwXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0U2VuZGluZyhpbnRlcnZhbD86IG51bWJlcikge1xuICAgICAgICB1cGxvYWQuc3RhcnRCYWNrZ3JvdW5kU2VuZGluZyhpbnRlcnZhbCk7ICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBpbnZva2luZyBbW3NlbmRDb2xsZWN0ZWRFdmVudHNdXSBwZXJpb2RpY2FsbHkgaW4gYmFja2dyb3VuZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RvcFNlbmRpbmcoKSB7XG4gICAgICAgIHVwbG9hZC5zdG9wQmFja2dyb3VuZFNlbmRpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgZXZlbnQgdHJhY2tpbmcgYW5kIGJhY2tncm91bmQgc2VuZGluZy5cbiAgICAgKiBAcGFyYW0gaW50ZXJ2YWwgc2VuZGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuIERlZmF1bHRzIHRvIDMwMDBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RhcnQoaW50ZXJ2YWw/OiBudW1iZXIpIHtcbiAgICAgICAgc3RhcnRUcmFja2luZygpO1xuICAgICAgICBzdGFydFNlbmRpbmcoaW50ZXJ2YWwpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iZWhhdmlvdXIvaW5kZXgudHMiLCJpbXBvcnQgc2hhMjU2IGZyb20gXCIuLy4uL3V0aWwvc2hhMjU2XCI7XG5pbXBvcnQgeyBoZXhUb1N0cmluZyB9IGZyb20gXCIuLy4uL3V0aWwvY29udmVydFwiO1xuXG5jb25zdCBpZEF0dHJpYnV0ZSA9IFwiZGF0YS1haW1icmFpbi1pZFwiO1xuY29uc3Qgc2Vuc2l0aXZlQXR0cmlidXRlID0gXCJkYXRhLWFpbWJyYWluLXNlbnNpdGl2ZVwiO1xuY29uc3QgaWdub3JlZEF0dHJpYnV0ZSA9IFwiZGF0YS1haW1icmFpbi1pZ25vcmVkXCI7XG5cbmV4cG9ydCBsZXQgc2Vuc2l0aXZlU2FsdDogc3RyaW5nID0gXCJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbnNpdGl2ZVNhbHQodmFsdWU6IHN0cmluZykge1xuICAgIHNlbnNpdGl2ZVNhbHQgPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnRTZGtJZChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGlkQXR0cmlidXRlKTtcblxuICAgIGlmICghaWQpIHtcbiAgICAgICAgaWQgPSBlbGVtZW50LmlkO1xuICAgIH1cblxuICAgIGlmIChpZCAmJiBpc1NlbnNpdGl2ZShlbGVtZW50KSkge1xuICAgICAgICBpZCA9IHNoYTI1NihpZCArIGhleFRvU3RyaW5nKHNlbnNpdGl2ZVNhbHQpKVxuICAgIH1cblxuICAgIHJldHVybiBpZCA/IGlkIDogbnVsbDtcbn1cbiBcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50SWRDaGFpbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgbGV0IHNlbnNpdGl2ZSA9IGlzU2Vuc2l0aXZlKGVsZW1lbnQpO1xuICAgIHdoaWxlIChlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoaWRBdHRyaWJ1dGUpO1xuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgIH0gICAgXG4gICAgICAgIGlmIChpZCAmJiBzZW5zaXRpdmUpIHtcbiAgICAgICAgICAgIGlkID0gc2hhMjU2KGlkICsgaGV4VG9TdHJpbmcoc2Vuc2l0aXZlU2FsdCkpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVsZW1lbnRTZGtJZChpZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGlkQXR0cmlidXRlLCBpZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NlbnNpdGl2ZShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShzZW5zaXRpdmVBdHRyaWJ1dGUpID09PSBcInRydWVcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaXNTZW5zaXRpdmUoZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U2Vuc2l0aXZlKGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdIHwgTm9kZUxpc3QpIHtcbiAgICBmb3IgKGxldCBlIG9mIDxIVE1MRWxlbWVudFtdPmVsZW1lbnRzKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShzZW5zaXRpdmVBdHRyaWJ1dGUsIFwidHJ1ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2V0U2Vuc2l0aXZlKGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdIHwgTm9kZUxpc3QpIHtcbiAgICBmb3IgKGxldCBlIG9mIDxIVE1MRWxlbWVudFtdPmVsZW1lbnRzKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnJlbW92ZUF0dHJpYnV0ZShzZW5zaXRpdmVBdHRyaWJ1dGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJZ25vcmVkKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKGlnbm9yZWRBdHRyaWJ1dGUpID09PSBcInRydWVcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaXNJZ25vcmVkKGVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldElnbm9yZWQoZWxlbWVudHM6IEhUTUxFbGVtZW50W10gfCBOb2RlTGlzdCkge1xuICAgIGZvciAobGV0IGUgb2YgPEhUTUxFbGVtZW50W10+ZWxlbWVudHMpIHtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGlnbm9yZWRBdHRyaWJ1dGUsIFwidHJ1ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2V0SWdub3JlZChlbGVtZW50czogSFRNTEVsZW1lbnRbXSB8IE5vZGVMaXN0KSB7XG4gICAgZm9yIChsZXQgZSBvZiA8SFRNTEVsZW1lbnRbXT5lbGVtZW50cykge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgZS5yZW1vdmVBdHRyaWJ1dGUoaWdub3JlZEF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iZWhhdmlvdXIvZG9tLnRzIiwiaW1wb3J0IHsgZ2V0U3RvcmVkRXZlbnRzLCByZW1vdmVTdG9yZWRFdmVudHMgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwiLi8uLi9hcGlcIjtcbmltcG9ydCB7IHNldENhY2hlZFNlc3Npb25TY29yZSB9IGZyb20gXCIuLy4uL3Nlc3Npb24vc3RhdGVcIjtcbmltcG9ydCAqIGFzIGNhbGxzIGZyb20gXCIuL2NhbGxzXCI7XG5cbmV4cG9ydCBsZXQgZGVmYXVsdFNlbmRpbmdJbnRlcnZhbDogbnVtYmVyID0gMyAqIDEwMDA7XG5sZXQgc2VuZGluZ0ludGVydmFsSWQ7XG5sZXQgc2VuZGluZyA9IGZhbHNlO1xuIFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRDb2xsZWN0ZWRFdmVudHMobWV0YWRhdGE6IHN0cmluZywgc2VyaWFsaXplOiB0cnVlKTogUHJvbWlzZTxzdHJpbmc+XG5leHBvcnQgZnVuY3Rpb24gc2VuZENvbGxlY3RlZEV2ZW50cyhtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU6IGZhbHNlKTogUHJvbWlzZTxhcGkuU2VuZEJlaGF2aW91clJlc3VsdD5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kQ29sbGVjdGVkRXZlbnRzKG1ldGFkYXRhOiBzdHJpbmcsIHNlcmlhbGl6ZT8pOiBQcm9taXNlPHN0cmluZz4gfCBQcm9taXNlPGFwaS5TZW5kQmVoYXZpb3VyUmVzdWx0PiB7XG4gICAgaWYgKHNlcmlhbGl6ZSkge1xuICAgICAgICByZXR1cm4gZ2V0U3RvcmVkRXZlbnRzKCkudGhlbigoZXZlbnRzKSA9PiB7XG4gICAgICAgICAgICBsZXQgbW91c2VFdmVudHMgPSBldmVudHNbMF07XG4gICAgICAgICAgICBsZXQga2V5RXZlbnRzID0gZXZlbnRzWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxzLnNlbmRFdmVudHMobW91c2VFdmVudHMsIGtleUV2ZW50cywgbWV0YWRhdGEsIHNlcmlhbGl6ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldFN0b3JlZEV2ZW50cygpLnRoZW4oKGV2ZW50cykgPT4ge1xuICAgICAgICAgICAgbGV0IG1vdXNlRXZlbnRzID0gZXZlbnRzWzBdO1xuICAgICAgICAgICAgaWYgKG1vdXNlRXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbW91c2UgZXZlbnRzIGZyb20gezB9IHRvIHsxfVwiLCBtb3VzZUV2ZW50c1swXS50LCBtb3VzZUV2ZW50c1ttb3VzZUV2ZW50cy5sZW5ndGggLSAxXS50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBrZXlFdmVudHMgPSBldmVudHNbMV07XG4gICAgICAgICAgICBpZiAoa2V5RXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcga2V5IGV2ZW50cyBmcm9tIHswfSB0byB7MX1cIiwga2V5RXZlbnRzWzBdLnQsIGtleUV2ZW50c1trZXlFdmVudHMubGVuZ3RoIC0gMV0udCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FsbHMuc2VuZEV2ZW50cyhtb3VzZUV2ZW50cywga2V5RXZlbnRzLCBtZXRhZGF0YSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRDYWNoZWRTZXNzaW9uU2NvcmUocmVzdWx0LnNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3RvcmVkRXZlbnRzKG1vdXNlRXZlbnRzLCBrZXlFdmVudHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEJhY2tncm91bmRTZW5kaW5nKGludGVydmFsOiBudW1iZXIgPSBkZWZhdWx0U2VuZGluZ0ludGVydmFsKSB7XG4gICAgaWYgKHNlbmRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGJhY2tncm91bmQgdXBsb2FkXCIpO1xuICAgIHNlbmRpbmcgPSB0cnVlOyAgICBcbiAgICBzZW5kaW5nSW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJiYWNrZ3JvdW5kIHVwbG9hZFwiKTtcbiAgICAgICAgc2VuZENvbGxlY3RlZEV2ZW50cyhudWxsLCBmYWxzZSk7XG4gICAgfSwgaW50ZXJ2YWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEJhY2tncm91bmRTZW5kaW5nKCkge1xuICAgIHNlbmRpbmcgPSBmYWxzZTtcbiAgICBpZiAoc2VuZGluZ0ludGVydmFsSWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzZW5kaW5nSW50ZXJ2YWxJZCk7XG4gICAgICAgIHNlbmRpbmdJbnRlcnZhbElkID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wcGVkIGJhY2tncm91bmQgdXBsb2FkXCIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iZWhhdmlvdXIvdXBsb2FkLnRzIiwiaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCIuLy4uL3V0aWwvcHJvbWlzZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vLi4vYXBpXCI7XG5pbXBvcnQgeyBTZXNzaW9uLCBnZXRDYWNoZWRTZXNzaW9uIH0gZnJvbSBcIi4vLi4vc2Vzc2lvbi9zdGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VuZEV2ZW50cyhtb3VzZUV2ZW50czogQXJyYXk8T2JqZWN0Piwga2V5RXZlbnRzOiBBcnJheTxPYmplY3Q+LCBtZXRhZGF0YTogc3RyaW5nKTogUHJvbWlzZTxhcGkuU2VuZEJlaGF2aW91clJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gc2VuZEV2ZW50cyhtb3VzZUV2ZW50czogQXJyYXk8T2JqZWN0Piwga2V5RXZlbnRzOiBBcnJheTxPYmplY3Q+LCBtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU6IGZhbHNlKTogUHJvbWlzZTxhcGkuU2VuZEJlaGF2aW91clJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gc2VuZEV2ZW50cyhtb3VzZUV2ZW50czogQXJyYXk8T2JqZWN0Piwga2V5RXZlbnRzOiBBcnJheTxPYmplY3Q+LCBtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU6IHRydWUpOiBQcm9taXNlPHN0cmluZz47XG5leHBvcnQgZnVuY3Rpb24gc2VuZEV2ZW50cyhtb3VzZUV2ZW50czogQXJyYXk8T2JqZWN0Piwga2V5RXZlbnRzOiBBcnJheTxPYmplY3Q+LCBtZXRhZGF0YTogc3RyaW5nLCBzZXJpYWxpemU/KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGdldENhY2hlZFNlc3Npb24oKTtcbiAgICBpZiAoc2Vzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7XG4gICAgICAgICAgICBlcnJvckNvZGU6IGFwaS5FcnJvckNvZGUuTm9PcGVuU2Vzc2lvbixcbiAgICAgICAgICAgIGVycm9yOiBcIlRoaXMgY2FsbCByZXF1aXJlcyBhY3RpdmUgc2Vzc2lvblwiXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYXBpLnNlbmRFdmVudHMoc2Vzc2lvbi5nZXRJZCgpLCBtb3VzZUV2ZW50cywga2V5RXZlbnRzLCBtZXRhZGF0YSkuc2VyaWFsaXplKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcGkuc2VuZEV2ZW50cyhzZXNzaW9uLmdldElkKCksIG1vdXNlRXZlbnRzLCBrZXlFdmVudHMsIG1ldGFkYXRhKS5zZW5kKCk7XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iZWhhdmlvdXIvY2FsbHMudHMiLCJpbXBvcnQgKiBhcyBkb20gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuY29uc3QgbW92ZUV2ZW50c0dyb3VwaW5nSW50ZXJ2YWwgPSAxMDA7XG5sZXQgbW92ZUdyb3VwQ291bnRlciA9IDA7XG5sZXQgbW92ZUdyb3VwU3RhcnRUaW1lID0gMDtcblxuZXhwb3J0IGxldCBpc1RyYWNraW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG1vdXNlRG93bkxpc3RlbmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgaWYgKGRvbS5pc0lnbm9yZWQoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc2Vuc2l0aXZlID0gZG9tLmlzU2Vuc2l0aXZlKGVsZW1lbnQpO1xuICAgIGNvbnN0IGV2dDogc3RvcmFnZS5Nb3VzZUV2ZW50ID0ge1xuICAgICAgICBkb2N4OiBzZW5zaXRpdmUgPyAwIDogZXZlbnQucGFnZVgsXG4gICAgICAgIGRvY3k6IHNlbnNpdGl2ZSA/IDAgOiBldmVudC5wYWdlWSxcbiAgICAgICAgZWx4OiBldmVudC5vZmZzZXRYLFxuICAgICAgICBlbHk6IGV2ZW50Lm9mZnNldFksXG4gICAgICAgIGJ0bjogZXZlbnQuYnV0dG9uLFxuICAgICAgICB0OiBEYXRlLm5vdygpLFxuICAgICAgICB0eXBlOiBzdG9yYWdlLk1vdXNlRXZlbnRUeXBlLkRPV04sXG4gICAgICAgIGlkczogZG9tLmdldEVsZW1lbnRJZENoYWluKGVsZW1lbnQpLFxuICAgIH07XG4gICAgc3RvcmFnZS5hZGRNb3VzZUV2ZW50KGV2dCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlVXBMaXN0ZW5lcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGlmIChkb20uaXNJZ25vcmVkKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNlbnNpdGl2ZSA9IGRvbS5pc1NlbnNpdGl2ZShlbGVtZW50KTtcbiAgICBjb25zdCBldnQ6IHN0b3JhZ2UuTW91c2VFdmVudCA9IHtcbiAgICAgICAgZG9jeDogc2Vuc2l0aXZlID8gMCA6IGV2ZW50LnBhZ2VYLFxuICAgICAgICBkb2N5OiBzZW5zaXRpdmUgPyAwIDogZXZlbnQucGFnZVksXG4gICAgICAgIGVseDogZXZlbnQub2Zmc2V0WCxcbiAgICAgICAgZWx5OiBldmVudC5vZmZzZXRZLFxuICAgICAgICBidG46IGV2ZW50LmJ1dHRvbixcbiAgICAgICAgdDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHlwZTogc3RvcmFnZS5Nb3VzZUV2ZW50VHlwZS5VUCxcbiAgICAgICAgaWRzOiBkb20uZ2V0RWxlbWVudElkQ2hhaW4oZWxlbWVudCksXG4gICAgfTtcbiAgICBzdG9yYWdlLmFkZE1vdXNlRXZlbnQoZXZ0KTtcbn1cblxuZnVuY3Rpb24gbW91c2VNb3ZlTGlzdGVuZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICBpZiAoZG9tLmlzSWdub3JlZChlbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgbW92ZUdyb3VwQ291bnRlcisrO1xuICAgIGlmIChjdXJyZW50VGltZSAtIG1vdmVHcm91cFN0YXJ0VGltZSA8IG1vdmVFdmVudHNHcm91cGluZ0ludGVydmFsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNlbnNpdGl2ZSA9IGRvbS5pc1NlbnNpdGl2ZShlbGVtZW50KTtcbiAgICBjb25zdCBldnQ6IHN0b3JhZ2UuTW91c2VFdmVudCA9IHtcbiAgICAgICAgZG9jeDogc2Vuc2l0aXZlID8gMCA6IGV2ZW50LnBhZ2VYLFxuICAgICAgICBkb2N5OiBzZW5zaXRpdmUgPyAwIDogZXZlbnQucGFnZVksXG4gICAgICAgIGVseDogZXZlbnQub2Zmc2V0WCxcbiAgICAgICAgZWx5OiBldmVudC5vZmZzZXRZLFxuICAgICAgICB0OiBjdXJyZW50VGltZSxcbiAgICAgICAgbm86IG1vdmVHcm91cENvdW50ZXIsXG4gICAgICAgIHR5cGU6IHN0b3JhZ2UuTW91c2VFdmVudFR5cGUuTU9WRSxcbiAgICAgICAgaWRzOiBkb20uZ2V0RWxlbWVudElkQ2hhaW4oZWxlbWVudCksXG4gICAgfTtcbiAgICBtb3ZlR3JvdXBTdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICBtb3ZlR3JvdXBDb3VudGVyID0gMDtcbiAgICBzdG9yYWdlLmFkZE1vdXNlRXZlbnQoZXZ0KTtcbn1cblxuZnVuY3Rpb24ga2V5VXBMaXN0ZW5lcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGlmIChkb20uaXNJZ25vcmVkKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZXZ0OiBzdG9yYWdlLktleUV2ZW50ID0ge1xuICAgICAgICB0OiBEYXRlLm5vdygpLFxuICAgICAgICBrZXk6IGV2ZW50LmtleSxcbiAgICAgICAgZGlyOiBzdG9yYWdlLktleURpcmVjdGlvbi5VUCxcbiAgICAgICAgaWRzOiBkb20uZ2V0RWxlbWVudElkQ2hhaW4oZWxlbWVudCksXG4gICAgfTtcbiAgICBzdG9yYWdlLmFkZEtleUV2ZW50KGV2dCk7XG59XG5cbmZ1bmN0aW9uIGtleURvd25MaXN0ZW5lcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGlmIChkb20uaXNJZ25vcmVkKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZXZ0OiBzdG9yYWdlLktleUV2ZW50ID0ge1xuICAgICAgICB0OiBEYXRlLm5vdygpLFxuICAgICAgICBrZXk6IGV2ZW50LmtleSxcbiAgICAgICAgZGlyOiBzdG9yYWdlLktleURpcmVjdGlvbi5ET1dOLFxuICAgICAgICBpZHM6IGRvbS5nZXRFbGVtZW50SWRDaGFpbihlbGVtZW50KSxcbiAgICB9O1xuICAgIHN0b3JhZ2UuYWRkS2V5RXZlbnQoZXZ0KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZVVwTGlzdGVuZXIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlRG93bkxpc3RlbmVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcExpc3RlbmVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZVVwTGlzdGVuZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlRG93bkxpc3RlbmVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcExpc3RlbmVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkxpc3RlbmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0VHJhY2tpbmcoKSB7XG4gICAgaWYgKCFpc1RyYWNraW5nKSB7XG4gICAgICAgIGFkZExpc3RlbmVycygpO1xuICAgICAgICBpc1RyYWNraW5nID0gdHJ1ZTsgIFxuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRlZCB0cmFja2luZycpOyAgICAgXG4gICAgfVxufSBcblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BUcmFja2luZygpIHtcbiAgICBpZiAoaXNUcmFja2luZykge1xuICAgICAgICByZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgICAgaXNUcmFja2luZyA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnc3RvcHBlZCB0cmFja2luZycpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmVoYXZpb3VyL3RyYWNraW5nLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==