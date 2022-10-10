"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _booleanElement = _interopRequireDefault(require("./boolean-element"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var CheckboxElement = /*#__PURE__*/function (_BooleanElement) {
  _inheritsLoose(CheckboxElement, _BooleanElement);
  function CheckboxElement() {
    return _BooleanElement.apply(this, arguments) || this;
  }
  return CheckboxElement;
}(_booleanElement["default"]);
exports["default"] = CheckboxElement;
//# sourceMappingURL=checkbox-element.js.map