"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_item_value_1 = __importDefault(require("./media-item-value"));
class VideoItemValue extends media_item_value_1.default {
    get mediaKey() {
        return 'video_id';
    }
}
exports.default = VideoItemValue;
//# sourceMappingURL=video-item-value.js.map