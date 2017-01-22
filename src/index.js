// constants
import {
  AFTER,
  AFTER_PRINT,
  BEFORE,
  BEFORE_PRINT,
  HAS_MATCH_MEDIA_SUPPORT,
  HAS_ON_AFTER_PRINT,
  HAS_ON_BEFORE_PRINT
} from './constants';

// utils
import {
  findAndRemoveHandler,
  throwInvalidMethodError,
  throwNotSupportedError
} from './utils';

class PrintScout {
  constructor() {
    if (!HAS_ON_AFTER_PRINT && !HAS_ON_BEFORE_PRINT && !HAS_MATCH_MEDIA_SUPPORT) {
      throwNotSupportedError();
    }
  }

  afterHandlers = [];
  beforeHandlers = [];

  /**
   * add listener to list of a handlers and add remove function
   * to it
   *
   * @param {string} eventName
   * @param {array<function>} handlers
   * @param {function} handler
   * @returns {function}
   */
  _addListener(eventName, handlers, handler) {
    window.addEventListener(eventName, handler);
    handlers.push(handler);

    handler.remove = () => {
      this._removeListener(eventName, handler);

      delete handler.remove;
    };

    return handler;
  }

  /**
   * remove all listeners, either to the specific eventName if provided,
   * or across the board
   *
   * @param {string} eventName
   */
  _removeAllListeners(eventName) {
    let afterHandlerIndex = this.afterHandlers.length,
        beforeHandlerIndex = this.beforeHandlers.length;

    if (!eventName || eventName === AFTER || eventName === AFTER_PRINT) {
      while (afterHandlerIndex--) {
        this._removeListener(AFTER_PRINT, this.afterHandlers[afterHandlerIndex]);
      }
    }

    if (!eventName || eventName === BEFORE || eventName === BEFORE_PRINT) {
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
   * @returns {PrintScout}
   */
  _removeListener(eventName, handler) {
    const handlers = eventName === AFTER_PRINT ? this.afterHandlers : this.beforeHandlers;
    const handlerIndex = handlers.indexOf(handler);

    if (!!~handlerIndex) {
      const handler = handlers[handlerIndex];

      window.removeEventListener(eventName, handler);
      findAndRemoveHandler(handlers, handler);
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
  addListener(eventName, fn) {
    switch (eventName) {
      case AFTER:
      case AFTER_PRINT:
        return this._addListener(AFTER_PRINT, this.afterHandlers, fn);

      case BEFORE:
      case BEFORE_PRINT:
        return this._addListener(BEFORE_PRINT, this.beforeHandlers, fn);

      default:
        throwInvalidMethodError(eventName);
        return;
    }
  }

  /**
   * convenience function for adding an afterprint listener
   *
   * @param {function} fn
   * @returns {function}
   */
  after(fn) {
    return this._addListener(AFTER_PRINT, this.afterHandlers, fn);
  }

  /**
   * convenience function for adding a beforeprint listener
   *
   * @param {function} fn
   * @returns {function}
   */
  before(fn) {
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
  removeListener(eventName, handler) {
    if (!eventName || !handler) {
      this._removeAllListeners(eventName);
      return;
    }

    switch (eventName) {
      case AFTER:
      case AFTER_PRINT:
        return this._removeListener(AFTER_PRINT, handler);

      case BEFORE:
      case BEFORE_PRINT:
        return this._removeListener(BEFORE_PRINT, handler);

      default:
        throwInvalidMethodError(eventName);
        return this;
    }
  }
}

export default PrintScout;
