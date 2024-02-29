"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
const child_elements_1 = __importDefault(require("./child-elements"));
class ContainerElement extends element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.createChildElements(attributes.elements);
    }
    resetOverrides() {
        super.resetOverrides();
        for (const element of this.elements) {
            element.resetOverrides();
        }
    }
    static initialize() {
        // this is a bit of a hack to get around circular dependencies. This gets
        // called once from within the factory to setup the class. Putting this
        // at global scope introduces circular dependency errors because ChildElements
        // ends up loading the factory.
        child_elements_1.default.includeInto(ContainerElement);
    }
}
exports.default = ContainerElement;
//# sourceMappingURL=container-element.js.map