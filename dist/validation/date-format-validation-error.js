"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _elementValidationError = _interopRequireDefault(require("./element-validation-error"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DateFormatValidationError = /*#__PURE__*/function (_ElementValidationErr) {
  _inheritsLoose(DateFormatValidationError, _ElementValidationErr);

  function DateFormatValidationError() {
    return _ElementValidationErr.apply(this, arguments) || this;
  }

  _createClass(DateFormatValidationError, [{
    key: "message",
    get: function get() {
      var messageFormat = "The value of field '%s' must be a date in YYYY-MM-DD format.";
      return (0, _util.format)(messageFormat, this.label);
    }
  }]);

  return DateFormatValidationError;
}(_elementValidationError["default"]);

exports["default"] = DateFormatValidationError;
//# sourceMappingURL=date-format-validation-error.js.map