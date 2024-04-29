const { expect } = require('chai');
const DateFormat = require('../lib/format');

describe("date-parser, formats", () => {
    let formats;

    beforeEach(() => {
        formats = new DateFormat();
    });

    const getRegExp = format => new RegExp(formats.buildLocaleRegExpStringByFormat(format));

    describe("localizeRegExps", () => {
        describe("en", () => {
            it("(shortTime) should match to short time format, e.g.: 3:45 am", () => {
                const regExp = getRegExp("shortTime");
                expect("3:45 am").to.match(regExp);
                expect("03:45 am").to.not.match(regExp);
                expect("3:45:24 am").to.not.match(regExp);
            });

            it("(mediumTime) should match to medium time format, e.g.: 3:45:23 am", () => {
                const regExp = getRegExp("mediumTime");
                expect("3:45 am").to.not.match(regExp);
                expect("03:45 am").to.not.match(regExp);
                expect("3:45:23 am").to.match(regExp);
                expect("03:45:23 am").to.not.match(regExp);
            });

            it("(shortDate) should match to short date format, e.g.: 2/3/16", () => {
                const regExp = getRegExp("shortDate");
                expect("2/3/16").to.match(regExp);
                expect("02/03/2016").to.not.match(regExp);
            });

            it("(mediumDate) should match to medium date format, e.g.: Jan 2, 2016", () => {
                const regExp = getRegExp("mediumDate");
                expect("Jan 2, 2016").to.match(regExp);
                expect("January 02, 2016").to.not.match(regExp);
            });

            it("(longDate) should match to long date format, e.g.: January 2, 2016", () => {
                const regExp = getRegExp("longDate");
                expect("January 2, 2016").to.match(regExp);
                expect("Janu 02, 2016").to.not.match(regExp);
            });

            it("(fullDate) should match to full date format, e.g.: Monday, January 2, 2016", () => {
                const regExp = getRegExp("fullDate");
                expect("Monday, January 2, 2016").to.match(regExp);
                expect("Mon, Jan 02, 2016").to.not.match(regExp);
            });

            it("(short) should match to short date time format, e.g.: 2/3/16 3:45 am", () => {
                const regExp = getRegExp("short");
                expect("2/3/16 3:45 am").to.match(regExp);
                expect("02/03/2016 03:45").to.not.match(regExp);
            });

            it("(medium) should match to medium date time format, e.g.: Jan 2, 2016 03:45:23 am", () => {
                const regExp = getRegExp("medium");
                expect("Jan 2, 2016 03:45:23 am").to.match(regExp);
                expect("January 02, 2016 3:45 am").to.not.match(regExp);
            });
        });

        describe("hu", () => {
            beforeEach(() => {
                formats = new DateFormat('hu');
            });

            it("(shortTime) should match to short time format, e.g.: 03:45", () => {
                const regExp = getRegExp("shortTime");
                expect("03:45").to.match(regExp);
                expect("03:45 am").to.not.match(regExp);
                expect("03:45:24").to.not.match(regExp);
            });

            it("(mediumTime) should match to medium time format, e.g.: 03:45:23", () => {
                const regExp = getRegExp("mediumTime");
                expect("03:45").to.not.match(regExp);
                expect("03:45 am").to.not.match(regExp);
                expect("03:45:23").to.match(regExp);
                expect("03:45:23 am").to.not.match(regExp);
            });

            it("(shortDate) should match to short date format, e.g.: 2016. 2. 3.", () => {
                const regExp = getRegExp("shortDate");
                expect("2016. 2. 3.").to.match(regExp);
                expect("2016. 02. 03.").to.not.match(regExp);
            });

            it("(mediumDate) should match to medium date format, e.g.: 2016. Jan. 2.", () => {
                const regExp = getRegExp("mediumDate");
                expect("2016. Jan. 2.").to.match(regExp);
                expect("2016. Január 2.").to.not.match(regExp);
            });

            it("(longDate) should match to long date format, e.g.: 2016. Január 2.", () => {
                const regExp = getRegExp("longDate");
                expect("2016. Január 2.").to.match(regExp);
                expect("2016. Jan. 2.").to.not.match(regExp);
            });

            it("(fullDate) should match to full date format, e.g.: 2016. Január 2., Hétfő", () => {
                const regExp = getRegExp("fullDate");
                expect("2016. Január 2., Hétfő").to.match(regExp);
                expect("2016. Jan. 2. Hét.").to.not.match(regExp);
            });

            it("(short) should match to short date time format, e.g.: 2016. 2. 3. 03:45", () => {
                const regExp = getRegExp("short");
                expect("2016. 2. 3. 03:45").to.match(regExp);
                expect("2016. 02. 03. 03:45:52").to.not.match(regExp);
            });

            it("(medium) should match to medium date time format, e.g.: 2016. Jan. 3. 03:45:23", () => {
                const regExp = getRegExp("medium");
                expect("2016. Jan. 3. 03:45:23").to.match(regExp);
                expect("2016. Január 3. 3:45:23").to.not.match(regExp);
            });
        });
    });

    describe("tokenRegExps", () => {
        describe("months", () => {
            it("(LLLL) should match to full month names", () => {
                const regExp = getRegExp("LLLL");
                expect("January").to.match(regExp);
                expect("january").to.not.match(regExp);
                expect("Január").to.not.match(regExp);
            });

            it("(MMMM) should match to full month names", () => {
                const regExp = getRegExp("MMMM");
                expect("January").to.match(regExp);
                expect("january").to.not.match(regExp);
                expect("Január").to.not.match(regExp);
            });

            it("(MMM) should match to short month names", () => {
                const regExp = getRegExp("MMM");
                expect("Jan").to.match(regExp);
                expect("jan").to.not.match(regExp);
                expect("01").to.not.match(regExp);
            });

            it("(MM) should match to padded month numbers", () => {
                const regExp = getRegExp("MM");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("10").to.match(regExp);
                expect("12").to.match(regExp);
                expect("13").to.not.match(regExp);
            });

            it("(M) should match to normal month numbers", () => {
                const regExp = getRegExp("M");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("01").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("10").to.match(regExp);
                expect("12").to.match(regExp);
                expect("13").to.not.match(regExp);
            });
        });

        describe("quarter", () => {
            it("(Q) should match the quarter", () => {
                const regExp = getRegExp("Q");
                expect("1").to.match(regExp);
                expect("2").to.match(regExp);
                expect("3").to.match(regExp);
                expect("4").to.match(regExp);
                expect("5").to.not.match(regExp);
            })
        })

        describe("years", () => {
            it("(yyyy) should match to full years", () => {
                const regExp = getRegExp("yyyy");
                expect("0").to.not.match(regExp);
                expect("11").to.not.match(regExp);
                expect("222").to.not.match(regExp);
                expect("1986").to.match(regExp);
                expect("2016").to.match(regExp);
                expect("3333").to.not.match(regExp);
                expect("44444").to.not.match(regExp);
            });

            it("(yy) should match to two digit years", () => {
                const regExp = getRegExp("yy");
                expect("0").to.not.match(regExp);
                expect("11").to.match(regExp);
                expect("86").to.match(regExp);
                expect("222").to.not.match(regExp);
                expect("3333").to.not.match(regExp);
            });

            it("(y) should match to one digit years", () => {
                const regExp = getRegExp("y");
                expect("0").to.not.match(regExp);
                expect("11").to.match(regExp);
                expect("222").to.match(regExp);
                expect("3333").to.match(regExp);
            });

            it("(GGGG) should match to full years", () => {
                const regExp = getRegExp("GGGG");
                expect("0").to.not.match(regExp);
                expect("11").to.not.match(regExp);
                expect("222").to.not.match(regExp);
                expect("1986").to.match(regExp);
                expect("2016").to.match(regExp);
                expect("3333").to.not.match(regExp);
                expect("44444").to.not.match(regExp);
            });

            it("(gggg) should match to full years", () => {
                const regExp = getRegExp("gggg");
                expect("0").to.not.match(regExp);
                expect("11").to.not.match(regExp);
                expect("222").to.not.match(regExp);
                expect("1986").to.match(regExp);
                expect("2016").to.match(regExp);
                expect("3333").to.not.match(regExp);
                expect("44444").to.not.match(regExp);
            });
        });

        describe("days", () => {
            it("(EEEE) should match to full day names", () => {
                const regExp = getRegExp("EEEE");
                expect("Monday").to.match(regExp);
                expect("monday").to.not.match(regExp);
                expect("Hétfő").to.not.match(regExp);
            });

            it("(EEE) should match to short day names", () => {
                const regExp = getRegExp("EEE");
                expect("Mon").to.match(regExp);
                expect("Monday").to.not.match(regExp);
                expect("mon").to.not.match(regExp);
                expect("hét").to.not.match(regExp);
            });

            it("(RRRR) should match to relative day names", () => {
                const regExp = getRegExp("RRRR");
                expect("Yesterday").to.match(regExp);
                expect("yesterday").to.not.match(regExp);
                expect("Monday").to.not.match(regExp);
            });

            it("(Do) should match to number of day of month with ordinal", () => {
                const regExp = getRegExp("Do");
                expect("0nd").to.not.match(regExp);
                expect("00nd").to.not.match(regExp);
                expect("1st").to.match(regExp);
                expect("01st").to.not.match(regExp);
                expect("11st").to.not.match(regExp);
                expect("12nd").to.not.match(regExp);
                expect("13rd").to.not.match(regExp);
                expect("11th").to.match(regExp);
                expect("12th").to.match(regExp);
                expect("13th").to.match(regExp);
                expect("25th").to.match(regExp);
                expect("22nd").to.match(regExp);
                expect("23rd").to.match(regExp);
                expect("31st").to.match(regExp);
                expect("32nd").to.not.match(regExp);
                expect("01").to.not.match(regExp);
                expect("25").to.not.match(regExp);
                expect("52").to.not.match(regExp);
            });

            it("(dd) should match to padded day of the month", () => {
                const regExp = getRegExp("dd");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("11").to.match(regExp);
                expect("22").to.match(regExp);
                expect("30").to.match(regExp);
                expect("31").to.match(regExp);
                expect("32").to.not.match(regExp);
            });

            it("(d) should match to any day of the month", () => {
                const regExp = getRegExp("d");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("11").to.match(regExp);
                expect("22").to.match(regExp);
                expect("30").to.match(regExp);
                expect("31").to.match(regExp);
                expect("32").to.not.match(regExp);
            });
        });

        describe("week", () => {
            it("(ww) should match to padded number of week of year", () => {
                const regExp = getRegExp("ww");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("25").to.match(regExp);
                expect("52").to.match(regExp);
                expect("53").to.match(regExp);
                expect("54").to.not.match(regExp);
                expect("25th").to.not.match(regExp);
                expect("52nd").to.not.match(regExp);
            });

            it("(wo) should match to number of week of year with ordinal", () => {
                const regExp = getRegExp("wo");
                expect("0nd").to.not.match(regExp);
                expect("00nd").to.not.match(regExp);
                expect("1st").to.match(regExp);
                expect("01st").to.not.match(regExp);
                expect("11st").to.not.match(regExp);
                expect("12nd").to.not.match(regExp);
                expect("13rd").to.not.match(regExp);
                expect("11th").to.match(regExp);
                expect("12th").to.match(regExp);
                expect("13th").to.match(regExp);
                expect("25th").to.match(regExp);
                expect("52nd").to.match(regExp);
                expect("53rd").to.match(regExp);
                expect("54th").to.not.match(regExp);
                expect("01").to.not.match(regExp);
                expect("25").to.not.match(regExp);
                expect("52").to.not.match(regExp);
                expect("53").to.not.match(regExp);
            });

            it("(w) should match to the number of week of year", () => {
                const regExp = getRegExp("w");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("25").to.match(regExp);
                expect("52").to.match(regExp);
                expect("53").to.match(regExp);
                expect("54").to.not.match(regExp);
            });
        });

        describe("hours", () => {
            it("(HH) should match to padded 24h format", () => {
                const regExp = getRegExp("HH");
                expect("0").to.not.match(regExp);
                expect("00").to.match(regExp);
                expect("1").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("13").to.match(regExp);
                expect("23").to.match(regExp);
                expect("24").to.not.match(regExp);
            });

            it("(H) should match to 24h format", () => {
                const regExp = getRegExp("H");
                expect("0").to.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("13").to.match(regExp);
                expect("23").to.match(regExp);
                expect("24").to.not.match(regExp);
            });

            it("(hh) should match to padded 12h format", () => {
                const regExp = getRegExp("hh");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("12").to.match(regExp);
                expect("13").to.not.match(regExp);
                expect("23").to.not.match(regExp);
                expect("24").to.not.match(regExp);
            });

            it("(h) should match to 12h format", () => {
                const regExp = getRegExp("h");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("12").to.match(regExp);
                expect("13").to.not.match(regExp);
                expect("23").to.not.match(regExp);
                expect("24").to.not.match(regExp);
            });

            it("(kk) should match to padded 24h format, starting 1", () => {
                const regExp = getRegExp("kk");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("13").to.match(regExp);
                expect("23").to.match(regExp);
                expect("24").to.match(regExp);
                expect("25").to.not.match(regExp);
            });

            it("(k) should match to 24h format, starting 1", () => {
                const regExp = getRegExp("k");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("13").to.match(regExp);
                expect("23").to.match(regExp);
                expect("24").to.match(regExp);
                expect("25").to.not.match(regExp);
            });
        });

        describe("minutes", () => {
            it("(mm) should match to padded minutes in hours", () => {
                const regExp = getRegExp("mm");
                expect("0").to.not.match(regExp);
                expect("00").to.match(regExp);
                expect("1").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("59").to.match(regExp);
                expect("60").to.not.match(regExp);
            });

            it("(m) should match to minutes in hours", () => {
                const regExp = getRegExp("m");
                expect("0").to.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("59").to.match(regExp);
                expect("60").to.not.match(regExp);
            });
        });

        describe("seconds, milliseconds", () => {
            it("(sss) should match to milliseconds", () => {
                const regExp = getRegExp("sss");
                expect("0").to.not.match(regExp);
                expect("00").to.not.match(regExp);
                expect("000").to.match(regExp);
                expect("999").to.match(regExp);
                expect("0000").to.not.match(regExp);
            });

            it("(ss) should match to padded seconds in hours", () => {
                const regExp = getRegExp("ss");
                expect("0").to.not.match(regExp);
                expect("00").to.match(regExp);
                expect("1").to.not.match(regExp);
                expect("01").to.match(regExp);
                expect("59").to.match(regExp);
                expect("60").to.not.match(regExp);
            });

            it("(s) should match to seconds in hours", () => {
                const regExp = getRegExp("s");
                expect("0").to.match(regExp);
                expect("00").to.not.match(regExp);
                expect("1").to.match(regExp);
                expect("01").to.not.match(regExp);
                expect("59").to.match(regExp);
                expect("60").to.not.match(regExp);
            });
        });

        describe("other", () => {
            it("(a) should match to am/pm", () => {
                const regExp = getRegExp("a");
                expect("am").to.match(regExp);
                expect("AM").to.match(regExp);
                expect("pm").to.match(regExp);
                expect("PM").to.match(regExp);
                expect("AP").to.not.match(regExp);
            });

            it("(Z) should match to any timezone offset", () => {
                const regExp = getRegExp("Z");
                expect("+00:00").to.match(regExp);
                expect("-00:00").to.match(regExp);
                expect("00:00").to.not.match(regExp);
                expect("+0000").to.match(regExp);
                expect("-0000").to.match(regExp);
                expect("0000").to.not.match(regExp);
                expect("+12:00").to.match(regExp);
                expect("+13:00").to.not.match(regExp);
                expect("+00:40").to.not.match(regExp);
            });

            it("(zzz) should match to any unabbreviated timezone", () => {
                const regExp = getRegExp("zzz");
                expect("EST").to.not.match(regExp);
                expect("CEST").to.not.match(regExp);
                expect("UTC").to.not.match(regExp);
                expect("PST").to.not.match(regExp);
                expect("Eastern Standard Time").to.match(regExp);
                expect("Australian Eastern Daylight Time").to.match(regExp);
                expect("Coordinated Universal Time").to.match(regExp);
            });

            it("(z) should match to any abbreviated timezone", () => {
                const regExp = getRegExp("z");
                expect("EST").to.match(regExp);
                expect("CEST").to.match(regExp);
                expect("UTC").to.match(regExp);
                expect("PST").to.match(regExp);
                expect("Eastern Standard Time").to.not.match(regExp);
                expect("Australian Eastern Daylight Time").to.not.match(regExp);
                expect("Coordinated Universal Time").to.not.match(regExp);
            });

            it("(X) should match unix timestamp in seconds", () => {
                const regExp = getRegExp("X");
                const now = Date.now();
                expect(now.toString()).to.not.match(regExp);
                expect(Math.floor(now / 1e3).toString()).to.match(regExp);
            });

            it("(x) should match unix timestamp in milliseconds", () => {
                const regExp = getRegExp("x");
                const now = Date.now();
                expect(now.toString()).to.match(regExp);
                expect(Math.floor(now / 1e3).toString()).to.not.match(regExp);
            });
        });

        describe("literals", () => {
            it("(!) should handle character as literal", () => {
                const regExp = getRegExp("!a");
                expect("a").to.match(regExp);
                expect("AM").to.not.match(regExp);
            });

            it("(!!) should handle ! as a character literal", () => {
                const regExp = getRegExp("!!");
                expect("!").to.match(regExp);
                expect("!a").to.not.match(regExp);
            });
        });

        describe("complex", () => {
            it("should handle complex expression", () => {
                const regExp = getRegExp("MMMM d, yyyy H a");
                expect("March 3, 2020 11 AM").to.match(regExp);
                expect("Mar 03, 20 1a").to.not.match(regExp);
            });

            it("should handle complex expression with literals", () => {
                const regExp = getRegExp("MMMM d, yyyy !a!t H a CEST");
                expect("March 3, 2020 at 11 AM CEST").to.match(regExp);
                expect("March 3, 2020 AMt 11 AM CEST").to.not.match(regExp);
            });
        });
    });

    describe("_groupRegExpString()", () => {
        it("should group with not matching group", () => {
            expect(formats._groupRegExpString('string')).to.equal('(?:string)');
        });

        it("should group with matching group", () => {
            expect(formats._groupRegExpString('string', true)).to.equal('(string)');
        });

        it("should not group if prohibited", () => {
            expect(formats._groupRegExpString('string', false)).to.equal('string');
        });
    });

    describe("buildRegExpStringByFormat()", () => {
        it("should replace all possible tokens", () => {
            const format = Object.keys(formats.tokenRegExps).join(':');
            const expected = "^" + Object.keys(formats.tokenRegExps).map((token) => '(?:' + formats.tokenRegExps[token] + ')').join(':') + "$";

            expect(formats.buildRegExpStringByFormat(format)).to.equal(expected);
        });
    });

    describe("buildLocaleRegExpStringByFormat()", () => {
        it("should replace all possible locale tokens", () => {
            const format = Object.keys(formats.localizeReqExps).join(':');
            const expected = "^" + formats._replaceTokens(Object.keys(formats.localizeReqExps).map((token) => formats.localizeReqExps[token]).join(':')) + "$";

            expect(formats.buildLocaleRegExpStringByFormat(format)).to.equal(expected);
        });
    });
});
