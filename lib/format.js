'use strict';

class DateRegExpBuilder {
    constructor(locale) {
        function ucfirst(str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
        }

        this.locale = (locale || 'en').toLowerCase();
        try {
            this.localeConfig = require('./locales/' + this.locale);
        } catch (e) {
            throw new Error(`There is no locale: ${this.locale}!`);
        }
        
        /**
         * Based on AngularJS date format.
         * https://docs.angularjs.org/api/ng/filter/date
         *
         * @type {Object}
         */
        this.tokenRegExps = {
            // Months
            LLLL: this.localeConfig.months.map(ucfirst).join('|'),
            MMMM: this.localeConfig.months.map(ucfirst).join('|'),
            MMM: this.localeConfig.monthsShort.map(ucfirst).join('|'),
            MM: '0[1-9]|1[0-2]',
            M: '[1-9]|1[0-2]',

            // Years
            yyyy: '[12][0-9]{3}',
            yy: '[0-9]{2}',
            y: '[1-9][0-9]?[0-9]?[0-9]?',

            // Day of week
            EEEE: this.localeConfig.daysOfWeek.map(ucfirst).join('|'),
            EEE: this.localeConfig.daysOfWeekShort.map(ucfirst).join('|'),
            
            // Relative day
            RRRR: this.localeConfig.relativeDays.map(ucfirst).join('|'),

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
            m: '[1-5]?[0-9]',

            // Milliseconds
            sss: '[0-9]{3}',

            // Seconds in minutes
            ss: '[0-5][0-9]',
            s: '[1-5]?[0-9]',

            // AP/PM
            a: '[aApP][mM]',

            // Timezone offset
            Z: '[+-](?:0[0-9]|1[0-2]):?00'
        };

        this.allFormatRexExp = '(' + Object.keys(this.tokenRegExps).map(token => `(?:${token})`).join('|') + ')';
        this.localizeReqExps = this.localeConfig.localeTokens;
    }

    buildRegExpStringByFormat(format, shouldGroup) {
        return `^${this._replaceTokens(format, shouldGroup)}$`;
    }

    buildLocaleRegExpStringByFormat(format, shouldGroup) {
        Object.keys(this.localizeReqExps).forEach(
            token => format = format.replace(token, this.localizeReqExps[token])
        );
        return this.buildRegExpStringByFormat(format, shouldGroup);
    }
    
    _groupRegExpString(regExpString, shouldGroup) {
        if (shouldGroup === false) {
            return regExpString;
        }
        if (shouldGroup === true) {
            return `(${regExpString})`;
        }
        return `(?:${regExpString})`;
    }

    _replaceTokens(formatString, shouldGroup) {
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
    }
};

module.exports = DateRegExpBuilder;
