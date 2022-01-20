import FormValue from './form-value';

export default class BooleanValue extends FormValue {
  constructor(element, booleanValue) {
    super(element, booleanValue);

    this.booleanValue = !!booleanValue;
  }

  format({useDisplayValue = false}) {
    return useDisplayValue ? this.displayValue : this.booleanValue;
  }

  get displayValue() {
    return this.booleanValue.toString();
  }

  get length() {
    return 1;
  }

  get isEmpty() {
    return false;
  }

  get searchableValue() {
    return this.booleanValue.toString();
  }

  get columnValue() {
    return this.booleanValue;
  }

  get multipleValues() {
    return null;
  }

  toJSON() {
    return this.booleanValue;
  }

  isEqual(booleanValue) {
    return this.booleanValue === booleanValue;
  }
}