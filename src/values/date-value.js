import TextualValue from './textual-value';
import DateUtils from '../utils/date-utils';
import TextUtils from '../utils/text-utils';

export default class DateValue extends TextualValue {
  get displayValue() {
    if (this.isEmpty) {
      return null;
    }

    const date = this.dateValue;

    if (date == null) {
      return null;
    }

    return DateUtils.formatLocalizedDate(date);
  }

  get searchableValue() {
    return this.textValue;
  }

  isLessThan(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    const thisDate = this.dateValue;
    const thatDate = DateUtils.parseDate(stringValue);

    if (thisDate == null || thatDate == null) {
      return false;
    }

    return thisDate.getTime() < thatDate.getTime();
  }

  isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    const thisDate = this.dateValue;
    const thatDate = DateUtils.parseDate(stringValue);

    if (thisDate == null || thatDate == null) {
      return false;
    }

    return thisDate.getTime() > thatDate.getTime();
  }

  get isValid() {
    if (this.isEmpty) {
      return true;
    }

    return DateUtils.isValidDate(this.textValue);
  }

  get dateValue() {
    return DateUtils.parseDate(this.textValue);
  }

  get columnValue() {
    if (this.isEmpty) {
      return null;
    }

    const timestamp = this.textValue + 'T00:00:00Z';

    const date = DateUtils.parseISOTimestamp(timestamp);

    return date ? date.getTime() / 1000 : null;
  }
}
