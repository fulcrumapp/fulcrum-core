"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
class DynamicElement extends element_1.default {
    get isLengthValidationSupported() {
        return true;
    }
}
exports.default = DynamicElement;
//# sourceMappingURL=dynamic-element.js.map