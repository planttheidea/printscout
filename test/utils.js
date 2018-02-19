// test
import test from 'ava';
import sinon from 'sinon';

// src
import * as utils from 'src/utils';
import {AFTER_PRINT, BEFORE_PRINT, GLOBAL_VALUES} from '../src/constants';

const ORIGINAL_GLOBAL_VALUES = {
  createNewEvent: null,
  hasMatchMediaSupport: false,
  hasNewErrorSupport: false,
  hasOnAfterPrintSupport: false,
  hasOnBeforePrintSupport: false,
  hasPrintEventSupport: false,
  isInitialized: false,
  mql: null
};

Object.keys(GLOBAL_VALUES).forEach((key) => {
  if (!ORIGINAL_GLOBAL_VALUES.hasOwnProperty(key)) {
    throw new ReferenceError('Values have changed! Update the ORIGINAL_GLOBAL_VALUES reference.');
  }
});

test('if getNormalizedEventName will return afterprint when already afterprint', (t) => {
  const eventName = AFTER_PRINT;

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, AFTER_PRINT);
});

test('if getNormalizedEventName will return afterprint when the after shorthand is used', (t) => {
  const eventName = 'after';

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, AFTER_PRINT);
});

test('if getNormalizedEventName will return beforeprint when already beforeprint', (t) => {
  const eventName = BEFORE_PRINT;

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, BEFORE_PRINT);
});

test('if getNormalizedEventName will return beforeprint when the before shorthand is used', (t) => {
  const eventName = 'before';

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, BEFORE_PRINT);
});

test('if getNormalizedEventName will handle incorrect casing', (t) => {
  const eventName = 'beforePrint';

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, BEFORE_PRINT);
});

test('if getNormalizedEventName will throw an error when not valid', (t) => {
  const eventName = 'boom';

  t.throws(() => {
    utils.getNormalizedEventName(eventName);
  }, ReferenceError);
});

test.serial('if removeListener will remove the listener when it exists in the list of handlers', (t) => {
  const fn = () => {};
  const eventName = AFTER_PRINT;
  const handlers = {
    [AFTER_PRINT]: [fn]
  };

  const stub = sinon.stub(window, 'removeEventListener');

  const result = utils.removeListener(handlers, eventName, fn);

  t.true(stub.calledOnce);
  t.true(stub.calledWith(eventName, fn));

  stub.restore();

  t.is(result, undefined);

  t.deepEqual(handlers, {
    [AFTER_PRINT]: []
  });
});

test.serial('if removeListener will not remove the listener when it does not exist in the list of handlers', (t) => {
  const fn = () => {};
  const eventName = AFTER_PRINT;
  const handlers = {
    [AFTER_PRINT]: [() => {}]
  };

  const stub = sinon.stub(window, 'removeEventListener');

  const expectedResult = {
    [AFTER_PRINT]: [...handlers[AFTER_PRINT]]
  };

  const result = utils.removeListener(handlers, eventName, fn);

  t.true(stub.notCalled);

  stub.restore();

  t.is(result, undefined);

  t.deepEqual(handlers, expectedResult);
});

test.serial('if addListener will add the listener', (t) => {
  const fn = () => {};
  const eventName = BEFORE_PRINT;
  const handlers = {
    [BEFORE_PRINT]: []
  };

  const stub = sinon.stub(window, 'addEventListener');

  const result = utils.addListener(handlers, eventName, fn);

  t.true(stub.calledOnce);
  t.true(stub.calledWith(eventName, fn));

  stub.restore();

  t.is(result, fn);

  t.deepEqual(handlers, {
    [BEFORE_PRINT]: [fn]
  });
});

