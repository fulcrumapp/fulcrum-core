"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var YesNoElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(YesNoElement, _TextualElement);

  function YesNoElement(parent, attributes) {
    var _this;

    _this = _TextualElement.call(this, parent, attributes) || this;
    _this.positiveChoice = attributes.positive;
    _this.negativeChoice = attributes.negative;
    _this.neutralChoice = attributes.neutral;
    _this.neutralEnabled = !!attributes.neutral_enabled;
    return _this;
  }

  return YesNoElement;
}(_textualElement["default"]);

exports["default"] = YesNoElement;
//# sourceMappingURL=yes-no-element.js.map