"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SignatureElement = /*#__PURE__*/function (_Element) {
  _inheritsLoose(SignatureElement, _Element);

  function SignatureElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this.agreementText = attributes.agreement_text;
    return _this;
  }

  return SignatureElement;
}(_element["default"]);

exports["default"] = SignatureElement;
//# sourceMappingURL=signature-element.js.map