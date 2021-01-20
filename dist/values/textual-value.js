"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TextualValue =
/*#__PURE__*/
function (_FormValue) {
  _inheritsLoose(TextualValue, _FormValue);

  function TextualValue(element, textValue) {
    var _this;

    _this = _FormValue.call(this, element, textValue) || this;
    _this.textValue = textValue != null ? textValue.toString() : null;
    return _this;
  }

  var _proto = TextualValue.prototype;

  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    return useDisplayValue ? this.displayValue : this.textValue;
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return this.textValue;
  };

  _proto.isEqual = function isEqual(stringValue) {
    if (this.isEmpty) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    var string = stringValue == null ? '' : stringValue.toString();
    return this.textValue.toLowerCase() === string.toLowerCase();
  };

  _proto.contains = function contains(stringValue) {
    if (this.isEmpty) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    var string = stringValue.toString();
    return _textUtils["default"].contains(this.textValue, string);
  };

  _proto.startsWith = function startsWith(stringValue) {
    if (this.isEmpty) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    return _textUtils["default"].startsWith(this.textValue, stringValue.toString());
  };

  _proto.isLessThan = function isLessThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    var string = null;

    if (stringValue != null) {
      string = stringValue.toString();
    }

    var thisValue = _numberUtils["default"].parseDouble(this.textValue);

    var thatValue = _numberUtils["default"].parseDouble(string);

    if (thisValue == null || thatValue == null) {
      return false;
    }

    return thisValue < thatValue;
  };

  _proto.isGreaterThan = function isGreaterThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    var string = stringValue == null ? '' : stringValue.toString();

    var thisValue = _numberUtils["default"].parseDouble(this.textValue);

    var thatValue = _numberUtils["default"].parseDouble(string);

    if (thisValue == null || thatValue == null) {
      return false;
    }

    return thisValue > thatValue;
  };

  _createClass(TextualValue, [{
    key: "isEmpty",
    get: function get() {
      return this.textValue == null || this.textValue.length === 0;
    }
  }, {
    key: "displayValue",
    get: function get() {
      return this.textValue || '';
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.displayValue || '';
    }
  }, {
    key: "length",
    get: function get() {
      if (this.textValue != null) {
        return this.textValue.length;
      }

      return 0;
    }
  }, {
    key: "columnValue",
    get: function get() {
      return this.textValue || null;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      return null;
    }
  }, {
    key: "numericValue",
    get: function get() {
      return _numberUtils["default"].parseDouble(this.textValue);
    }
  }, {
    key: "isNumeric",
    get: function get() {
      if (!this.isEmpty) {
        var number = _numberUtils["default"].parseDouble(this.textValue);

        return number != null;
      }

      return true;
    }
  }]);

  return TextualValue;
}(_formValue["default"]);

exports["default"] = TextualValue;
//# sourceMappingURL=textual-value.js.map