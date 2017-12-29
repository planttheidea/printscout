/**
 * @constant {string} AFTER
 */
export const AFTER = 'after';

/**
 * @constant {string} AFTER_PRINT
 */
export const AFTER_PRINT = 'afterprint';

/**
 * @constant {string} BEFORE
 */
export const BEFORE = 'before';

/**
 * @constant {string} BEFORE_PRINT
 */
export const BEFORE_PRINT = 'beforeprint';

/**
 * @constant {boolean} HAS_NEW_ERROR_SUPPORT
 */
export const HAS_NEW_ERROR_SUPPORT = (() => {
  try {
    new Event(AFTER_PRINT);

    return true;
  } catch (exception) {
    return false;
  }
})();

/**
 * @constant {boolean} HAS_MATCH_MEDIA_SUPPORT
 */
export const HAS_MATCH_MEDIA_SUPPORT = 'matchMedia' in window;

/**
 * @constant {boolean} HAS_ON_AFTER_PRINT_SUPPORT
 */
export const HAS_ON_AFTER_PRINT_SUPPORT = 'onafterprint' in window;

/**
 * @constant {boolean} HAS_ON_BEFORE_PRINT_SUPPORT
 */
export const HAS_ON_BEFORE_PRINT_SUPPORT = 'onbeforeprint' in window;

/**
 * @constant {boolean} SUPPORTS_PRINT_EVENT_HANDLERS
 */
export const SUPPORTS_PRINT_EVENT_HANDLERS =
  HAS_MATCH_MEDIA_SUPPORT && HAS_ON_AFTER_PRINT_SUPPORT && HAS_ON_BEFORE_PRINT_SUPPORT;

/**
 * @constant {MediaQueryList|null} PRINT_MEDIA_QUERY_LIST
 */
export const PRINT_MEDIA_QUERY_LIST = HAS_MATCH_MEDIA_SUPPORT ? window.matchMedia('print') : null;
