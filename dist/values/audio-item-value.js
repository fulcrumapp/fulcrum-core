"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_item_value_1 = __importDefault(require("./media-item-value"));
class AudioItemValue extends media_item_value_1.default {
    get mediaKey() {
        return 'audio_id';
    }
}
exports.default = AudioItemValue;
//# sourceMappingURL=audio-item-value.js.map