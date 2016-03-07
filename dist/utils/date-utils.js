'use strict';

exports.__esModule = true;

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var intl = null;

if (typeof Intl !== 'undefined') {
  intl = global.Intl;
}

var DateUtils = function () {
  function DateUtils() {
    _classCallCheck(this, DateUtils);
  }

  DateUtils.parseDate = function parseDate(dateString) {
    return new Date(dateString.replace(/-/g, '/'));
  };

  DateUtils.parseTime = function parseTime(timeString) {
    if (!(timeString != null && timeString.length === 5)) {
      return null;
    }
    return timeString;
  };

  DateUtils.formatTime = function formatTime(date) {
    var hours = _lodash2.default.padStart(date.getHours(), 2, '0');
    var minutes = _lodash2.default.padStart(date.getMinutes(), 2, '0');

    return hours + ':' + minutes;
  };

  DateUtils.parseTimestamp = function parseTimestamp(timestampString) {
    return new Date(parseFloat(timestampString) * 1000);
  };

  DateUtils.formatTimestamp = function formatTimestamp(date) {
    if (date == null) {
      return null;
    }
    return date.getTime().toFixed(3);
  };

  DateUtils.formatDate = function formatDate(date) {
    var year = date.getFullYear();
    var month = _lodash2.default.padStart(date.getMonth() + 1, 2, '0');
    var day = _lodash2.default.padStart(date.getDate(), 2, '0');

    return year + '-' + month + '-' + day;
  };

  DateUtils.formatLocalizedDate = function formatLocalizedDate(date) {
    if (date == null) {
      return null;
    }
    return DateUtils.__formatLocalizedDate(date);
  };

  DateUtils.__formatLocalizedDate = function __formatLocalizedDate(date) {
    if (!_locale2.default.supportsECMA402()) {
      var year = date.getFullYear();
      var month = _lodash2.default.padStart(date.getMonth() + 1, 2, '0');
      var day = _lodash2.default.padStart(date.getDate(), 2, '0');
      return year + '-' + month + '-' + day;
    }

    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new intl.DateTimeFormat(_locale2.default.currentLocale(), options).format(date);
  };

  return DateUtils;
}();

exports.default = DateUtils;
//# sourceMappingURL=date-utils.js.map