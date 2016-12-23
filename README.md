# date-x

[![Build Status](https://travis-ci.org/szikszail/date-x.svg?branch=master)](https://travis-ci.org/szikszail/date-x) [![dependency Status](https://david-dm.org/szikszail/date-x.svg)](https://david-dm.org/szikszail/date-x) [![devDependency Status](https://david-dm.org/szikszail/date-x/dev-status.svg)](https://david-dm.org/szikszail/date-x#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/github/szikszail/date-x/badge.svg?branch=master)](https://coveralls.io/github/szikszail/date-x?branch=master)

It provides the ability to compare date string with custom date format expression.

## Usage

Testing dates with custom date format:

```javascript
'use strict';
const dateX = require('date-x');
dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
```
    
Matching date with custom date format:

```javascript
'use strict';
const dateX = require('date-x');
const m1 = dateX.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32");
// m1: [
//   '03/12/2016 11:11:32',
//   '03', '12', '2016',
//   '11', '11', '32',
//   index: 0, ...
// ]
const m2 = datex.match("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32");
// m2: null
```
    
Support for localized matching.

| Code | Name |
|------|------|
| EN | English (default) |
| HU | Hungarian |
| NL | Dutch |

```javascript
'use strict';
const dateX = require('date-x');
dateX.test("RRRR, EEEE", "Yesterday, Monday"); // true

dateX.loadLocale('hu');
dateX.test("RRRR, EEEE", "Tegnap, Hétfő"); // true
```

## Chai plugin

```javascript
'use strict';
const chai = require('chai');
chai.use(require('date-x/chai'));

chai.expect("03/12/2016 11:11:32").to.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
```


## Supported date formats

It based on [AngularJS date filter](https://docs.angularjs.org/api/ng/filter/date) format tokens.
The module will replace the tokens in the string in given order of the bellow tokens.

| Token | Description | Example (EN) |
|:-----:|-------------|---------|
| `LLLL` | Stand-alone month in year | January-December |
| `MMMM` | Month in year | January-December |
| `MMM` | Month in year | Jan-Dec |
| `MM` | Month in year, by number, padded | 01-12 |
| `M` | Month in year, by number | 1-12 |
| `yyyy` | 4 digit representation of year | AD 1 => 0001, AD 2010 => 2010 |
| `yy` | 2 digit representation of year | 00-99:  AD 2001 => 01, AD 2010 => 10 |
| `y` | 1 digit representation of year | AD 1 => 1, AD 199 => 199 |
| `EEEE` | Day in week | Monday-Sunday |
| `EEE` | Day in week | Mon-Sun |
| `RRRR` | Relative days | Today, Yesterday, Tomorrow |
| `dd` | Day in month, padded | 01-31 |
| `d` | Day in month | 1-31 |
| `ww` | Week of year, padded | 00-53 |
| `w` | Week of year | 0-53 |
| `HH` | Hour in day, padded | 00-23 |
| `H` | Hour in day | 0-23 |
| `hh` | Hour in AM/PM, padded | 01-12 |
| `h` | Hour in AM/PM | 1-12 |
| `mm` | Minute in hour, padded | 00-59 |
| `m` | Minute in hour | 0-59 |
| `sss` | Millisecond in second, padded | 000-999 |
| `ss` | Second in minute, padded | 00-59 |
| `s` | Second in minute | 0-59 |
| `a` | AM/PM marke | AM, PM |
| `Z` | 4 digit (+sign) representation of the timezone offet | -1200 - +1200 |

It also supports predefined localizable formats, like: `short`, `medium`, `fullDate`, `mediumTime`, etc. in all supported locales.