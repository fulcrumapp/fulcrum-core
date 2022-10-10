"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _elementValidationError = _interopRequireDefault(require("./element-validation-error"));
var _util = require("util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var NumericRangeValidationError = /*#__PURE__*/function (_ElementValidationErr) {
  _inheritsLoose(NumericRangeValidationError, _ElementValidationErr);
  function NumericRangeValidationError() {
    return _ElementValidationErr.apply(this, arguments) || this;
  }
  _createClass(NumericRangeValidationError, [{
    key: "message",
    get: function get() {
      var message = null;
      var fieldLabel = this.label;
      if (this.element.hasMin && this.element.hasMax) {
        message = (0, _util.format)("The value of field '%s' must be between %s and %s.", fieldLabel, this.element.min, this.element.max);
      } else if (this.element.hasMin) {
        message = (0, _util.format)("The value of field '%s' must be greater than or equal to %s.", fieldLabel, this.element.min);
      } else {
        message = (0, _util.format)("The value of field '%s' must be less than or equal to %s.", fieldLabel, this.element.max);
      }
      return message;
    }
  }]);
  return NumericRangeValidationError;
}(_elementValidationError["default"]);
exports["default"] = NumericRangeValidationError;
//# sourceMappingURL=numeric-range-validation-error.js.map