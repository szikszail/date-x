import { AvailableLocale } from "..";

export class DateFormatAssertionError extends Error { };
export interface DateFormatAssertOptions {
    locale?: AvailableLocale;
    ignoreCase?: boolean;
}
export function assertDateFormat(dateString: string, format: string, options?: DateFormatAssertOptions): void;
export function assertNotDateFormat(dateString: string, format: string, options?: DateFormatAssertOptions): void;