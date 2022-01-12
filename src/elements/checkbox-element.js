import BooleanElement from './boolean-element';

export default class CheckBoxElement extends BooleanElement {
  get isLengthValidationSupported() {
    return false;
  }
}
