import Locale from './locale';
import _ from 'lodash';
import relativeDate from 'relative-date';

let intl = null;

if (typeof Intl !== 'undefined') {
  intl = global.Intl;
}

export default class DateUtils {
  static parseDate(dateString) {
    return new Date(dateString.replace(/-/g, '/'));
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
    const hours = _.padStart(date.getHours(), 2, '0');
    const minutes = _.padStart(date.getMinutes(), 2, '0');

    return hours + ':' + minutes;
  }

  static formatTimeSeconds(seconds, milliseconds = false) {
    const ss = +seconds % 60;
    const div = (+seconds - ss) / 60;
    const mm = div % 60;
    const hh = (div - mm) / 60;
    const ms = (ss * 1000 % 1000);

    const h = _.padStart(Math.floor(hh), 2, '0');
    const m = _.padStart(Math.floor(mm), 2, '0');
    const s = _.padStart(Math.floor(ss), 2, '0');
    const u = _.padStart(Math.floor(ms), 3, '0');

    return h + ':' + m + ':' + s + (milliseconds ? '.' + u : '');
  }

  static formatTimeParts(hours, minutes, seconds) {
    const h = _.padStart(+hours, 2, '0');
    const m = _.padStart(+minutes, 2, '0');
    const s = _.padStart(+seconds, 2, '0');

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

  static formatDate(date) {
    const year = date.getFullYear();
    const month = _.padStart(date.getMonth() + 1, 2, '0');
    const day = _.padStart(date.getDate(), 2, '0');

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
      const month = _.padStart(date.getMonth() + 1, 2, '0');
      const day = _.padStart(date.getDate(), 2, '0');
      return year + '-' + month + '-' + day;
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new intl.DateTimeFormat(Locale.currentLocale(), options).format(date);
  }
}
