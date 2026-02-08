import { DateRegExpBuilder } from "../src/format";

describe("date-parser, locale EN", () => {
  let formats: DateRegExpBuilder;

  beforeEach(() => {
    formats = new DateRegExpBuilder("en");
  });

  const getRegExp = (format: string) =>
    new RegExp(formats.buildLocaleRegExpStringByFormat(format));

  describe("localizeRegExps", () => {
    test("(shortTime) should match to short time format, e.g.: 3:45 am", () => {
      const regExp = getRegExp("shortTime");
      expect("3:45 am").toMatch(regExp);
      expect("03:45 am").not.toMatch(regExp);
      expect("3:45:24 am").not.toMatch(regExp);
    });

    test("(mediumTime) should match to medium time format, e.g.: 3:45:23 am", () => {
      const regExp = getRegExp("mediumTime");
      expect("3:45 am").not.toMatch(regExp);
      expect("03:45 am").not.toMatch(regExp);
      expect("3:45:23 am").toMatch(regExp);
      expect("03:45:23 am").not.toMatch(regExp);
    });

    test("(shortDate) should match to short date format, e.g.: 2/3/16", () => {
      const regExp = getRegExp("shortDate");
      expect("2/3/16").toMatch(regExp);
      expect("02/03/2016").not.toMatch(regExp);
    });

    test("(mediumDate) should match to medium date format, e.g.: Jan 2, 2016", () => {
      const regExp = getRegExp("mediumDate");
      expect("Jan 2, 2016").toMatch(regExp);
      expect("January 02, 2016").not.toMatch(regExp);
    });

    test("(longDate) should match to long date format, e.g.: January 2, 2016", () => {
      const regExp = getRegExp("longDate");
      expect("January 2, 2016").toMatch(regExp);
      expect("Janu 02, 2016").not.toMatch(regExp);
    });

    test("(fullDate) should match to full date format, e.g.: Monday, January 2, 2016", () => {
      const regExp = getRegExp("fullDate");
      expect("Monday, January 2, 2016").toMatch(regExp);
      expect("Mon, Jan 02, 2016").not.toMatch(regExp);
    });

    test("(short) should match to short date time format, e.g.: 2/3/16 3:45 am", () => {
      const regExp = getRegExp("short");
      expect("2/3/16 3:45 am").toMatch(regExp);
      expect("02/03/2016 03:45").not.toMatch(regExp);
    });

    test("(medium) should match to medium date time format, e.g.: Jan 2, 2016 03:45:23 am", () => {
      const regExp = getRegExp("medium");
      expect("Jan 2, 2016 03:45:23 am").toMatch(regExp);
      expect("January 02, 2016 3:45 am").not.toMatch(regExp);
    });
  });

  describe("tokenRegExps", () => {
    describe("months", () => {
      test("(LLLL) should match to full month names", () => {
        const regExp = getRegExp("LLLL");
        expect("January").toMatch(regExp);
        expect("january").not.toMatch(regExp);
        expect("Január").not.toMatch(regExp);
      });

      test("(MMMM) should match to full month names", () => {
        const regExp = getRegExp("MMMM");
        expect("January").toMatch(regExp);
        expect("january").not.toMatch(regExp);
        expect("Január").not.toMatch(regExp);
      });

      test("(MMM) should match to short month names", () => {
        const regExp = getRegExp("MMM");
        expect("Jan").toMatch(regExp);
        expect("jan").not.toMatch(regExp);
        expect("01").not.toMatch(regExp);
      });

      test("(MM) should match to padded month numbers", () => {
        const regExp = getRegExp("MM");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("10").toMatch(regExp);
        expect("12").toMatch(regExp);
        expect("13").not.toMatch(regExp);
      });

      test("(M) should match to normal month numbers", () => {
        const regExp = getRegExp("M");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("10").toMatch(regExp);
        expect("12").toMatch(regExp);
        expect("13").not.toMatch(regExp);
      });
    });

    describe("years", () => {
      test("(yyyy) should match to full years", () => {
        const regExp = getRegExp("yyyy");
        expect("0").not.toMatch(regExp);
        expect("11").not.toMatch(regExp);
        expect("222").not.toMatch(regExp);
        expect("1986").toMatch(regExp);
        expect("2016").toMatch(regExp);
        expect("3333").not.toMatch(regExp);
        expect("44444").not.toMatch(regExp);
      });

      test("(yy) should match to two digit years", () => {
        const regExp = getRegExp("yy");
        expect("0").not.toMatch(regExp);
        expect("11").toMatch(regExp);
        expect("86").toMatch(regExp);
        expect("222").not.toMatch(regExp);
        expect("3333").not.toMatch(regExp);
      });

      test("(y) should match to one digit years", () => {
        const regExp = getRegExp("y");
        expect("0").not.toMatch(regExp);
        expect("11").toMatch(regExp);
        expect("222").toMatch(regExp);
        expect("3333").toMatch(regExp);
      });
    });

    describe("days", () => {
      test("(EEEE) should match to full day names", () => {
        const regExp = getRegExp("EEEE");
        expect("Monday").toMatch(regExp);
        expect("monday").not.toMatch(regExp);
        expect("Hétfő").not.toMatch(regExp);
      });

      test("(EEE) should match to short day names", () => {
        const regExp = getRegExp("EEE");
        expect("Mon").toMatch(regExp);
        expect("Monday").not.toMatch(regExp);
        expect("mon").not.toMatch(regExp);
        expect("hét").not.toMatch(regExp);
      });

      test("(RRRR) should match to relative day names", () => {
        const regExp = getRegExp("RRRR");
        expect("Yesterday").toMatch(regExp);
        expect("yesterday").not.toMatch(regExp);
        expect("Monday").not.toMatch(regExp);
      });

      test("(dd) should match to padded day of the month", () => {
        const regExp = getRegExp("dd");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("11").toMatch(regExp);
        expect("22").toMatch(regExp);
        expect("30").toMatch(regExp);
        expect("31").toMatch(regExp);
        expect("32").not.toMatch(regExp);
      });

      test("(d) should match to any day of the month", () => {
        const regExp = getRegExp("d");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("11").toMatch(regExp);
        expect("22").toMatch(regExp);
        expect("30").toMatch(regExp);
        expect("31").toMatch(regExp);
        expect("32").not.toMatch(regExp);
      });
    });

    describe("week", () => {
      test("(ww) should match to padded number of week of year", () => {
        const regExp = getRegExp("ww");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("25").toMatch(regExp);
        expect("52").toMatch(regExp);
        expect("53").toMatch(regExp);
        expect("54").not.toMatch(regExp);
      });

      test("(w) should match to the number of week of year", () => {
        const regExp = getRegExp("w");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("25").toMatch(regExp);
        expect("52").toMatch(regExp);
        expect("53").toMatch(regExp);
        expect("54").not.toMatch(regExp);
      });
    });

    describe("hours", () => {
      test("(HH) should match to padded 24h format", () => {
        const regExp = getRegExp("HH");
        expect("0").not.toMatch(regExp);
        expect("00").toMatch(regExp);
        expect("1").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("13").toMatch(regExp);
        expect("23").toMatch(regExp);
        expect("24").not.toMatch(regExp);
      });

      test("(H) should match to 24h format", () => {
        const regExp = getRegExp("H");
        expect("0").toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("13").toMatch(regExp);
        expect("23").toMatch(regExp);
        expect("24").not.toMatch(regExp);
      });

      test("(hh) should match to padded 12h format", () => {
        const regExp = getRegExp("hh");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("12").toMatch(regExp);
        expect("13").not.toMatch(regExp);
        expect("23").not.toMatch(regExp);
        expect("24").not.toMatch(regExp);
      });

      test("(h) should match to 12h format", () => {
        const regExp = getRegExp("h");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("12").toMatch(regExp);
        expect("13").not.toMatch(regExp);
        expect("23").not.toMatch(regExp);
        expect("24").not.toMatch(regExp);
      });
    });

    describe("minutes", () => {
      test("(mm) should match to padded minutes in hours", () => {
        const regExp = getRegExp("mm");
        expect("0").not.toMatch(regExp);
        expect("00").toMatch(regExp);
        expect("1").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("59").toMatch(regExp);
        expect("60").not.toMatch(regExp);
      });

      test("(m) should match to minutes in hours", () => {
        const regExp = getRegExp("m");
        expect("0").toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("59").toMatch(regExp);
        expect("60").not.toMatch(regExp);
      });
    });
    describe("seconds, milliseconds", () => {
      test("(sss) should match to milliseconds", () => {
        const regExp = getRegExp("sss");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("000").toMatch(regExp);
        expect("999").toMatch(regExp);
        expect("0000").not.toMatch(regExp);
      });

      test("(ss) should match to padded seconds in hours", () => {
        const regExp = getRegExp("ss");
        expect("0").not.toMatch(regExp);
        expect("00").toMatch(regExp);
        expect("1").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("59").toMatch(regExp);
        expect("60").not.toMatch(regExp);
      });

      test("(s) should match to seconds in hours", () => {
        const regExp = getRegExp("s");
        expect("0").toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("59").toMatch(regExp);
        expect("60").not.toMatch(regExp);
      });
    });

    describe("other", () => {
      test("(a) should match to am/pm", () => {
        const regExp = getRegExp("a");
        expect("am").toMatch(regExp);
        expect("AM").toMatch(regExp);
        expect("pm").toMatch(regExp);
        expect("PM").toMatch(regExp);
        expect("AP").not.toMatch(regExp);
      });

      test("(Z) should match to any timezone offset", () => {
        const regExp = getRegExp("Z");
        expect("+00:00").toMatch(regExp);
        expect("-00:00").toMatch(regExp);
        expect("00:00").not.toMatch(regExp);
        expect("+0000").toMatch(regExp);
        expect("-0000").toMatch(regExp);
        expect("0000").not.toMatch(regExp);
        expect("+12:00").toMatch(regExp);
        expect("+13:00").not.toMatch(regExp);
        expect("+00:40").not.toMatch(regExp);
      });
    });
  });
});
