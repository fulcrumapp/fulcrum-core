export default class DateUtils {
    static parseDate(dateString: any): Date | null;
    static parseTime(timeString: any): any;
    static formatTime(date: any): string;
    static formatTimeSeconds(seconds: any, milliseconds?: boolean): string;
    static formatTimeParts(hours: any, minutes: any, seconds: any): string;
    static parseISOTimestamp(timestampString: any): Date | null;
    static parseEpochTimestamp(timestampString: any): Date | null;
    static formatISOTimestamp(date: any): any;
    static formatEpochTimestamp(date: any): string | null;
    static isValidTime(timeString: any): boolean;
    static isValidDate(dateString: any): boolean | null;
    static formatDate(date: any): string | null;
    static formatLocalizedDate(date: any): any;
    static formatLocalizedTimestamp(date: any): any;
    static formatRelativeTimestamp(date: any): any;
    static __formatLocalizedDate(date: any): any;
}
