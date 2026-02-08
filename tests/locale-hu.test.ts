import { DateRegExpBuilder } from "../src/format";

describe("date-parser, locale HU", () => {
  let formats: DateRegExpBuilder;

  beforeEach(() => {
    formats = new DateRegExpBuilder("hu");
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

    test("(shortDate) should match to short date format, e.g.: 2016. 2. 3.", () => {
      const regExp = getRegExp("shortDate");
      expect("2016. 2. 3.").toMatch(regExp);
      expect("2016. 02. 03.").not.toMatch(regExp);
    });

    test("(mediumDate) should match to medium date format, e.g.: 2016. Jan. 2.", () => {
      const regExp = getRegExp("mediumDate");
      expect("2016. Jan. 2.").toMatch(regExp);
      expect("2016. Január 2.").not.toMatch(regExp);
    });

    test("(longDate) should match to long date format, e.g.: 2016. Január 2.", () => {
      const regExp = getRegExp("longDate");
      expect("2016. Január 2.").toMatch(regExp);
      expect("2016. Jan. 2.").not.toMatch(regExp);
    });

    test("(fullDate) should match to full date format, e.g.: 2016. Január 2., Hétfő", () => {
      const regExp = getRegExp("fullDate");
      expect("2016. Január 2., Hétfő").toMatch(regExp);
      expect("2016. Jan. 2. Hét.").not.toMatch(regExp);
    });

    test("(short) should match to short date time format, e.g.: 2016. 2. 3. 03:45", () => {
      const regExp = getRegExp("short");
      expect("2016. 2. 3. 03:45").toMatch(regExp);
      expect("2016. 02. 03. 03:45:52").not.toMatch(regExp);
    });

    test("(medium) should match to medium date time format, e.g.: 2016. Jan. 3. 03:45:23", () => {
      const regExp = getRegExp("medium");
      expect("2016. Jan. 3. 03:45:23").toMatch(regExp);
      expect("2016. Január 3. 3:45:23").not.toMatch(regExp);
    });
  });

  describe("tokenRegExps", () => {
    describe("months", () => {
      test("(LLLL) should match to full month names", () => {
        const regExp = getRegExp("LLLL");
        expect("Január").toMatch(regExp);
        expect("január").not.toMatch(regExp);
        expect("January").not.toMatch(regExp);
      });

      test("(MMMM) should match to full month names", () => {
        const regExp = getRegExp("MMMM");
        expect("Január").toMatch(regExp);
        expect("január").not.toMatch(regExp);
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
        expect("Hétfő").toMatch(regExp);
        expect("hétfő").not.toMatch(regExp);
        expect("Monday").not.toMatch(regExp);
      });

      test("(EEE) should match to short day names", () => {
        const regExp = getRegExp("EEE");
        expect("H").toMatch(regExp);
        expect("h").not.toMatch(regExp);
        expect("Mon").not.toMatch(regExp);
        expect("hét").not.toMatch(regExp);
      });

      test("(RRRR) should match to relative day names", () => {
        const regExp = getRegExp("RRRR");
        expect("Tegnap").toMatch(regExp);
        expect("tegnap").not.toMatch(regExp);
        expect("Yesterday").not.toMatch(regExp);
      });
    });
  });
});
