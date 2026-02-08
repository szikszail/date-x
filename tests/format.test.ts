import { DateRegExpBuilder } from "../src/format";
import { LocaleConfig } from "../src/locales";

describe("date-parser, formats", () => {
  let formats: DateRegExpBuilder;

  beforeEach(() => {
    formats = new DateRegExpBuilder();
  });

  const getRegExp = (format: string) =>
    new RegExp(formats.buildLocaleRegExpStringByFormat(format));

  describe("localizeRegExps", () => {
    describe("en", () => {
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

    describe("hu", () => {
      beforeEach(() => {
        formats = new DateRegExpBuilder("hu");
      });

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

    describe("quarter", () => {
      test("(Q) should match the quarter", () => {
        const regExp = getRegExp("Q");
        expect("1").toMatch(regExp);
        expect("2").toMatch(regExp);
        expect("3").toMatch(regExp);
        expect("4").toMatch(regExp);
        expect("5").not.toMatch(regExp);
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

      test("(GGGG) should match to full years", () => {
        const regExp = getRegExp("GGGG");
        expect("0").not.toMatch(regExp);
        expect("11").not.toMatch(regExp);
        expect("222").not.toMatch(regExp);
        expect("1986").toMatch(regExp);
        expect("2016").toMatch(regExp);
        expect("3333").not.toMatch(regExp);
        expect("44444").not.toMatch(regExp);
      });

      test("(gggg) should match to full years", () => {
        const regExp = getRegExp("gggg");
        expect("0").not.toMatch(regExp);
        expect("11").not.toMatch(regExp);
        expect("222").not.toMatch(regExp);
        expect("1986").toMatch(regExp);
        expect("2016").toMatch(regExp);
        expect("3333").not.toMatch(regExp);
        expect("44444").not.toMatch(regExp);
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

      test("(Do) should match to number of day of month with ordinal", () => {
        const regExp = getRegExp("Do");
        expect("0nd").not.toMatch(regExp);
        expect("00nd").not.toMatch(regExp);
        expect("1st").toMatch(regExp);
        expect("01st").not.toMatch(regExp);
        expect("11st").not.toMatch(regExp);
        expect("12nd").not.toMatch(regExp);
        expect("13rd").not.toMatch(regExp);
        expect("11th").toMatch(regExp);
        expect("12th").toMatch(regExp);
        expect("13th").toMatch(regExp);
        expect("25th").toMatch(regExp);
        expect("22nd").toMatch(regExp);
        expect("23rd").toMatch(regExp);
        expect("31st").toMatch(regExp);
        expect("32nd").not.toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("25").not.toMatch(regExp);
        expect("52").not.toMatch(regExp);
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
        expect("25th").not.toMatch(regExp);
        expect("52nd").not.toMatch(regExp);
      });

      test("(wo) should match to number of week of year with ordinal", () => {
        const regExp = getRegExp("wo");
        expect("0nd").not.toMatch(regExp);
        expect("00nd").not.toMatch(regExp);
        expect("1st").toMatch(regExp);
        expect("01st").not.toMatch(regExp);
        expect("11st").not.toMatch(regExp);
        expect("12nd").not.toMatch(regExp);
        expect("13rd").not.toMatch(regExp);
        expect("11th").toMatch(regExp);
        expect("12th").toMatch(regExp);
        expect("13th").toMatch(regExp);
        expect("25th").toMatch(regExp);
        expect("52nd").toMatch(regExp);
        expect("53rd").toMatch(regExp);
        expect("54th").not.toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("25").not.toMatch(regExp);
        expect("52").not.toMatch(regExp);
        expect("53").not.toMatch(regExp);
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

      test("(kk) should match to padded 24h format, starting 1", () => {
        const regExp = getRegExp("kk");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").not.toMatch(regExp);
        expect("01").toMatch(regExp);
        expect("13").toMatch(regExp);
        expect("23").toMatch(regExp);
        expect("24").toMatch(regExp);
        expect("25").not.toMatch(regExp);
      });

      test("(k) should match to 24h format, starting 1", () => {
        const regExp = getRegExp("k");
        expect("0").not.toMatch(regExp);
        expect("00").not.toMatch(regExp);
        expect("1").toMatch(regExp);
        expect("01").not.toMatch(regExp);
        expect("13").toMatch(regExp);
        expect("23").toMatch(regExp);
        expect("24").toMatch(regExp);
        expect("25").not.toMatch(regExp);
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

      test("(zzz) should match to any unabbreviated timezone", () => {
        const regExp = getRegExp("zzz");
        expect("EST").not.toMatch(regExp);
        expect("CEST").not.toMatch(regExp);
        expect("UTC").not.toMatch(regExp);
        expect("PST").not.toMatch(regExp);
        expect("Eastern Standard Time").toMatch(regExp);
        expect("Australian Eastern Daylight Time").toMatch(regExp);
        expect("Coordinated Universal Time").toMatch(regExp);
      });

      test("(z) should match to any abbreviated timezone", () => {
        const regExp = getRegExp("z");
        expect("EST").toMatch(regExp);
        expect("CEST").toMatch(regExp);
        expect("UTC").toMatch(regExp);
        expect("PST").toMatch(regExp);
        expect("Eastern Standard Time").not.toMatch(regExp);
        expect("Australian Eastern Daylight Time").not.toMatch(regExp);
        expect("Coordinated Universal Time").not.toMatch(regExp);
      });

      test("(X) should match unix timestamp in seconds", () => {
        const regExp = getRegExp("X");
        const now = Date.now();
        expect(now.toString()).not.toMatch(regExp);
        expect(Math.floor(now / 1e3).toString()).toMatch(regExp);
      });

      test("(x) should match unix timestamp in milliseconds", () => {
        const regExp = getRegExp("x");
        const now = Date.now();
        expect(now.toString()).toMatch(regExp);
        expect(Math.floor(now / 1e3).toString()).not.toMatch(regExp);
      });
    });

    describe("literals", () => {
      test("(!) should handle character as literal", () => {
        const regExp = getRegExp("!a");
        expect("a").toMatch(regExp);
        expect("AM").not.toMatch(regExp);
      });

      test("(!!) should handle ! as a character literal", () => {
        const regExp = getRegExp("!!");
        expect("!").toMatch(regExp);
        expect("!a").not.toMatch(regExp);
      });
    });

    describe("complex", () => {
      test("should handle complex expression", () => {
        const regExp = getRegExp("MMMM d, yyyy H a");
        expect("March 3, 2020 11 AM").toMatch(regExp);
        expect("Mar 03, 20 1a").not.toMatch(regExp);
      });

      test("should handle complex expression with literals", () => {
        const regExp = getRegExp("MMMM d, yyyy !a!t H a CEST");
        expect("March 3, 2020 at 11 AM CEST").toMatch(regExp);
        expect("March 3, 2020 AMt 11 AM CEST").not.toMatch(regExp);
      });
    });
  });

  describe("_groupRegExpString()", () => {
    test("should group with not matching group", () => {
      expect(formats.groupRegExpString("string")).toEqual("(?:string)");
    });

    test("should group with matching group", () => {
      expect(formats.groupRegExpString("string", true)).toEqual("(string)");
    });

    test("should not group if prohibited", () => {
      expect(formats.groupRegExpString("string", false)).toEqual("string");
    });
  });

  describe("buildRegExpStringByFormat()", () => {
    test("should replace all possible tokens", () => {
      const format = Object.keys(formats.tokenRegExps).join(":");
      const expected =
        "^" +
        Object.keys(formats.tokenRegExps)
          .map((token) => "(?:" + formats.tokenRegExps[token] + ")")
          .join(":") +
        "$";

      expect(formats.buildRegExpStringByFormat(format)).toEqual(expected);
    });
  });

  describe("buildLocaleRegExpStringByFormat()", () => {
    test("should replace all possible locale tokens", () => {
      const format = Object.keys(formats.localizeReqExps).join(":");
      const expected =
        "^" +
        formats.replaceTokens(
          Object.keys(formats.localizeReqExps)
            .map(
              (token) =>
                formats.localizeReqExps[
                  token as keyof LocaleConfig["localeTokens"]
                ],
            )
            .join(":"),
        ) +
        "$";

      expect(formats.buildLocaleRegExpStringByFormat(format)).toEqual(expected);
    });
  });
});
