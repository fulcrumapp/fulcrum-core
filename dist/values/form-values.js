'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValueFactory = require('./form-value-factory');

var _formValueFactory2 = _interopRequireDefault(_formValueFactory);

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SearchValueSeparator = ' ';

class FormValues {
  constructor(container, attributes) {
    this._values = {};
    this.container = container;
    this.loadValues(container.elements, attributes);
  }

  get all() {
    const result = [];

    for (const key of Object.keys(this._values)) {
      result.push(this._values[key]);
    }

    return result;
  }

  get(key) {
    return this._values[key];
  }

  set(key, value) {
    if (value && !(value instanceof _formValue2.default)) {
      throw new Error('Invalid value ' + value);
    }

    if (value != null) {
      this._values[key] = value;
    } else {
      delete this._values[key];
    }
  }

  find(dataName) {
    const element = this.container.elementsByDataName[dataName];

    if (element) {
      return this.get(element.key);
    }

    return null;
  }

  loadValues(elements, attributes) {
    for (let element of elements) {
      this.loadValue(element, attributes);
    }
  }

  loadValue(element, attributes) {
    if (element.isSectionElement) {
      this.loadValues(element.elements, attributes);
    } else {
      const rawValue = attributes[element.key];

      if (rawValue != null) {
        const formValue = _formValueFactory2.default.create(element, rawValue);

        this.set(element.key, formValue);
      }
    }
  }

  toJSON() {
    const json = {};

    for (let key of Object.keys(this._values)) {
      const formValue = this._values[key];

      if (formValue) {
        const jsonValue = formValue.toJSON();

        if (jsonValue) {
          json[key] = jsonValue;
        }
      }
    }

    return json;
  }

  copy() {
    return new FormValues(this.container, this.toJSON());
  }

  merge(formValues) {
    if (!(formValues instanceof FormValues)) {
      throw new Error('Invalid values');
    }

    for (let key of Object.keys(this._values)) {
      const formValue = this._values[key];

      this.set(key, formValue);
    }
  }

  createValue(element, rawValue) {
    return _formValueFactory2.default.create(element, rawValue != null ? rawValue : null);
  }

  get searchableValue() {
    const searchValues = [];

    for (let key of Object.keys(this._values)) {
      const formValue = this._values[key];

      if (formValue) {
        const searchValue = formValue.searchableValue;

        if (searchValue != null) {
          searchValues.push(searchValue);
        }
      }
    }

    return searchValues.join(SearchValueSeparator);
  }
}
exports.default = FormValues;
//# sourceMappingURL=form-values.js.map