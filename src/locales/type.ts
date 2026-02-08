export type LocaleConfig = {
  readonly months: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  readonly monthsShort: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  readonly daysOfWeek: [string, string, string, string, string, string, string];
  readonly daysOfWeekShort: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  readonly relativeDays: [string, string, string];
  readonly localeTokens: {
    readonly shortTime: string;
    readonly mediumTime: string;
    readonly shortDate: string;
    readonly mediumDate: string;
    readonly longDate: string;
    readonly fullDate: string;
    readonly short: string;
    readonly medium: string;
  };
};

export type SupportedLocale = "en" | "hu" | "nl";
