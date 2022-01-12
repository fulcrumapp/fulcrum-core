"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _booleanValue = _interopRequireDefault(require("./boolean-value"));

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
  }]);

  return CheckBoxValue;
}(_booleanValue["default"]);

exports["default"] = CheckBoxValue;
//# sourceMappingURL=checkbox-value.js.map