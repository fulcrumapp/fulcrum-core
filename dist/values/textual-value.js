"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_1 = __importDefault(require("./form-value"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
const number_utils_1 = __importDefault(require("../utils/number-utils"));
class TextualValue extends form_value_1.default {
    constructor(element, textValue) {
        super(element, textValue);
        this.textValue = textValue != null ? textValue.toString() : null;
    }
    format({ useDisplayValue = false }) {
        if (this.isEmpty) {
            return null;
        }
        return useDisplayValue ? this.displayValue : this.textValue;
    }
    get isEmpty() {
        return this.textValue == null || this.textValue.length === 0;
    }
    get displayValue() {
        return this.textValue || '';
    }
    get searchableValue() {
        return this.displayValue || '';
    }
    get length() {
        if (this.textValue != null) {
            return this.textValue.length;
        }
        return 0;
    }
    get columnValue() {
        return this.textValue || null;
    }
    get multipleValues() {
        return null;
    }
    toJSON() {
        if (this.isEmpty) {
            return null;
        }
        return this.textValue;
    }
    isEqual(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        const string = (stringValue == null ? '' : stringValue.toString());
        return this.textValue.toLowerCase() === string.toLowerCase();
    }
    contains(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        if (stringValue == null) {
            return false;
        }
        const string = stringValue.toString();
        return text_utils_1.default.contains(this.textValue, string);
    }
    startsWith(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        if (stringValue == null) {
            return false;
        }
        return text_utils_1.default.startsWith(this.textValue, stringValue.toString());
    }
    isLessThan(stringValue) {
        if (this.textValue == null || stringValue == null) {
            return false;
        }
        let string = null;
        if (stringValue != null) {
            string = stringValue.toString();
        }
        const thisValue = number_utils_1.default.parseDouble(this.textValue);
        const thatValue = number_utils_1.default.parseDouble(string);
        if (thisValue == null || thatValue == null) {
            return false;
        }
        return thisValue < thatValue;
    }
    isGreaterThan(stringValue) {
        if (this.textValue == null || stringValue == null) {
            return false;
        }
        const string = (stringValue == null ? '' : stringValue.toString());
        const thisValue = number_utils_1.default.parseDouble(this.textValue);
        const thatValue = number_utils_1.default.parseDouble(string);
        if (thisValue == null || thatValue == null) {
            return false;
        }
        return thisValue > thatValue;
    }
    get numericValue() {
        return number_utils_1.default.parseDouble(this.textValue);
    }
    get isNumeric() {
        if (!this.isEmpty) {
            const number = number_utils_1.default.parseDouble(this.textValue);
            return number != null;
        }
        return true;
    }
}
exports.default = TextualValue;
//# sourceMappingURL=textual-value.js.map