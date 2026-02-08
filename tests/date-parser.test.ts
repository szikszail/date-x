import dateParser from "../src";

describe("date-parser", () => {
  describe("loadLocale()", () => {
    test("should throw an error if the desired locale is not exist", () => {
      const notExistingLocale = "THERE-IS-NO-LOCALE-LIKE-THIS";
      function test() {
        // @ts-expect-error Invalid argument, intentional
        dateParser.loadLocale(notExistingLocale);
      }

      expect(test).toThrow(new RegExp(notExistingLocale, "i"));
    });
  });

  describe("buildRegExp()", () => {
    test("should build a regular expression based on the given format", () => {
      const regExp = dateParser.buildRegExp("yyyy.MM.dd. HH:mm:ss");
      expect(regExp).toBeInstanceOf(RegExp);
      expect(regExp.test("2016.01.01. 01:01:01")).toEqual(true);
    });
  });

  describe("test()", () => {
    test("should recognize valid date by given format", () => {
      expect(
        dateParser.test("yyyy.MM.dd. HH:mm:ss", "2016.01.01. 01:01:01"),
      ).toEqual(true);
    });

    test("should recognize if a date is not valid by given format", () => {
      expect(
        dateParser.test("yyyy.MM.dd. HH:mm:ss", "2016.1.1. 01:01:01"),
      ).toEqual(false);
    });
  });

  describe("match()", () => {
    test("should match valid date by given format", () => {
      const match = dateParser.match(
        "yyyy.MM.dd. HH:mm:ss",
        "2016.01.02. 03:04:05",
      )!;
      expect(match[1]).toEqual("2016");
      expect(match[2]).toEqual("01");
      expect(match[3]).toEqual("02");
      expect(match[4]).toEqual("03");
      expect(match[5]).toEqual("04");
      expect(match[6]).toEqual("05");
    });

    test("should not match if a date is not valid by given format", () => {
      expect(
        dateParser.match("yyyy.MM.dd. HH:mm:ss", "2016.1.1. 01:01:01"),
      ).toEqual(null);
    });
  });
});
