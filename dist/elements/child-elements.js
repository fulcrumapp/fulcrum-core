"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixmatch_1 = __importDefault(require("mixmatch"));
const element_factory_1 = __importDefault(require("./element-factory"));
class ChildElements extends mixmatch_1.default {
    get elements() {
        if (!this._elements) {
            this.createChildElements(this._elementsJSON);
        }
        return this._elements;
    }
    createChildElements(elements) {
        this._elements = [];
        if (elements) {
            for (const element of elements) {
                const el = element_factory_1.default.create(this, element);
                if (el) {
                    this._elements.push(el);
                }
            }
        }
    }
    get allElements() {
        return this._flattenElements(this.elements);
    }
    get elementsByKey() {
        if (this._elementsByKey == null) {
            this._elementsByKey = this._flattenElementsByAttribute(this.elements, 'key');
        }
        return this._elementsByKey;
    }
    get elementsByDataName() {
        if (this._elementsByDataName == null) {
            this._elementsByDataName = this._flattenElementsByAttribute(this.elements, 'dataName');
        }
        return this._elementsByDataName;
    }
    elementsOfType(type, recurseRepeatables = true) {
        const result = [];
        for (const element of this.flattenElements(recurseRepeatables)) {
            if (element.type === type) {
                result.push(element);
            }
        }
        return result;
    }
    flattenElements(recurseRepeatables = true) {
        return this._flattenElements(this.elements, recurseRepeatables);
    }
    _flattenElements(elements, recurseRepeatables = true) {
        let flat = [];
        for (const element of elements) {
            flat.push(element);
            let recurse = true;
            if (!recurseRepeatables && element.isRepeatableElement) {
                recurse = false;
            }
            if (recurse && element.elements) {
                flat = flat.concat(this._flattenElements(element.elements, recurseRepeatables));
            }
        }
        return flat;
    }
    _flattenElementsByAttribute(elements, attr) {
        const flat = {};
        for (const element of elements) {
            flat[element[attr]] = element;
            if (element.elements) {
                const children = this._flattenElementsByAttribute(element.elements, attr);
                for (const key of Object.keys(children)) {
                    flat[key] = children[key];
                }
            }
        }
        return flat;
    }
}
exports.default = ChildElements;
//# sourceMappingURL=child-elements.js.map