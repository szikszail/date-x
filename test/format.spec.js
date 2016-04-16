var expect = require('chai').expect;

describe("date-parser, formats", function () {
    var formats;

    beforeEach(function () {
        formats = require('../format');
    });

    function getRegExp(format) {
        return new RegExp(formats.buildRegExpStringByFormat(format));
    }

    describe("tokenRegExps", function () {
        describe("months", function () {
            it("(LLLL) should match to full month names", function () {
                var regExp = getRegExp("LLLL");
                expect(regExp.test("January")).to.be.true;
                expect(regExp.test("january")).to.be.false;
                expect(regExp.test("Január")).to.be.false;
            });

            it("(MMMM) should match to full month names", function () {
                var regExp = getRegExp("MMMM");
                expect(regExp.test("January")).to.be.true;
                expect(regExp.test("january")).to.be.false;
                expect(regExp.test("Január")).to.be.false;
            });

            it("(MMM) should match to short month names", function () {
                var regExp = getRegExp("MMM");
                expect(regExp.test("Jan")).to.be.true;
                expect(regExp.test("jan")).to.be.false;
                expect(regExp.test("01")).to.be.false;
            });

            it("(MM) should match to padded month numbers", function () {
                var regExp = getRegExp("MM");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("10")).to.be.true;
                expect(regExp.test("12")).to.be.true;
                expect(regExp.test("13")).to.be.false;
            });

            it("(M) should match to normal month numbers", function () {
                var regExp = getRegExp("M");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("10")).to.be.true;
                expect(regExp.test("12")).to.be.true;
                expect(regExp.test("13")).to.be.false;
            });
        });

        describe("years", function () {
            it("(yyyy) should match to full years", function () {
                var regExp = getRegExp("yyyy");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("11")).to.be.false;
                expect(regExp.test("222")).to.be.false;
                expect(regExp.test("1986")).to.be.true;
                expect(regExp.test("2016")).to.be.true;
                expect(regExp.test("3333")).to.be.false;
                expect(regExp.test("44444")).to.be.false;
            });

            it("(yy) should match to two digit years", function () {
                var regExp = getRegExp("yy");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("11")).to.be.true;
                expect(regExp.test("86")).to.be.true;
                expect(regExp.test("222")).to.be.false;
                expect(regExp.test("3333")).to.be.false;
            });

            it("(y) should match to one digit years", function () {
                var regExp = getRegExp("y");
                expect(regExp.test("0")).to.be.true;
                expect(regExp.test("11")).to.be.false;
                expect(regExp.test("222")).to.be.false;
                expect(regExp.test("3333")).to.be.false;
            });
        });
    });
    
    describe("_groupRegExpString()", function () {
        it("should group with not matching group", function () {
            expect(formats._groupRegExpString('string')).to.equal('(?:string)');
        });

        it("should group with matching group", function () {
            expect(formats._groupRegExpString('string', true)).to.equal('(string)');
        });

        it("should not group if prohibited", function () {
            expect(formats._groupRegExpString('string', false)).to.equal('string');
        });
    });

    describe("buildRegExpStringByFormat()", function () {
        it("should replace all possible tokens", function () {
            var format = Object.keys(formats.tokenRegExps).join(':');
            var expected = "^" + Object.keys(formats.tokenRegExps).map(function (token) {
                return '(?:' + formats.tokenRegExps[token] + ')';
            }).join(':') + "$";

            expect(formats.buildRegExpStringByFormat(format)).to.equal(expected);
        });
    });

    describe("buildLocaleRegExpStringByFormat()", function () {
        it("should replace all possible locale tokens", function () {
            var format = Object.keys(formats.localizeReqExps).join(':');
            var expected = "^" + formats._replaceTokens(Object.keys(formats.localizeReqExps).map(function (token) {
                return formats.localizeReqExps[token];
            }).join(':')) + "$";

            expect(formats.buildLocaleRegExpStringByFormat(format)).to.equal(expected);
        });
    });
});
