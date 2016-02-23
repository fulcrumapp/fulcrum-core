'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ChoiceDisplaySeparator = ', ';
const ChoiceSearchSeparator = ' ';

class ChoiceValue extends _formValue2.default {
  constructor(element, attributes) {
    super(element, attributes);

    this._choiceValues = [];
    this._otherValues = [];

    if (attributes) {
      if (attributes.choice_values) {
        for (let choice of attributes.choice_values) {
          if (_textUtils2.default.isPresent(choice)) {
            this._choiceValues.push(choice);
          }
        }
      }

      if (attributes.other_values) {
        for (let choice of attributes.other_values) {
          if (_textUtils2.default.isPresent(choice)) {
            this._otherValues.push(choice);
          }
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
      const choice = this.element.choiceByValue(rawValue);

      const label = choice != null ? choice.label : rawValue;

      if (_textUtils2.default.isPresent(label)) {
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
      const choice = this.element.choiceByValue(rawValue);

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
exports.default = ChoiceValue;
//# sourceMappingURL=choice-value.js.map