import Types from '../elements/element-types';
// import FormValueFactory from './form-value-factory';

let FormValueFactory = null;

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

  toJSON() {
    notImplemented();
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

  static factory() {
    // return FormValueFactory;
    /* eslint-disable global-require */
    return (FormValueFactory = FormValueFactory || require('./form-value-factory').default);
    /* eslint-enable global-require */
  }

  static create(element, attributes) {
    return FormValue.factory().create(element, attributes);
  }

  static classes() {
    if (FormValue._classes == null) {
      FormValue._classes = {};

      for (const klass of Object.keys(Types)) {
        const constructor = FormValue.factory().classes()[Types[klass]];

        if (constructor) {
          FormValue._classes[constructor.name] = constructor;
        }
      }
    }

    return FormValue._classes;
  }
}
