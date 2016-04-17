var DateFormat = require('./lib/format');

var DateParser = function () {
    this.loadLocale('en');
};

DateParser.prototype.loadLocale = function (locale) {
    this.dateFormat = new DateFormat(locale);
};

DateParser.prototype.test = function (format, dateString) {
    var formatRegExp = new RegExp(this.dateFormat.buildRegExpStringByFormat(format));
    return formatRegExp.test(dateString);
};

DateParser.prototype.match = function (format, dateString) {
    var formatRegExp = new RegExp(this.dateFormat.buildRegExpStringByFormat(format, true));
    return dateString.match(formatRegExp);
};

module.exports = new DateParser();