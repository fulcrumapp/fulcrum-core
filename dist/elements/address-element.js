"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AddressElement =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(AddressElement, _Element);

  function AddressElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this.autoPopulate = !!attributes.auto_populate;
    return _this;
  }

  return AddressElement;
}(_element["default"]);

exports["default"] = AddressElement;
//# sourceMappingURL=address-element.js.map