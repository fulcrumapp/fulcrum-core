import FormValue from './form-value';
import TextUtils from '../utils/text-utils';

const DisplaySeparator = ' ▸ ';

const SearchSeparator = ' ';

export default class ClassificationValue extends FormValue {
  constructor(element, attributes) {
    super(element, attributes);

    this._choiceValues = [];
    this._otherValues = [];

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
      const classification = this.element.classificationByValue(rawValue);
      const label = classification != null ? classification.label : rawValue;

      if (TextUtils.isPresent(label)) {
        labels.push(label);
      }
    }

    for (let value of this._otherValues) {
      labels.push(value);
    }

    return labels.join(DisplaySeparator);
  }

  get searchableValue() {
    const values = [];
    for (let rawValue of this._choiceValues) {
      const classification = this.element.classificationByValue(rawValue);

      if (classification != null) {
        values.push(classification.label);
        values.push(classification.value);
      } else {
        values.push(rawValue);
      }
    }

    for (let value of this._otherValues) {
      values.push(value);
    }

    return values.join(SearchSeparator);
  }

  get length() {
    return this._choiceValues.length + this._otherValues.length;
  }

  toJSON() {
    if (this.isEmpty()) {
      return null;
    }

    const choiceValues = this._choiceValues.slice();
    const otherValues = this._otherValues.slice();

    return {
      choice_values: choiceValues,
      other_values: otherValues
    };
  }

  columnValue() {
    const allValues = [];

    for (let value of this._choiceValues) {
      allValues.push(value);
    }

    for (let value of this._otherValues) {
      allValues.push(value);
    }

    if (allValues.length === 0) {
      return null;
    }

    if (!this.element.multiple) {
      return allValues[0];
    }

    return allValues.join('\t');
  }

  get multipleValues() {
    return null;
  }

  hasOtherValue() {
    return this._otherValues.length !== 0;
  }
}
