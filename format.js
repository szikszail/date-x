var MONTHS = [
    'january', 'february', 'march',
    'april', 'may', 'june', 'july',
    'august', 'september', 'october',
    'november', 'december'
];

var MONTHS_SHORT = [
    'jan', 'feb', 'mar', 'apr', 'may',
    'jun', 'jul', 'aug', 'sep', 'oct',
    'nov', 'dec'
];

var DAYS = [
    'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday',
    'sunday'
];

var DAYS_SHORT = [
    'mon', 'tue', 'wed', 'thu',
    'fri', 'sat', 'sun'
];

function ucfirst(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
}

var DateRegExpBuilder = function () {
    /**
     * Based on AngularJS date format.
     * https://docs.angularjs.org/api/ng/filter/date
     *
     * @type {Object}
     */
    this.tokenRegExps = {
        // Months
        LLLL: MONTHS.map(ucfirst).join('|'),
        MMMM: MONTHS.map(ucfirst).join('|'),
        MMM: MONTHS_SHORT.map(ucfirst).join('|'),
        MM: '0[1-9]|1[0-2]',
        M: '[1-9]|1[0-2]',

        // Years
        yyyy: '[12][0-9]{3}',
        yy: '[0-9]{2}',
        y: '[0-9]',

        // Day of week
        EEEE: DAYS.map(ucfirst).join('|'),
        EEE: DAYS_SHORT.map(ucfirst).join('|'),

        // Day of month
        dd: '0[1-9]|[12][0-9]|3[01]',
        d: '[1-9]|[12][0-9]|3[01]',

        // Week of year
        ww: '[0-4][0-9]|5[0-3]',
        w: '[0-9]|[1-4][0-9]|5[0-3]',

        // Hours in day
        HH: '[01][0-9]|2[0-3]',
        H: '[0-9]|1[0-9]|2[0-3]',
        hh: '0[1-9]|1[0-2]',
        h: '[1-9]|1[0-2]',

        // Minutes in hour
        mm: '[0-5][0-9]',
        m: '[1-9]|[1-5][0-9]',

        // Milliseconds
        sss: '[0-9]{3}',

        // Seconds in minutes
        ss: '[0-5][0-9]',
        s: '[1-9]|[1-5][0-9]',

        // AP/PM
        a: '[aApP][mM]',

        // Timezone offset
        Z: '[+-](?:0[1-9]|1[0-2]):?00'
    };

    this.allFormatRexExp =
        '('
        + Object.keys(this.tokenRegExps).map(function (token) {
            return '(?:' + token + ')';
        }).join('|')
        + ')';

    this.localizeReqExps = {
        shortTime: 'h:mm a',
        mediumTime: 'h:mm:ss a',
        shortDate: 'M/d/yy',
        mediumDate: 'MMM d, y',
        longDate: 'MMMM d, y',
        fullDate: 'EEEE, MMMM d, y',
        short: 'M/d/yy h:mm a',
        medium: 'MMM d, y hh:mm:ss a'
    };
};

DateRegExpBuilder.prototype._groupRegExpString = function (regExpString, shouldGroup) {
    if (shouldGroup === false) {
        return regExpString;
    }
    if (shouldGroup === true) {
        return '(' + regExpString + ')';
    }
    return '(?:' + regExpString + ')';
};

DateRegExpBuilder.prototype._replaceTokens = function (formatString, shouldGroup) {
    var allFormatRexExp = new RegExp(this.allFormatRexExp, 'g');
    var match, regExpString;
    while ((match = allFormatRexExp.exec(formatString)) !== null) {
        regExpString = this._groupRegExpString(this.tokenRegExps[match[1]], shouldGroup);
        formatString =
            formatString.substring(0, match.index)
            + regExpString
            + formatString.substring(match.index + match[1].length);
        allFormatRexExp.lastIndex = match.index + regExpString.length;
    }
    return formatString;
};

DateRegExpBuilder.prototype.buildRegExpStringByFormat = function (format, shouldGroup) {
    return "^" + this._replaceTokens(format, shouldGroup) + "$";
};

DateRegExpBuilder.prototype.buildLocaleRegExpStringByFormat = function (format, shouldGroup) {
    var self = this;
    Object.keys(this.localizeReqExps).forEach(function (token) {
        format = format.replace(token, self.localizeReqExps[token]);
    });
    return this.buildRegExpStringByFormat(format, shouldGroup);
};

module.exports = new DateRegExpBuilder();