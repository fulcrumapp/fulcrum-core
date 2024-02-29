"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_item_value_1 = __importDefault(require("./media-item-value"));
class PhotoItemValue extends media_item_value_1.default {
    get mediaKey() {
        return 'photo_id';
    }
}
exports.default = PhotoItemValue;
//# sourceMappingURL=photo-item-value.js.map