"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_value_1 = __importDefault(require("./boolean-value"));
class CheckboxValue extends boolean_value_1.default {
    get isChecked() {
        return this.booleanValue;
    }
}
exports.default = CheckboxValue;
//# sourceMappingURL=checkbox-value.js.map