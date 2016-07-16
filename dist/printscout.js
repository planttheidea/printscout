var PrintScout =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PrintScout = function () {
	  function PrintScout() {
	    _classCallCheck(this, PrintScout);
	
	    this.afterHandlers = [];
	    this.beforeHandlers = [];
	
	    if (!_utils.HAS_ON_AFTER_PRINT && !_utils.HAS_ON_BEFORE_PRINT && !_utils.HAS_MATCH_MEDIA_SUPPORT) {
	      (0, _utils.throwNotSupportedError)();
	    }
	  }
	
	  /**
	   * remove all listeners, either to the specific method if provided,
	   * or across the board
	   *
	   * @param {string} method
	   * @private
	   */
	
	
	  _createClass(PrintScout, [{
	    key: '_removeAllListeners',
	    value: function _removeAllListeners(method) {
	      var afterHandlerIndex = this.afterHandlers.length,
	          beforeHandlerIndex = this.beforeHandlers.length,
	          handlerToRemove = void 0;
	
	      if (!method || method === 'after') {
	        while (afterHandlerIndex--) {
	          handlerToRemove = this.afterHandlers[afterHandlerIndex];
	
	          window.removeEventListener('afterprint', handlerToRemove);
	          (0, _utils.findAndRemoveHandler)(this.afterHandlers, handlerToRemove);
	        }
	      }
	
	      if (!method || method === 'before') {
	        while (beforeHandlerIndex--) {
	          handlerToRemove = this.beforeHandlers[beforeHandlerIndex];
	
	          window.removeEventListener('beforeprint', handlerToRemove);
	          (0, _utils.findAndRemoveHandler)(this.beforeHandlers, handlerToRemove);
	        }
	      }
	    }
	
	    /**
	     * adds fn to the list of handlers
	     *
	     * @param {string} method
	     * @param {function} fn
	     * @returns {function}
	     */
	
	  }, {
	    key: 'addListener',
	    value: function addListener(method, fn) {
	      var eventName = void 0,
	          handlersArray = void 0;
	
	      switch (method) {
	        case 'after':
	          eventName = 'afterprint';
	          handlersArray = this.afterHandlers;
	
	          break;
	
	        case 'before':
	          eventName = 'beforeprint';
	          handlersArray = this.beforeHandlers;
	
	          break;
	
	        default:
	          (0, _utils.throwInvalidMethodError)(method);
	          return;
	      }
	
	      window.addEventListener(eventName, fn);
	      handlersArray.push(fn);
	
	      return fn;
	    }
	
	    /**
	     * removes the handler from the list of handlers for
	     * the given method
	     *
	     * if the handler is not given, all handlers for the
	     * given method are removed
	     *
	     * if the method is not given, all handlers across the
	     * board are removed
	     *
	     * @param {string} method
	     * @param {function} handler
	     */
	
	  }, {
	    key: 'removeListener',
	    value: function removeListener(method, handler) {
	      if (!method || !handler) {
	        this._removeAllListeners(method);
	        return;
	      }
	
	      var eventName = void 0,
	          handlersArray = void 0;
	
	      switch (method) {
	        case 'after':
	          eventName = 'afterprint';
	          handlersArray = this.afterHandlers;
	
	          break;
	
	        case 'before':
	          eventName = 'beforeprint';
	          handlersArray = this.beforeHandlers;
	
	          break;
	
	        default:
	          (0, _utils.throwInvalidMethodError)(method);
	          return;
	      }
	
	      window.removeEventListener(eventName, handler);
	      (0, _utils.findAndRemoveHandler)(handlersArray, handler);
	    }
	  }]);
	
	  return PrintScout;
	}();
	
	exports.default = PrintScout;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var HAS_ON_AFTER_PRINT = !!window.onafterprint;
	var HAS_ON_BEFORE_PRINT = !!window.onbeforeprint;
	var HAS_MATCH_MEDIA_SUPPORT = !!window.matchMedia;
	
	var PRINT_MEDIA_QUERY_LIST = HAS_MATCH_MEDIA_SUPPORT ? window.matchMedia('print') : null;
	
	/**
	 * when the Event constructor is supported then use it, else fall back
	 * to creating event the old-fashioned way
	 *
	 * @param {string} eventName
	 * @return {Event}
	 */
	var createNewEvent = function createNewEvent(eventName) {
	  try {
	    return new Event(eventName);
	  } catch (exception) {
	    var e = document.createEvent('Event');
	
	    e.initEvent(eventName, false, false);
	
	    return e;
	  }
	};
	
	if (!HAS_ON_AFTER_PRINT && HAS_MATCH_MEDIA_SUPPORT) {
	  PRINT_MEDIA_QUERY_LIST.addListener(function (mqlEvent) {
	    if (!mqlEvent.matches) {
	      window.dispatchEvent(createNewEvent('afterprint'));
	    }
	  });
	}
	
	if (!HAS_ON_BEFORE_PRINT && HAS_MATCH_MEDIA_SUPPORT) {
	  PRINT_MEDIA_QUERY_LIST.addListener(function (mqlEvent) {
	    if (mqlEvent.matches) {
	      window.dispatchEvent(createNewEvent('beforerprint'));
	    }
	  });
	}
	
	/**
	 * find the matching handler and remove it from the
	 * list of handlers
	 *
	 * @param {array<function>} handlers
	 * @param {function} handler
	 * @return {array<function>}
	 */
	var findAndRemoveHandler = function findAndRemoveHandler(handlers, handler) {
	  var handlerIndex = -1,
	      index = -1;
	
	  while (++index < handlers.length) {
	    if (handlers[index] === handler) {
	      handlerIndex = index;
	      break;
	    }
	  }
	
	  if (!!~handlerIndex) {
	    handlers.splice(handlerIndex, 1);
	  }
	
	  return handlers;
	};
	
	/**
	 * if the method is invalid throw a new TypeError
	 *
	 * @param {string} method
	 */
	var throwInvalidMethodError = function throwInvalidMethodError(method) {
	  throw new TypeError('The method "' + method + '" is invalid, it needs to be either "after" or "before".');
	};
	
	/**
	 * if print event handlers are not supported at all, throw an error
	 */
	var throwNotSupportedError = function throwNotSupportedError() {
	  throw new TypeError('Sorry, looks like this browser does not support any print event handlers.');
	};
	
	exports.HAS_MATCH_MEDIA_SUPPORT = HAS_MATCH_MEDIA_SUPPORT;
	exports.HAS_ON_AFTER_PRINT = HAS_ON_AFTER_PRINT;
	exports.HAS_ON_BEFORE_PRINT = HAS_ON_BEFORE_PRINT;
	exports.createNewEvent = createNewEvent;
	exports.findAndRemoveHandler = findAndRemoveHandler;
	exports.throwInvalidMethodError = throwInvalidMethodError;
	exports.throwNotSupportedError = throwNotSupportedError;

/***/ }
/******/ ]);
//# sourceMappingURL=printscout.js.map