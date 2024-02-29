"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textual_element_1 = __importDefault(require("./textual-element"));
const status_choice_1 = __importDefault(require("./status-choice"));
const element_1 = __importDefault(require("./element"));
const DEFAULT_STATUS_ELEMENT = {
    label: 'Status',
    key: '@status',
    data_name: 'status',
    enabled: false,
    read_only: false,
    choices: []
};
class StatusElement extends textual_element_1.default {
    constructor(parent, attributes) {
        attributes.type = 'StatusField';
        const attrs = Object.assign({}, DEFAULT_STATUS_ELEMENT, attributes);
        super(parent, attrs);
        this._statusFilter = null;
        this._choices = [];
        if (attrs.choices) {
            for (const choice of attrs.choices) {
                this._choices.push(new status_choice_1.default(choice));
            }
        }
        this._enabled = !!attrs.enabled;
        this._readOnly = !!attrs.read_only;
    }
    get choices() {
        return this.filteredChoices;
    }
    get isEnabled() {
        return this._enabled;
    }
    get isReadOnly() {
        return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._readOnly;
    }
    get statusFilter() {
        return this._statusFilter;
    }
    set statusFilter(statusFilter) {
        this._statusFilter = statusFilter;
    }
    statusForValue(value) {
        for (const choice of this.choices) {
            if (choice.value === value) {
                return choice;
            }
        }
        return null;
    }
    get filteredChoices() {
        const items = this._choices;
        if (!this.statusFilter) {
            return items;
        }
        const filteredItems = [];
        for (const item of items) {
            for (const filter of this.statusFilter) {
                if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                    filteredItems.push(item);
                }
            }
        }
        return filteredItems;
    }
    get overrideValues() {
        return Object.assign(Object.getOwnPropertyDescriptor(element_1.default.prototype, 'overrideValues').get.call(this), {
            statusFilter: this._statusFilter
        });
    }
    resetOverrides() {
        super.resetOverrides();
        this._statusFilter = null;
    }
}
exports.default = StatusElement;
//# sourceMappingURL=status-element.js.map