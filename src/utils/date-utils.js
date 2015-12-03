import Locale from './locale';
import _ from 'lodash';

let intl = null;

if (typeof Intl !== 'undefined') {
  intl = (window || global).Intl;
}

export default class DateUtils {
  static parseDate(dateString) {
    return new Date(dateString);
  }

  static parseTime(timeString) {
    if (!((timeString != null) && timeString.length === 5)) {
      return null;
    }
    return timeString;
  }

  static parseTimestamp(timestampString) {
    return new Date(parseFloat(timestampString) * 1000);
  }

  static formatTimestamp(date) {
    if (date == null) {
      return null;
    }
    return date.getTime().toFixed(3);
  }

  static formatLocalizedDate(date) {
    if (date == null) {
      return null;
    }
    return DateUtils.__formatLocalizedDate(date);
  }

  static __formatLocalizedDate(date) {
    if (!Locale.supportsECMA402()) {
      const year = date.getFullYear();
      const month = _.padLeft(date.getMonth() + 1, 2, '0');
      const day = _.padLeft(date.getDate(), 2, '0');
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
