"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_validation_error_1 = __importDefault(require("./element-validation-error"));
const util_1 = require("util");
class NumericFormatValidationError extends element_validation_error_1.default {
    get message() {
        const messageFormat = this.element.isIntegerFormat ? "The value of field '%s' must be an integer number."
            : "The value of field '%s' must be an decimal number.";
        return (0, util_1.format)(messageFormat, this.label);
    }
}
exports.default = NumericFormatValidationError;
//# sourceMappingURL=numeric-format-validation-error.js.map