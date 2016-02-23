'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisplayOptions {
  constructor(attributes) {
    this.style = attributes.style;
    this.currency = attributes.currency;
  }

  get isCurrency() {
    return this.style === 'currency';
  }

  get isNumber() {
    return this.style === 'number';
  }

  get isDate() {
    return this.style === 'date';
  }

  get isText() {
    return this.style === 'text';
  }

  format(value) {
    if (!_textUtils2.default.isPresent(value)) {
      return value;
    }

    switch (true) {
      case this.isNumber:
        {
          return _numberUtils2.default.localizedStringFromMachineString(value, true);
        }

      case this.isDate:
        {
          const date = _dateUtils2.default.parseDate(value);

          if (date != null) {
            return _dateUtils2.default.formatLocalizedDate(date);
          }

          break;
        }

      case this.isCurrency:
        {
          return _numberUtils2.default.formatCurrency(value, this.currency);
        }

      default:
        break;
    }

    return value;
  }
}
exports.default = DisplayOptions;
//# sourceMappingURL=display-options.js.map