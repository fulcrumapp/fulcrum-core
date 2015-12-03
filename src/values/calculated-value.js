import TextualValue from './textual-value';
import NumberUtils from '../utils/number-utils';

export default class CalculatedValue extends TextualValue {
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
      return NumberUtils.parseDouble(this.textValue);
    } else if (display.isDate) {
      const date = new Date(`${this.textValue} 00:00:00Z`);

      if (date) {
        return date.getTime();
      }
    }

    return this.textValue;
  }
}

