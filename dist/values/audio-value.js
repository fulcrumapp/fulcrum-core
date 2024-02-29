"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_value_1 = __importDefault(require("./media-value"));
const audio_item_value_1 = __importDefault(require("./audio-item-value"));
class AudioValue extends media_value_1.default {
    get ItemClass() {
        return audio_item_value_1.default;
    }
    get displayValue() {
        if (this.length === 1) {
            return '1 Audio File';
        }
        return `${this.length} Audio Files`;
    }
}
exports.default = AudioValue;
//# sourceMappingURL=audio-value.js.map