import locales, { SupportedLocale, LocaleConfig } from "./locales";

export class DateRegExpBuilder {
  public readonly locale: SupportedLocale;
  public readonly localeConfig: LocaleConfig;
  public readonly tokenRegExps: Record<string, string>;
  public readonly allFormatRexExp: string;
  public readonly localizeReqExps: LocaleConfig["localeTokens"];

  constructor(locale?: SupportedLocale) {
    const ucfirst = (str: string) =>
      str[0].toUpperCase() + str.slice(1).toLowerCase();

    this.locale = (locale || "en").toLowerCase() as SupportedLocale;
    if (!locales[this.locale]) {
      throw new Error(`There is no locale: ${this.locale}!`);
    }

    this.localeConfig = locales[this.locale];

    /**
     * Based on AngularJS date format.
     * https://docs.angularjs.org/api/ng/filter/date
     */
    this.tokenRegExps = {
      // Months
      LLLL: this.localeConfig.months.map(ucfirst).join("|"),
      MMMM: this.localeConfig.months.map(ucfirst).join("|"),
      MMM: this.localeConfig.monthsShort.map(ucfirst).join("|"),
      MM: "0[1-9]|1[0-2]",
      M: "[1-9]|1[0-2]",

      // Years
      yyyy: "[12][0-9]{3}",
      yy: "[0-9]{2}",
      y: "[1-9][0-9]?[0-9]?[0-9]?",

      // Quarter
      Q: "[1-4]",

      // Day of week
      EEEE: this.localeConfig.daysOfWeek.map(ucfirst).join("|"),
      EEE: this.localeConfig.daysOfWeekShort.map(ucfirst).join("|"),

      // Relative day
      RRRR: this.localeConfig.relativeDays.map(ucfirst).join("|"),

      // Day of month
      dd: "0[1-9]|[12][0-9]|3[01]",
      d: "[1-9]|[12][0-9]|3[01]",

      // Day of month with ordinal
      Do: "1[123]th|[23]?1st|2?2nd|2?3rd|[12]?[4-9]th|[123]0th",

      // Week of year
      WW: "0[1-9]|[1-4][0-9]|5[0-3]",
      W: "[1-9]|[1-4][0-9]|5[0-3]",
      ww: "0[1-9]|[1-4][0-9]|5[0-3]",
      wo: "1[123]th|[2345]?1st|[245]?2nd|[245]?3rd|[1234]?[4-9]th|[12345]0th",
      w: "[1-9]|[1-4][0-9]|5[0-3]",

      // Week year
      GGGG: "[12][0-9]{3}",
      gggg: "[12][0-9]{3}",

      // Hours in day
      HH: "[01][0-9]|2[0-3]",
      H: "[0-9]|1[0-9]|2[0-3]",
      hh: "0[1-9]|1[0-2]",
      h: "[1-9]|1[0-2]",
      kk: "0[1-9]|1[0-9]|2[0-4]",
      k: "[1-9]|1[0-9]|2[0-4]",

      // Minutes in hour
      mm: "[0-5][0-9]",
      m: "[1-5]?[0-9]",

      // Milliseconds
      sss: "[0-9]{3}",

      // Seconds in minutes
      ss: "[0-5][0-9]",
      s: "[1-5]?[0-9]",

      // Unix timestamp
      X: "\\d{10}",
      x: "\\d{13}",

      // AP/PM
      a: "[aApP][mM]",

      // Timezone offset
      Z: "[+-](?:0[0-9]|1[0-2]):?00",
      zzz: "(?:[A-Z][a-z]+\\s)+Time",
      z: "[A-Z]{2,3}T|UTC",
    };

    this.allFormatRexExp =
      "(" +
      Object.keys(this.tokenRegExps)
        .map((token) => `(?:${token})`)
        .join("|") +
      ")";
    this.localizeReqExps = this.localeConfig.localeTokens;
  }

  public buildRegExpStringByFormat(format: string, shouldGroup?: boolean) {
    return `^${this.replaceTokens(format, shouldGroup)}$`;
  }

  public buildLocaleRegExpStringByFormat(
    format: string,
    shouldGroup?: boolean,
  ) {
    for (const [token, rx] of Object.entries(this.localizeReqExps)) {
      format = format.replace(token, rx);
    }
    return this.buildRegExpStringByFormat(format, shouldGroup);
  }

  public groupRegExpString(regExpString: string, shouldGroup?: boolean) {
    if (shouldGroup === false) {
      return regExpString;
    }
    if (shouldGroup === true) {
      return `(${regExpString})`;
    }
    return `(?:${regExpString})`;
  }

  public replaceTokens(formatString: string, shouldGroup?: boolean) {
    const allFormatRexExp = new RegExp(this.allFormatRexExp, "g");
    let match, regExpString;
    while ((match = allFormatRexExp.exec(formatString)) !== null) {
      regExpString = this.groupRegExpString(
        this.tokenRegExps[match[1]],
        shouldGroup,
      );
      if (!match.index || formatString[match.index - 1] !== "!") {
        formatString =
          formatString.substring(0, match.index) +
          regExpString +
          formatString.substring(match.index + match[1].length);
        allFormatRexExp.lastIndex = match.index + regExpString.length;
      } else {
        allFormatRexExp.lastIndex = match.index + 1;
      }
    }
    return formatString.replace(/!([^!])/g, "$1").replace(/!!/g, "!");
  }
}
