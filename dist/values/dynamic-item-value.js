"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_factory_1 = __importDefault(require("../elements/element-factory"));
const form_values_1 = __importDefault(require("./form-values"));
class DynamicItemValue {
    constructor(dynamicValue, attributes) {
        this.dynamicValue = dynamicValue;
        this._metadataJSON = attributes.metadata;
        this._elementsJSON = attributes.elements;
        this._valuesJSON = attributes.values;
    }
    toJSON() {
        const json = {};
        json.metadata = this._metadataJSON || null;
        json.elements = [];
        for (const element of this.elements) {
            json.elements.push(element.toJSON());
        }
        json.values = this.values.toJSON();
        return json;
    }
    get id() {
        return this.metadata.id;
    }
    get metadata() {
        return this._metadataJSON;
    }
    get elements() {
        if (this._elements == null) {
            this._elements = [];
            for (const elementJSON of this._elementsJSON) {
                const element = element_factory_1.default.create(null, elementJSON);
                if (element) {
                    this._elements.push(element);
                }
            }
        }
        return this._elements;
    }
    get values() {
        if (this._values == null) {
            this._values = new form_values_1.default(this, this._valuesJSON);
        }
        return this._values;
    }
}
exports.default = DynamicItemValue;
//# sourceMappingURL=dynamic-item-value.js.map