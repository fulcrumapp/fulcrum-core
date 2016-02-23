'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _classification = require('../elements/classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DisplaySeparator = ' ▸ ';

const SearchSeparator = ' ';

class ClassificationValue extends _formValue2.default {
  constructor(element, attributes) {
    super(element, attributes);

    this._choiceValues = [];
    this._otherValues = [];

    for (let choice of attributes.choice_values) {
      if (_textUtils2.default.isPresent(choice)) {
        this._choiceValues.push(choice);
      }
    }

    for (let choice of attributes.other_values) {
      if (_textUtils2.default.isPresent(choice)) {
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

    return allValues.join('\t');
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
          currentClassifications = classification.children;
          break;
        }
      }
    }

    return result;
  }

  setSelectedClassification(classification, otherValue) {
    if (classification instanceof _classification2.default) {
      this._choiceValues = classification.toJSON();
    } else {
      this._choiceValues = [];
    }

    if (otherValue) {
      this._otherValues = [otherValue.toString()];
    } else {
      this._otherVaues = [];
    }
  }
}
exports.default = ClassificationValue;
//# sourceMappingURL=classification-value.js.map