import TextualValue from './textual-value';
import DateUtils from '../utils/date-utils';
import TextUtils from '../utils/text-utils';

export default class TimeValue extends TextualValue {
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
      return TextUtils.isEmpty(stringValue);
    }

    const thisTime = this.timeValue();
    const thatTime = DateUtils.parseTime(stringValue);

    if (thisTime == null || thatTime == null) {
      return false;
    }

    return thisTime.getTime() < thatTime.getTime();
  }

  isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    const thisTime = this.timeValue();
    const thatTime = DateUtils.parseTime(stringValue);

    if (thisTime == null || thatTime == null) {
      return false;
    }

    return thisTime.getTime() > thatTime.getTime();
  }

  timeValue() {
    return DateUtils.parseTime(this.textValue);
  }
}
