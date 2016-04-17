# Changelog

## 0.1.0

### Features

- Testing dates with custom date format:

    ```javascript
    var dateParser = require('date-parser');
    dateParser.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
    dateParser.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
    ```
    
- Matching date with custom date format:

    ```javascript
    var dateParser = require('date-parser');
    var m1 = dateParser.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32");
    // m1: [
    //   '03/12/2016 11:11:32',
    //   '03', '12', '2016',
    //   '11', '11', '32',
    //   index: 0, ...
    // ]
    var m2 = dateParser.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32");
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
    var dateParser = require('date-parser');
    dateParser.test("RRRR, EEEE", "Yesterday, Monday"); // true
    
    dateParser.loadLocale('hu');
    dateParser.test("RRRR, EEEE", "Tegnap, Hétfő"); // true