import TextualValue from './form-value';

export default class StatusValue extends TextualValue {
  get displayValue() {
    return this.textValue || '';
  }
}
