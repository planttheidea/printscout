// constants
import {
  AFTER,
  AFTER_PRINT,
  BEFORE,
  BEFORE_PRINT,
  GLOBAL_VALUES,
} from './constants';

/**
 * @function getNormalizedEventName
 *
 * @description
 * get the normalized event name for the print action
 *
 * @param {string} eventName the name of the event to trigger
 * @returns {string} the normalized event name
 */
export const getNormalizedEventName = (eventName) => {
  const lowercaseName = eventName.toLowerCase();

  if (lowercaseName === AFTER_PRINT || lowercaseName === AFTER) {
    return AFTER_PRINT;
  }

  if (lowercaseName === BEFORE_PRINT || lowercaseName === BEFORE) {
    return BEFORE_PRINT;
  }

  throw new ReferenceError(`The event "${eventName}" is invalid, it must be either "afterprint" or "beforeprint".`);
};

/**
 * @function removeListener
 *
 * @description
 * remove an existing listener with the handler function passed
 *
 * @param {{afterprint: Array<function>, beforeprint: Array<function>}} handlers the instance handlers
 * @param {string} eventName the event name passed
 * @param {function} handler the handler to unapply
 */
export const removeListener = (handlers, eventName, handler) => {
  const event = getNormalizedEventName(eventName);
  const indexOfHandler = handlers[event].indexOf(handler);

  if (~indexOfHandler) {
    window.removeEventListener(event, handler);

    handlers[event] = handlers[event].slice(0, indexOfHandler).concat(handlers[event].slice(indexOfHandler + 1));
  }
};

/**
 * @function addListener
 *
 * @description
 * add a new listener with the handler function passed
 *
 * @param {{afterprint: Array<function>, beforeprint: Array<function>}} handlers the instance handlers
 * @param {string} eventName the event name passed
 * @param {function} handler the handler to apply
 * @returns {function} the handler
 */
export const addListener = (handlers, eventName, handler) => {
  const event = getNormalizedEventName(eventName);

  window.addEventListener(event, handler);

  handler.off = function off() {
    return removeListener.call(this, handlers, event, handler);
  };

  handlers[event] = [...handlers[event], handler];

  return handler;
};

/**
 * @function createNewEventLegacy
 *
 * @description
 * if new Event() syntax is unsupported, use the legacy technique to create a new event
 *
 * @param {string} eventName the name of the event to fire
 * @returns {Event} the event to fire
 */
export const createNewEventLegacy = (eventName) => {
  const event = document.createEvent('Event');

  event.initEvent(eventName, false, false);

  return event;
};

/**
 * @function createNewEventModern
 *
 * @description
 * if new Event() syntax is supported, use it to create a new event
 *
 * @param {string} eventName the name of the event to fire
 * @returns {Event} the event to fire
 */
export const createNewEventModern = (eventName) => new Event(eventName);

/**
 * @function isBrowser
 *
 * @description
 * are we in a browser environment
 *
 * @returns  {boolean} are we in a browser
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * @function onInitialLoad
 *
 * @description
 * on load, set the global values for support and media queries
 *
 * @returns {void}
 */
export const onInitialLoad = () => {
  if (!isBrowser()) {
    return;
  }

  GLOBAL_VALUES.hasMatchMediaSupport = 'matchMedia' in window;
  GLOBAL_VALUES.hasOnAfterPrintSupport = `on${AFTER_PRINT}` in window;
  GLOBAL_VALUES.hasOnBeforePrintSupport = `on${BEFORE_PRINT}` in window;

  GLOBAL_VALUES.hasPrintEventSupport =
    GLOBAL_VALUES.hasMatchMediaSupport
    || (GLOBAL_VALUES.hasOnAfterPrintSupport && GLOBAL_VALUES.hasOnBeforePrintSupport);

  try {
    new Event(AFTER_PRINT);

    GLOBAL_VALUES.hasNewErrorSupport = true;
  } catch (error) {
    GLOBAL_VALUES.hasNewErrorSupport = false;
  }

  GLOBAL_VALUES.createNewEvent = GLOBAL_VALUES.hasNewErrorSupport ? createNewEventModern : createNewEventLegacy;

  if (GLOBAL_VALUES.hasMatchMediaSupport) {
    GLOBAL_VALUES.mql = window.matchMedia('print');

    if (!GLOBAL_VALUES.hasOnAfterPrintSupport) {
      GLOBAL_VALUES.mql.addListener((mqlEvent) => {
        if (!mqlEvent.matches) {
          window.dispatchEvent(GLOBAL_VALUES.createNewEvent(AFTER_PRINT));
        }
      });
    }

    if (!GLOBAL_VALUES.hasOnBeforePrintSupport) {
      GLOBAL_VALUES.mql.addListener((mqlEvent) => {
        if (mqlEvent.matches) {
          window.dispatchEvent(GLOBAL_VALUES.createNewEvent(AFTER_PRINT));
        }
      });
    }
  }

  GLOBAL_VALUES.isInitialized = true;
};
