// constants
import {
  AFTER_PRINT,
  BEFORE_PRINT,
  HAS_MATCH_MEDIA_SUPPORT,
  HAS_ON_AFTER_PRINT_SUPPORT,
  HAS_ON_BEFORE_PRINT_SUPPORT,
  PRINT_MEDIA_QUERY_LIST,
  SUPPORTS_PRINT_EVENT_HANDLERS
} from './constants';

// utils
import {addListener, createNewEvent, getNormalizedEventName, removeListener} from './utils';

/**
 * @description
 * if there is no support for the afterprint event, whenever the media query for
 * print changes, manually dispatch it
 */
if (!HAS_ON_AFTER_PRINT_SUPPORT && HAS_MATCH_MEDIA_SUPPORT) {
  PRINT_MEDIA_QUERY_LIST.addListener((mqlEvent) => {
    if (!mqlEvent.matches) {
      window.dispatchEvent(createNewEvent(AFTER_PRINT));
    }
  });
}

/**
 * @description
 * if there is no support for the beforeprint event, whenever the media query for
 * print changes, manually dispatch it
 */
if (!HAS_ON_BEFORE_PRINT_SUPPORT && HAS_MATCH_MEDIA_SUPPORT) {
  PRINT_MEDIA_QUERY_LIST.addListener((mqlEvent) => {
    if (mqlEvent.matches) {
      window.dispatchEvent(createNewEvent(BEFORE_PRINT));
    }
  });
}

/**
 * @class PrintScout
 * @classdesc instance of handlers for before / after print is triggered
 */
class PrintScout {
  constructor() {
    if (!SUPPORTS_PRINT_EVENT_HANDLERS) {
      console.log('Sorry, looks like this browser does not support print event handlers.'); // eslint-disable-line no-console
    }
  }

  /**
   * @var {{afterprint: Array<function>, beforeprint: Array<function>}} handlers
   * @instance
   */
  handlers = {
    afterprint: [],
    beforeprint: []
  };

  /**
   * @function add
   * @memberof PrintScout
   *
   * @description
   * convenience method to add an afterprint event listener
   *
   * @param {function} handler the handler for the new listener
   * @returns {function} the handler
   */
  after(handler) {
    return this.on(AFTER_PRINT, handler);
  }

  /**
   * @function before
   * @memberof PrintScout
   *
   * @description
   * convenience method to add a beforeprint event listener
   *
   * @param {function} handler the handler for the new listener
   * @returns {function} the handler
   */
  before(handler) {
    return this.on(BEFORE_PRINT, handler);
  }

  /**
   * @function on
   * @memberof PrintScout
   *
   * @description
   * add a new event listener based on the eventName passed
   *
   * @param {string} eventName the name of the event to listen for
   * @param {function} handler th handler for the event
   * @returns {function} the handler
   */
  on(eventName, handler) {
    return addListener(this.handlers, eventName, handler);
  }

  /**
   * @function off
   * @memberof PrintScout
   *
   * @description
   * remove an event listener, or a series of event listeners
   *
   * @param {string} [eventName] the name of the event to stop listening for
   * @param {function} [handler] the handler to remove
   * @returns {PrintScout} the instance
   */
  off(eventName, handler) {
    if (handler) {
      return removeListener(this.handlers, eventName, handler);
    }

    if (eventName) {
      const event = getNormalizedEventName(eventName);

      return this.handlers[event].forEach((handler) => {
        removeListener(this.handlers, event, handler);
      });
    }

    return Object.keys(this.handlers).forEach((type) => {
      this.handlers[type].forEach((handler) => {
        removeListener(this.handlers, type, handler);
      });
    });
  }
}

export default PrintScout;
