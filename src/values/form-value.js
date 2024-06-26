function notImplemented() {
  throw new Error('Not implemented');
}

export default class FormValue {
  constructor(element, value) {
    this._element = element;
    this._rawValue = value;
  }

  get element() {
    return this._element;
  }

  set element(element) {
    this._element = element;
  }

  get isEmpty() {
    notImplemented();
  }

  get displayValue() {
    notImplemented();
  }

  get searchableValue() {
    notImplemented();
  }

  get length() {
    notImplemented();
  }

  get columnValue() {
    notImplemented();
  }

  get multipleValues() {
    notImplemented();
  }

  format(options) {
    notImplemented();
  }

  toJSON() {
    notImplemented();
  }

  toSimpleJSON() {
    return this.toJSON();
  }

  isEqual(value) {
    notImplemented();
  }

  contains(value) {
    notImplemented();
  }

  startsWith(value) {
    notImplemented();
  }

  isLessThan(value) {
    notImplemented();
  }

  isGreaterThan(value) {
    notImplemented();
  }

  static create(element, attributes) {
    const FormValueFactory = require('./form-value-factory').default;
    return FormValueFactory.create(element, attributes);
  }
}
