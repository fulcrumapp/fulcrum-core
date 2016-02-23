'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextualValue extends _formValue2.default {
  constructor(element, textValue) {
    super(element, textValue);

    this.textValue = textValue;
  }

  get isEmpty() {
    return _textUtils2.default.isEmpty(this.textValue);
  }

  get displayValue() {
    return this.textValue || '';
  }

  get searchableValue() {
    return this.textValue || '';
  }

  get length() {
    if (this.textValue != null) {
      return this.textValue.length;
    }

    return 0;
  }

  get columnValue() {
    return this.textValue || null;
  }

  get multipleValues() {
    return null;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return this.textValue;
  }

  isEqual(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    stringValue = stringValue == null ? '' : stringValue.toString();

    return this.textValue.toLowerCase() === stringValue.toLowerCase();
  }

  contains(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    stringValue = stringValue.toString();

    return _textUtils2.default.contains(this.textValue, stringValue);
  }

  startsWith(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    stringValue = stringValue.toString();

    return _textUtils2.default.startsWith(this.textValue, stringValue);
  }

  isLessThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    if (stringValue != null) {
      stringValue = stringValue.toString();
    }

    const thisValue = _numberUtils2.default.parseDouble(this.textValue);
    const thatValue = _numberUtils2.default.parseDouble(stringValue);

    return thisValue < thatValue;
  }

  isGreaterThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    stringValue = stringValue == null ? '' : stringValue.toString();

    const thisValue = _numberUtils2.default.parseDouble(this.textValue);
    const thatValue = _numberUtils2.default.parseDouble(stringValue);

    return thisValue > thatValue;
  }

  get numericValue() {
    return _numberUtils2.default.parseDouble(this.textValue);
  }
}
exports.default = TextualValue;
//# sourceMappingURL=textual-value.js.map