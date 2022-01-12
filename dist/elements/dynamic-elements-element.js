"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DynamicElementsElement =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(DynamicElementsElement, _Element);

  function DynamicElementsElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this.positiveChoice = attributes.positive;
    _this.negativeChoice = attributes.negative;
    _this.neutralChoice = attributes.neutral;
    _this.neutralEnabled = !!attributes.neutral_enabled;
    return _this;
  }

  return DynamicElementsElement;
}(_element["default"]);

exports["default"] = DynamicElementsElement;
//# sourceMappingURL=dynamic-elements-element.js.map