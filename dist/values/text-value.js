"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_value_1 = __importDefault(require("./textual-value"));
const number_utils_1 = __importDefault(require("../utils/number-utils"));
class TextValue extends textual_value_1.default {
    get columnValue() {
        if (this.element.isNumeric) {
            return this.numericValue;
        }
        // this does NOT work in loose mode
        // return super.columnValue;
        return this.textValue || null;
    }
    get displayValue() {
        if (this.element.isNumeric && this.textValue != null) {
            return number_utils_1.default.localizedStringFromMachineString(this.textValue, this.element.isDecimalFormat);
        }
        return this.textValue || '';
    }
    format({ useDisplayValue = false }) {
        if (this.isEmpty) {
            return null;
        }
        if (this.element.isNumeric && this.textValue != null) {
            return this.numericValue;
        }
        return this.displayValue;
    }
}
exports.default = TextValue;
//# sourceMappingURL=text-value.js.map