'use strict';

exports.__esModule = true;

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

var NumberUtils = function () {
  function NumberUtils() {
    _classCallCheck(this, NumberUtils);
  }

  NumberUtils.parseDouble = function parseDouble(input) {
    return +input;
  };

  NumberUtils.localizedStringFromMachineString = function localizedStringFromMachineString(machineString, allowDecimals) {
    return machineString;
  };

  NumberUtils.formatMachine = function formatMachine(number) {
    if (intl) {
      if (NumberUtils.machineFormatter == null) {
        NumberUtils.machineFormatter = new intl.NumberFormat(['en-US'], MachineFormatterOptions);
      }
    }

    return NumberUtils.formatWithFormatter(NumberUtils.machineFormatter, number);
  };

  NumberUtils.formatCurrency = function formatCurrency(number, currency) {
    if (number == null) {
      return null;
    }

    return NumberUtils.__formatCurrency(number, currency);
  };

  NumberUtils.__formatCurrency = function __formatCurrency(number, currency) {
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
  };

  NumberUtils.formatWithFormatter = function formatWithFormatter(formatter, number) {
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
  };

  return NumberUtils;
}();

exports.default = NumberUtils;
//# sourceMappingURL=number-utils.js.map