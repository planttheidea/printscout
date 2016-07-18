# PrintScout

Simple cross-browser print event listeners with no dependencies

#### Installation

```
$ npm i printscout --save
```

#### Usage

```javascript
// ES2015
import PrintScout from 'printscout';

// CommonJS
const PrintScout = require('printscout');

// script
const PrintScout = window.PrintScout;

// create a new scout
const scout = new PrintScout();

// add listeners in a traditional way
const beforePrintHandler = () => {
  console.log('I fire before print render');
};

scout.addListener('before', beforePrintHandler);

// or you can do it dynamically, the handler you passed is returned when added,
// either with the shorthand methods or the standard ones
const afterPrintHandler = scout.after(() => {
  console.log('I fire after print render');
});

// and remove them as you would any other listener
scout.removeListener('before', beforePrintHandler);

// or with the convenience function attached to the handler returned from adding it
afterPrintHandler.remove();
```

#### API description

**scout.addListener(eventName: string, handler: function)** *returns handler*

Adds the `handler` to the list of handlers that will fire when the specific `eventName` is called. The valid `eventName` values are `beforeprint`, `before` (shorthand for `beforeprint`), `afterprint`, and `after` (shorthand for `afterprint`).

Additionally, the `handler` passed receives an additional `remove` method attached to it, which will remove the listener when called directly.

**scout.removeListener([eventName: string, handler: function])**

Removes the `handler` from the list of handlers that will fire when the specific method is called. If no `handler` is passed, then all handers for a given `method` are removed. If no `method` is passed, then all handlers are removed. The valid `method` values are the same as for *addListener*.

**scout.after(handler: function)** *returns handler*

Shorthand method for *scount.addListener('after', handler);*.

**scout.before(handler: function)** *returns handler*

Shorthand method for *scout.addListener('before', handler);*.

**handler.remove()**

Shorthand method for *scout.removeListener(eventName, handler)*.

#### Browser support

`PrintScout` has been tested on the following browsers:
* Chrome
* Firefox
* Opera
* IE9+
* Edge
* Safari

That said, because internally `PrintScout` leverages the `onbeforeprint` and `onafterprint` functions that are available in IE5.5+, browser support should extend all the way back to IE6 if you shim `addEventListener`, `removeEventListener`, and `dispatchEvent`.
