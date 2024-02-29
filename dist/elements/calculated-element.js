"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_element_1 = __importDefault(require("./textual-element"));
const display_options_1 = __importDefault(require("./display-options"));
class CalculatedElement extends textual_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.expression = attributes.expression;
        this.display = new display_options_1.default(attributes.display);
    }
    static findCalculatedElementRoot(form, container) {
        if (container.type != null) {
            if (container.isSectionElement) {
                return CalculatedElement.findCalculatedElementRoot(form, container.parent);
            }
            else if (container.isRepeatableElement) {
                return container;
            }
        }
        return form;
    }
    static findCalculatedElementsForContainer(container) {
        let elements = [];
        for (const element of container.elements) {
            if (element.isCalculatedElement) {
                elements.push(element);
            }
            else if (element.isSectionElement) {
                elements = elements.concat(CalculatedElement.findCalculatedElementsForContainer(element));
            }
        }
        return elements;
    }
}
exports.default = CalculatedElement;
//# sourceMappingURL=calculated-element.js.map