import BooleanValue from './boolean-value';

export default class CheckboxValue extends BooleanValue {
  get isChecked() {
    return this.booleanValue;
  }
}
