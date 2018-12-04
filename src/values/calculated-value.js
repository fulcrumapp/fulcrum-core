import TextualValue from './textual-value';
import NumberUtils from '../utils/number-utils';

export default class CalculatedValue extends TextualValue {
  constructor(element, value) {
    super(element, value);

    this.error = null;
  }

  format({useDisplayValue = false}) {
    if (this.isEmpty) {
      return null;
    }

    if (useDisplayValue) {
      return this.displayValue;
    }

    const display = this.element.display;

    // - for currency or number display, return the numeric value
    // - for date calculations return the date
    // - for text (and anything else) just return the string value

    if (display.isCurrency || display.isNumber) {
      return NumberUtils.parseDouble(this.textValue);
    } else if (display.isDate) {
      return new Date(`${this.textValue} 00:00:00Z`);
    }

    return this.textValue;
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
    if (this.isEmpty) {
      return null;
    }

    const display = this.element.display;

    // - for currency or number display, return the numeric value
    // - for date calculations return the UTC epoch seconds
    // - for text (and anything else) just return the string value

    if (display.isCurrency || display.isNumber) {
      return NumberUtils.parseDouble(this.textValue);
    } else if (display.isDate) {
      const date = new Date(`${this.textValue} 00:00:00Z`);

      if (date && !isNaN(date)) {
        return date.getTime() / 1000;
      }

      return null;
    }

    return this.textValue;
  }
}

