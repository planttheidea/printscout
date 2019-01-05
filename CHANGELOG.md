# PrintScout changelog

## 2.0.3

- Fix security issue with old version of `webpack-dev-server`

## 2.0.2

- Prevent determination of support until runtime with window (better SSR support)

## 2.0.1

- `console.log` no print event support rather than `throw new Error`

## 2.0.0

- Rewritten for speed, testability, and smaller footprint

#### BREAKING CHANGES

- `addListener` has been renamed to `on`
- `removeListener` has been renamed to `off`
- CommonJS imports now require that you specify the `default` property (See [README](README.md#usage))
- Test for `new Event()` support happens at instantiation instead of runtime
  - If you are polyfilling this browser feature, you should polyfill prior to importing `printscout`

## 1.1.4

- Code improvements and cleanup

## 1.1.3

- Small changes to allow IE9 support (tested)

## 1.1.1

- README updates

## 1.1.0

- Add shorthand methods for adding / removing listeners

## 1.0.1

- Do not reuse event (create new event with each dispatch)

## 1.0.0

- Initial release
