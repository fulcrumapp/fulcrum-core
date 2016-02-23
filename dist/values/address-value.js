'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _address = require('./address');

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddressValue extends _formValue2.default {
  constructor(element, attributes) {
    super(element);

    this.address = new _address2.default(attributes);
  }

  get isEmpty() {
    return this.address.isEmpty();
  }

  get displayValue() {
    return this.address.lines.join('\n');
  }

  get searchableValue() {
    return this.address.lines.join(' ');
  }

  get length() {
    return this.displayValue.length;
  }

  get columnValue() {
    return null;
    // TODO(zhm) implement
    // throw new Error('Not implemented');
  }

  get multipleValues() {
    return null;
    // TODO(zhm) implement
    // throw new Error('Not implemented');
  }

  toJSON() {
    return this.address.toJSON();
  }

  isEqual(stringValue) {
    return false;
  }

  contains(stringValue) {
    return false;
  }

  startsWith(stringValue) {
    return false;
  }

  isLessThan(stringValue) {
    return false;
  }

  isGreaterThan(stringValue) {
    return false;
  }
}
exports.default = AddressValue;
//# sourceMappingURL=address-value.js.map