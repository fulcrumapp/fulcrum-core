import FormValue from './form-value';
import TextUtils from '../utils/text-utils';
import NumberUtils from '../utils/number-utils';

export default class TextualValue extends FormValue {
  constructor(element, textValue) {
    super(element, textValue);

    this.textValue = textValue;
  }

  get isEmpty() {
    return TextUtils.isEmpty(this.textValue);
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
      return TextUtils.isEmpty(stringValue);
    }

    stringValue = (stringValue == null ? '' : stringValue.toString());

    return this.textValue.toLowerCase() === stringValue.toLowerCase();
  }

  contains(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    stringValue = stringValue.toString();

    return TextUtils.contains(this.textValue, stringValue);
  }

  startsWith(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    stringValue = stringValue.toString();

    return TextUtils.startsWith(this.textValue, stringValue);
  }

  isLessThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    if (stringValue != null) {
      stringValue = stringValue.toString();
    }

    const thisValue = NumberUtils.parseDouble(this.textValue);
    const thatValue = NumberUtils.parseDouble(stringValue);

    if (thisValue == null || thatValue == null) {
      return false;
    }

    return thisValue < thatValue;
  }

  isGreaterThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    stringValue = (stringValue == null ? '' : stringValue.toString());

    const thisValue = NumberUtils.parseDouble(this.textValue);
    const thatValue = NumberUtils.parseDouble(stringValue);

    if (thisValue == null || thatValue == null) {
      return false;
    }

    return thisValue > thatValue;
  }

  get numericValue() {
    return NumberUtils.parseDouble(this.textValue);
  }

  get isNumeric() {
    if (!this.isEmpty) {
      const number = NumberUtils.parseDouble(this.textValue);

      return number != null;
    }

    return true;
  }
}
