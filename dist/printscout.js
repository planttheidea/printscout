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
	
	var AFTER_PRINT = 'afterprint';
	var BEFORE_PRINT = 'beforeprint';
	
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
	   * add listener to list of a handlers and add remove function
	   * to it
	   *
	   * @param {string} eventName
	   * @param {array<function>} handlers
	   * @param {function} handler
	   * @return {function}
	   * @private
	   */
	
	
	  _createClass(PrintScout, [{
	    key: '_addListener',
	    value: function _addListener(eventName, handlers, handler) {
	      var _this = this;
	
	      window.addEventListener(eventName, handler);
	      handlers.push(handler);
	
	      handler.remove = function () {
	        _this._removeListener(eventName, handler);
	
	        delete handler.remove;
	      };
	
	      return handler;
	    }
	
	    /**
	     * remove all listeners, either to the specific eventName if provided,
	     * or across the board
	     *
	     * @param {string} eventName
	     * @private
	     */
	
	  }, {
	    key: '_removeAllListeners',
	    value: function _removeAllListeners(eventName) {
	      var afterHandlerIndex = this.afterHandlers.length,
	          beforeHandlerIndex = this.beforeHandlers.length;
	
	      if (!eventName || eventName === 'after' || eventName === AFTER_PRINT) {
	        while (afterHandlerIndex--) {
	          this._removeListener(AFTER_PRINT, this.afterHandlers[afterHandlerIndex]);
	        }
	      }
	
	      if (!eventName || eventName === 'before' || eventName === BEFORE_PRINT) {
	        while (beforeHandlerIndex--) {
	          this._removeListener(BEFORE_PRINT, this.beforeHandlers[beforeHandlerIndex]);
	        }
	      }
	    }
	
	    /**
	     * remove a specific listener from the appropriate handlers
	     * 
	     * @param {string} eventName
	     * @param {function} handler
	     * @return {PrintScout}
	     * @private
	     */
	
	  }, {
	    key: '_removeListener',
	    value: function _removeListener(eventName, handler) {
	      var handlers = eventName === AFTER_PRINT ? this.afterHandlers : this.beforeHandlers;
	      var handlerIndex = handlers.indexOf(handler);
	
	      if (!!~handlerIndex) {
	        var _handler = handlers[handlerIndex];
	
	        window.removeEventListener(eventName, _handler);
	        (0, _utils.findAndRemoveHandler)(handlers, _handler);
	      }
	
	      return this;
	    }
	
	    /**
	     * adds fn to the list of handlers
	     *
	     * @param {string} eventName
	     * @param {function} fn
	     * @returns {function}
	     */
	
	  }, {
	    key: 'addListener',
	    value: function addListener(eventName, fn) {
	      switch (eventName) {
	        case 'after':
	        case AFTER_PRINT:
	          return this._addListener(AFTER_PRINT, this.afterHandlers, fn);
	
	        case 'before':
	        case BEFORE_PRINT:
	          return this._addListener(BEFORE_PRINT, this.beforeHandlers, fn);
	
	        default:
	          (0, _utils.throwInvalidMethodError)(eventName);
	          return;
	      }
	    }
	
	    /**
	     * convenience function for adding an afterprint listener
	     *
	     * @param {function} fn
	     * @return {function}
	     */
	
	  }, {
	    key: 'after',
	    value: function after(fn) {
	      return this._addListener(AFTER_PRINT, this.afterHandlers, fn);
	    }
	
	    /**
	     * convenience function for adding a beforeprint listener
	     * 
	     * @param {function} fn
	     * @return {function}
	     */
	
	  }, {
	    key: 'before',
	    value: function before(fn) {
	      return this._addListener(BEFORE_PRINT, this.beforeHandlers, fn);
	    }
	
	    /**
	     * removes the handler from the list of handlers for
	     * the given eventName
	     *
	     * if the handler is not given, all handlers for the
	     * given eventName are removed
	     *
	     * if the eventName is not given, all handlers across the
	     * board are removed
	     *
	     * @param {string} eventName
	     * @param {function} handler
	     * @returns {PrintScout}
	     */
	
	  }, {
	    key: 'removeListener',
	    value: function removeListener(eventName, handler) {
	      if (!eventName || !handler) {
	        this._removeAllListeners(eventName);
	        return;
	      }
	
	      switch (eventName) {
	        case 'after':
	        case AFTER_PRINT:
	          return this._removeListener(AFTER_PRINT, handler);
	
	        case 'before':
	        case BEFORE_PRINT:
	          return this._removeListener(BEFORE_PRINT, handler);
	
	        default:
	          (0, _utils.throwInvalidMethodError)(eventName);
	          return this;
	      }
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
	      window.dispatchEvent(createNewEvent('beforeprint'));
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