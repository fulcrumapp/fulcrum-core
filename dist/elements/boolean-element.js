"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var BooleanElement =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(BooleanElement, _Element);

  function BooleanElement() {
    return _Element.apply(this, arguments) || this;
  }

  return BooleanElement;
}(_element["default"]);

exports["default"] = BooleanElement;
//# sourceMappingURL=boolean-element.js.map