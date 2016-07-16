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

  t.deepEqual(printScout.afterHandlers, [afterListener]);

  printScout.addListener('before', beforeListener);

  t.deepEqual(printScout.beforeHandlers, [beforeListener]);
});

test('if removeListener adds the correct listener', (t) => {
  t.plan(2);

  printScout.removeListener('after', afterListener);

  t.deepEqual(printScout.afterHandlers, []);

  printScout.removeListener('before', beforeListener);

  t.deepEqual(printScout.beforeHandlers, []);
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