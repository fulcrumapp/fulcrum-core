"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_element_1 = __importDefault(require("./container-element"));
class SectionElement extends container_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.display = attributes.display;
    }
    get isDrillDown() {
        return this.display === 'drilldown';
    }
    get isInline() {
        return this.display === 'inline';
    }
}
exports.default = SectionElement;
//# sourceMappingURL=section-element.js.map