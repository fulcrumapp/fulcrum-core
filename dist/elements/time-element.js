"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TimeElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(TimeElement, _TextualElement);

  function TimeElement() {
    return _TextualElement.apply(this, arguments) || this;
  }

  return TimeElement;
}(_textualElement["default"]);

exports["default"] = TimeElement;
//# sourceMappingURL=time-element.js.map