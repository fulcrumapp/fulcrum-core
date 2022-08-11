"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_value_1 = __importDefault(require("./textual-value"));
const date_utils_1 = __importDefault(require("../utils/date-utils"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
class DateValue extends textual_value_1.default {
    get displayValue() {
        if (this.isEmpty) {
            return null;
        }
        const date = this.dateValue;
        if (date == null) {
            return null;
        }
        return date_utils_1.default.formatLocalizedDate(date);
    }
    get searchableValue() {
        return this.textValue;
    }
    isLessThan(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        const thisDate = this.dateValue;
        const thatDate = date_utils_1.default.parseDate(stringValue);
        if (thisDate == null || thatDate == null) {
            return false;
        }
        return thisDate.getTime() < thatDate.getTime();
    }
    isGreaterThan(stringValue) {
        if (this.isEmpty) {
            return text_utils_1.default.isEmpty(stringValue);
        }
        const thisDate = this.dateValue;
        const thatDate = date_utils_1.default.parseDate(stringValue);
        if (thisDate == null || thatDate == null) {
            return false;
        }
        return thisDate.getTime() > thatDate.getTime();
    }
    get isValid() {
        if (this.isEmpty) {
            return true;
        }
        return date_utils_1.default.isValidDate(this.textValue);
    }
    get dateValue() {
        return date_utils_1.default.parseDate(this.textValue);
    }
    format({ useDisplayValue = false }) {
        if (useDisplayValue) {
            return this.displayValue;
        }
        return this.columnValue;
    }
    get columnValue() {
        if (this.isEmpty) {
            return null;
        }
        return this.dateValue;
        // The following code can be used to convert a date to a unix timestamp integer
        //
        // const timestamp = this.textValue + 'T00:00:00Z';
        // const date = DateUtils.parseISOTimestamp(timestamp);
        // return date ? date.getTime() / 1000 : null;
    }
}
exports.default = DateValue;
//# sourceMappingURL=date-value.js.map