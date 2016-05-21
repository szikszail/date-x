# Changelog

## 0.2.0

- Rewrote the code with ES2015 features

## 0.1.3

### Contribution

- Added test coverage measurement (istanbul)

## 0.1.2

### Features

- Testing dates with custom date format:

    ```javascript
    var dateX = require('date-x');
    dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
    dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
    ```
    
- Matching date with custom date format:

    ```javascript
    var dateX = require('date-x');
    var m1 = dateX.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32");
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
    var dateX = require('date-x');
    dateX.test("RRRR, EEEE", "Yesterday, Monday"); // true
    
    dateX.loadLocale('hu');
    dateX.test("RRRR, EEEE", "Tegnap, Hétfő"); // true
    ```
