# PrintScout

Simple, cross-browser print event listeners (before and after) with no dependencies

## Table of contents

* [Usage](#usage)
* [API](#api)
  * [on](#on)
  * [off](#off)
  * [after](#after)
  * [before](#before)
* [Browser support](#browser-support)
* [Development](#development)

## Usage

```javascript
// ES2015
import PrintScout from 'printscout';

// CommonJS
const PrintScout = require('printscout').default;

// script
const PrintScout = window.PrintScout;

// create a new scout
const scout = new PrintScout();

// add listeners in a traditional way
const beforePrintHandler = () => {
  console.log('I fire before print render');
};

scout.on('beforeprint', beforePrintHandler);

// or you can do it dynamically, the handler you passed is returned when added,
// either with the shorthand methods or the standard ones
const afterPrintHandler = scout.after(() => {
  console.log('I fire after print render');
});

// and remove them as you would any other listener
scout.off('beforeprint', beforePrintHandler);

// or with the convenience function attached to the handler returned from adding it
afterPrintHandler.off();
```

## API

#### on

`scout.on(eventName: string, handler: function): function`

Adds the `handler` to the list of handlers that will fire when the specific `eventName` is called. The valid `eventName` values are `beforeprint`, `before` (shorthand for `beforeprint`), `afterprint`, and `after` (shorthand for `afterprint`).

```javascript
const scout = new PrintScout();

const handler = scout.on('afterprint', event => console.log(event));
```

Additionally, the `handler` passed receives an additional `off` method attached to it, which will remove the listener when called directly.

```javascript
handler.off(); // will no longer log the event
```

#### off

`scout.off([eventName: string[, handler: function]]): void`

Removes the `handler` from the list of handlers that will fire when the specific `eventName` is dispatched. If no `handler` is passed, then all handlers for a given `eventName` are removed. If no `eventName` is passed, then all handlers are removed. The valid `eventName` values are the same as for [on](#on).

```javascript
const scout = new PrintScout();

const handler = scout.on('beforeprint', console.log('about to print...'));
...
scout.off('beforeprint', handler);
```

#### after

`scout.after(handler: function): function`

Shorthand method for [on](#on) with the `eventName` set to `afterprint`. Like `on`, returns the `handler` passed.

```javascript
const scout = new PrintScout();

const handler = scout.after(event => console.log(event));
```

#### before

`scout.before(handler: function): function`

Shorthand method for [on](#on) with the `eventName` set to `beforeprint`. Like `on`, returns the `handler` passed.

```javascript
const scout = new PrintScout();

const handler = scout.before(event => console.log(event));
```

## Browser support

* Chrome (all versions)
* Firefox (all versions)
* Edge (all versions)
* Opera 15+
* IE 9+
* Safari 6+
* iOS 8+
* Android 4+

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

* `build` => run webpack to build development `dist` file with NODE_ENV=development
* `build:minified` => run webpack to build production `dist` file with NODE_ENV=production
* `dev` => run webpack dev server to run example app / playground
* `dist` => runs `build` and `build-minified`
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `compile-for-publish`
* `prepublish:compile` => run `lint`, `test:coverage`, `transpile:es`, `transpile:lib`, `dist`
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:coverage` => run `test` but with `nyc` for coverage checker
* `test:watch` => run `test`, but with persistent watcher
* `transpile:lib` => run babel against all files in `src` to create files in `lib`
* `transpile:es` => run babel against all files in `src` to create files in `es`, preserving ES2015 modules (for
  [`pkg.module`](https://github.com/rollup/rollup/wiki/pkg.module))
