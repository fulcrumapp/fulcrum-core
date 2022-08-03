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

var NumericFormatValidationError = /*#__PURE__*/function (_ElementValidationErr) {
  _inheritsLoose(NumericFormatValidationError, _ElementValidationErr);

  function NumericFormatValidationError() {
    return _ElementValidationErr.apply(this, arguments) || this;
  }

  _createClass(NumericFormatValidationError, [{
    key: "message",
    get: function get() {
      var messageFormat = this.element.isIntegerFormat ? "The value of field '%s' must be an integer number." : "The value of field '%s' must be an decimal number.";
      return (0, _util.format)(messageFormat, this.label);
    }
  }]);

  return NumericFormatValidationError;
}(_elementValidationError["default"]);

exports["default"] = NumericFormatValidationError;
//# sourceMappingURL=numeric-format-validation-error.js.map