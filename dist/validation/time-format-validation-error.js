"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_validation_error_1 = __importDefault(require("./element-validation-error"));
const util_1 = require("util");
class TimeFormatValidationError extends element_validation_error_1.default {
    get message() {
        const messageFormat = "The value of field '%s' must be a time in HH:MM format.";
        return (0, util_1.format)(messageFormat, this.label);
    }
}
exports.default = TimeFormatValidationError;
//# sourceMappingURL=time-format-validation-error.js.map