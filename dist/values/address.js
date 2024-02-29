"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_utils_1 = __importDefault(require("../utils/text-utils"));
class Address {
    constructor(attributes) {
        if (attributes) {
            this.streetNumber = attributes.sub_thoroughfare;
            this.streetName = attributes.thoroughfare;
            this.suite = attributes.suite;
            this.city = attributes.locality;
            this.county = attributes.sub_admin_area;
            this.state = attributes.admin_area;
            this.postalCode = attributes.postal_code;
            this.country = attributes.country;
        }
    }
    toJSON() {
        const json = {};
        json.sub_thoroughfare = this.streetNumber || null;
        json.thoroughfare = this.streetName || null;
        json.suite = this.suite || null;
        json.locality = this.city || null;
        json.sub_admin_area = this.county || null;
        json.admin_area = this.state || null;
        json.postal_code = this.postalCode || null;
        json.country = this.country || null;
        return json;
    }
    clear() {
        this.streetNumber = null;
        this.streetName = null;
        this.suite = null;
        this.city = null;
        this.county = null;
        this.state = null;
        this.postalCode = null;
        this.country = null;
    }
    get isEmpty() {
        return !(text_utils_1.default.isPresent(this.streetNumber) ||
            text_utils_1.default.isPresent(this.streetName) ||
            text_utils_1.default.isPresent(this.suite) ||
            text_utils_1.default.isPresent(this.city) ||
            text_utils_1.default.isPresent(this.county) ||
            text_utils_1.default.isPresent(this.state) ||
            text_utils_1.default.isPresent(this.postalCode) ||
            text_utils_1.default.isPresent(this.country));
    }
    get lines() {
        const result = [];
        const line1 = this.line1;
        const line2 = this.line2;
        const line3 = this.line3;
        if (text_utils_1.default.isPresent(line1)) {
            result.push(line1);
        }
        if (text_utils_1.default.isPresent(line2)) {
            result.push(line2);
        }
        if (text_utils_1.default.isPresent(line3)) {
            result.push(line3);
        }
        return result;
    }
    get line1() {
        return this.line(this.streetNumber, this.streetName, this.suite);
    }
    get line2() {
        return this.line(this.city, this.state, this.postalCode);
    }
    get line3() {
        return this.line(this.country);
    }
    line(...parts) {
        const result = [];
        for (const part of parts) {
            if (text_utils_1.default.isPresent(part)) {
                result.push(part);
            }
        }
        return result.join(' ');
    }
}
exports.default = Address;
//# sourceMappingURL=address.js.map