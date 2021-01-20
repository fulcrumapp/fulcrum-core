"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualValue = _interopRequireDefault(require("./textual-value"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CalculatedValue =
/*#__PURE__*/
function (_TextualValue) {
  _inheritsLoose(CalculatedValue, _TextualValue);

  function CalculatedValue(element, value) {
    var _this;

    _this = _TextualValue.call(this, element, value) || this;
    _this.error = null;
    return _this;
  }

  var _proto = CalculatedValue.prototype;

  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    if (useDisplayValue) {
      return this.displayValue;
    }

    var display = this.element.display; // - for currency or number display, return the numeric value
    // - for date calculations return the date
    // - for text (and anything else) just return the string value

    if (display.isCurrency || display.isNumber) {
      return _numberUtils["default"].parseDouble(this.textValue);
    } else if (display.isDate) {
      return new Date(this.textValue + " 00:00:00Z");
    }

    return this.textValue;
  };

  _createClass(CalculatedValue, [{
    key: "displayValue",
    get: function get() {
      if (this.hasError) {
        return this.error;
      }

      return this.element.display.format(this.textValue);
    }
  }, {
    key: "hasError",
    get: function get() {
      return this.error != null;
    }
  }, {
    key: "columnValue",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var display = this.element.display; // - for currency or number display, return the numeric value
      // - for date calculations return the UTC epoch seconds
      // - for text (and anything else) just return the string value

      if (display.isCurrency || display.isNumber) {
        return _numberUtils["default"].parseDouble(this.textValue);
      } else if (display.isDate) {
        var date = new Date(this.textValue + " 00:00:00Z");

        if (date && !isNaN(date)) {
          return date.getTime() / 1000;
        }

        return null;
      }

      return this.textValue;
    }
  }]);

  return CalculatedValue;
}(_textualValue["default"]);

exports["default"] = CalculatedValue;
//# sourceMappingURL=calculated-value.js.map