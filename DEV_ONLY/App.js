import React from 'react';
import {
  render
} from 'react-dom';

import PrintScout from '../src';

const printScout = new PrintScout();

const beforeListenerOne = (e) => {
  console.log('before one', e);
};

printScout.addListener('before', beforeListenerOne);

const beforeListenerTwo = printScout.before((e) => {
  console.log('before two', e);
});

const afterListenerOne = (e) => {
  console.log('after one', e);
};

printScout.addListener('after', afterListenerOne);

const afterListenerTwo = (e) => {
  console.log('after two', e);
};

printScout.addListener('afterprint', afterListenerTwo);

console.log(printScout);

printScout.removeListener('beforeprint', beforeListenerOne);

console.log(printScout);

afterListenerTwo.remove();

console.log(printScout);

console.log(printScout.afterHandlers[0] === afterListenerOne);

printScout.removeListener();

console.log(printScout);

const App = () => {
  return (
    <div>
      App
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);
