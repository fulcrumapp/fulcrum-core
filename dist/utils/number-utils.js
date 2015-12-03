'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MachineFormatterOptions = {
  style: 'decimal',
  useGrouping: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 20
};

var intl = null;

if (typeof Intl !== 'undefined') {
  intl = global.Intl;
}

var NumberUtils = (function () {
  function NumberUtils() {
    _classCallCheck(this, NumberUtils);
  }

  _createClass(NumberUtils, null, [{
    key: 'parseDouble',
    value: function parseDouble(input) {
      return +input;
    }
  }, {
    key: 'localizedStringFromMachineString',
    value: function localizedStringFromMachineString(machineString, allowDecimals) {
      return machineString;
    }
  }, {
    key: 'formatMachine',
    value: function formatMachine(number) {
      if (intl) {
        if (NumberUtils.machineFormatter == null) {
          NumberUtils.machineFormatter = new intl.NumberFormat(['en-US'], MachineFormatterOptions);
        }
      }

      return NumberUtils.formatWithFormatter(NumberUtils.machineFormatter, number);
    }
  }, {
    key: 'formatCurrency',
    value: function formatCurrency(number, currency) {
      if (number == null) {
        return null;
      }

      return NumberUtils.__formatCurrency(number, currency);
    }
  }, {
    key: '__formatCurrency',
    value: function __formatCurrency(number, currency) {
      if (!_locale2.default.supportsECMA402()) {
        return number;
      }

      var options = {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };

      var formatter = new global.Intl.NumberFormat(_locale2.default.currentLocale(), options);

      return formatter.format(number);
    }
  }, {
    key: 'formatWithFormatter',
    value: function formatWithFormatter(formatter, number) {
      if (formatter != null) {
        var string = formatter.format(number);

        if (string === 'NaN') {
          return number;
        } else {
          return string;
        }
      } else {
        return number.toString();
      }
    }
  }]);

  return NumberUtils;
})();

exports.default = NumberUtils;
//# sourceMappingURL=number-utils.js.map