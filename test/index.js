// test
import test from 'ava';
import sinon from 'sinon';

// src
import PrintScout from 'src/index';
import {AFTER_PRINT, BEFORE_PRINT, GLOBAL_VALUES} from 'src/constants';

const afterListener = sinon.spy();
const afterPrintListener = sinon.spy();

const beforeListener = sinon.spy();
const beforePrintListener = sinon.spy();

let scout = null;

test.before(() => {
  scout = new PrintScout();
});

test.serial(
  'if when in a browser environment and no print event support is available a console warning is issued',
  (t) => {
    const currentGlobalValues = {...GLOBAL_VALUES};

    GLOBAL_VALUES.hasPrintEventSupport = false;

    const stub = sinon.stub(console, 'warn');

    new PrintScout();

    t.true(stub.calledOnce);

    stub.restore();

    GLOBAL_VALUES.hasPrintEventSupport = currentGlobalValues.hasPrintEventSupport;
  }
);

test.serial('if the PrintScout instance has the correct shape', (t) => {
  t.deepEqual(
    {...scout},
    {
      handlers: {
        [AFTER_PRINT]: [],
        [BEFORE_PRINT]: []
      }
    }
  );
});

test.serial('if on adds the correct listener', (t) => {
  scout.on('after', afterListener);

  t.deepEqual(scout.handlers.afterprint, [afterListener]);

  scout.on('afterprint', afterPrintListener);

  t.deepEqual(scout.handlers.afterprint, [afterListener, afterPrintListener]);

  scout.on('before', beforeListener);

  t.deepEqual(scout.handlers.beforeprint, [beforeListener]);

  scout.on('beforeprint', beforePrintListener);

  t.deepEqual(scout.handlers.beforeprint, [beforeListener, beforePrintListener]);
});

test.serial('if off removes the correct listener when the listener is provided', (t) => {
  scout.off('after', afterListener);

  t.deepEqual(scout.handlers.afterprint, [afterPrintListener]);

  scout.off('afterprint', afterPrintListener);

  t.deepEqual(scout.handlers.afterprint, []);

  scout.off('before', beforeListener);

  t.deepEqual(scout.handlers.beforeprint, [beforePrintListener]);

  scout.off('beforeprint', beforePrintListener);

  t.deepEqual(scout.handlers.beforeprint, []);
});

test.serial('if off removes the all the listeners for the correct type when only the event is provided', (t) => {
  scout.after(afterListener);
  scout.after(afterPrintListener);
  scout.before(beforeListener);
  scout.before(beforePrintListener);

  scout.off('after');

  t.deepEqual(scout.handlers.afterprint, []);
  t.deepEqual(scout.handlers.beforeprint, [beforeListener, beforePrintListener]);

  scout.off('before');

  t.deepEqual(scout.handlers.afterprint, []);
  t.deepEqual(scout.handlers.beforeprint, []);
});

test.serial('if off removes all listeners when no event is provided', (t) => {
  scout.after(afterListener);
  scout.after(afterPrintListener);
  scout.before(beforeListener);
  scout.before(beforePrintListener);

  t.deepEqual(scout.handlers.afterprint, [afterListener, afterPrintListener]);
  t.deepEqual(scout.handlers.beforeprint, [beforeListener, beforePrintListener]);

  scout.off();

  t.deepEqual(scout.handlers.afterprint, []);
  t.deepEqual(scout.handlers.beforeprint, []);
});

test.serial('if after and before convenience methods add listeners like on', (t) => {
  scout.after(afterListener);

  t.deepEqual(scout.handlers.afterprint, [afterListener]);

  scout.before(beforeListener);

  t.deepEqual(scout.handlers.beforeprint, [beforeListener]);
});

test.serial('if the off methods added to handlers will trigger removal from the list', (t) => {
  const stub = sinon.stub(window, 'removeEventListener');

  afterListener.off();

  t.true(stub.calledOnce);
  t.true(stub.calledWith(AFTER_PRINT, afterListener));

  stub.reset();

  t.deepEqual(scout.handlers.afterprint, []);

  beforeListener.off();

  t.true(stub.calledOnce);
  t.true(stub.calledWith(BEFORE_PRINT, beforeListener));

  stub.restore();

  t.deepEqual(scout.handlers.beforeprint, []);
});

test.serial('if triggering the events will fire the listeners', (t) => {
  scout.after(afterListener);
  scout.before(beforeListener);

  const beforePrintEvent = GLOBAL_VALUES.createNewEvent(BEFORE_PRINT);

  window.dispatchEvent(beforePrintEvent);

  t.true(beforeListener.calledOnce);
  t.true(beforeListener.calledWith(beforePrintEvent));

  t.true(afterListener.notCalled);

  const afterPrintEvent = GLOBAL_VALUES.createNewEvent(AFTER_PRINT);

  window.dispatchEvent(afterPrintEvent);

  t.true(beforeListener.calledOnce);

  t.true(afterListener.calledOnce);
  t.true(afterListener.calledWith(afterPrintEvent));
});
