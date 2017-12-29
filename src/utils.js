// constants
import {AFTER, AFTER_PRINT, BEFORE, BEFORE_PRINT, HAS_NEW_ERROR_SUPPORT} from './constants';

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
  if (eventName === AFTER_PRINT || eventName === AFTER) {
    return AFTER_PRINT;
  }

  if (eventName === BEFORE_PRINT || eventName === BEFORE) {
    return BEFORE_PRINT;
  }

  throw new ReferenceError(`The event "${eventName}" is invalid, it must be either "after" or "before".`);
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

    handlers[event] = [...handlers[event].slice(0, indexOfHandler), ...handlers[event].slice(indexOfHandler + 1)];
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

  handler.off = () => {
    removeListener(handlers, event, handler);
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
export const createNewEventModern = (eventName) => {
  return new Event(eventName);
};

/**
 * @function createNewEvent
 *
 * @description
 * when the Event constructor is supported then use it, else fall back
 * to creating event the old-fashioned way
 *
 * @param {string} eventName the name of the event to create
 * @return {Event} the generated event
 */
export const createNewEvent = HAS_NEW_ERROR_SUPPORT ? createNewEventModern : createNewEventLegacy;
