var expect = require('chai').expect;
var DateFormat = require('../lib/format');

describe("date-parser, formats", function () {
    var formats;

    beforeEach(function () {
        formats = new DateFormat();
    });

    function getRegExp(format) {
        return new RegExp(formats.buildLocaleRegExpStringByFormat(format));
    }

    describe("localizeRegExps", function () {
        describe("en", function () {
            it("(shortTime) should match to short time format, e.g.: 3:45 am", function () {
                var regExp = getRegExp("shortTime");
                expect(regExp.test("3:45 am")).to.be.true;
                expect(regExp.test("03:45 am")).to.be.false;
                expect(regExp.test("3:45:24 am")).to.be.false;
            });

            it("(mediumTime) should match to medium time format, e.g.: 3:45:23 am", function () {
                var regExp = getRegExp("mediumTime");
                expect(regExp.test("3:45 am")).to.be.false;
                expect(regExp.test("03:45 am")).to.be.false;
                expect(regExp.test("3:45:23 am")).to.be.true;
                expect(regExp.test("03:45:23 am")).to.be.false;
            });

            it("(shortDate) should match to short date format, e.g.: 2/3/16", function () {
                var regExp = getRegExp("shortDate");
                expect(regExp.test("2/3/16")).to.be.true;
                expect(regExp.test("02/03/2016")).to.be.false;
            });

            it("(mediumDate) should match to medium date format, e.g.: Jan 2, 2016", function () {
                var regExp = getRegExp("mediumDate");
                expect(regExp.test("Jan 2, 2016")).to.be.true;
                expect(regExp.test("January 02, 2016")).to.be.false;
            });

            it("(longDate) should match to long date format, e.g.: January 2, 2016", function () {
                var regExp = getRegExp("longDate");
                expect(regExp.test("January 2, 2016")).to.be.true;
                expect(regExp.test("Janu 02, 2016")).to.be.false;
            });

            it("(fullDate) should match to full date format, e.g.: Monday, January 2, 2016", function () {
                var regExp = getRegExp("fullDate");
                expect(regExp.test("Monday, January 2, 2016")).to.be.true;
                expect(regExp.test("Mon, Jan 02, 2016")).to.be.false;
            });

            it("(short) should match to short date time format, e.g.: 2/3/16 3:45 am", function () {
                var regExp = getRegExp("short");
                expect(regExp.test("2/3/16 3:45 am")).to.be.true;
                expect(regExp.test("02/03/2016 03:45")).to.be.false;
            });

            it("(medium) should match to medium date time format, e.g.: Jan 2, 2016 03:45:23 am", function () {
                var regExp = getRegExp("medium");
                expect(regExp.test("Jan 2, 2016 03:45:23 am")).to.be.true;
                expect(regExp.test("January 02, 2016 3:45 am")).to.be.false;
            });
        });
        
        describe("hu", function () {
            beforeEach(function() {
                formats = new DateFormat('hu');
            });
            
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
    });

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
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("11")).to.be.true;
                expect(regExp.test("222")).to.be.true;
                expect(regExp.test("3333")).to.be.true;
            });
        });

        describe("days", function () {
            it("(EEEE) should match to full day names", function () {
                var regExp = getRegExp("EEEE");
                expect(regExp.test("Monday")).to.be.true;
                expect(regExp.test("monday")).to.be.false;
                expect(regExp.test("Hétfő")).to.be.false; 
            });

            it("(EEE) should match to short day names", function () {
                var regExp = getRegExp("EEE");
                expect(regExp.test("Mon")).to.be.true;
                expect(regExp.test("Monday")).to.be.false;
                expect(regExp.test("mon")).to.be.false;
                expect(regExp.test("hét")).to.be.false;
            });
            
            it("(RRRR) should match to relative day names", function () {
                var regExp = getRegExp("RRRR");
                expect(regExp.test("Yesterday")).to.be.true;
                expect(regExp.test("yesterday")).to.be.false;
                expect(regExp.test("Monday")).to.be.false; 
            });

            it("(dd) should match to padded day of the month", function () {
                var regExp = getRegExp("dd");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("11")).to.be.true;
                expect(regExp.test("22")).to.be.true;
                expect(regExp.test("30")).to.be.true;
                expect(regExp.test("31")).to.be.true;
                expect(regExp.test("32")).to.be.false;
            });

            it("(d) should match to any day of the month", function () {
                var regExp = getRegExp("d");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("11")).to.be.true;
                expect(regExp.test("22")).to.be.true;
                expect(regExp.test("30")).to.be.true;
                expect(regExp.test("31")).to.be.true;
                expect(regExp.test("32")).to.be.false;
            });
        });

        describe("week", function () {
            it("(ww) should match to padded number of week of year", function () {
                var regExp = getRegExp("ww");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.true;
                expect(regExp.test("1")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("25")).to.be.true;
                expect(regExp.test("52")).to.be.true;
                expect(regExp.test("53")).to.be.true;
                expect(regExp.test("54")).to.be.false;
            });

            it("(w) should match to the number of week of year", function () {
                var regExp = getRegExp("w");
                expect(regExp.test("0")).to.be.true;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("25")).to.be.true;
                expect(regExp.test("52")).to.be.true;
                expect(regExp.test("53")).to.be.true;
                expect(regExp.test("54")).to.be.false;
            });
        });

        describe("hours", function () {
            it("(HH) should match to padded 24h format", function () {
                var regExp = getRegExp("HH");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.true;
                expect(regExp.test("1")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("13")).to.be.true;
                expect(regExp.test("23")).to.be.true;
                expect(regExp.test("24")).to.be.false;
            });

            it("(H) should match to 24h format", function () {
                var regExp = getRegExp("H");
                expect(regExp.test("0")).to.be.true;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("13")).to.be.true;
                expect(regExp.test("23")).to.be.true;
                expect(regExp.test("24")).to.be.false;
            });

            it("(hh) should match to padded 12h format", function () {
                var regExp = getRegExp("hh");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("12")).to.be.true;
                expect(regExp.test("13")).to.be.false;
                expect(regExp.test("23")).to.be.false;
                expect(regExp.test("24")).to.be.false;
            });

            it("(h) should match to 12h format", function () {
                var regExp = getRegExp("h");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("12")).to.be.true
                expect(regExp.test("13")).to.be.false;
                expect(regExp.test("23")).to.be.false;
                expect(regExp.test("24")).to.be.false;
            });
        });

        describe("minutes", function () {
            it("(mm) should match to padded minutes in hours", function () {
                var regExp = getRegExp("mm");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.true;
                expect(regExp.test("1")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("59")).to.be.true;
                expect(regExp.test("60")).to.be.false;
            });

            it("(m) should match to minutes in hours", function () {
                var regExp = getRegExp("m");
                expect(regExp.test("0")).to.be.true;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("59")).to.be.true;
                expect(regExp.test("60")).to.be.false;
            });
        });
        describe("seconds, milliseconds", function () {
            it("(sss) should match to milliseconds", function ()  {
                var regExp = getRegExp("sss");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("000")).to.be.true;
                expect(regExp.test("999")).to.be.true;
                expect(regExp.test("0000")).to.be.false;
            });

            it("(ss) should match to padded seconds in hours", function () {
                var regExp = getRegExp("ss");
                expect(regExp.test("0")).to.be.false;
                expect(regExp.test("00")).to.be.true;
                expect(regExp.test("1")).to.be.false;
                expect(regExp.test("01")).to.be.true;
                expect(regExp.test("59")).to.be.true;
                expect(regExp.test("60")).to.be.false;
            });

            it("(s) should match to seconds in hours", function () {
                var regExp = getRegExp("s");
                expect(regExp.test("0")).to.be.true;
                expect(regExp.test("00")).to.be.false;
                expect(regExp.test("1")).to.be.true;
                expect(regExp.test("01")).to.be.false;
                expect(regExp.test("59")).to.be.true;
                expect(regExp.test("60")).to.be.false;
            });
        });

        describe("other", function () {
            it("(a) should match to am/pm", function () {
                var regExp = getRegExp("a");
                expect(regExp.test("am")).to.be.true;
                expect(regExp.test("AM")).to.be.true;
                expect(regExp.test("pm")).to.be.true;
                expect(regExp.test("PM")).to.be.true;
                expect(regExp.test("AP")).to.be.false;
            });

            it("(Z) should match to any timezone offset", function () {
                var regExp = getRegExp("Z");
                expect(regExp.test("+00:00")).to.be.true;
                expect(regExp.test("-00:00")).to.be.true;
                expect(regExp.test("00:00")).to.be.false;
                expect(regExp.test("+0000")).to.be.true;
                expect(regExp.test("-0000")).to.be.true;
                expect(regExp.test("0000")).to.be.false;
                expect(regExp.test("+12:00")).to.be.true;
                expect(regExp.test("+13:00")).to.be.false;
                expect(regExp.test("+00:40")).to.be.false;
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
