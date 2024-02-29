"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_element_1 = __importDefault(require("./media-element"));
class VideoElement extends media_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.trackEnabled = !!attributes.track_enabled;
        this.audioEnabled = !!attributes.audio_enabled;
    }
}
exports.default = VideoElement;
//# sourceMappingURL=video-element.js.map