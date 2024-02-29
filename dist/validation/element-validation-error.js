"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = __importDefault(require("../form"));
class ElementValidationError {
    constructor(element) {
        this.element = element;
    }
    get label() {
        const parents = [];
        let iterator = this.element.parent;
        while (iterator) {
            if (!(iterator instanceof form_1.default)) {
                parents.push(iterator.label);
            }
            iterator = iterator.parent;
        }
        const parentLabels = parents.reverse().concat([this.element.label]);
        return parentLabels.join(' / ');
    }
}
exports.default = ElementValidationError;
//# sourceMappingURL=element-validation-error.js.map