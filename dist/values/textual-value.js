'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TextualValue = function (_FormValue) {
  _inherits(TextualValue, _FormValue);

  function TextualValue(element, textValue) {
    _classCallCheck(this, TextualValue);

    var _this = _possibleConstructorReturn(this, _FormValue.call(this, element, textValue));

    _this.textValue = textValue;
    return _this;
  }

  TextualValue.prototype.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return this.textValue;
  };

  TextualValue.prototype.isEqual = function isEqual(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    stringValue = stringValue == null ? '' : stringValue.toString();

    return this.textValue.toLowerCase() === stringValue.toLowerCase();
  };

  TextualValue.prototype.contains = function contains(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    stringValue = stringValue.toString();

    return _textUtils2.default.contains(this.textValue, stringValue);
  };

  TextualValue.prototype.startsWith = function startsWith(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    stringValue = stringValue.toString();

    return _textUtils2.default.startsWith(this.textValue, stringValue);
  };

  TextualValue.prototype.isLessThan = function isLessThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    if (stringValue != null) {
      stringValue = stringValue.toString();
    }

    var thisValue = _numberUtils2.default.parseDouble(this.textValue);
    var thatValue = _numberUtils2.default.parseDouble(stringValue);

    return thisValue < thatValue;
  };

  TextualValue.prototype.isGreaterThan = function isGreaterThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    stringValue = stringValue == null ? '' : stringValue.toString();

    var thisValue = _numberUtils2.default.parseDouble(this.textValue);
    var thatValue = _numberUtils2.default.parseDouble(stringValue);

    return thisValue > thatValue;
  };

  _createClass(TextualValue, [{
    key: 'isEmpty',
    get: function get() {
      return _textUtils2.default.isEmpty(this.textValue);
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return this.textValue || '';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.textValue || '';
    }
  }, {
    key: 'length',
    get: function get() {
      if (this.textValue != null) {
        return this.textValue.length;
      }

      return 0;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return this.textValue || null;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }, {
    key: 'numericValue',
    get: function get() {
      return _numberUtils2.default.parseDouble(this.textValue);
    }
  }, {
    key: 'isNumeric',
    get: function get() {
      if (!this.isEmpty) {
        var number = _numberUtils2.default.parseDouble(this.textValue);

        return number != null;
      }

      return true;
    }
  }]);

  return TextualValue;
}(_formValue2.default);

exports.default = TextualValue;
//# sourceMappingURL=textual-value.js.map