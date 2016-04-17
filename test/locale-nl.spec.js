var expect = require('chai').expect;
var DateFormat = require('../lib/format');

describe("date-parser, locale NL", function () {
    var formats;

    beforeEach(function () {
        formats = new DateFormat('nl');
    });

    function getRegExp(format) {
        return new RegExp(formats.buildLocaleRegExpStringByFormat(format));
    }

    describe("localizeRegExps", function () {            
        it("(shortTime) should match to short time format, e.g.: 03:45", function () {
            var regExp = getRegExp("shortTime");
            expect(regExp.test("03:45")).to.be.true;
            expect(regExp.test("03:45 am")).to.be.false;
            expect(regExp.test("03:45:24")).to.be.false;
        });

        it("(mediumTime) should match to medium time format, e.g.: 03:45:23", function () {
            var regExp = getRegExp("mediumTime");
            expect(regExp.test("03:45")).to.be.false;
            expect(regExp.test("03:45 am")).to.be.false;
            expect(regExp.test("03:45:23")).to.be.true;
            expect(regExp.test("03:45:23 am")).to.be.false;
        });

        it("(shortDate) should match to short date format, e.g.: 03-02-2016", function () {
            var regExp = getRegExp("shortDate");
            expect(regExp.test("03-02-2016")).to.be.true;
            expect(regExp.test("3-2-2016")).to.be.false;
        });

        it("(mediumDate) should match to medium date format, e.g.: 02 Jan 2016", function () {
            var regExp = getRegExp("mediumDate");
            expect(regExp.test("02 Jan 2016")).to.be.true;
            expect(regExp.test("02 Januari 2016")).to.be.false;
        });

        it("(longDate) should match to long date format, e.g.: 02 Januari 2016", function () {
            var regExp = getRegExp("longDate");
            expect(regExp.test("02 Jan 2016")).to.be.false;
            expect(regExp.test("02 Januari 2016")).to.be.true;
        });

        it("(fullDate) should match to full date format, e.g.: Maandag 02 Januari 2016", function () {
            var regExp = getRegExp("fullDate");
            expect(regExp.test("Maandag 02 Januari 2016")).to.be.true;
            expect(regExp.test("Ma 02 Januari 2016")).to.be.false;
        });

        it("(short) should match to short date time format, e.g.: 02-03-2016 03:45", function () {
            var regExp = getRegExp("short");
            expect(regExp.test("02-03-2016 03:45")).to.be.true;
            expect(regExp.test("02-03-2016 03:45:52")).to.be.false;
        });

        it("(medium) should match to medium date time format, e.g.: 02 Jan 2016 03:45:52", function () {
            var regExp = getRegExp("medium");
            expect(regExp.test("02-03-2016 03:45")).to.be.false;
            expect(regExp.test("02 Jan 2016 03:45:52")).to.be.true;
        });
    });

    describe("tokenRegExps", function () {
        describe("months", function () {
            it("(LLLL) should match to full month names", function () {
                var regExp = getRegExp("LLLL");
                expect(regExp.test("Januari")).to.be.true;
                expect(regExp.test("januari")).to.be.false;
                expect(regExp.test("January")).to.be.false;
            });

            it("(MMMM) should match to full month names", function () {
                var regExp = getRegExp("MMMM");
                expect(regExp.test("Januari")).to.be.true;
                expect(regExp.test("januari")).to.be.false;
                expect(regExp.test("January")).to.be.false;
            });

            it("(MMM) should match to short month names", function () {
                var regExp = getRegExp("MMM");
                expect(regExp.test("Jan")).to.be.true;
                expect(regExp.test("jan")).to.be.false;
                expect(regExp.test("01")).to.be.false;
            });
        });
        
        describe("days", function () {
            it("(EEEE) should match to full day names", function () {
                var regExp = getRegExp("EEEE");
                expect(regExp.test("Maandag")).to.be.true;
                expect(regExp.test("maandag")).to.be.false;
                expect(regExp.test("Monday")).to.be.false; 
            });

            it("(EEE) should match to short day names", function () {
                var regExp = getRegExp("EEE");
                expect(regExp.test("Ma")).to.be.true;
                expect(regExp.test("ma")).to.be.false;
                expect(regExp.test("Mon")).to.be.false;
                expect(regExp.test("hét")).to.be.false;
            });
            
            it("(RRRR) should match to relative day names", function () {
                var regExp = getRegExp("RRRR");
                expect(regExp.test("Gisteren")).to.be.true;
                expect(regExp.test("gisteren")).to.be.false;
                expect(regExp.test("Yesterday")).to.be.false; 
            });
        });
    });
});