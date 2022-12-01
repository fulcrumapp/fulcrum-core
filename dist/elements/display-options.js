"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_utils_1 = __importDefault(require("../utils/text-utils"));
const number_utils_1 = __importDefault(require("../utils/number-utils"));
const date_utils_1 = __importDefault(require("../utils/date-utils"));
class DisplayOptions {
    constructor(attributes) {
        this.style = attributes.style;
        this.currency = attributes.currency;
    }
    get isCurrency() {
        return this.style === 'currency';
    }
    get isNumber() {
        return this.style === 'number';
    }
    get isDate() {
        return this.style === 'date';
    }
    get isText() {
        return this.style === 'text';
    }
    format(value) {
        if (!text_utils_1.default.isPresent(value)) {
            return value;
        }
        switch (true) {
            case this.isNumber: {
                return number_utils_1.default.localizedStringFromMachineString(value, true);
            }
            case this.isDate: {
                const date = date_utils_1.default.parseDate(value);
                if (date != null) {
                    return date_utils_1.default.formatLocalizedDate(date);
                }
                break;
            }
            case this.isCurrency: {
                return number_utils_1.default.formatCurrency(value, this.currency);
            }
            default:
                break;
        }
        return value;
    }
}
exports.default = DisplayOptions;
//# sourceMappingURL=display-options.js.map