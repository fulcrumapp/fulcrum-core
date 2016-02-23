'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SignatureValue extends _formValue2.default {
  constructor(element, attributes) {
    super(element, attributes);

    if (attributes) {
      this._identifier = attributes.signature_id;
      this._timestamp = attributes.timestamp;
    }
  }

  get isEmpty() {
    return false;
  }

  get displayValue() {
    return '1 Signature';
  }

  get searchableValue() {
    return null;
  }

  get length() {
    return 1;
  }

  get columnValue() {
    return this._identifier;
  }

  get multipleValues() {
    return null;
  }

  toJSON() {
    return {
      signature_id: this._identifier,
      timestamp: this._timestamp
    };
  }

  isEqual(value) {
    return false;
  }

  contains(value) {
    return false;
  }

  startsWith(value) {
    return false;
  }

  isLessThan(value) {
    return false;
  }

  isGreaterThan(value) {
    return false;
  }
}
exports.default = SignatureValue;
//# sourceMappingURL=signature-value.js.map