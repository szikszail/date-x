var expect = require('chai').expect;
var DateFormat = require('../lib/format');

describe("date-parser, locale HU", function () {
    var formats;

    beforeEach(function () {
        formats = new DateFormat('hu');
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

        it("(shortDate) should match to short date format, e.g.: 2016. 2. 3.", function () {
            var regExp = getRegExp("shortDate");
            expect(regExp.test("2016. 2. 3.")).to.be.true;
            expect(regExp.test("2016. 02. 03.")).to.be.false;
        });

        it("(mediumDate) should match to medium date format, e.g.: 2016. Jan. 2.", function () {
            var regExp = getRegExp("mediumDate");
            expect(regExp.test("2016. Jan. 2.")).to.be.true;
            expect(regExp.test("2016. Január 2.")).to.be.false;
        });

        it("(longDate) should match to long date format, e.g.: 2016. Január 2.", function () {
            var regExp = getRegExp("longDate");
            expect(regExp.test("2016. Január 2.")).to.be.true;
            expect(regExp.test("2016. Jan. 2.")).to.be.false;
        });

        it("(fullDate) should match to full date format, e.g.: 2016. Január 2., Hétfő", function () {
            var regExp = getRegExp("fullDate");
            expect(regExp.test("2016. Január 2., Hétfő")).to.be.true;
            expect(regExp.test("2016. Jan. 2. Hét.")).to.be.false;
        });

        it("(short) should match to short date time format, e.g.: 2016. 2. 3. 03:45", function () {
            var regExp = getRegExp("short");
            expect(regExp.test("2016. 2. 3. 03:45")).to.be.true;
            expect(regExp.test("2016. 02. 03. 03:45:52")).to.be.false;
        });

        it("(medium) should match to medium date time format, e.g.: 2016. Jan. 3. 03:45:23", function () {
            var regExp = getRegExp("medium");
            expect(regExp.test("2016. Jan. 3. 03:45:23")).to.be.true;
            expect(regExp.test("2016. Január 3. 3:45:23")).to.be.false;
        });
    });

    describe("tokenRegExps", function () {
        describe("months", function () {
            it("(LLLL) should match to full month names", function () {
                var regExp = getRegExp("LLLL");
                expect(regExp.test("Január")).to.be.true;
                expect(regExp.test("január")).to.be.false;
                expect(regExp.test("January")).to.be.false;
            });

            it("(MMMM) should match to full month names", function () {
                var regExp = getRegExp("MMMM");
                expect(regExp.test("Január")).to.be.true;
                expect(regExp.test("január")).to.be.false;
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
                expect(regExp.test("Hétfő")).to.be.true;
                expect(regExp.test("hétfő")).to.be.false;
                expect(regExp.test("Monday")).to.be.false; 
            });

            it("(EEE) should match to short day names", function () {
                var regExp = getRegExp("EEE");
                expect(regExp.test("H")).to.be.true;
                expect(regExp.test("h")).to.be.false;
                expect(regExp.test("Mon")).to.be.false;
                expect(regExp.test("hét")).to.be.false;
            });
            
            it("(RRRR) should match to relative day names", function () {
                var regExp = getRegExp("RRRR");
                expect(regExp.test("Tegnap")).to.be.true;
                expect(regExp.test("tegnap")).to.be.false;
                expect(regExp.test("Yesterday")).to.be.false; 
            });
        });
    });
});