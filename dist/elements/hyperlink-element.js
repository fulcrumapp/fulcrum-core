"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_element_1 = __importDefault(require("./textual-element"));
class HyperlinkElement extends textual_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.defaultURL = attributes.default_url;
    }
}
exports.default = HyperlinkElement;
//# sourceMappingURL=hyperlink-element.js.map