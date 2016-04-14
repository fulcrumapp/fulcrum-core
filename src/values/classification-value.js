import FormValue from './form-value';
import TextUtils from '../utils/text-utils';
import Classification from '../elements/classification';

const DisplaySeparator = ' ▸ ';

const SearchSeparator = ' ';

export default class ClassificationValue extends FormValue {
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

  isEqual(value) {
    const classification = this.selectedClassification;

    const choiceValues = classification ? classification.toJSON() : null;

    const ESCAPED = /\\,/g;

    const parts = value.replace(ESCAPED, '\t\t').split(',').map(part => part.replace(/\t\t/g, ','));

    let allMatchSoFar = false;

    let partIndex = 0;

    for (const part of parts) {
      if (part != null && choiceValues && partIndex < choiceValues.length &&
          choiceValues[partIndex].toLowerCase() === part.replace(ESCAPED, ',').toLowerCase()) {
        allMatchSoFar = true;
      } else {
        allMatchSoFar = false;
      }

      ++partIndex;
    }

    return allMatchSoFar;
  }

  contains(value) {
    return this.isEqual(value);
  }

  startsWith(value) {
    return this.contains(value);
  }

  get displayValue() {
    const values = [];

    const classification = this.selectedClassification;

    if (classification) {
      for (let item of classification.exploded) {
        if (item.label) {
          values.push(item.label);
        }
      }
    }

    if (this.hasOtherValue) {
      values.push(this.otherValue);
    }

    return values.join(DisplaySeparator);
  }

  get searchableValue() {
    const values = [];

    const classification = this.selectedClassification;

    if (classification) {
      for (let item of classification.exploded) {
        if (item.label) {
          values.push(item.label);
        }

        if (item.value) {
          values.push(item.value);
        }
      }
    }

    if (this.hasOtherValue) {
      values.push(this.otherValue);
    }

    return values.join(SearchSeparator);
  }

  get length() {
    return this._choiceValues.length + this._otherValues.length;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    const choiceValues = this._choiceValues.slice();
    const otherValues = this._otherValues.slice();

    return {
      choice_values: choiceValues,
      other_values: otherValues
    };
  }

  get columnValue() {
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

    return allValues;
  }

  get multipleValues() {
    return null;
  }

  get hasOtherValue() {
    return this._otherValues.length !== 0;
  }

  get otherValue() {
    if (!this.hasOtherValue) {
      return null;
    }

    return this._otherValues[0];
  }

  set otherValue(value) {
    if (value && value.length) {
      this._otherValues = [ value ];
    } else {
      this._otherValues = [];
    }
  }

  get selectedClassification() {
    let result = null;

    if (this._choiceValues.length === 0) {
      return null;
    }

    let currentClassifications = this.element.classificationItems;

    for (let classificationValue of this._choiceValues) {
      for (let classification of currentClassifications) {
        if (classification.value === classificationValue) {
          result = classification;
          currentClassifications = classification.items;
          break;
        }
      }
    }

    return result;
  }

  setSelectedClassification(classification, otherValue) {
    if (classification instanceof Classification) {
      this.setSelectedClassificationJSON(classification.toJSON(), otherValue);
    } else {
      this.setSelectedClassificationJSON(null, otherValue);
    }
  }

  setSelectedClassificationJSON(classificationAsJSON, otherValue) {
    if (classificationAsJSON && classificationAsJSON.length) {
      this._choiceValues = classificationAsJSON;
    } else {
      this._choiceValues = [];
    }

    if (otherValue) {
      this._otherValues = [ otherValue.toString() ];
    } else {
      this._otherVaues = [];
    }
  }
}
