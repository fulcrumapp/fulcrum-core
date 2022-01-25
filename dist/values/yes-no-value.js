"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualValue = _interopRequireDefault(require("./textual-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var YesNoValue =
/*#__PURE__*/
function (_TextualValue) {
  _inheritsLoose(YesNoValue, _TextualValue);

  function YesNoValue() {
    return _TextualValue.apply(this, arguments) || this;
  }

  _createClass(YesNoValue, [{
    key: "isPositive",
    get: function get() {
      if (this.element.positiveChoice) {
        return this.textValue === this.element.positiveChoice.value;
      }

      return false;
    }
  }, {
    key: "isNegative",
    get: function get() {
      if (this.element.negativeChoice) {
        return this.textValue === this.element.negativeChoice.value;
      }

      return false;
    }
  }, {
    key: "isNeutral",
    get: function get() {
      if (this.element.neutralChoice) {
        return this.textValue === this.element.neutralChoice.value;
      }

      return false;
    }
  }, {
    key: "displayValue",
    get: function get() {
      switch (true) {
        case this.isPositive:
          return this.element.positiveChoice.label;

        case this.isNegative:
          return this.element.negativeChoice.label;

        case this.isNeutral:
          return this.element.neutralChoice.label;

        default:
          return this.textValueo || '';
      }
    }
  }]);

  return YesNoValue;
}(_textualValue["default"]);

exports["default"] = YesNoValue;
//# sourceMappingURL=yes-no-value.js.map