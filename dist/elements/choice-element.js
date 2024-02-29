"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
const choice_1 = __importDefault(require("./choice"));
class ChoiceElement extends element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this.multiple = !!attributes.multiple;
        this.allowOther = !!attributes.allow_other;
        this._choiceFilter = null;
        this._overrideChoices = null;
        this._choiceListID = attributes.choice_list_id;
        this._choices = [];
        // TODO(zhm) the loading needs to be re-worked to support choice lists
        if (attributes.choices) {
            for (const choice of attributes.choices) {
                this._choices.push(new choice_1.default(choice));
            }
        }
    }
    load(dataSource, callback) {
        this._choicesByValue = null;
        if (this._choiceListID) {
            dataSource.getChoiceList(this._choiceListID, (err, choiceList) => {
                // TODO(zhm) Some forms have orphaned choice lists (life sucks)
                // Maybe we should add a parameter to the load() method to throw
                // errors.
                if (err) {
                    return callback(err);
                }
                this.choiceList = choiceList;
                this._choices = this.choiceList.choices.slice();
                return callback();
            });
        }
        else {
            setTimeout(callback, 0);
        }
    }
    get isLengthValidationSupported() {
        return this.multiple;
    }
    get choices() {
        return this._overrideChoices ? this._overrideChoices : this.filteredChoices;
    }
    get choiceFilter() {
        return this._choiceFilter;
    }
    set choiceFilter(choiceFilter) {
        this._choiceFilter = choiceFilter;
    }
    get filteredChoices() {
        const items = this._choices;
        if (!this.choiceFilter) {
            return items;
        }
        const filteredItems = [];
        const matchedValues = {};
        for (const item of items) {
            for (const filter of this.choiceFilter) {
                const isMatch = item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
                if (isMatch && !matchedValues[item.value]) {
                    filteredItems.push(item);
                    matchedValues[item.value] = item;
                }
            }
        }
        return filteredItems;
    }
    get overrideChoices() {
        return this._overrideChoices;
    }
    set overrideChoices(overrideChoices) {
        this._choicesByValue = null;
        if (!overrideChoices || overrideChoices.length < 1) {
            this._overrideChoices = null;
            return;
        }
        const choices = [];
        for (const choiceAttributes of overrideChoices) {
            const choice = new choice_1.default(choiceAttributes);
            choices.push(choice);
        }
        this._overrideChoices = choices;
    }
    get overrideValues() {
        return Object.assign(Object.getOwnPropertyDescriptor(element_1.default.prototype, 'overrideValues').get.call(this), {
            choiceFilter: this._choiceFilter,
            overrideChoices: this._overrideChoices
        });
    }
    resetOverrides() {
        super.resetOverrides();
        this._choiceFilter = null;
        this._overrideChoices = null;
    }
    choiceByValue(value) {
        if (!this._choicesByValue) {
            this._choicesByValue = {};
            for (const choice of this.choices) {
                this._choicesByValue[choice.value] = choice;
            }
        }
        return this._choicesByValue[value];
    }
}
exports.default = ChoiceElement;
//# sourceMappingURL=choice-element.js.map