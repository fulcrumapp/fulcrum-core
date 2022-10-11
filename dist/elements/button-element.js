"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ButtonElement =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(ButtonElement, _Element);

  function ButtonElement() {
    return _Element.apply(this, arguments) || this;
  }

  return ButtonElement;
}(_element["default"]);

exports["default"] = ButtonElement;
//# sourceMappingURL=button-element.js.map