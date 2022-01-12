import BooleanValue from './boolean-value';

export default class CheckBoxValue extends BooleanValue {
  get isChecked() {
    return this.booleanValue;
  }
}
