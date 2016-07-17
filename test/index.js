import test from 'tape';
import sinon from 'sinon';

import './utils';

import PrintScout from '../src/index';

const printScout = new PrintScout();

test('if printScout has the correct setup', (t) => {
  t.plan(3);

  t.is(printScout.constructor, PrintScout);
  t.deepEqual(printScout.afterHandlers, []);
  t.deepEqual(printScout.beforeHandlers, []);
});

const afterListener = sinon.stub();
const beforeListener = sinon.stub();

test('if addListener adds the correct listener', (t) => {
  t.plan(2);

  printScout.addListener('after', afterListener);
  printScout.addListener('afterprint', afterListener);

  t.deepEqual(printScout.afterHandlers, [afterListener, afterListener]);

  printScout.addListener('before', beforeListener);
  printScout.addListener('beforeprint', beforeListener);

  t.deepEqual(printScout.beforeHandlers, [beforeListener, beforeListener]);
});

test('if removeListener removes the correct listener', (t) => {
  t.plan(4);

  printScout.removeListener('after', afterListener);

  t.deepEqual(printScout.afterHandlers, [afterListener]);

  printScout.removeListener('before', beforeListener);

  t.deepEqual(printScout.beforeHandlers, [beforeListener]);

  printScout.removeListener('after');

  t.deepEqual(printScout, {
    afterHandlers: [],
    beforeHandlers: [beforeListener]
  });

  printScout.removeListener();

  t.deepEqual(printScout, {
    afterHandlers: [],
    beforeHandlers: []
  });
});

test('if after and before convenience functions add listeners', (t) => {
  t.plan(1);

  printScout.after(afterListener);
  printScout.before(beforeListener);

  t.deepEqual(printScout, {
    afterHandlers: [afterListener],
    beforeHandlers: [beforeListener]
  });
});

test('if remove functions added to listeners will remove them from the list of handlers', (t) => {
  t.plan(1);

  afterListener.remove();
  beforeListener.remove();

  t.deepEqual(printScout, {
    afterHandlers: [],
    beforeHandlers: []
  });
});

test('if triggering beforeprint and afterprint will fire listeners', (t) => {
  t.plan(2);

  printScout.addListener('after', afterListener);
  printScout.addListener('before', beforeListener);

  window.dispatchEvent(new Event('beforeprint'));
  window.dispatchEvent(new Event('afterprint'));

  t.true(afterListener.calledOnce);
  t.true(beforeListener.calledOnce);
});