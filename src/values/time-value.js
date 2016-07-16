import TextualValue from './textual-value';
import DateUtils from '../utils/date-utils';
import TextUtils from '../utils/text-utils';

export default class TimeValue extends TextualValue {
  get displayValue() {
    return this.textValue;
  }

  get searchableValue() {
    return this.textValue;
  }

  isLessThan(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    const thisTime = this.timeValue;
    const thatTime = DateUtils.parseTime(stringValue);

    if (thisTime == null || thatTime == null) {
      return false;
    }

    return thisTime < thatTime;
  }

  isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    const thisTime = this.timeValue;
    const thatTime = DateUtils.parseTime(stringValue);

    if (thisTime == null || thatTime == null) {
      return false;
    }

    return thisTime > thatTime;
  }

  get isValid() {
    if (this.isEmpty) {
      return true;
    }

    return DateUtils.isValidTime(this.textValue);
  }

  get timeValue() {
    if (this.isEmpty) {
      return null;
    }

    return DateUtils.parseTime(this.textValue);
  }

  get columnValue() {
    if (!this.isValid) {
      return null;
    }

    return this.textValue || null;
  }
}
