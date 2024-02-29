"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_validation_error_1 = __importDefault(require("./element-validation-error"));
const util_1 = require("util");
class DateFormatValidationError extends element_validation_error_1.default {
    get message() {
        const messageFormat = "The value of field '%s' must be a date in YYYY-MM-DD format.";
        return (0, util_1.format)(messageFormat, this.label);
    }
}
exports.default = DateFormatValidationError;
//# sourceMappingURL=date-format-validation-error.js.map