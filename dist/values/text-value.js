"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualValue = _interopRequireDefault(require("./textual-value"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TextValue =
/*#__PURE__*/
function (_TextualValue) {
  _inheritsLoose(TextValue, _TextualValue);

  function TextValue() {
    return _TextualValue.apply(this, arguments) || this;
  }

  var _proto = TextValue.prototype;

  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    if (this.element.isNumeric && this.textValue != null) {
      return this.numericValue;
    }

    return this.displayValue;
  };

  _createClass(TextValue, [{
    key: "columnValue",
    get: function get() {
      if (this.element.isNumeric) {
        return this.numericValue;
      } // this does NOT work in loose mode
      // return super.columnValue;


      return this.textValue || null;
    }
  }, {
    key: "displayValue",
    get: function get() {
      if (this.element.isNumeric && this.textValue != null) {
        return _numberUtils["default"].localizedStringFromMachineString(this.textValue, this.element.isDecimalFormat);
      }

      return this.textValue || '';
    }
  }]);

  return TextValue;
}(_textualValue["default"]);

exports["default"] = TextValue;
//# sourceMappingURL=text-value.js.map