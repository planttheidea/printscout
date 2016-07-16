import test from 'tape';

import {
  createNewEvent,
  findAndRemoveHandler,
  throwInvalidMethodError,
  throwNotSupportedError
} from '../src/utils';

test('createNewEvent creates a new event', (t) => {
  t.plan(2);

  const event = createNewEvent('test');

  t.is(event.constructor, window.Event);
  t.false(event.isTrusted);
});

test('if findAndRemoveHandler removes item from array', (t) => {
  t.plan(1);

  const handler = () => {};
  const handlers = [handler];
  const updatedHandlers = findAndRemoveHandler(handlers, handler);

  t.deepEqual(updatedHandlers, []);
});

test('if throwInvalidMethodError throws the correct Error', (t) => {
  t.plan(1);

  t.throws(() => {
    throwInvalidMethodError('test');
  }, 'The method "test" is invalid, it needs to be either "after" or "before".');
});

test('if throwNotSupportedError throws the correct Error', (t) => {
  t.plan(1);

  t.throws(() => {
    throwNotSupportedError();
  }, 'Sorry, looks like this browser does not support any print event handlers.');
});