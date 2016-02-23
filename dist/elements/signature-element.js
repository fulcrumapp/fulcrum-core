'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SignatureElement extends _element2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.agreementText = attributes.agreement_text;
  }
}
exports.default = SignatureElement;
//# sourceMappingURL=signature-element.js.map