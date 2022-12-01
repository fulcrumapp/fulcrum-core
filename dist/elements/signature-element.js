"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
class SignatureElement extends element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.agreementText = attributes.agreement_text;
    }
}
exports.default = SignatureElement;
//# sourceMappingURL=signature-element.js.map