test.serial('if addListener will provide an off method for the added listener', (t) => {
  const fn = () => {};
  const eventName = BEFORE_PRINT;
  const handlers = {
    [BEFORE_PRINT]: []
  };

  const addStub = sinon.stub(window, 'addEventListener');

  const result = utils.addListener(handlers, eventName, fn);

  t.true(addStub.calledOnce);
  t.true(addStub.calledWith(eventName, fn));

  addStub.restore();

  t.is(result, fn);

  t.deepEqual(handlers, {
    [BEFORE_PRINT]: [fn]
  });

  const removeStub = sinon.stub(window, 'removeEventListener');

  fn.off();

  t.true(removeStub.calledOnce);
  t.true(removeStub.calledWith(eventName, fn));

  removeStub.restore();

  t.deepEqual(handlers, {
    [BEFORE_PRINT]: []
  });
});

test('if createNewEventModern will create a new event', (t) => {
  const eventName = AFTER_PRINT;

  const result = utils.createNewEventModern(eventName);

  t.deepEqual(result, new Event(eventName));
});

test('if createNewEventLegacy will create a new event', (t) => {
  const eventName = AFTER_PRINT;

  const result = utils.createNewEventLegacy(eventName);

  const event = document.createEvent('event');

  event.initEvent(eventName, false, false);

  t.deepEqual(result, event);
});

test.serial('if isBrowser will return true when a window exists', (t) => {
  const currentWindow = global.window;

  global.window = {};

  t.true(utils.isBrowser());

  global.window = currentWindow;
});

test.serial('if isBrowser will return false when a window does not exist', (t) => {
  const currentWindow = global.window;

  global.window = undefined;

  t.false(utils.isBrowser());

  global.window = currentWindow;
});

test.serial('if onInitialLoad will do nothing if not in a browser environment', (t) => {
  const currentWindow = global.window;
  const currentGlobalValues = {...GLOBAL_VALUES};

  Object.keys(GLOBAL_VALUES).forEach((key) => {
    GLOBAL_VALUES[key] = ORIGINAL_GLOBAL_VALUES[key];
  });

  global.window = undefined;

  utils.onInitialLoad();

  t.deepEqual(GLOBAL_VALUES, ORIGINAL_GLOBAL_VALUES);

  global.window = currentWindow;

  Object.keys(currentGlobalValues).forEach((key) => {
    GLOBAL_VALUES[key] = currentGlobalValues[key];
  });
});

test.serial(
  'if onInitialLoad will initialize with the values based on the window having matchMedia support but no afterprint / beforeprint',
  (t) => {
    const currentWindow = global.window;
    const currentGlobalValues = {...GLOBAL_VALUES};

    Object.keys(GLOBAL_VALUES).forEach((key) => {
      GLOBAL_VALUES[key] = ORIGINAL_GLOBAL_VALUES[key];
    });

    const addListener = sinon.spy();

    global.window = {
      dispatchEvent: sinon.spy(),
      matchMedia: sinon.stub().returns({
        addListener
      })
    };

    utils.onInitialLoad();

    t.deepEqual(GLOBAL_VALUES, {
      createNewEvent: utils.createNewEventModern,
      hasMatchMediaSupport: true,
      hasNewErrorSupport: true,
      hasOnAfterPrintSupport: false,
      hasOnBeforePrintSupport: false,
      hasPrintEventSupport: true,
      isInitialized: true,
      mql: {
        addListener
      }
    });

    t.true(addListener.calledTwice);

    const onAfterPrint = addListener.args[0][0];
    const onBeforePrint = addListener.args[1][0];

    const mqlEventMatch = {
      matches: true
    };

    const mqlEventNonMatch = {
      matches: false
    };

    onAfterPrint(mqlEventMatch);

    t.true(global.window.dispatchEvent.notCalled);

    onAfterPrint(mqlEventNonMatch);

    t.true(global.window.dispatchEvent.calledOnce);
    t.deepEqual(global.window.dispatchEvent.args[0], [GLOBAL_VALUES.createNewEvent(AFTER_PRINT)]);

    onBeforePrint(mqlEventMatch);

    t.true(global.window.dispatchEvent.calledTwice);
    t.deepEqual(global.window.dispatchEvent.args[1], [GLOBAL_VALUES.createNewEvent(AFTER_PRINT)]);

    onBeforePrint(mqlEventNonMatch);

    t.true(global.window.dispatchEvent.calledTwice);

    global.window = currentWindow;

    Object.keys(currentGlobalValues).forEach((key) => {
      GLOBAL_VALUES[key] = currentGlobalValues[key];
    });
  }
);

