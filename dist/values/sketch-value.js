"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_value_1 = __importDefault(require("./media-value"));
const sketch_item_value_1 = __importDefault(require("./sketch-item-value"));
class SketchValue extends media_value_1.default {
    get ItemClass() {
        return sketch_item_value_1.default;
    }
    get displayValue() {
        if (this.length === 1) {
            return '1 Sketch';
        }
        return `${this.length} Sketches`;
    }
}
exports.default = SketchValue;
//# sourceMappingURL=sketch-value.js.map