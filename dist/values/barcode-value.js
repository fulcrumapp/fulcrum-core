"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _textualValue = _interopRequireDefault(require("./textual-value"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var BarcodeValue = /*#__PURE__*/function (_TextualValue) {
  _inheritsLoose(BarcodeValue, _TextualValue);
  function BarcodeValue() {
    return _TextualValue.apply(this, arguments) || this;
  }
  return BarcodeValue;
}(_textualValue["default"]);
exports["default"] = BarcodeValue;
//# sourceMappingURL=barcode-value.js.map