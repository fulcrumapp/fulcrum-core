"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_element_1 = __importDefault(require("./media-element"));
class AudioElement extends media_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.trackEnabled = !!attributes.track_enabled;
    }
}
exports.default = AudioElement;
//# sourceMappingURL=audio-element.js.map