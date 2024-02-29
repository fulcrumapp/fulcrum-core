"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const element_validation_error_1 = __importDefault(require("./element-validation-error"));
class RequiredFieldValidationError extends element_validation_error_1.default {
    get message() {
        return (0, util_1.format)("The field '%s' is required.", this.label);
    }
}
exports.default = RequiredFieldValidationError;
//# sourceMappingURL=required-field-validation-error.js.map