'use strict';

const DateFormat = require('./format');
/**
 * It provides the ability to compare date string with
 * custom date format expression.
 *
 * @author László Szikszai <sziklaszlo@gmail.com>
 * @constructor
 */
class DateParser {
    constructor() {
        this.loadLocale('en');
    }

    /**
     * Loads the specific configuration for the given locale.
     * It contains the month and day names and locale specific
     * date format, like: shortDate, etc.
     *
     * @param {string} locale The locale needs to be loaded in two-digits format.
     */
    loadLocale(locale) {
        this.dateFormat = new DateFormat(locale);
    }

    /**
     * It tests whether the given dateString matches
     * the given date format. The test is case sensitive, be default,
     * but with ignoraCase parameter it could be set to case insensitive.
     *
     * @param {string} format The date format needs to be checked against.
     * @param {string} dateString The date string needs to be fixed.
     * @param {boolean} [ignoreCase] Should the test executed in case sensitive or not.
     * @returns {boolean} True if the dateString matches the given format.
     */
    test(format, dateString, ignoreCase) {
        let formatRegExp = new RegExp(
            this.dateFormat.buildRegExpStringByFormat(format),
            !!ignoreCase ? 'i' : undefined
        );
        return formatRegExp.test(dateString);
    }

    /**
     * It tests whether the given dateString matches
     * the given date format and returns the matched parts of the dateString.
     * The test is case sensitive, be default, but with ignoraCase parameter
     * it could be set to case insensitive.
     *
     * @param {string} format The date format needs to be checked against.
     * @param {string} dateString The date string needs to be fixed.
     * @param {boolean} [ignoreCase] Should the test executed in case sensitive or not.
     * @returns {Array.<string>|null} The matched groups or null if it doesn't match.
     */
    match(format, dateString, ignoreCase) {
        let formatRegExp = new RegExp(
            this.dateFormat.buildRegExpStringByFormat(format, true),
            !!ignoreCase ? 'i' : undefined
        );
        return dateString.match(formatRegExp);
    }
};
module.exports = new DateParser();
