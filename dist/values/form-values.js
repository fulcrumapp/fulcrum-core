'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValueFactory = require('./form-value-factory');

var _formValueFactory2 = _interopRequireDefault(_formValueFactory);

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textualElement = require('../elements/textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

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

  createValueFromString(element, string) {
    if (element.isTextElement) {
      return this.createValue(element, string);
    } else if (element.isChoiceElement) {
      const choice = element.choiceByValue(string);

      if (choice) {
        return this.createValue(element, { choice_values: [choice.value] });
      }
    } else if (element.isYesNoElement) {
      return this.createValue(element, string);
    } else if (element.isBarcodeElement) {
      return this.createValue(element, string);
    } else if (element.isClassificationElement) {
      return this.createValue(element, { choice_values: [string] });
    } else if (element.isDateElement) {
      return this.createValue(element, string);
    } else if (element.isTimeElement) {
      return this.createValue(element, string);
    } else if (element.isHyperlinkElement) {
      return this.createValue(element, string);
    }

    return null;
  }

  createValueFromOtherValue(element, otherValue) {
    if (otherValue == null) {
      return this.createValue(element, null);
    }

    const destinationIsTextual = element instanceof _textualElement2.default;
    const otherIsTextual = otherValue.element instanceof _textualElement2.default;

    if (destinationIsTextual && otherIsTextual) {
      // converting text -> text
      // if the other field is a calculated field and it's being copied to a regular text field,
      // use the display value instead of the raw value so it can use the display formatting logic

      let stringValue = otherValue.textValue;

      if (otherValue.element.isCalculatedElement && element.isTextElement) {
        if (!element.isNumeric) {
          stringValue = otherValue.displayValue;
        }
      }

      return this.createValue(element, stringValue);
    } else if (destinationIsTextual && !otherIsTextual) {
      // converting choice -> text
      if (otherValue.element.isChoiceElement || otherValue.element.isClassificationElement) {
        const displayValue = otherValue.displayValue;

        if (_textUtils2.default.isPresent(displayValue)) {
          return this.createValue(element, displayValue);
        }
      }
    } else if (!destinationIsTextual && otherIsTextual) {
      // converting text -> choice
      if (element.isChoiceElement) {
        if (!otherValue.isEmpty) {
          return this.createValueFromString(element, otherValue.textValue);
        }
      }
    } else if (!destinationIsTextual && !otherIsTextual) {
      // choice -> choice
      if (element.isChoiceElement && otherValue.element.isChoiceElement || element.isClassificationElement && otherValue.element.isClassificationElement) {
        return this.createValue(element, otherValue.toJSON());
      } else if (element.isAddressElement && otherValue.element.isAddressElement) {
        // address -> address
        return this.createValue(element, otherValue.toJSON());
      }
    }

    return null;
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