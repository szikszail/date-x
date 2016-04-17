# date-x

[![Build Status](https://travis-ci.org/szikszail/date-x.svg?branch=master)](https://travis-ci.org/szikszail/date-x) [![dependency Status](https://david-dm.org/szikszail/date-x.svg)](https://david-dm.org/szikszail/date-x) [![devDependency Status](https://david-dm.org/szikszail/date-x/dev-status.svg)](https://david-dm.org/szikszail/date-x#info=devDependencies)

It provides the ability to compare date string with custom date format expression.

## Usage

Testing dates with custom date format:

```javascript
var dateX = require('date-x');
dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
```
    
Matching date with custom date format:

```javascript
var dateX = require('date-x');
var m1 = dateX.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32");
// m1: [
//   '03/12/2016 11:11:32',
//   '03', '12', '2016',
//   '11', '11', '32',
//   index: 0, ...
// ]
var m2 = datex.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32");
// m2: null
```
    
Support for localized matching.

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