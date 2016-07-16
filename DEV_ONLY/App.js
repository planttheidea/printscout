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

const beforeListenerTwo = (e) => {
  console.log('before two', e);
};

printScout.addListener('before', beforeListenerTwo);

const afterListenerOne = (e) => {
  console.log('after one', e);
};

printScout.addListener('after', afterListenerOne);

const afterListenerTwo = (e) => {
  console.log('after two', e);
};

printScout.addListener('after', afterListenerTwo);

console.log(printScout);

printScout.removeListener('before', beforeListenerOne);

console.log(printScout);

// printScout.removeListener();
//
// console.log(printScout);

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
