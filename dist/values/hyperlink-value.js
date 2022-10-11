"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualValue = _interopRequireDefault(require("./textual-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var HyperlinkValue =
/*#__PURE__*/
function (_TextualValue) {
  _inheritsLoose(HyperlinkValue, _TextualValue);

  function HyperlinkValue() {
    return _TextualValue.apply(this, arguments) || this;
  }

  return HyperlinkValue;
}(_textualValue["default"]);

exports["default"] = HyperlinkValue;
//# sourceMappingURL=hyperlink-value.js.map