import TextualValue from './textual-value';
import NumberUtils from '../utils/number-utils';

export default class TextValue extends TextualValue {
  get columnValue() {
    if (this.element.isNumeric) {
      return this.numericValue;
    }
    // this does NOT work in loose mode
    // return super.columnValue;
    return this.textValue || null;
  }

  get displayValue() {
    if (this.element.isNumeric && this.textValue != null) {
      return NumberUtils.localizedStringFromMachineString(this.textValue, this.element.isDecimalFormat);
    }

    return this.textValue || '';
  }
}
