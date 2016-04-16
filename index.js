var dateFormat = require('./format');

var DateParser = function () {
    
};

DateParser.prototype.test = function (format, dateString) {
    var formatRegExp = new RegExp(dateFormat.buildRegExpStringByFormat(format));
    return formatRegExp.test(dateString);
};

DateParser.prototype.match = function (format, dateString) {
    var formatRegExp = new RegExp(dateFormat.buildRegExpStringByFormat(format, true));
    console.log(formatRegExp);
    return dateString.match(formatRegExp);
};

module.exports = new DateParser();