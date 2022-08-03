"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _locale = _interopRequireDefault(require("./locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var MachineFormatterOptions = {
  style: 'decimal',
  useGrouping: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 20
};
var intl = null;

if (typeof Intl !== 'undefined') {
  /* eslint-disable no-undef */
  intl = Intl;
  /* eslint-enable no-undef */
}

var NumberUtils = /*#__PURE__*/function () {
  function NumberUtils() {}

  NumberUtils.parseDouble = function parseDouble(input) {
    var number = +input;

    if (number == null || isNaN(number)) {
      return null;
    }

    return number;
  };

  NumberUtils.localizedStringFromMachineString = function localizedStringFromMachineString(machineString, allowDecimals) {
    if (allowDecimals === void 0) {
      allowDecimals = true;
    }

    if (allowDecimals && NumberUtils.localeDecimalFormatter) {
      return NumberUtils.localeDecimalFormatter.format(machineString);
    } else if (NumberUtils.localeIntegerFormatter) {
      return NumberUtils.localeIntegerFormatter.format(machineString);
    }

    return machineString;
  };

  NumberUtils.formatMachine = function formatMachine(number) {
    return NumberUtils.formatWithFormatter(NumberUtils.machineFormatter, number);
  };

  NumberUtils.formatCurrency = function formatCurrency(number, currency) {
    if (number == null) {
      return null;
    }

    return NumberUtils.__formatCurrency(number, currency);
  };

  NumberUtils.__formatCurrency = function __formatCurrency(number, currency) {
    if (!_locale["default"].supportsECMA402()) {
      return number;
    }

    var options = {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
    var formatter = new global.Intl.NumberFormat(_locale["default"].currentLocale(), options);
    return formatter.format(number);
  };

  NumberUtils.formatWithFormatter = function formatWithFormatter(formatter, number) {
    if (formatter != null) {
      var string = formatter.format(number);

      if (string === 'NaN') {
        return number;
      }

      return string;
    }

    return number.toString();
  };

  _createClass(NumberUtils, null, [{
    key: "localeDecimalFormatter",
    get: function get() {
      if (!this._localeDecimalFormatter && intl) {
        this._localeDecimalFormatter = new intl.NumberFormat([], MachineFormatterOptions);
      }

      return this._localeDecimalFormatter;
    }
  }, {
    key: "localeIntegerFormatter",
    get: function get() {
      if (!this._localeIntegerFormatter && intl) {
        this._localeIntegerFormatter = new intl.NumberFormat([], {
          useGrouping: false,
          maximumFractionDigits: 0
        });
      }

      return this._localeIntegerFormatter;
    }
  }, {
    key: "machineFormatter",
    get: function get() {
      if (!this._machineFormatter && intl) {
        this._machineFormatter = new intl.NumberFormat(['en-US'], MachineFormatterOptions);
      }

      return this._machineFormatter;
    }
  }]);

  return NumberUtils;
}();

exports["default"] = NumberUtils;
//# sourceMappingURL=number-utils.js.map