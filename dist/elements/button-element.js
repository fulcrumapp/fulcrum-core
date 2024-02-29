"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
class ButtonElement extends element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.buttonType = attributes.button_type;
    }
}
exports.default = ButtonElement;
//# sourceMappingURL=button-element.js.map