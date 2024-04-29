const { expect } = require('chai');
const DateFormat = require('../lib/format');

describe("date-parser, locale EN", () => {
    let formats;

    beforeEach(() => {
        formats = new DateFormat('en');
    });

    const getRegExp = format => new RegExp(formats.buildLocaleRegExpStringByFormat(format));

    describe("localizeRegExps", () => {
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
        });
    });
});