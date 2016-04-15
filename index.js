var dateFormat = require('./format');

var DateParser = function () {
    
};

DateParser.prototype.matchDateFormat = function (format, dateString) {
    var formatRegExp = new RegExp(dateFormat.buildReqExpStringByFormat(format));
    return formatRegExp.test(dateString);
};

module.exports = new DateParser();