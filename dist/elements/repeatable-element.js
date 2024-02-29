"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_element_1 = __importDefault(require("./container-element"));
class RepeatableElement extends container_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.titleFieldKeys = attributes.title_field_keys || [attributes.title_field_key];
        this._geometryTypes = attributes.geometry_types;
        this._geometryRequired = !!attributes.geometry_required;
    }
    get isGeometryEnabled() {
        return this._geometryTypes && this._geometryTypes.length > 0;
    }
    get isGeometryRequired() {
        return this.isGeometryEnabled && this._geometryRequired;
    }
    get isLengthValidationSupported() {
        return true;
    }
}
exports.default = RepeatableElement;
//# sourceMappingURL=repeatable-element.js.map