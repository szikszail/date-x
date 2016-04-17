var expect = require('chai').expect;

describe("date-parser", function () {
    var dateParser;

    beforeEach(function () {
        dateParser = require('../lib/index');
    });

    describe("test()", function () {
        it("should recognize valid date by given format", function () {
            expect(dateParser.test('yyyy.MM.dd. HH:mm:ss', '2016.01.01. 01:01:01')).to.equal(true);
        });

        it("should recognize if a date is not valid by given format", function () {
            expect(dateParser.test('yyyy.MM.dd. HH:mm:ss', '2016.1.1. 01:01:01')).to.equal(false);
        });
    });

});