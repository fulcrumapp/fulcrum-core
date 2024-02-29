"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Choice {
    constructor(attributes) {
        this.label = attributes.label;
        this.value = attributes.value || attributes.label;
    }
    toJSON() {
        return {
            label: this.label,
            value: this.value
        };
    }
}
exports.default = Choice;
//# sourceMappingURL=choice.js.map