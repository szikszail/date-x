describe("date-parser", function () {
    var dateParser;

    beforeEach(function () {
        dateParser = require('../index');
    });

    it("should match", function () {
        expect(dateParser.matchDateFormat('yyyy.MM.dd. HH:mm:ss', '2016.01.01. 01:01:01')).toEqual(true);
    });

});