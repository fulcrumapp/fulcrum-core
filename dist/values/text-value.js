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

var TextValue = function (_TextualValue) {
  _inherits(TextValue, _TextualValue);

  function TextValue() {
    _classCallCheck(this, TextValue);

    return _possibleConstructorReturn(this, _TextualValue.apply(this, arguments));
  }

  _createClass(TextValue, [{
    key: 'columnValue',
    get: function get() {
      if (this.element.isNumeric) {
        return this.numericValue;
      }
      // this does NOT work in loose mode
      // return super.columnValue;
      return this.textValue || null;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.element.isNumeric && this.textValue != null) {
        return _numberUtils2.default.localizedStringFromMachineString(this.textValue, this.element.isDecimalFormat);
      }

      return this.textValue || '';
    }
  }]);

  return TextValue;
}(_textualValue2.default);

exports.default = TextValue;
//# sourceMappingURL=text-value.js.map