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
        this.element = element;
        this._rawValue = value;
    }
    get isEmpty() {
        return notImplemented();
    }
    get displayValue() {
        return notImplemented();
    }
    get searchableValue() {
        return notImplemented();
    }
    get length() {
        return notImplemented();
    }
    get columnValue() {
        return notImplemented();
    }
    get multipleValues() {
        return notImplemented();
    }
    format(options) {
        return notImplemented();
    }
    toJSON() {
        return notImplemented();
    }
    toSimpleJSON() {
        return this.toJSON();
    }
    isEqual(value) {
        return notImplemented();
    }
    contains(value) {
        return notImplemented();
    }
    startsWith(value) {
        return notImplemented();
    }
    isLessThan(value) {
        return notImplemented();
    }
    isGreaterThan(value) {
        return notImplemented();
    }
    static create(element, attributes) {
        return form_value_factory_1.default.create(element, attributes);
    }
}
exports.default = FormValue;
//# sourceMappingURL=form-value.js.map