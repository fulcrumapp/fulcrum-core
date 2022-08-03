"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HyperlinkElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(HyperlinkElement, _TextualElement);

  function HyperlinkElement(parent, attributes) {
    var _this;

    _this = _TextualElement.call(this, parent, attributes) || this;
    _this.defaultURL = attributes.default_url;
    return _this;
  }

  return HyperlinkElement;
}(_textualElement["default"]);

exports["default"] = HyperlinkElement;
//# sourceMappingURL=hyperlink-element.js.map