"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_factory_1 = __importDefault(require("./form-value-factory"));
function notImplemented() {
    throw new Error('Not implemented');
}
class FormValue {
    constructor(element, value) {
        this._element = element;
        this._rawValue = value;
    }
    get element() {
        return this._element;
    }
    set element(element) {
        this._element = element;
    }
    get isEmpty() {
        notImplemented();
    }
    get displayValue() {
        notImplemented();
    }
    get searchableValue() {
        notImplemented();
    }
    get length() {
        notImplemented();
    }
    get columnValue() {
        notImplemented();
    }
    get multipleValues() {
        notImplemented();
    }
    format(options) {
        notImplemented();
    }
    toJSON() {
        notImplemented();
    }
    toSimpleJSON() {
        return this.toJSON();
    }
    isEqual(value) {
        notImplemented();
    }
    contains(value) {
        notImplemented();
    }
    startsWith(value) {
        notImplemented();
    }
    isLessThan(value) {
        notImplemented();
    }
    isGreaterThan(value) {
        notImplemented();
    }
    static create(element, attributes) {
        return form_value_factory_1.default.create(element, attributes);
    }
}
exports.default = FormValue;
//# sourceMappingURL=form-value.js.map