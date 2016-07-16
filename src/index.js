import {
  findAndRemoveHandler,
  HAS_MATCH_MEDIA_SUPPORT,
  HAS_ON_AFTER_PRINT,
  HAS_ON_BEFORE_PRINT,
  throwInvalidMethodError,
  throwNotSupportedError
} from './utils';

class PrintScout {
  constructor() {
    this.afterHandlers = [];
    this.beforeHandlers = [];

    if (!HAS_ON_AFTER_PRINT && !HAS_ON_BEFORE_PRINT && !HAS_MATCH_MEDIA_SUPPORT) {
      throwNotSupportedError();
    }
  }

  /**
   * remove all listeners, either to the specific method if provided,
   * or across the board
   *
   * @param {string} method
   * @private
   */
  _removeAllListeners(method) {
    let afterHandlerIndex = this.afterHandlers.length,
        beforeHandlerIndex = this.beforeHandlers.length,
        handlerToRemove;

    if (!method || method === 'after') {
      while (afterHandlerIndex--) {
        handlerToRemove = this.afterHandlers[afterHandlerIndex];

        window.removeEventListener('afterprint', handlerToRemove);
        findAndRemoveHandler(this.afterHandlers, handlerToRemove);
      }
    }

    if (!method || method === 'before') {
      while (beforeHandlerIndex--) {
        handlerToRemove = this.beforeHandlers[beforeHandlerIndex];

        window.removeEventListener('beforeprint', handlerToRemove);
        findAndRemoveHandler(this.beforeHandlers, handlerToRemove);
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
  addListener(method, fn) {
    let eventName,
        handlersArray;

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
        throwInvalidMethodError(method);
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
  removeListener(method, handler) {
    if (!method || !handler) {
      this._removeAllListeners(method);
      return;
    }

    let eventName,
        handlersArray;

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
        throwInvalidMethodError(method);
        return;
    }

    window.removeEventListener(eventName, handler);
    findAndRemoveHandler(handlersArray, handler);
  }
}

export default PrintScout;
