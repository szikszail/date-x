const { expect } = require('chai');
const dateParser = require('../lib/index');

describe("date-parser", () => {
    describe("loadLocale()", () => {
        it("should throw an error if the desired locale is not exist", () => {
            const notExistingLocale = 'THERE-IS-NO-LOCALE-LIKE-THIS';
            function test() {
                dateParser.loadLocale(notExistingLocale);
            }

            expect(test).to.throw(new RegExp(notExistingLocale, 'i'));
        });
    });

    describe("buildRegExp()", () => {
        it("should build a regular expression based on the given format", () => {
            const regExp = dateParser.buildRegExp('yyyy.MM.dd. HH:mm:ss');
            expect(regExp).to.be.an.instanceof(RegExp);
            expect(regExp.test('2016.01.01. 01:01:01')).to.equal(true);
        });
    });

    describe("test()", () => {
        it("should recognize valid date by given format", () => {
            expect(dateParser.test('yyyy.MM.dd. HH:mm:ss', '2016.01.01. 01:01:01')).to.equal(true);
        });

        it("should recognize if a date is not valid by given format", () => {
            expect(dateParser.test('yyyy.MM.dd. HH:mm:ss', '2016.1.1. 01:01:01')).to.equal(false);
        });
    });

    describe("match()", () => {
        it("should match valid date by given format", () => {
            const match = dateParser.match('yyyy.MM.dd. HH:mm:ss', '2016.01.02. 03:04:05');
            expect(match[1]).to.equal('2016');
            expect(match[2]).to.equal('01');
            expect(match[3]).to.equal('02');
            expect(match[4]).to.equal('03');
            expect(match[5]).to.equal('04');
            expect(match[6]).to.equal('05');
        });

        it("should not match if a date is not valid by given format", () => {
            expect(dateParser.match('yyyy.MM.dd. HH:mm:ss', '2016.1.1. 01:01:01')).to.equal(null);
        });
    });

});