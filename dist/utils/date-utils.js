"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locale_1 = __importDefault(require("./locale"));
const lodash_padstart_1 = __importDefault(require("lodash.padstart"));
const relative_date_1 = __importDefault(require("relative-date"));
let intl = null;
if (typeof Intl !== 'undefined') {
    intl = global.Intl;
}
class DateUtils {
    static parseDate(dateString) {
        const date = new Date(dateString.replace(/-/g, '/'));
        if (date == null || isNaN(date.getTime())) {
            return null;
        }
        return date;
    }
    static parseTime(timeString) {
        if (!((timeString != null) && timeString.length === 5)) {
            return null;
        }
        let [hours, minutes] = timeString.split(':');
        if (hours == null || minutes == null) {
            return null;
        }
        hours = +hours;
        minutes = +minutes;
        if (isNaN(hours) || isNaN(minutes)) {
            return null;
        }
        return (hours * 60) + minutes;
    }
    static formatTime(date) {
        const hours = (0, lodash_padstart_1.default)(date.getHours(), 2, '0');
        const minutes = (0, lodash_padstart_1.default)(date.getMinutes(), 2, '0');
        return hours + ':' + minutes;
    }
    static formatTimeSeconds(seconds, milliseconds = false) {
        const ss = +seconds % 60;
        const div = (+seconds - ss) / 60;
        const mm = div % 60;
        const hh = (div - mm) / 60;
        const ms = (ss * 1000 % 1000);
        const h = (0, lodash_padstart_1.default)(Math.floor(hh), 2, '0');
        const m = (0, lodash_padstart_1.default)(Math.floor(mm), 2, '0');
        const s = (0, lodash_padstart_1.default)(Math.floor(ss), 2, '0');
        const u = (0, lodash_padstart_1.default)(Math.floor(ms), 3, '0');
        return h + ':' + m + ':' + s + (milliseconds ? '.' + u : '');
    }
    static formatTimeParts(hours, minutes, seconds) {
        const h = (0, lodash_padstart_1.default)(+hours, 2, '0');
        const m = (0, lodash_padstart_1.default)(+minutes, 2, '0');
        const s = (0, lodash_padstart_1.default)(+seconds, 2, '0');
        return h + ':' + m + ':' + s;
    }
    static parseISOTimestamp(timestampString) {
        if (!timestampString) {
            return null;
        }
        return new Date(timestampString);
    }
    static parseEpochTimestamp(timestampString) {
        if (!timestampString) {
            return null;
        }
        return new Date(parseFloat(timestampString) * 1000);
    }
    static formatISOTimestamp(date) {
        if (date == null || isNaN(date.getTime())) {
            return null;
        }
        return date.toISOString();
    }
    static formatEpochTimestamp(date) {
        if (date == null || isNaN(date.getTime())) {
            return null;
        }
        return (date.getTime() / 1000).toFixed(3);
    }
    static isValidTime(timeString) {
        if (timeString == null) {
            return true;
        }
        if (timeString.length < 5 || timeString.length > 8) {
            return false;
        }
        const parts = timeString.split(':');
        if (parts.length < 2 || parts.length > 3) {
            return false;
        }
        const [hourPart, minutePart, secondsPart] = parts;
        if (hourPart.length !== 2 || minutePart.length !== 2) {
            return false;
        }
        const hour = +hourPart;
        const minute = +minutePart;
        if (isNaN(hour) || isNaN(minute)) {
            return false;
        }
        if (hour < 0 || hour >= 24) {
            return false;
        }
        if (minute < 0 || minute >= 60) {
            return false;
        }
        if (secondsPart) {
            if (secondsPart.length !== 2) {
                return false;
            }
            const seconds = +secondsPart;
            if (isNaN(seconds)) {
                return false;
            }
            if (seconds < 0 || seconds >= 60) {
                return false;
            }
        }
        return true;
    }
    static isValidDate(dateString) {
        if (dateString == null) {
            return true;
        }
        if (dateString.length !== 10) {
            return false;
        }
        const parts = dateString.split('-');
        if (parts.length !== 3) {
            return false;
        }
        const [yearPart, monthPart, dayPart] = parts;
        if (yearPart.length !== 4 ||
            monthPart.length !== 2 ||
            dayPart.length !== 2) {
            return false;
        }
        const year = +yearPart;
        const month = +monthPart;
        const day = +dayPart;
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return false;
        }
        const parsed = DateUtils.parseDate(dateString);
        return parsed && !isNaN(parsed);
    }
    static formatDate(date) {
        if (date == null) {
            return null;
        }
        const year = date.getFullYear();
        const month = (0, lodash_padstart_1.default)(date.getMonth() + 1, 2, '0');
        const day = (0, lodash_padstart_1.default)(date.getDate(), 2, '0');
        return year + '-' + month + '-' + day;
    }
    static formatLocalizedDate(date) {
        if (date == null) {
            return null;
        }
        return DateUtils.__formatLocalizedDate(date);
    }
    static formatLocalizedTimestamp(date) {
        if (date == null) {
            return null;
        }
        return date.toLocaleString();
    }
    static formatRelativeTimestamp(date) {
        return (0, relative_date_1.default)(date);
    }
    static __formatLocalizedDate(date) {
        if (!locale_1.default.supportsECMA402()) {
            const year = date.getFullYear();
            const month = (0, lodash_padstart_1.default)(date.getMonth() + 1, 2, '0');
            const day = (0, lodash_padstart_1.default)(date.getDate(), 2, '0');
            return year + '-' + month + '-' + day;
        }
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let result = null;
        try {
            result = new intl.DateTimeFormat(locale_1.default.currentLocale(), options).format(date);
        }
        catch (ex) {
            // RangeError: Provided date is not in valid range.
        }
        return result;
    }
}
exports.default = DateUtils;
//# sourceMappingURL=date-utils.js.map