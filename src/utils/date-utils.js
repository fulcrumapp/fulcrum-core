import Locale from './locale';
import padStart from 'lodash.padstart';
import relativeDate from 'relative-date';

let intl = null;

if (typeof Intl !== 'undefined') {
  intl = global.Intl;
}

export default class DateUtils {
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

    let [ hours, minutes ] = timeString.split(':');

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
    const hours = padStart(date.getHours(), 2, '0');
    const minutes = padStart(date.getMinutes(), 2, '0');

    return hours + ':' + minutes;
  }

  static formatTimeSeconds(seconds, milliseconds = false) {
    const ss = +seconds % 60;
    const div = (+seconds - ss) / 60;
    const mm = div % 60;
    const hh = (div - mm) / 60;
    const ms = (ss * 1000 % 1000);

    const h = padStart(Math.floor(hh), 2, '0');
    const m = padStart(Math.floor(mm), 2, '0');
    const s = padStart(Math.floor(ss), 2, '0');
    const u = padStart(Math.floor(ms), 3, '0');

    return h + ':' + m + ':' + s + (milliseconds ? '.' + u : '');
  }

  static formatTimeParts(hours, minutes, seconds) {
    const h = padStart(+hours, 2, '0');
    const m = padStart(+minutes, 2, '0');
    const s = padStart(+seconds, 2, '0');

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

    if (timeString.length !== 5) {
      return false;
    }

    const parts = timeString.split(':');

    if (parts.length !== 2) {
      return false;
    }

    const [ hourPart, minutePart ] = parts;

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

    const [ yearPart, monthPart, dayPart ] = parts;

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
    const month = padStart(date.getMonth() + 1, 2, '0');
    const day = padStart(date.getDate(), 2, '0');

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
    return relativeDate(date);
  }

  static __formatLocalizedDate(date) {
    if (!Locale.supportsECMA402()) {
      const year = date.getFullYear();
      const month = padStart(date.getMonth() + 1, 2, '0');
      const day = padStart(date.getDate(), 2, '0');
      return year + '-' + month + '-' + day;
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    let result = null;

    try {
      result = new intl.DateTimeFormat(Locale.currentLocale(), options).format(date);
    } catch (ex) {
      // RangeError: Provided date is not in valid range.
    }

    return result;
  }
}
