import dateX from "..";
import { SupportedLocale } from "../locales";

const DEFAULT_LOCALE: SupportedLocale = "en";

export class DateFormatAssertionError extends Error {}

const error = (
  shouldMatch: boolean,
  dateString: string,
  format: string,
  locale: SupportedLocale,
  ignoreCase: boolean,
) => {
  const message = [`Expected "${dateString}"`];
  if (ignoreCase) {
    message.push("ignoring casing");
  }
  message.push(`in locale ${locale.toUpperCase()}`, "to");
  if (!shouldMatch) {
    message.push("not");
  }
  message.push(
    `match "${format}", but it`,
    shouldMatch ? "does not!" : "does!",
  );
  return new DateFormatAssertionError(message.join(" "));
};

const assert = (
  shouldMatch: boolean,
  dateString: string,
  format: string,
  {
    locale = DEFAULT_LOCALE,
    ignoreCase = false,
  }: { locale?: SupportedLocale; ignoreCase?: boolean } = {},
) => {
  if (!dateString) {
    throw new TypeError("Date string is not set!");
  }
  if (!format) {
    throw new TypeError("Date format is not set!");
  }
  dateX.loadLocale(locale);
  if (dateX.test(format, dateString, ignoreCase) !== shouldMatch) {
    throw error(shouldMatch, dateString, format, locale, ignoreCase);
  }
};

export const assertDateFormat = assert.bind(null, true);
export const assertNotDateFormat = assert.bind(null, false);
