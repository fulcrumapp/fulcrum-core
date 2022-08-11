"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_value_1 = __importDefault(require("./textual-value"));
const date_utils_1 = __importDefault(require("../utils/date-utils"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
class TimeValue extends textual_value_1.default {
    get displayValue() {
        return this.textValue;
    }
    get searchableValue() {
        return this.textValue;
    }
    isLessThan(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        const thisTime = this.timeValue;
        const thatTime = date_utils_1.default.parseTime(stringValue);
        if (thisTime == null || thatTime == null) {
            return false;
        }
        return thisTime < thatTime;
    }
    isGreaterThan(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        const thisTime = this.timeValue;
        const thatTime = date_utils_1.default.parseTime(stringValue);
        if (thisTime == null || thatTime == null) {
            return false;
        }
        return thisTime > thatTime;
    }
    get isValid() {
        if (this.isEmpty) {
            return true;
        }
        return date_utils_1.default.isValidTime(this.textValue);
    }
    get timeValue() {
        if (this.isEmpty) {
            return null;
        }
        return date_utils_1.default.parseTime(this.textValue);
    }
    format({ useDisplayValue = false }) {
        if (useDisplayValue) {
            return this.displayValue;
        }
        return this.columnValue;
    }
    get columnValue() {
        if (!this.isValid) {
            return null;
        }
        return this.textValue || null;
    }
}
exports.default = TimeValue;
//# sourceMappingURL=time-value.js.map