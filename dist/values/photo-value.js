"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_value_1 = __importDefault(require("./media-value"));
const photo_item_value_1 = __importDefault(require("./photo-item-value"));
class PhotoValue extends media_value_1.default {
    get ItemClass() {
        return photo_item_value_1.default;
    }
    get displayValue() {
        if (this.length === 1) {
            return '1 Photo';
        }
        return `${this.length} Photos`;
    }
}
exports.default = PhotoValue;
//# sourceMappingURL=photo-value.js.map