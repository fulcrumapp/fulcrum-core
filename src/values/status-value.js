import TextualValue from './textual-value';

export default class StatusValue extends TextualValue {
  get displayValue() {
    const choice = this.element.statusForValue(this.textValue);

    return choice ? choice.label : this.textValue || '';
  }

  get searchableValue() {
    return this.displayValue;
  }
}
