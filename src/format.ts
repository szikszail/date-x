import { DateFormat, DateFormatToken, LocaleConfig, LocaleTokenConfig, RegExpConfig, RegExpString } from "./types";
import { buildArrayRegexp, mg, nmg } from "./utils";

export class DateRegExpBuilder {
  private locale: string;
  private localeConfig: LocaleConfig;
  private tokenRegExps: RegExpConfig;
  private allFormatRegExp: RegExpString;

  constructor(locale?: string) {
    this.locale = (locale || 'en').toLowerCase();
    this.loadLocaleConfig();
  }

  private loadLocaleConfig() {
    try {
      // @ts-ignore
      this.loadLocaleConfig = require(`./locales/${this.locale}`);
    } catch {
      throw new Error(`There is no locale: ${this.locale}`);
    }

    this.tokenRegExps = {
      // Months
      LLLL: buildArrayRegexp(this.localeConfig.months),
      MMMM: buildArrayRegexp(this.localeConfig.months),
      MMM: buildArrayRegexp(this.localeConfig.monthsShort),
      MM: '0[1-9]|1[0-2]',
      M: '[1-9]|1[0-2]',

      // Years
      yyyy: '[12][0-9]{3}',
      yy: '[0-9]{2}',
      y: '[1-9][0-9]?[0-9]?[0-9]?',

      // Day of the week
      EEEE: buildArrayRegexp(this.localeConfig.daysOfWeek),
      EEE: buildArrayRegexp(this.localeConfig.daysOfWeekShort),

      // Relative day
      RRRR: buildArrayRegexp(this.localeConfig.relativeDays),

      // Day of month
      dd: '0[1-9]|[12][0-9]|3[01]',
      d: '[1-9]|[12][0-9]|3[01]',

      // Week of year
      ww: '[0-4][0-9]|5[0-3]',
      w: '[0-9]|[1-4][0-9]|5[0-3]',

      // Hours in day
      HH: '[01][0-9]|2[0-3]',
      H: '[0-9]|1[0-9]|2[0-3]',
      hh: '0[1-9]|1[0-2]',
      h: '[1-9]|1[0-2]',

      // Minutes in hour
      mm: '[0-5][0-9]',
      m: '[1-5]?[0-9]',

      // Milliseconds
      sss: '[0-9]{3}',

      // Seconds in minutes
      ss: '[0-5][0-9]',
      s: '[1-5]?[0-9]',

      // AP/PM
      a: '[aApP][mM]',

      // Timezone offset
      Z: '[+-](?:0[0-9]|1[0-2]):?00'
    };

    this.allFormatRegExp = mg(...Object.keys(this.tokenRegExps).map(t => nmg(t)));
  }

  public buildRegExpStringByFormat(format: DateFormat, shouldGroup: boolean | null): RegExpString {
    return `^${this.replaceTokens(format, shouldGroup)}$`;
  }

  public buildLocaleRegExpStringByFormat(format: DateFormat, shouldGroup: boolean | null): RegExpString {
    Object.keys(this.localeConfig.localeTokens).forEach(t => {
      format = format.replace(
        new RegExp(t, 'g'),
        this.localeConfig.localeTokens[t as keyof LocaleTokenConfig]
      );
    })
    return this.buildRegExpStringByFormat(format, shouldGroup);
  }

  private replaceTokens(formatString: DateFormat, shouldGroup: boolean | null): RegExpString {
    const allFormatRegExp = new RegExp(this.allFormatRegExp, 'g');
    let match: RegExpMatchArray, regExpString: RegExpString;
    while ((match = allFormatRegExp.exec(formatString)) !== null) {
      regExpString = this.groupRegExpString(this.tokenRegExps[match[1] as DateFormatToken], shouldGroup);
      if (!match.index || formatString[match.index - 1] !== "!") {
        formatString =
          formatString.slice(0, match.index)
          + regExpString
          + formatString.slice(match.index + match[1].length);
        allFormatRegExp.lastIndex = match.index + regExpString.length;
      } else {
        allFormatRegExp.lastIndex = match.index + 1;
      }
    }
    return formatString.replace(/!([^!])/g, "$1").replace(/!!/g, "!");
  }

  private groupRegExpString(regExpString: RegExpString, shouldGroup: boolean | null): RegExpString {
    if (shouldGroup === false) {
      return regExpString;
    }
    if (shouldGroup === true) {
      return mg(regExpString);
    }
    return nmg(regExpString);
  }
}