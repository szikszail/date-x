export type AvailableLocale = "en" | "hu" | "nl";

export function loadLocale(locale: AvailableLocale): void;
export function test(format: string, dateString: string, ignoreCase = false): boolean;
export function match(format: string, dateString: string, ignoreCase = false): RegExpMatchArray;
