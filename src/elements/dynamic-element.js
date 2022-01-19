import Element from './element';

export default class DynamicElement extends Element {
  get isLengthValidationSupported() {
    return true;
  }
}
