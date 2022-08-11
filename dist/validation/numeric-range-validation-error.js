"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_validation_error_1 = __importDefault(require("./element-validation-error"));
const util_1 = require("util");
class NumericRangeValidationError extends element_validation_error_1.default {
    get message() {
        let message = null;
        const fieldLabel = this.label;
        if (this.element.hasMin && this.element.hasMax) {
            message = (0, util_1.format)("The value of field '%s' must be between %s and %s.", fieldLabel, this.element.min, this.element.max);
        }
        else if (this.element.hasMin) {
            message = (0, util_1.format)("The value of field '%s' must be greater than or equal to %s.", fieldLabel, this.element.min);
        }
        else {
            message = (0, util_1.format)("The value of field '%s' must be less than or equal to %s.", fieldLabel, this.element.max);
        }
        return message;
    }
}
exports.default = NumericRangeValidationError;
//# sourceMappingURL=numeric-range-validation-error.js.map