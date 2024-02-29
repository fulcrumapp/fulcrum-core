"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_value_1 = __importDefault(require("./textual-value"));
class StatusValue extends textual_value_1.default {
    get displayValue() {
        const choice = this.element.statusForValue(this.textValue);
        return choice ? choice.label : this.textValue || '';
    }
    get searchableValue() {
        return this.displayValue;
    }
}
exports.default = StatusValue;
//# sourceMappingURL=status-value.js.map