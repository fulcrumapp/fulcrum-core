"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _booleanElement = _interopRequireDefault(require("./boolean-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CheckBoxElement =
/*#__PURE__*/
function (_BooleanElement) {
  _inheritsLoose(CheckBoxElement, _BooleanElement);

  function CheckBoxElement(parent, attributes) {
    return _BooleanElement.call(this, parent, attributes) || this;
  }

  return CheckBoxElement;
}(_booleanElement["default"]);

exports["default"] = CheckBoxElement;
//# sourceMappingURL=checkbox-element.js.map