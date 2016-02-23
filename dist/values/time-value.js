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

class TimeValue extends _textualValue2.default {
  get displayValue() {
    if (this.isEmpty) {
      return null;
    }

    const time = this.timeValue();

    if (time == null) {
      return null;
    }

    return time;
  }

  get searchableValue() {
    return this.textValue;
  }

  isLessThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    const thisTime = this.timeValue();
    const thatTime = _dateUtils2.default.parseTime(stringValue);

    if (thisTime == null || thatTime == null) {
      return false;
    }

    return thisTime.getTime() < thatTime.getTime();
  }

  isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    const thisTime = this.timeValue();
    const thatTime = _dateUtils2.default.parseTime(stringValue);

    if (thisTime == null || thatTime == null) {
      return false;
    }

    return thisTime.getTime() > thatTime.getTime();
  }

  timeValue() {
    return _dateUtils2.default.parseTime(this.textValue);
  }
}
exports.default = TimeValue;
//# sourceMappingURL=time-value.js.map