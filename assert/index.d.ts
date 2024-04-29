import { AvailableLocale } from "..";

export class DateFormatAssertionError extends Error { }
export type DateFormatAssertOptions = {
    locale?: AvailableLocale;
    ignoreCase?: boolean;
}
export declare function assertDateFormat(dateString: string, format: string, options?: DateFormatAssertOptions): void;
export declare function assertNotDateFormat(dateString: string, format: string, options?: DateFormatAssertOptions): void;