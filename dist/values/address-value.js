"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_1 = __importDefault(require("./form-value"));
const address_1 = __importDefault(require("./address"));
class AddressValue extends form_value_1.default {
    constructor(element, attributes) {
        super(element);
        this.address = new address_1.default(attributes);
    }
    get isEmpty() {
        return this.address.isEmpty;
    }
    get displayValue() {
        return this.address.lines.join('\n');
    }
    get searchableValue() {
        return this.address.lines.join(' ');
    }
    get length() {
        return this.displayValue.length;
    }
    get columnValue() {
        const value = {};
        const address = this.address.toJSON();
        for (const key of Object.keys(address)) {
            value['f' + this.element.key + '_' + key] = address[key];
        }
        value['f' + this.element.key] = this.searchableValue;
        return value;
    }
    get multipleValues() {
        return null;
        // TODO(zhm) implement
        // throw new Error('Not implemented');
    }
    format({ part = null }) {
        if (this.isEmpty) {
            return null;
        }
        if (part) {
            return this.address.toJSON()[part];
        }
        return this.searchableValue;
    }
    toJSON() {
        if (this.isEmpty) {
            return null;
        }
        return this.address.toJSON();
    }
    isEqual(stringValue) {
        return false;
    }
    contains(stringValue) {
        return false;
    }
    startsWith(stringValue) {
        return false;
    }
    isLessThan(stringValue) {
        return false;
    }
    isGreaterThan(stringValue) {
        return false;
    }
}
exports.default = AddressValue;
//# sourceMappingURL=address-value.js.map