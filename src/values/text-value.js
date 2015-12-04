import TextualValue from './textual-value';

export default class TextValue extends TextualValue {
  get columnValue() {
    if (this.element.numeric) {
      return this.numericValue;
    }
    return super.columnValue;
  }
}
