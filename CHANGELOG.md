# Changelog

## 2.0.0

- Refactor to use TypeScript
- Dependency updates

## 1.2.0

- Added `buildRegExp` function to create RegExp from date format string
- Added additional date formats: https://day.js.org/docs/en/plugin/advanced-format

## v1.1.0

- Added general assertions
- Added `d.ts` files
- Added option to set string literals in date format

## v1.0.0

- Updated dependencies

## v0.3.0

- [#2](https://github.com/szikszail/date-x/issues/2) Make plugin for chai

## v0.2.0

- Rewrote the code with ES2015 features

## v0.1.3

### Contribution

- Added test coverage measurement (istanbul)

## v0.1.2

### Features

- Testing dates with custom date format:

    ```javascript
    const dateX = require('date-x');
    dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
    dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
    ```

- Matching date with custom date format:

    ```javascript
    const dateX = require('date-x');
    const m1 = dateX.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32");
    // m1: [
    //   '03/12/2016 11:11:32',
    //   '03', '12', '2016',
    //   '11', '11', '32',
    //   index: 0, ...
    // ]
    var m2 = dateX.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32");
    // m2: null
    ```

- Completed date format tokens with **RRRR** to match for relative day markers, like: yesterday, today, tomorrow.
- Support for localized matching.

  | Code | Name |
    |------|------|
  | EN | English (default) |
  | HU | Hungarian |
  | NL | Dutch |

    ```javascript
    const dateX = require('date-x');
    dateX.test("RRRR, EEEE", "Yesterday, Monday"); // true
    
    dateX.loadLocale('hu');
    dateX.test("RRRR, EEEE", "Tegnap, Hétfő"); // true
    ```
