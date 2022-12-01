"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_1 = __importDefault(require("./form-value"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
const classification_1 = __importDefault(require("../elements/classification"));
const DisplaySeparator = ' ▸ ';
const SearchSeparator = ' ';
class ClassificationValue extends form_value_1.default {
    constructor(element, attributes) {
        super(element, attributes);
        this._choiceValues = [];
        this._otherValues = [];
        if (attributes) {
            if (attributes.choice_values) {
                for (const choice of attributes.choice_values) {
                    if (text_utils_1.default.isPresent(choice)) {
                        this._choiceValues.push(choice);
                    }
                }
            }
            if (attributes.other_values) {
                for (const choice of attributes.other_values) {
                    if (text_utils_1.default.isPresent(choice)) {
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
            }
            else {
                allMatchSoFar = false;
                break;
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
    get labelStrings() {
        const labels = [];
        const classification = this.selectedClassification;
        if (classification) {
            for (const item of classification.exploded) {
                if (item.label) {
                    labels.push(item.label);
                }
            }
        }
        if (this.hasOtherValue) {
            labels.push(this.otherValue);
        }
        return labels;
    }
    get valueStrings() {
        const values = [];
        for (const value of this._choiceValues) {
            values.push(value);
        }
        for (const value of this._otherValues) {
            values.push(value);
        }
        return values;
    }
    get displayValue() {
        // When a classification entry has been removed but this record still has
        // the value associated with the removed entry, just show the raw value.
        if (this.labelStrings.length === 0) {
            return this.valueStrings.join(DisplaySeparator);
        }
        return this.labelStrings.join(DisplaySeparator);
    }
    get searchableValue() {
        const values = [];
        const classification = this.selectedClassification;
        if (classification) {
            for (const item of classification.exploded) {
                if (item.label) {
                    values.push(item.label);
                }
                if (item.value && item.value !== item.label) {
                    values.push(item.value);
                }
            }
        }
        if (this.hasOtherValue) {
            values.push(this.otherValue);
        }
        return values.join(SearchSeparator);
    }
    format({ useDisplayValue = false }) {
        if (this.isEmpty) {
            return null;
        }
        return useDisplayValue && this.labelStrings.length > 0 ? this.labelStrings : this.valueStrings;
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
    toSimpleJSON({ labels } = {}) {
        if (this.isEmpty) {
            return null;
        }
        const strings = labels ? this.labelStrings : this.valueStrings;
        return strings;
    }
    get columnValue() {
        const allValues = this.valueStrings;
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
            this._otherValues = [value];
        }
        else {
            this._otherValues = [];
        }
    }
    get selectedClassification() {
        let result = null;
        if (this._choiceValues.length === 0) {
            return null;
        }
        let currentClassifications = this.element.classificationItems;
        for (const classificationValue of this._choiceValues) {
            for (const classification of currentClassifications) {
                if (text_utils_1.default.trim(classification.value) === text_utils_1.default.trim(classificationValue)) {
                    result = classification;
                    currentClassifications = classification.items;
                    break;
                }
            }
        }
        return result;
    }
    setSelectedClassification(classification, otherValue) {
        if (classification instanceof classification_1.default) {
            this.setSelectedClassificationJSON(classification.toJSON(), otherValue);
        }
        else {
            this.setSelectedClassificationJSON(null, otherValue);
        }
    }
    setSelectedClassificationJSON(classificationAsJSON, otherValue) {
        if (classificationAsJSON && classificationAsJSON.length) {
            this._choiceValues = classificationAsJSON;
        }
        else {
            this._choiceValues = [];
        }
        if (otherValue) {
            this._otherValues = [otherValue.toString()];
        }
        else {
            this._otherValues = [];
        }
    }
}
exports.default = ClassificationValue;
//# sourceMappingURL=classification-value.js.map