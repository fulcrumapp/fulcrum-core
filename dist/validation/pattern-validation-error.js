"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_validation_error_1 = __importDefault(require("./element-validation-error"));
const util_1 = require("util");
class PatternValidationError extends element_validation_error_1.default {
    get message() {
        return (0, util_1.format)("The field '%s' is not in the correct format: %s", this.label, this.element.patternDescription);
    }
}
exports.default = PatternValidationError;
//# sourceMappingURL=pattern-validation-error.js.map