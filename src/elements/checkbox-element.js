import BooleanElement from './boolean-element';

export default class CheckboxElement extends BooleanElement {
  get isLengthValidationSupported() {
    return false;
  }
}
