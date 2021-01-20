"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

var _dateUtils = _interopRequireDefault(require("../utils/date-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DisplayOptions = /*#__PURE__*/function () {
  function DisplayOptions(attributes) {
    this.style = attributes.style;
    this.currency = attributes.currency;
  }

  var _proto = DisplayOptions.prototype;

  _proto.format = function format(value) {
    if (!_textUtils["default"].isPresent(value)) {
      return value;
    }

    switch (true) {
      case this.isNumber:
        {
          return _numberUtils["default"].localizedStringFromMachineString(value, true);
        }

      case this.isDate:
        {
          var date = _dateUtils["default"].parseDate(value);

          if (date != null) {
            return _dateUtils["default"].formatLocalizedDate(date);
          }

          break;
        }

      case this.isCurrency:
        {
          return _numberUtils["default"].formatCurrency(value, this.currency);
        }

      default:
        break;
    }

    return value;
  };

  _createClass(DisplayOptions, [{
    key: "isCurrency",
    get: function get() {
      return this.style === 'currency';
    }
  }, {
    key: "isNumber",
    get: function get() {
      return this.style === 'number';
    }
  }, {
    key: "isDate",
    get: function get() {
      return this.style === 'date';
    }
  }, {
    key: "isText",
    get: function get() {
      return this.style === 'text';
    }
  }]);

  return DisplayOptions;
}();

exports["default"] = DisplayOptions;
//# sourceMappingURL=display-options.js.map