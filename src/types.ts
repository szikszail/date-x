export type January = string;
export type February = string;
export type March = string;
export type April = string;
export type May = string;
export type June = string;
export type July = string;
export type August = string;
export type September = string;
export type October = string;
export type November = string;
export type December = string;
export type MonthNames = [
  January, February, March, April,
  May, June, July, August,
  September, October, November, December,
];

export type Monday = string;
export type Tuesday = string;
export type Wednesday = string;
export type Thursday = string;
export type Friday = string;
export type Saturday = string;
export type Sunday = string;
export type WeekDayNames = [
  Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,
];

export type Yesterday = string;
export type Today = string;
export type Tomorrow = string;
export type RelativeDays = [Yesterday, Today, Tomorrow];

export type DateFormat = string;

export interface LocaleTokenConfig {
  shortTime: DateFormat;
  mediumTime: DateFormat;
  shortDate: DateFormat;
  mediumDate: DateFormat;
  longDate: DateFormat;
  fullDate: DateFormat;
  short: DateFormat;
  medium: DateFormat;
};

export interface LocaleConfig {
  months: MonthNames;
  monthsShort: MonthNames;
  daysOfWeek: WeekDayNames;
  daysOfWeekShort: WeekDayNames;
  relativeDays: RelativeDays;
  localeTokens: LocaleTokenConfig;
}


/**
 * Based on AngularJS date format.
 * @see https://docs.angularjs.org/api/ng/filter/date
 */
export enum DateFormatToken {
  /** TBD */
  LLLL = 'LLLL',
  MMMM = 'MMMM',
  MMM = 'MMM',
  MM = 'MM',
  M = 'M',
  /** 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010) */
  yyyy = 'yyyy',
  /** 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10) */
  yy = 'yy',
  /** 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199) */
  y = 'y',
  EEEE = 'EEEE',
  EEE = 'EEE',
  RRRR = 'RRRR',
  dd = 'dd',
  d = 'd',
  ww = 'ww',
  w = 'w',
  HH = 'HH',
  H = 'H',
  hh = 'hh',
  h = 'h',
  mm = 'mm',
  m = 'm',
  sss = 'sss',
  ss = 'ss',
  s = 's',
  a = 'a',
  Z = 'Z',
};

export type RegExpString = string;
export type RegExpConfig = Record<DateFormatToken, RegExpString>;
