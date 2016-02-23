import FormValueFactory from './form-value-factory';
import FormValue from './form-value';

const SearchValueSeparator = ' ';

export default class FormValues {
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
    if (value && !(value instanceof FormValue)) {
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
        const formValue = FormValueFactory.create(element, rawValue);

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
    return FormValueFactory.create(element, rawValue != null ? rawValue : null);
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
