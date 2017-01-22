// constants
import {
  AFTER_PRINT,
  BEFORE_PRINT,
  HAS_MATCH_MEDIA_SUPPORT,
  HAS_ON_AFTER_PRINT,
  HAS_ON_BEFORE_PRINT,
  PRINT_MEDIA_QUERY_LIST
} from './constants';

/**
 * when the Event constructor is supported then use it, else fall back
 * to creating event the old-fashioned way
 *
 * @param {string} eventName
 * @return {Event}
 */
export const createNewEvent = (eventName) => {
  try {
    return new Event(eventName);
  } catch (exception) {
    const e = document.createEvent('Event');

    e.initEvent(eventName, false, false);

    return e;
  }
};

if (!HAS_ON_AFTER_PRINT && HAS_MATCH_MEDIA_SUPPORT) {
  PRINT_MEDIA_QUERY_LIST.addListener((mqlEvent) => {
    if (!mqlEvent.matches) {
      window.dispatchEvent(createNewEvent(AFTER_PRINT));
    }
  });
}

if (!HAS_ON_BEFORE_PRINT && HAS_MATCH_MEDIA_SUPPORT) {
  PRINT_MEDIA_QUERY_LIST.addListener((mqlEvent) => {
    if (mqlEvent.matches) {
      window.dispatchEvent(createNewEvent(BEFORE_PRINT));
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
export const findAndRemoveHandler = (handlers, handler) => {
  let handlerIndex = -1,
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
export const throwInvalidMethodError = (method) => {
  throw new Error(`The method "${method}" is invalid, it needs to be either "after" or "before".`);
};

/**
 * if print event handlers are not supported at all, throw an error
 */
export const throwNotSupportedError = () => {
  throw new Error('Sorry, looks like this browser does not support any print event handlers.');
};
