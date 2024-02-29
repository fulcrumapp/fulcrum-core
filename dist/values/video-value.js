"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_value_1 = __importDefault(require("./media-value"));
const video_item_value_1 = __importDefault(require("./video-item-value"));
class VideoValue extends media_value_1.default {
    get ItemClass() {
        return video_item_value_1.default;
    }
    get displayValue() {
        if (this.length === 1) {
            return '1 Video';
        }
        return `${this.length} Videos`;
    }
}
exports.default = VideoValue;
//# sourceMappingURL=video-value.js.map