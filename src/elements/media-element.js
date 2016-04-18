import Element from './element';

export default class MediaElement extends Element {
  get isLengthValidationSupported() {
    return true;
  }
}
