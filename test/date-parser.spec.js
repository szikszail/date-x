var expect = require('chai').expect;

describe("date-parser", function () {
    var dateParser;

    beforeEach(function () {
        dateParser = require('../lib/index');
    });

    describe("loadLocale()", function () {
        it("should throw an error if the desired locale is not exist", function () {
            var notExistingLocale = 'THERE-IS-NO-LOCALE-LIKE-THIS';
            function test() {
                dateParser.loadLocale(notExistingLocale);
            }

            expect(test).to.throw(new RegExp(notExistingLocale, 'i'));
        });
    });

    describe("test()", function () {
        it("should recognize valid date by given format", function () {
            expect(dateParser.test('yyyy.MM.dd. HH:mm:ss', '2016.01.01. 01:01:01')).to.equal(true);
        });

        it("should recognize if a date is not valid by given format", function () {
            expect(dateParser.test('yyyy.MM.dd. HH:mm:ss', '2016.1.1. 01:01:01')).to.equal(false);
        });
    });

    describe("match()", function () {
        it("should match valid date by given format", function () {
            var match = dateParser.match('yyyy.MM.dd. HH:mm:ss', '2016.01.02. 03:04:05');
            expect(match[1]).to.equal('2016');
            expect(match[2]).to.equal('01');
            expect(match[3]).to.equal('02');
            expect(match[4]).to.equal('03');
            expect(match[5]).to.equal('04');
            expect(match[6]).to.equal('05');
        });

        it("should not match if a date is not valid by given format", function () {
            expect(dateParser.match('yyyy.MM.dd. HH:mm:ss', '2016.1.1. 01:01:01')).to.equal(null);
        });
    });

});