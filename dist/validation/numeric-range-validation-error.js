'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementValidationError = require('./element-validation-error');

var _elementValidationError2 = _interopRequireDefault(_elementValidationError);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumericRangeValidationError = function (_ElementValidationErr) {
  _inherits(NumericRangeValidationError, _ElementValidationErr);

  function NumericRangeValidationError() {
    _classCallCheck(this, NumericRangeValidationError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NumericRangeValidationError).apply(this, arguments));
  }

  _createClass(NumericRangeValidationError, [{
    key: 'message',
    get: function get() {
      var message = undefined;

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
}(_elementValidationError2.default);

exports.default = NumericRangeValidationError;
//# sourceMappingURL=numeric-range-validation-error.js.map