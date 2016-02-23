'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CalculatedValue extends _textualValue2.default {
  constructor(element, value) {
    super(element, value);

    this.error = null;
  }

  get displayValue() {
    if (this.hasError) {
      return this.error;
    }

    return this.element.display.format(this.textValue);
  }

  get hasError() {
    return this.error != null;
  }

  get columnValue() {
    const display = this.element.display;

    // - for currency or number display, return the numeric value
    // - for date calculations return the UTC epoch seconds
    // - for text (and anything else) just return the string value

    if (display.isCurrency || display.isNumber) {
      return _numberUtils2.default.parseDouble(this.textValue);
    } else if (display.isDate) {
      const date = new Date(`${ this.textValue } 00:00:00Z`);

      if (date) {
        return date.getTime();
      }
    }

    return this.textValue;
  }
}
exports.default = CalculatedValue;
//# sourceMappingURL=calculated-value.js.map