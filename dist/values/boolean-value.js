"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _formValue = _interopRequireDefault(require("./form-value"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var BooleanValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(BooleanValue, _FormValue);
  function BooleanValue(element, booleanValue) {
    var _this;
    _this = _FormValue.call(this, element, booleanValue) || this;
    _this.booleanValue = !!booleanValue;
    return _this;
  }
  var _proto = BooleanValue.prototype;
  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
      useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;
    return useDisplayValue ? this.displayValue : this.booleanValue;
  };
  _proto.toJSON = function toJSON() {
    return this.booleanValue;
  };
  _proto.isEqual = function isEqual(booleanValue) {
    return this.booleanValue === booleanValue;
  };
  _createClass(BooleanValue, [{
    key: "displayValue",
    get: function get() {
      return this.booleanValue.toString();
    }
  }, {
    key: "length",
    get: function get() {
      return 1;
    }

    // This is really more a "falsey" value rather than empty.
    // It is used with the is_empty and is_not_empty visibility
    // conditions (e.g. what value would this field have that
    // could toggle visibility of other elements?)
  }, {
    key: "isEmpty",
    get: function get() {
      return !this.booleanValue;
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.booleanValue.toString();
    }
  }, {
    key: "columnValue",
    get: function get() {
      return this.booleanValue;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      return null;
    }
  }]);
  return BooleanValue;
}(_formValue["default"]);
exports["default"] = BooleanValue;
//# sourceMappingURL=boolean-value.js.map