test.serial('if onInitialLoad will set hasNewErrorSupport to false if a new Event fails', (t) => {
  const currentWindow = global.window;
  const currentEvent = global.Event;
  const currentGlobalValues = {...GLOBAL_VALUES};

  Object.keys(GLOBAL_VALUES).forEach((key) => {
    GLOBAL_VALUES[key] = ORIGINAL_GLOBAL_VALUES[key];
  });

  const addListener = sinon.spy();

  global.window = {
    dispatchEvent: sinon.spy(),
    matchMedia: sinon.stub().returns({
      addListener
    })
  };

  global.Event = function() {
    throw new Error('nope');
  };

  utils.onInitialLoad();

  t.deepEqual(GLOBAL_VALUES, {
    createNewEvent: utils.createNewEventLegacy,
    hasMatchMediaSupport: true,
    hasNewErrorSupport: false,
    hasOnAfterPrintSupport: false,
    hasOnBeforePrintSupport: false,
    hasPrintEventSupport: true,
    isInitialized: true,
    mql: {
      addListener
    }
  });

  t.true(addListener.calledTwice);

  const onAfterPrint = addListener.args[0][0];
  const onBeforePrint = addListener.args[1][0];

  const mqlEventMatch = {
    matches: true
  };

  const mqlEventNonMatch = {
    matches: false
  };

  onAfterPrint(mqlEventMatch);

  t.true(global.window.dispatchEvent.notCalled);

  onAfterPrint(mqlEventNonMatch);

  t.true(global.window.dispatchEvent.calledOnce);
  t.deepEqual(global.window.dispatchEvent.args[0], [GLOBAL_VALUES.createNewEvent(AFTER_PRINT)]);

  onBeforePrint(mqlEventMatch);

  t.true(global.window.dispatchEvent.calledTwice);
  t.deepEqual(global.window.dispatchEvent.args[1], [GLOBAL_VALUES.createNewEvent(AFTER_PRINT)]);

  onBeforePrint(mqlEventNonMatch);

  t.true(global.window.dispatchEvent.calledTwice);

  global.window = currentWindow;
  global.Event = currentEvent;

  Object.keys(currentGlobalValues).forEach((key) => {
    GLOBAL_VALUES[key] = currentGlobalValues[key];
  });
});

test.serial('if onInitialLoad will not set mql when matchMedia is not supported', (t) => {
  const currentWindow = global.window;
  const currentEvent = global.Event;
  const currentGlobalValues = {...GLOBAL_VALUES};

  Object.keys(GLOBAL_VALUES).forEach((key) => {
    GLOBAL_VALUES[key] = ORIGINAL_GLOBAL_VALUES[key];
  });

  global.window = {
    dispatchEvent: sinon.spy(),
    onafterprint: sinon.spy(),
    onbeforeprint: sinon.spy()
  };

  global.Event = function() {
    throw new Error('nope');
  };

  utils.onInitialLoad();

  t.deepEqual(GLOBAL_VALUES, {
    createNewEvent: utils.createNewEventLegacy,
    hasMatchMediaSupport: false,
    hasNewErrorSupport: false,
    hasOnAfterPrintSupport: true,
    hasOnBeforePrintSupport: true,
    hasPrintEventSupport: true,
    isInitialized: true,
    mql: null
  });

  global.window = currentWindow;
  global.Event = currentEvent;

  Object.keys(currentGlobalValues).forEach((key) => {
    GLOBAL_VALUES[key] = currentGlobalValues[key];
  });
});
