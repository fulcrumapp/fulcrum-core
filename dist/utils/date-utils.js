'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var DateUtils = (function () {
  function DateUtils() {
    _classCallCheck(this, DateUtils);
  }

  _createClass(DateUtils, null, [{
    key: 'parseDate',
    value: function parseDate(dateString) {
      return new Date(dateString.replace(/-/g, '/'));
    }
  }, {
    key: 'parseTime',
    value: function parseTime(timeString) {
      if (!(timeString != null && timeString.length === 5)) {
        return null;
      }
      return timeString;
    }
  }, {
    key: 'parseTimestamp',
    value: function parseTimestamp(timestampString) {
      return new Date(parseFloat(timestampString) * 1000);
    }
  }, {
    key: 'formatTimestamp',
    value: function formatTimestamp(date) {
      if (date == null) {
        return null;
      }
      return date.getTime().toFixed(3);
    }
  }, {
    key: 'formatLocalizedDate',
    value: function formatLocalizedDate(date) {
      if (date == null) {
        return null;
      }
      return DateUtils.__formatLocalizedDate(date);
    }
  }, {
    key: '__formatLocalizedDate',
    value: function __formatLocalizedDate(date) {
      if (!_locale2.default.supportsECMA402()) {
        var year = date.getFullYear();
        var month = _lodash2.default.padLeft(date.getMonth() + 1, 2, '0');
        var day = _lodash2.default.padLeft(date.getDate(), 2, '0');
        return year + '-' + month + '-' + day;
      }

      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      return new intl.DateTimeFormat(_locale2.default.currentLocale(), options).format(date);
    }
  }]);

  return DateUtils;
})();

exports.default = DateUtils;
//# sourceMappingURL=date-utils.js.map