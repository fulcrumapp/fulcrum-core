"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualValue = _interopRequireDefault(require("./textual-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CheckBoxValue =
/*#__PURE__*/
function (_BooleanValue) {
  _inheritsLoose(CheckBoxValue, _BooleanValue);

  function CheckBoxValue() {
    return _BooleanValue.apply(this, arguments) || this;
  }

  _createClass(CheckBoxValue, [{
    key: "isChecked",
    get: function get() {
      return this.booleanValue;
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
          return this.textValue;
      }
    }
  }]);

  return CheckBoxValue;
}(BooleanValue);

exports["default"] = CheckBoxValue;
//# sourceMappingURL=checkbox-value.js.map