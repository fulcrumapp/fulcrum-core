import Element from './element';

export default class DynamicElementsElement extends Element {
  get isLengthValidationSupported() {
    return false;
  }
}
