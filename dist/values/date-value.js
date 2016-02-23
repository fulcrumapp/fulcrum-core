'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateValue extends _textualValue2.default {
  constructor(element, value) {
    super(element, value);
  }

  get displayValue() {
    if (this.isEmpty) {
      return null;
    }

    const date = this.dateValue;

    if (date == null) {
      return null;
    }

    return _dateUtils2.default.formatLocalizedDate(date);
  }

  get searchableValue() {
    return this.textValue;
  }

  isLessThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    const thisDate = this.dateValue;
    const thatDate = _dateUtils2.default.parseDate(stringValue);

    if (thisDate == null || thatDate == null) {
      return false;
    }

    return thisDate.getTime() < thatDate.getTime();
  }

  isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    const thisDate = this.dateValue;
    const thatDate = _dateUtils2.default.parseDate(stringValue);

    if (thisDate == null || thatDate == null) {
      return false;
    }

    return thisDate.getTime() > thatDate.getTime();
  }

  get dateValue() {
    return _dateUtils2.default.parseDate(this.textValue);
  }
}
exports.default = DateValue;
//# sourceMappingURL=date-value.js.map