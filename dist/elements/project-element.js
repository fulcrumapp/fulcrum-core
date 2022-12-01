"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_element_1 = __importDefault(require("./textual-element"));
const DEFAULT_PROJECT_ELEMENT = {
    label: 'Project',
    key: '@project',
    data_name: 'project',
    disabled: false,
    hidden: false,
    choices: []
};
class ProjectElement extends textual_element_1.default {
    constructor(parent, attributes) {
        attributes.type = 'ProjectField';
        const attrs = Object.assign({}, DEFAULT_PROJECT_ELEMENT, attributes);
        super(parent, attrs);
        this._disabled = !!attrs.disabled;
        this._hidden = !!attrs.hidden;
    }
    get isEnabled() {
        return !this._disabled;
    }
    get isReadOnly() {
        return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._readOnly;
    }
    projectForValue(value) {
        for (const choice of this.choices) {
            if (choice.value === value) {
                return choice;
            }
        }
        return null;
    }
}
exports.default = ProjectElement;
//# sourceMappingURL=project-element.js.map