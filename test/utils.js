// test
import test from 'ava';
import sinon from 'sinon';

// src
import * as utils from 'src/utils';
import {AFTER_PRINT, BEFORE_PRINT} from 'src/constants';

test('if getNormalizedEventName will return afterprint when already afterprint', (t) => {
  const eventName = AFTER_PRINT;

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, AFTER_PRINT);
});

test('if getNormalizedEventName will return afterprint when the after shorthand', (t) => {
  const eventName = 'after';

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, AFTER_PRINT);
});

test('if getNormalizedEventName will return beforeprint when already beforeprint', (t) => {
  const eventName = BEFORE_PRINT;

  const result = utils.getNormalizedEventName(eventName);

  t.is(result, BEFORE_PRINT);
});

test('if getNormalizedEventName will return beforeprint when the before shorthand', (t) => {
  const eventName = 'before';

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
