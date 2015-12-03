import FormValue from './form-value';
import TextUtils from '../utils/text-utils';

const ChoiceDisplaySeparator = ', ';
const ChoiceSearchSeparator = ' ';

export default class ChoiceValue extends FormValue {
  constructor(element, attributes) {
    super(element, attributes);

    this._choiceValues = [];
    this._otherValues = [];

    if (attributes) {
      for (let choice of attributes.choice_values) {
        if (TextUtils.isPresent(choice)) {
          this._choiceValues.push(choice);
        }
      }

      for (let choice of attributes.other_values) {
        if (TextUtils.isPresent(choice)) {
          this._otherValues.push(choice);
        }
      }
    }
  }

  get isEmpty() {
    if (this._choiceValues.length) {
      return false;
    }
    if (this._otherValues.length) {
      return false;
    }
    return true;
  }

  get displayValue() {
    const labels = [];

    for (let rawValue of this._choiceValues) {
      const choice = this.choiceElement.choiceByValue(rawValue);

      const label = (choice != null ? choice.label : rawValue);

      if (TextUtils.isPresent(label)) {
        labels.push(label);
      }
    }

    for (let otherValue of this._otherValues) {
      labels.push(otherValue);
    }

    return labels.join(ChoiceDisplaySeparator);
  }

  get searchableValue() {
    const values = [];

    for (let rawValue of this._choiceValues) {
      const choice = this.choiceElement.choiceByValue(rawValue);

      if (choice != null) {
        values.push(choice.label);
        values.push(choice.value);
      } else {
        values.push(rawValue);
      }
    }

    for (let otherValue of this._otherValues) {
      values.push(otherValue);
    }

    return values.join(ChoiceSearchSeparator);
  }

  get length() {
    return this._choiceValues.length + this._otherValues.length;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    const choiceValues = [];
    const otherValues = [];

    for (let rawValue of this._choiceValues) {
      choiceValues.push(rawValue);
    }

    for (let otherValue of this._otherValues) {
      otherValues.push(otherValue);
    }

    return {
      choice_values: choiceValues,
      other_values: otherValues
    };
  }

  get columnValue() {
    const allValues = [];

    for (let rawValue of this._choiceValues) {
      allValues.push(rawValue);
    }

    for (let otherValue of this._otherValues) {
      allValues.push(otherValue);
    }

    if (allValues.length === 0) {
      return null;
    }

    if (!this.element.multiple) {
      return allValues[0];
    }

    return '\t' + allValues.join('\t') + '\t';
  }

  get multipleValues() {
    return null;
  }

  get hasOtherValue() {
    return this._otherValues.length !== 0;
  }

  get selectedValues() {
    return this._choiceValues.slice();
  }

  set selectedValues(values) {
    this._choiceValues = (values || []).slice();
  }

  get otherValues() {
    return this._otherValues.slice();
  }

  set otherValues(values) {
    this._otherValues = (values || []).slice();
  }

  get otherValue() {
    if (!this.hasOtherValue) {
      return null;
    }

    return this._otherValues[0];
  }
}
