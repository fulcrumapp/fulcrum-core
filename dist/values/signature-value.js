"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_1 = __importDefault(require("./form-value"));
const date_utils_1 = __importDefault(require("../utils/date-utils"));
class SignatureValue extends form_value_1.default {
    constructor(element, attributes) {
        super(element, attributes);
        if (attributes) {
            this._identifier = attributes.signature_id;
            this._timestamp = date_utils_1.default.parseISOTimestamp(attributes.timestamp);
        }
    }
    get id() {
        return this._identifier;
    }
    set id(id) {
        this._identifier = id;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(timestamp) {
        if (!(timestamp instanceof Date)) {
            throw new TypeError('timestamp must be a Date');
        }
        this._timestamp = timestamp;
    }
    clear() {
        this._identifier = null;
        this._timestamp = null;
    }
    get isEmpty() {
        return this._identifier == null;
    }
    get displayValue() {
        return this.isEmpty ? null : '1 Signature';
    }
    get searchableValue() {
        return null;
    }
    format(_a) {
        var { part = null, formatSignatureURL, formatSignatureViewerURL, formatSignatureName } = _a, args = __rest(_a, ["part", "formatSignatureURL", "formatSignatureViewerURL", "formatSignatureName"]);
        if (this.isEmpty) {
            return null;
        }
        if (part === 'timestamp') {
            return this.timestamp;
        }
        else if (part === 'view' && formatSignatureViewerURL) {
            return formatSignatureViewerURL(this, args);
        }
        else if (part === 'url' && formatSignatureURL) {
            return formatSignatureURL(this, args);
        }
        else if (part === 'name' && formatSignatureName) {
            return formatSignatureName(this, args);
        }
        return this.id;
    }
    get length() {
        return this.isEmpty ? 0 : 1;
    }
    get columnValue() {
        if (this.isEmpty) {
            return null;
        }
        const value = {};
        value['f' + this.element.key + '_timestamp'] = this.timestamp;
        value['f' + this.element.key] = this._identifier;
        return value;
    }
    get multipleValues() {
        return null;
    }
    toJSON() {
        if (this.isEmpty) {
            return null;
        }
        return {
            signature_id: this._identifier,
            timestamp: date_utils_1.default.formatISOTimestamp(this._timestamp)
        };
    }
    isEqual(value) {
        return false;
    }
    contains(value) {
        return false;
    }
    startsWith(value) {
        return false;
    }
    isLessThan(value) {
        return false;
    }
    isGreaterThan(value) {
        return false;
    }
}
exports.default = SignatureValue;
//# sourceMappingURL=signature-value.js.map