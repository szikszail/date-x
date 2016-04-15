describe("date-parser, formats", function () {
    var formats;

    beforeEach(function () {
        formats = require('../format');
    });
    
    describe("_groupRegExpString()", function () {
        it("should group with not matching group", function () {
            expect(formats._groupRegExpString('string')).toEqual('(?:string)');
        });

        it("should group with matching group", function () {
            expect(formats._groupRegExpString('string', true)).toEqual('(string)');
        });

        it("should not group if prohibited", function () {
            expect(formats._groupRegExpString('string', false)).toEqual('string');
        });
    });

    describe("buildReqExpStringByFormat()", function () {
        it("should replace all possible tokens", function () {
            var format = Object.keys(formats.tokenRegExps).join(':');
            var expected = Object.keys(formats.tokenRegExps).map(function (token) {
                return '(?:' + formats.tokenRegExps[token] + ')';
            }).join(':');

            expect(formats.buildReqExpStringByFormat(format)).toEqual(expected);
        });
    });

    describe("buildLocaleRegExpStringByFormat()", function () {
        it("should replace all possible locale tokens", function () {
            var format = Object.keys(formats.localizeReqExps).join(':');
            var expected = formats._replaceTokens(Object.keys(formats.localizeReqExps).map(function (token) {
                return formats.localizeReqExps[token];
            }).join(':'));

            expect(formats.buildLocaleRegExpStringByFormat(format)).toEqual(expected);
        });
    });
});
