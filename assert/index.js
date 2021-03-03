const dateX = require("../lib");

const DEFAULT_LOCALE = "en";

class DateFormatAssertionError extends Error { }

const error = (shouldMatch, dateString, format, locale, ignoreCase) => {
    let message = [`Expected "${dateString}"`];
    if (ignoreCase) {
        message.push("ignoring casing");
    }
    message.push(`in locale ${locale.toUpperCase()}`, "to");
    if (!shouldMatch) {
        message.push("not");
    }
    message.push(
        `match "${format}", but it`,
        shouldMatch ? "does not!" : "does!"
    );
    return new DateFormatAssertionError(message.join(" "));
}

const assert = (shouldMatch, dateString, format, { locale = DEFAULT_LOCALE, ignoreCase = false } = {}) => {
    console.log({ shouldMatch, dateString, format, locale, ignoreCase });
    if (!dateString) {
        throw new TypeError("Date string is not set!");
    }
    if (!format) {
        throw new TypeError("Date format is not set!");
    }
    dateX.loadLocale(locale);
    if (dateX.test(format, dateString, ignoreCase) !== shouldMatch) {
        throw error(shouldMatch, dateString, format, locale, ignoreCase);
    }
};

const assertDateFormat = assert.bind(null, true);
const assertNotDateFormat = assert.bind(null, false);

module.exports = { assertNotDateFormat, assertDateFormat, DateFormatAssertionError };