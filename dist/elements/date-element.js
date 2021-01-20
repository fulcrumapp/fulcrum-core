"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DateElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(DateElement, _TextualElement);

  function DateElement() {
    return _TextualElement.apply(this, arguments) || this;
  }

  return DateElement;
}(_textualElement["default"]);

exports["default"] = DateElement;
//# sourceMappingURL=date-element.js.map