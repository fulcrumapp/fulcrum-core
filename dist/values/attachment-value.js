"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_value_1 = __importDefault(require("./media-value"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
const attachment_item_value_1 = __importDefault(require("./attachment-item-value"));
class AttachmentValue extends media_value_1.default {
    get ItemClass() {
        return attachment_item_value_1.default;
    }
    get displayValue() {
        if (this.length === 1) {
            return '1 Attachment';
        }
        return `${this.length} Attachments`;
    }
    get searchableValue() {
        if (this.isEmpty) {
            return null;
        }
        const ids = [];
        for (const item of this._items) {
            if (text_utils_1.default.isPresent(item.name)) {
                ids.push(item.name);
            }
        }
        return ids.join(' ');
    }
    addItem(id, name) {
        const item = new this.ItemClass(this, { name: name });
        item.mediaID = id;
        this._items.push(item);
        return item;
    }
}
exports.default = AttachmentValue;
//# sourceMappingURL=attachment-value.js.map