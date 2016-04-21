'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementValidationError = require('./element-validation-error');

var _elementValidationError2 = _interopRequireDefault(_elementValidationError);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TimeFormatValidationError = function (_ElementValidationErr) {
  _inherits(TimeFormatValidationError, _ElementValidationErr);

  function TimeFormatValidationError() {
    _classCallCheck(this, TimeFormatValidationError);

    return _possibleConstructorReturn(this, _ElementValidationErr.apply(this, arguments));
  }

  _createClass(TimeFormatValidationError, [{
    key: 'message',
    get: function get() {
      var messageFormat = "The value of field '%s' must be a time in HH:MM format.";

      return (0, _util.format)(messageFormat, this.label);
    }
  }]);

  return TimeFormatValidationError;
}(_elementValidationError2.default);

exports.default = TimeFormatValidationError;
//# sourceMappingURL=time-format-validation-error.js.map