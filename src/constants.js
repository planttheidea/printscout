export const AFTER = 'after';
export const AFTER_PRINT = 'afterprint';
export const BEFORE = 'before';
export const BEFORE_PRINT = 'beforeprint';

export const HAS_MATCH_MEDIA_SUPPORT = 'matchMedia' in window;
export const HAS_ON_AFTER_PRINT = 'onafterprint' in window;
export const HAS_ON_BEFORE_PRINT = 'onbeforeprint' in window;

export const PRINT_MEDIA_QUERY_LIST = HAS_MATCH_MEDIA_SUPPORT ? window.matchMedia('print') : null;
