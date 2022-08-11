"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const choice_1 = __importDefault(require("./choice"));
class StatusChoice extends choice_1.default {
    constructor(attributes) {
        super(attributes);
        this.color = attributes.color;
    }
}
exports.default = StatusChoice;
//# sourceMappingURL=status-choice.js.map