"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_element_1 = __importDefault(require("./textual-element"));
const choice_1 = __importDefault(require("./choice"));
class YesNoElement extends textual_element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.positiveChoice = new choice_1.default(attributes.positive);
        this.negativeChoice = new choice_1.default(attributes.negative);
        this.neutralChoice = new choice_1.default(attributes.neutral);
        this.neutralEnabled = !!attributes.neutral_enabled;
    }
    toJSON() {
        const json = super.toJSON();
        return Object.assign(Object.assign({}, json), { positive: this.positiveChoice.toJSON(), negative: this.negativeChoice.toJSON(), neutral: this.neutralChoice.toJSON(), neutral_enabled: !!this.neutralEnabled, default_previous_value: !!this._defaultPreviousValue });
    }
}
exports.default = YesNoElement;
//# sourceMappingURL=yes-no-element.js.map