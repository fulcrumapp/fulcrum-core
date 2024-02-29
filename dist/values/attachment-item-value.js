"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_item_value_1 = __importDefault(require("./media-item-value"));
class AttachmentItemValue extends media_item_value_1.default {
    constructor(mediaValue, attributes) {
        super(mediaValue, attributes);
        this.name = attributes.name;
    }
    toJSON() {
        const json = {};
        json.name = this.name || null;
        json[this.mediaKey] = this.mediaID || null;
        return json;
    }
    get mediaKey() {
        return 'attachment_id';
    }
}
exports.default = AttachmentItemValue;
//# sourceMappingURL=attachment-item-value.js.map