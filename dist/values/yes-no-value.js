"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_value_1 = __importDefault(require("./textual-value"));
class YesNoValue extends textual_value_1.default {
    get isPositive() {
        if (this.element.positiveChoice) {
            return this.textValue === this.element.positiveChoice.value;
        }
        return false;
    }
    get isNegative() {
        if (this.element.negativeChoice) {
            return this.textValue === this.element.negativeChoice.value;
        }
        return false;
    }
    get isNeutral() {
        if (this.element.neutralChoice) {
            return this.textValue === this.element.neutralChoice.value;
        }
        return false;
    }
    get displayValue() {
        switch (true) {
            case this.isPositive:
                return this.element.positiveChoice.label;
            case this.isNegative:
                return this.element.negativeChoice.label;
            case this.isNeutral:
                return this.element.neutralChoice.label;
            default:
                return this.textValue || '';
        }
    }
}
exports.default = YesNoValue;
//# sourceMappingURL=yes-no-value.js.map