"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_1 = __importDefault(require("./form-value"));
const repeatable_item_value_1 = __importDefault(require("./repeatable-item-value"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
const uuid_1 = __importDefault(require("uuid"));
const SearchSeparator = ' ';
class RepeatableValue extends form_value_1.default {
    constructor(element, items) {
        super(element, items);
        this._items = [];
        if (items != null) {
            for (const item of items) {
                this._items.push(new repeatable_item_value_1.default(this.element, item, this._items.length));
            }
        }
    }
    get isEmpty() {
        return this._items.length === 0;
    }
    get displayValue() {
        if (this.length === 1) {
            return '1 Item';
        }
        return this.length + ' Items';
    }
    get searchableValue() {
        if (this.isEmpty) {
            return null;
        }
        const values = [];
        for (const item of this._items) {
            const searchValue = item.searchableValue;
            if (text_utils_1.default.isPresent(searchValue)) {
                values.push(searchValue);
            }
        }
        return values.join(SearchSeparator);
    }
    format(options) {
        if (this.isEmpty) {
            return null;
        }
        return options.useDisplayValue ? this.displayValue : this.length;
    }
    get length() {
        return this._items.length;
    }
    toJSON() {
        if (this.isEmpty) {
            return null;
        }
        const items = [];
        for (const item of this._items) {
            items.push(item.toJSON());
        }
        return items;
    }
    toSimpleJSON() {
        if (this.isEmpty) {
            return null;
        }
        const items = [];
        for (const item of this._items) {
            items.push(item.toJSON({ simple: true }));
        }
        return items;
    }
    get columnValue() {
        return null;
    }
    get multipleValues() {
        return null;
    }
    isEqual(value) {
        return false;
    }
    contains(value) {
        return false;
    }
    startsWith(value) {
        return false;
    }
    isLessThan(value) {
        return false;
    }
    isGreaterThan(value) {
        return false;
    }
    mapItems(callback) {
        return this._items.slice().map(callback);
    }
    // return a copy until it's determined that a mutable API is necessary
    get items() {
        return this._items.slice();
    }
    forEachItem(callback) {
        this.mapItems(callback);
    }
    itemIndex(id) {
        for (let index = 0; index < this._items.length; ++index) {
            if (id === this._items[index].id) {
                return index;
            }
        }
        return -1;
    }
    insertItem(item) {
        const index = this.itemIndex(item.id);
        if (index > -1) {
            this._items[index] = item;
        }
        else {
            this._items.push(item);
        }
    }
    removeItem(id) {
        const index = this.itemIndex(id);
        if (index > -1) {
            const item = this._items[index];
            this._items.splice(index, 1);
            return item;
        }
        return null;
    }
    createNewItem() {
        const attributes = {
            id: uuid_1.default.v4(),
            form_values: {}
        };
        return new repeatable_item_value_1.default(this.element, attributes, this._items.length);
    }
}
exports.default = RepeatableValue;
//# sourceMappingURL=repeatable-value.js.map