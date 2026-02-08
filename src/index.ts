import { DateRegExpBuilder } from "./format";
import { SupportedLocale } from "./locales";

/**
 * It provides the ability to compare date string with
 * custom date format expression.
 */
export class DateParser {
  private dateFormat: DateRegExpBuilder;

  constructor() {
    this.loadLocale("en");
  }

  /**
   * Loads the specific configuration for the given locale.
   * It contains the month and day names and locale specific
   * date format, like: shortDate, etc.
   *
   * @param locale The locale needs to be loaded in two-digits format.
   */
  public loadLocale(locale: SupportedLocale) {
    this.dateFormat = new DateRegExpBuilder(locale);
  }

  /**
   * Builds the regular expression based on the given format.
   *
   * @param format The date format needs to be checked against.
   * @param [ignoreCase] Should the test executed in case sensitive or not.
   * @param [shouldGroup] Should the regular expression grouped or not.
   *
   * @returns The regular expression based on the given format.
   */
  public buildRegExp(
    format: string,
    ignoreCase?: boolean,
    shouldGroup?: boolean,
  ) {
    return new RegExp(
      this.dateFormat.buildRegExpStringByFormat(format, shouldGroup),
      ignoreCase ? "i" : undefined,
    );
  }

  /**
   * It tests whether the given dateString matches
   * the given date format. The test is case sensitive, be default,
   * but with ignoraCase parameter it could be set to case insensitive.
   *
   * @param format The date format needs to be checked against.
   * @param dateString The date string needs to be fixed.
   * @param [ignoreCase] Should the test executed in case sensitive or not.
   *
   * @returns True if the dateString matches the given format.
   */
  public test(format: string, dateString: string, ignoreCase = false) {
    const formatRegExp = this.buildRegExp(format, ignoreCase);
    return formatRegExp.test(dateString);
  }

  /**
   * It tests whether the given dateString matches
   * the given date format and returns the matched parts of the dateString.
   * The test is case sensitive, be default, but with ignoraCase parameter
   * it could be set to case insensitive.
   *
   * @param format The date format needs to be checked against.
   * @param dateString The date string needs to be fixed.
   * @param [ignoreCase] Should the test executed in case sensitive or not.
   *
   * @returns The matched groups or null if it doesn't match.
   */
  public match(format: string, dateString: string, ignoreCase = false) {
    const formatRegExp = this.buildRegExp(format, ignoreCase, true);
    return dateString.match(formatRegExp);
  }
}

const parser = new DateParser();
export default parser;
