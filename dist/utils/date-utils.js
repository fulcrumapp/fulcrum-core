'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let intl = null;

if (typeof Intl !== 'undefined') {
  intl = global.Intl;
}

class DateUtils {
  static parseDate(dateString) {
    return new Date(dateString.replace(/-/g, '/'));
  }

  static parseTime(timeString) {
    if (!(timeString != null && timeString.length === 5)) {
      return null;
    }
    return timeString;
  }

  static formatTime(date) {
    const hours = _lodash2.default.padLeft(date.getHours(), 2, '0');
    const minutes = _lodash2.default.padLeft(date.getMinutes(), 2, '0');

    return hours + ':' + minutes;
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

  static formatDate(date) {
    const year = date.getFullYear();
    const month = _lodash2.default.padLeft(date.getMonth() + 1, 2, '0');
    const day = _lodash2.default.padLeft(date.getDate(), 2, '0');

    return year + '-' + month + '-' + day;
  }

  static formatLocalizedDate(date) {
    if (date == null) {
      return null;
    }
    return DateUtils.__formatLocalizedDate(date);
  }

  static __formatLocalizedDate(date) {
    if (!_locale2.default.supportsECMA402()) {
      const year = date.getFullYear();
      const month = _lodash2.default.padLeft(date.getMonth() + 1, 2, '0');
      const day = _lodash2.default.padLeft(date.getDate(), 2, '0');
      return year + '-' + month + '-' + day;
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new intl.DateTimeFormat(_locale2.default.currentLocale(), options).format(date);
  }
}
exports.default = DateUtils;
//# sourceMappingURL=date-utils.js.map