"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _mediaElement = _interopRequireDefault(require("./media-element"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var PhotoElement = /*#__PURE__*/function (_MediaElement) {
  _inheritsLoose(PhotoElement, _MediaElement);
  function PhotoElement() {
    return _MediaElement.apply(this, arguments) || this;
  }
  return PhotoElement;
}(_mediaElement["default"]);
exports["default"] = PhotoElement;
//# sourceMappingURL=photo-element.js.map