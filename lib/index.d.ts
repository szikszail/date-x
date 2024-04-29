export type AvailableLocale = "en" | "hu" | "nl";

export declare function loadLocale(locale: AvailableLocale): void;
export declare function buildRegExp(format: string, ignoreCase?: boolean): RegExp;
export declare function test(format: string, dateString: string, ignoreCase?: boolean): boolean;
export declare function match(format: string, dateString: string, ignoreCase?: boolean): RegExpMatchArray | null;
