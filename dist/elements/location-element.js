"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LocationElement = /*#__PURE__*/function (_Element) {
  _inheritsLoose(LocationElement, _Element);

  function LocationElement() {
    return _Element.apply(this, arguments) || this;
  }

  return LocationElement;
}(_element["default"]);

exports["default"] = LocationElement;
//# sourceMappingURL=location-element.js.map