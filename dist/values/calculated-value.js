'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CalculatedValue = function (_TextualValue) {
  _inherits(CalculatedValue, _TextualValue);

  function CalculatedValue(element, value) {
    _classCallCheck(this, CalculatedValue);

    var _this = _possibleConstructorReturn(this, _TextualValue.call(this, element, value));

    _this.error = null;
    return _this;
  }

  CalculatedValue.prototype.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === undefined ? false : _ref$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    if (useDisplayValue) {
      return this.displayValue;
    }

    var display = this.element.display;

    // - for currency or number display, return the numeric value
    // - for date calculations return the date
    // - for text (and anything else) just return the string value

    if (display.isCurrency || display.isNumber) {
      return _numberUtils2.default.parseDouble(this.textValue);
    } else if (display.isDate) {
      return new Date(this.textValue + ' 00:00:00Z');
    }

    return this.textValue;
  };

  _createClass(CalculatedValue, [{
    key: 'displayValue',
    get: function get() {
      if (this.hasError) {
        return this.error;
      }

      return this.element.display.format(this.textValue);
    }
  }, {
    key: 'hasError',
    get: function get() {
      return this.error != null;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      var display = this.element.display;

      // - for currency or number display, return the numeric value
      // - for date calculations return the UTC epoch seconds
      // - for text (and anything else) just return the string value

      if (display.isCurrency || display.isNumber) {
        return _numberUtils2.default.parseDouble(this.textValue);
      } else if (display.isDate) {
        var date = new Date(this.textValue + ' 00:00:00Z');

        if (date) {
          return date.getTime() / 1000;
        }
      }

      return this.textValue;
    }
  }]);

  return CalculatedValue;
}(_textualValue2.default);

exports.default = CalculatedValue;
//# sourceMappingURL=calculated-value.js.map