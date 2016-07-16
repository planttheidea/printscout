const HAS_ON_AFTER_PRINT = !!window.onafterprint;
const HAS_ON_BEFORE_PRINT = !!window.onbeforeprint;
const HAS_MATCH_MEDIA_SUPPORT = !!window.matchMedia;

const PRINT_MEDIA_QUERY_LIST = HAS_MATCH_MEDIA_SUPPORT ? window.matchMedia('print') : null;

/**
 * when the Event constructor is supported then use it, else fall back
 * to creating event the old-fashioned way
 *
 * @param {string} eventName
 * @return {Event}
 */
const addEvent = (eventName) => {
  try {
    return new Event(eventName);
  } catch (exception) {
    const e = document.createEvent('Event');

    e.initEvent(eventName, false, false);

    return e;
  }
};

const AFTER_PRINT_EVENT = addEvent('afterprint');
const BEFORE_PRINT_EVENT = addEvent('beforerprint');

if (!HAS_ON_AFTER_PRINT && HAS_MATCH_MEDIA_SUPPORT) {
  PRINT_MEDIA_QUERY_LIST.addListener((mqlEvent) => {
    if (!mqlEvent.matches) {
      window.dispatchEvent(AFTER_PRINT_EVENT);
    }
  });
}

if (!HAS_ON_BEFORE_PRINT && HAS_MATCH_MEDIA_SUPPORT) {
  PRINT_MEDIA_QUERY_LIST.addListener((mqlEvent) => {
    if (mqlEvent.matches) {
      window.dispatchEvent(BEFORE_PRINT_EVENT);
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
const findAndRemoveHandler = (handlers, handler) => {
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
const throwInvalidMethodError = (method) => {
  throw new TypeError(`The method "${method}" is invalid, it needs to be either "after" or "before".`);
};

/**
 * if print event handlers are not supported at all, throw an error
 */
const throwNotSupportedError = () => {
  throw new TypeError('Sorry, looks like this browser does not support any print event handlers.');
};

export {HAS_MATCH_MEDIA_SUPPORT};
export {HAS_ON_AFTER_PRINT};
export {HAS_ON_BEFORE_PRINT};

export {addEvent};
export {findAndRemoveHandler};
export {throwInvalidMethodError};
export {throwNotSupportedError};
