"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var BarcodeElement =
/*#__PURE__*/
function (_TextualElement) {
  _inheritsLoose(BarcodeElement, _TextualElement);

  function BarcodeElement() {
    return _TextualElement.apply(this, arguments) || this;
  }

  return BarcodeElement;
}(_textualElement["default"]);

exports["default"] = BarcodeElement;
//# sourceMappingURL=barcode-element.js.map