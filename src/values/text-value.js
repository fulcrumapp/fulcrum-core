import TextualValue from './textual-value';

export default class TextValue extends TextualValue {
  get columnValue() {
    if (this.element.isNumeric) {
      return this.numericValue;
    }
    // this does NOT work in loose mode
    // return super.columnValue;
    return this.textValue || null;
  }
}
