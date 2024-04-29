const { expect } = require('chai');
const DateFormat = require('../lib/format');

describe("date-parser, locale NL", () => {
    let formats;

    beforeEach(() => {
        formats = new DateFormat('nl');
    });

    const getRegExp = format => new RegExp(formats.buildLocaleRegExpStringByFormat(format));

    describe("localizeRegExps", () => {            
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

        it("(shortDate) should match to short date format, e.g.: 03-02-2016", () => {
            const regExp = getRegExp("shortDate");
            expect("03-02-2016").to.match(regExp);
            expect("3-2-2016").to.not.match(regExp);
        });

        it("(mediumDate) should match to medium date format, e.g.: 02 Jan 2016", () => {
            const regExp = getRegExp("mediumDate");
            expect("02 Jan 2016").to.match(regExp);
            expect("02 Januari 2016").to.not.match(regExp);
        });

        it("(longDate) should match to long date format, e.g.: 02 Januari 2016", () => {
            const regExp = getRegExp("longDate");
            expect("02 Jan 2016").to.not.match(regExp);
            expect("02 Januari 2016").to.match(regExp);
        });

        it("(fullDate) should match to full date format, e.g.: Maandag 02 Januari 2016", () => {
            const regExp = getRegExp("fullDate");
            expect("Maandag 02 Januari 2016").to.match(regExp);
            expect("Ma 02 Januari 2016").to.not.match(regExp);
        });

        it("(short) should match to short date time format, e.g.: 02-03-2016 03:45", () => {
            const regExp = getRegExp("short");
            expect("02-03-2016 03:45").to.match(regExp);
            expect("02-03-2016 03:45:52").to.not.match(regExp);
        });

        it("(medium) should match to medium date time format, e.g.: 02 Jan 2016 03:45:52", () => {
            const regExp = getRegExp("medium");
            expect("02-03-2016 03:45").to.not.match(regExp);
            expect("02 Jan 2016 03:45:52").to.match(regExp);
        });
    });

    describe("tokenRegExps", () => {
        describe("months", () => {
            it("(LLLL) should match to full month names", () => {
                const regExp = getRegExp("LLLL");
                expect("Januari").to.match(regExp);
                expect("januari").to.not.match(regExp);
                expect("January").to.not.match(regExp);
            });

            it("(MMMM) should match to full month names", () => {
                const regExp = getRegExp("MMMM");
                expect("Januari").to.match(regExp);
                expect("januari").to.not.match(regExp);
                expect("January").to.not.match(regExp);
            });

            it("(MMM) should match to short month names", () => {
                const regExp = getRegExp("MMM");
                expect("Jan").to.match(regExp);
                expect("jan").to.not.match(regExp);
                expect("01").to.not.match(regExp);
            });
        });
        
        describe("days", () => {
            it("(EEEE) should match to full day names", () => {
                const regExp = getRegExp("EEEE");
                expect("Maandag").to.match(regExp);
                expect("maandag").to.not.match(regExp);
                expect("Monday").to.not.match(regExp); 
            });

            it("(EEE) should match to short day names", () => {
                const regExp = getRegExp("EEE");
                expect("Ma").to.match(regExp);
                expect("ma").to.not.match(regExp);
                expect("Mon").to.not.match(regExp);
                expect("hét").to.not.match(regExp);
            });
            
            it("(RRRR) should match to relative day names", () => {
                const regExp = getRegExp("RRRR");
                expect("Gisteren").to.match(regExp);
                expect("gisteren").to.not.match(regExp);
                expect("Yesterday").to.not.match(regExp); 
            });
        });
    });
});