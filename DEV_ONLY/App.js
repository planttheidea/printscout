import React from 'react';
import {render} from 'react-dom';

import PrintScout from '../src';

const printScout = new PrintScout();

console.log('after (0)', printScout.handlers.afterprint);
console.log('before (0)', printScout.handlers.beforeprint);

const beforeListenerOne = (event) => {
  console.log('before one', event);
};

printScout.on('before', beforeListenerOne);

console.log('after (0)', printScout.handlers.afterprint);
console.log('before (1)', printScout.handlers.beforeprint);

const beforeListenerTwo = printScout.before((event) => {
  console.log('before two', event);
});

console.log('after (0)', printScout.handlers.afterprint);
console.log('before (2)', printScout.handlers.beforeprint);

const afterListenerOne = (event) => {
  console.log('after one', event);
};

printScout.on('after', afterListenerOne);

console.log('after (1)', printScout.handlers.afterprint);
console.log('before (2)', printScout.handlers.beforeprint);

const afterListenerTwo = (event) => {
  console.log('after two', event);
};

printScout.on('afterprint', afterListenerTwo);

console.log('after (2)', printScout.handlers.afterprint);
console.log('before (2)', printScout.handlers.beforeprint);

// printScout.off('beforeprint', beforeListenerOne);

// console.log('after (2)', printScout.handlers.afterprint);
// console.log('before (1)', printScout.handlers.beforeprint);

// printScout.off('after');

// console.log('after (0)', printScout.handlers.afterprint);
// console.log('before (1)', printScout.handlers.beforeprint);

// beforeListenerTwo.off();

// console.log('after (0)', printScout.handlers.afterprint);
// console.log('before (0)', printScout.handlers.beforeprint);

const App = () => {
  return <div>App</div>;
};

const div = document.createElement('div');

div.id = 'app-container';

render(<App />, div);

document.body.appendChild(div);
