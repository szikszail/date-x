import { DateRegExpBuilder } from "../src/format";

describe("date-parser, locale NL", () => {
  let formats: DateRegExpBuilder;

  beforeEach(() => {
    formats = new DateRegExpBuilder("nl");
  });

  const getRegExp = (format: string) =>
    new RegExp(formats.buildLocaleRegExpStringByFormat(format));

  describe("localizeRegExps", () => {
    test("(shortTime) should match to short time format, e.g.: 03:45", () => {
      const regExp = getRegExp("shortTime");
      expect("03:45").toMatch(regExp);
      expect("03:45 am").not.toMatch(regExp);
      expect("03:45:24").not.toMatch(regExp);
    });

    test("(mediumTime) should match to medium time format, e.g.: 03:45:23", () => {
      const regExp = getRegExp("mediumTime");
      expect("03:45").not.toMatch(regExp);
      expect("03:45 am").not.toMatch(regExp);
      expect("03:45:23").toMatch(regExp);
      expect("03:45:23 am").not.toMatch(regExp);
    });

    test("(shortDate) should match to short date format, e.g.: 03-02-2016", () => {
      const regExp = getRegExp("shortDate");
      expect("03-02-2016").toMatch(regExp);
      expect("3-2-2016").not.toMatch(regExp);
    });

    test("(mediumDate) should match to medium date format, e.g.: 02 Jan 2016", () => {
      const regExp = getRegExp("mediumDate");
      expect("02 Jan 2016").toMatch(regExp);
      expect("02 Januari 2016").not.toMatch(regExp);
    });

    test("(longDate) should match to long date format, e.g.: 02 Januari 2016", () => {
      const regExp = getRegExp("longDate");
      expect("02 Jan 2016").not.toMatch(regExp);
      expect("02 Januari 2016").toMatch(regExp);
    });

    test("(fullDate) should match to full date format, e.g.: Maandag 02 Januari 2016", () => {
      const regExp = getRegExp("fullDate");
      expect("Maandag 02 Januari 2016").toMatch(regExp);
      expect("Ma 02 Januari 2016").not.toMatch(regExp);
    });

    test("(short) should match to short date time format, e.g.: 02-03-2016 03:45", () => {
      const regExp = getRegExp("short");
      expect("02-03-2016 03:45").toMatch(regExp);
      expect("02-03-2016 03:45:52").not.toMatch(regExp);
    });

    test("(medium) should match to medium date time format, e.g.: 02 Jan 2016 03:45:52", () => {
      const regExp = getRegExp("medium");
      expect("02-03-2016 03:45").not.toMatch(regExp);
      expect("02 Jan 2016 03:45:52").toMatch(regExp);
    });
  });

  describe("tokenRegExps", () => {
    describe("months", () => {
      test("(LLLL) should match to full month names", () => {
        const regExp = getRegExp("LLLL");
        expect("Januari").toMatch(regExp);
        expect("januari").not.toMatch(regExp);
        expect("January").not.toMatch(regExp);
      });

      test("(MMMM) should match to full month names", () => {
        const regExp = getRegExp("MMMM");
        expect("Januari").toMatch(regExp);
        expect("januari").not.toMatch(regExp);
        expect("January").not.toMatch(regExp);
      });

      test("(MMM) should match to short month names", () => {
        const regExp = getRegExp("MMM");
        expect("Jan").toMatch(regExp);
        expect("jan").not.toMatch(regExp);
        expect("01").not.toMatch(regExp);
      });
    });

    describe("days", () => {
      test("(EEEE) should match to full day names", () => {
        const regExp = getRegExp("EEEE");
        expect("Maandag").toMatch(regExp);
        expect("maandag").not.toMatch(regExp);
        expect("Monday").not.toMatch(regExp);
      });

      test("(EEE) should match to short day names", () => {
        const regExp = getRegExp("EEE");
        expect("Ma").toMatch(regExp);
        expect("ma").not.toMatch(regExp);
        expect("Mon").not.toMatch(regExp);
        expect("hét").not.toMatch(regExp);
      });

      test("(RRRR) should match to relative day names", () => {
        const regExp = getRegExp("RRRR");
        expect("Gisteren").toMatch(regExp);
        expect("gisteren").not.toMatch(regExp);
        expect("Yesterday").not.toMatch(regExp);
      });
    });
  });
});
