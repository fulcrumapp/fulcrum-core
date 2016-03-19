import FormValueFactory from './form-value-factory';
import FormValue from './form-value';
import TextualElement from '../elements/textual-element';
import TextUtils from '../utils/text-utils';
import Condition from '../elements/condition';

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

    for (let key of Object.keys(formValues._values)) {
      const formValue = formValues._values[key];

      this.set(key, formValue);
    }
  }

  createValue(element, rawValue) {
    if (element == null) {
      throw new Error('element cannot be null');
    }

    return FormValueFactory.create(element, rawValue != null ? rawValue : null);
  }

  createValueFromString(element, string) {
    if (element.isTextElement) {
      return this.createValue(element, string);
    } else if (element.isChoiceElement) {
      const choice = element.choiceByValue(string);

      if (choice) {
        return this.createValue(element, {choice_values: [ choice.value ]});
      }
    } else if (element.isYesNoElement) {
      return this.createValue(element, string);
    } else if (element.isBarcodeElement) {
      return this.createValue(element, string);
    } else if (element.isClassificationElement) {
      return this.createValue(element, {choice_values: [ string ]});
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

    const destinationIsTextual = element instanceof TextualElement;
    const otherIsTextual = otherValue.element instanceof TextualElement;

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

        if (TextUtils.isPresent(displayValue)) {
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
      if ((element.isChoiceElement && otherValue.element.isChoiceElement) ||
          (element.isClassificationElement && otherValue.element.isClassificationElement)) {
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

  clearInvisibleValues(valuesForConditions, record) {
    const elementsToRemove = [];

    const cache = {};

    for (const formValue of this.all) {
      const element = formValue.element;

      // don't clear out fields that are explicitly marked hidden, or have any parents explicitly marked as hidden
      const skipElement = element.isHidden || element.hasHiddenParent;

      if (!skipElement) {
        const shouldBeVisible = Condition.shouldElementBeVisible(element,
                                                                 record,
                                                                 valuesForConditions,
                                                                 cache);

        if (!shouldBeVisible) {
          elementsToRemove.push(element);
        }
      }
    }

    for (const element of elementsToRemove) {
      const blankValue = this.createValue(element, null);

      this.set(element.key, blankValue);
    }
  }
}
