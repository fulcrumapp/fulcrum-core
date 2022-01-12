"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _booleanElement = _interopRequireDefault(require("./boolean-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CheckBoxElement =
/*#__PURE__*/
function (_BooleanElement) {
  _inheritsLoose(CheckBoxElement, _BooleanElement);

  function CheckBoxElement() {
    return _BooleanElement.apply(this, arguments) || this;
  }

  _createClass(CheckBoxElement, [{
    key: "isLengthValidationSupported",
    get: function get() {
      return false;
    }
  }]);

  return CheckBoxElement;
}(_booleanElement["default"]);

exports["default"] = CheckBoxElement;
//# sourceMappingURL=checkbox-element.js.map