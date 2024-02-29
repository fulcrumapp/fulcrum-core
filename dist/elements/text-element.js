"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_element_1 = __importDefault(require("./textual-element"));
class TextElement extends textual_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this._isNumeric = !!attributes.numeric;
        this.format = attributes.format;
        this.min = null;
        this.max = null;
        if (attributes.min != null) {
            this.min = +attributes.min;
        }
        if (attributes.max != null) {
            this.max = +attributes.max;
        }
        if (isNaN(this.min)) {
            this.min = null;
        }
        if (isNaN(this.max)) {
            this.max = null;
        }
        this.pattern = attributes.pattern;
        this.patternDescription = attributes.pattern_description;
    }
    get isLengthValidationSupported() {
        return true;
    }
    get isDecimalFormat() {
        return this._isNumeric && this.format === 'decimal';
    }
    get isIntegerFormat() {
        return this._isNumeric && this.format === 'integer';
    }
    get isNumeric() {
        return this._isNumeric;
    }
    get hasMin() {
        return this.min != null;
    }
    get hasMax() {
        return this.max != null;
    }
    get hasPattern() {
        return this.pattern && this.pattern.length;
    }
    get hasPatternDescription() {
        return this.patternDescription && this.patternDescription.length;
    }
    toJSON() {
        const json = super.toJSON();
        json.numeric = this.isNumeric;
        if (this.isNumeric) {
            json.format = this.format || 'decimal';
            json.min = this.hasMin ? this.min : null;
            json.max = this.hasMax ? this.max : null;
        }
        else {
            json.pattern = this.hasPattern ? this.pattern : null;
            json.pattern_description = this.hasPatternDescription ? this.patternDescription : null;
        }
        json.min_length = this._minLength;
        json.max_length = this._maxLength;
        json.default_previous_value = !!this._defaultPreviousValue;
        return json;
    }
}
exports.default = TextElement;
//# sourceMappingURL=text-element.js.map