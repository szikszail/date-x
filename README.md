# date-x

![Downloads](https://img.shields.io/npm/dw/date-x?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/date-x?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/szikszail/date-x/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/actions/workflow/status/szikszail/date-x/ci.yml?branch=master&label=ci&style=flat-square) ![Docs](https://img.shields.io/github/actions/workflow/status/szikszail/date-x/docs.yml?branch=master&label=docs&style=flat-square)

It provides the ability to compare date string with custom date format expression.

## Usage

Testing dates with custom date format:

```js
import dateX from "date-x";

dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 11:11:32"); // true
dateX.test("dd/MM/yyyy hh:mm:ss", "03/12/2016 20:11:32"); // false
```

Where `test` is: `test(format: string, dateString: string, ignoreCase?: boolean): boolean`

Matching date with custom date format:

```js
import dateX from "date-x";

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

Where `match` is: `match(format: string, dateString: string, ignoreCase?: boolean): RegExpMatchArray`

Support for localized matching.

| Code | Name              |
|------|-------------------|
| EN   | English (default) |
| HU   | Hungarian         |
| NL   | Dutch             |

```js
import dateX from "date-x";

dateX.test("RRRR, EEEE", "Yesterday, Monday"); // true

dateX.loadLocale('hu');
dateX.test("RRRR, EEEE", "Tegnap, Hétfő"); // true
```

Where `loadLocale` is: `loadLocale(local: "en" | "hu" | "nl"): void`

## Assertions

```js
import {
    assertDateFormat,
    asssertNotDateFormat
} from "date-x/assert";

assertDateFormat("03/12/2016 11:11:32", "dd/MM/yyyy hh:mm:ss");
assertNotDateFormat("this is not a date", "yyyy-MM-dd");
```

Where both assertion has the following parameters:

1. `dateString: string` the actual value to check
1. `format: string` the date format to match
1. `options?: DateFormatAssertOptions` the modifiers/options to match:
    - `locale?: "hu" | "en" | "nl"` the locale to use
    - `ignoreCase?: boolean` whether character casing should be ignored

## Chai plugin

```js
import dateX from "date-x";

chai.use(require('date-x/chai'));

chai.expect("03/12/2016 11:11:32").to.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
```

## Date format string

It based on [AngularJS date filter](https://docs.angularjs.org/api/ng/filter/date) format tokens.
The module will replace the tokens in the string in given order of the bellow tokens.

| Token  | Description                                          | Example (EN)                                 |
|:------:|------------------------------------------------------|----------------------------------------------|
| `LLLL` | Stand-alone month in year                            | January-December                             |
| `MMMM` | Month in year                                        | January-December                             |
| `MMM`  | Month in year                                        | Jan-Dec                                      |
|  `MM`  | Month in year, by number, padded                     | 01-12                                        |
|  `M`   | Month in year, by number                             | 1-12                                         |
| `yyyy` | 4 digit representation of year                       | AD 1 => 0001, AD 2010 => 2010                |
|  `yy`  | 2 digit representation of year                       | 00-99:  AD 2001 => 01, AD 2010 => 10         |
|  `y`   | 1 digit representation of year                       | AD 1 => 1, AD 199 => 199                     |
|  `Q`   | Quarter in year                                      | 1, 2, 3, 4                                   |
| `EEEE` | Day in week                                          | Monday-Sunday                                |
| `EEE`  | Day in week                                          | Mon-Sun                                      |
| `RRRR` | Relative days                                        | Today, Yesterday, Tomorrow                   |
|  `dd`  | Day in month, padded                                 | 01-31                                        |
|  `d`   | Day in month                                         | 1-31                                         |
|  `Do`  | Day in month with ordinal                            | 1st, 2nd, 3rd, ...                           |
|  `WW`  | Week of year, padded                                 | 01-53                                        |
|  `W`   | Week of year                                         | 1-53                                         |
|  `ww`  | Week of year, padded                                 | 01-53                                        |
|  `wo`  | Week of year with ordinal                            | 1st, 2nd, 3rd, ...                           |
|  `w`   | Week of year                                         | 1-53                                         |
| `GGGG` | Stand-alone week of year                             | 1-53                                         |
| `gggg` | Week of year                                         | 1-53                                         |
|  `HH`  | Hour in day, padded                                  | 00-23                                        |
|  `H`   | Hour in day                                          | 0-23                                         |
|  `hh`  | Hour in AM/PM, padded                                | 01-12                                        |
|  `h`   | Hour in AM/PM                                        | 1-12                                         |
|  `kk`  | Hour in day, padded                                  | 01-24                                        |
|  `k`   | Hour in day                                          | 1-24                                         |
|  `mm`  | Minute in hour, padded                               | 00-59                                        |
|  `m`   | Minute in hour                                       | 0-59                                         |
| `sss`  | Millisecond in second, padded                        | 000-999                                      |
|  `ss`  | Second in minute, padded                             | 00-59                                        |
|  `s`   | Second in minute                                     | 0-59                                         |
|  `X`   | Unix timestamp                                       | 1360013296                                   |
|  `x`   | Unix timestamp (milliseconds)                        | 1360013296123                                |
|  `a`   | AM/PM mark                                           | AM, PM                                       |
|  `Z`   | 4 digit (+sign) representation of the timezone offet | -1200 - +1200                                |
| `zzz`  | Timezone abbreviation                                | Eastern Standard Time, Pacific Daylight Time |
|  `zz`  | Timezone abbreviation                                | EST, MDT                                     |

It also supports predefined localizable formats, like: `short` , `medium` , `fullDate` , `mediumTime` , etc. in all
supported locales.

## Important

Using the above-listed tokens as normal characters can be done with using the `!` character in fron of a character. For
example to set an `a` in the format, use it as `!a`, so that it won't match for AM/PM.

If you would like to set a `!` character in the format, use the `!!`.

In case of characters what are not listed in the format tokens, no need to use the `!`.
