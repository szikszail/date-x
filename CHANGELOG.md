# Changelog

## 0.1.0

### Features

- Testing dates with custom date format:

    ```javascript
    var dateParser = require('date-parser');
    dateParser.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
    dateParser.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
    ```