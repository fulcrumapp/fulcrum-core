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

  // This is really more a "falsey" value rather than empty.
  // It is used with the is_empty and is_not_empty visibility
  // conditions (e.g. what value would this field have that
  // could toggle visibility of other elements?)
  get isEmpty() {
    return !this.booleanValue;
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
