import FormValue from './form-value';
import TextUtils from '../utils/text-utils';
import NumberUtils from '../utils/number-utils';

export default class TextualValue extends FormValue {
  constructor(element, textValue) {
    super(element, textValue);

    this.textValue = textValue != null ? textValue.toString() : null;
  }

  format({useDisplayValue = false}) {
    if (this.isEmpty) {
      return null;
    }

    return useDisplayValue ? this.displayValue : this.textValue;
  }

  get isEmpty() {
    return this.textValue == null || this.textValue.length === 0;
  }

  get displayValue() {
    return this.textValue || '';
  }

  get searchableValue() {
    return this.displayValue || '';
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

    const string = (stringValue == null ? '' : stringValue.toString());

    return this.textValue.toLowerCase() === string.toLowerCase();
  }

  contains(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    const string = stringValue.toString();

    return TextUtils.contains(this.textValue, string);
  }

  startsWith(stringValue) {
    if (this.isEmpty) {
      return TextUtils.isEmpty(stringValue);
    }

    if (stringValue == null) {
      return false;
    }

    return TextUtils.startsWith(this.textValue, stringValue.toString());
  }

  isLessThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    let string = null;

    if (stringValue != null) {
      string = stringValue.toString();
    }

    const thisValue = NumberUtils.parseDouble(this.textValue);
    const thatValue = NumberUtils.parseDouble(string);

    if (thisValue == null || thatValue == null) {
      return false;
    }

    return thisValue < thatValue;
  }

  isGreaterThan(stringValue) {
    if (this.textValue == null || stringValue == null) {
      return false;
    }

    const string = (stringValue == null ? '' : stringValue.toString());

    const thisValue = NumberUtils.parseDouble(this.textValue);
    const thatValue = NumberUtils.parseDouble(string);

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
