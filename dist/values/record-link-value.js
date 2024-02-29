"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_value_1 = __importDefault(require("./form-value"));
const record_link_item_value_1 = __importDefault(require("./record-link-item-value"));
const multiple_value_item_1 = __importDefault(require("./multiple-value-item"));
const number_utils_1 = __importDefault(require("../utils/number-utils"));
class RecordLinkValue extends form_value_1.default {
    constructor(element, items) {
        super(element, items);
        this._items = [];
        if (items) {
            for (const item of items) {
                this._items.push(new record_link_item_value_1.default(this, item));
            }
        }
    }
    get isEmpty() {
        return this.length === 0;
    }
    get displayValue() {
        if (this.isEmpty) {
            return null;
        }
        if (this.length === 1) {
            return '1 record';
        }
        return this.length + ' records';
    }
    get searchableValue() {
        return this.displayValue;
    }
    get length() {
        return this._items.length;
    }
    format({ part = null }) {
        if (this.isEmpty) {
            return null;
        }
        if (part === 'titles') {
            return this.items.map(item => item.displayValue);
        }
        return this.items.map(item => item.id);
    }
    toJSON() {
        const items = [];
        for (const item of this._items) {
            items.push(item.toJSON());
        }
        return items;
    }
    get columnValue() {
        if (this.isEmpty) {
            return null;
        }
        const ids = [];
        for (const item of this._items) {
            ids.push(item.id);
        }
        return ids;
    }
    get multipleValues() {
        const ids = [];
        for (const item of this._items) {
            ids.push(new multiple_value_item_1.default(this.element, item.id));
        }
        return ids;
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
        return this.length < number_utils_1.default.parseDouble(value);
    }
    isGreaterThan(value) {
        return this.length > number_utils_1.default.parseDouble(value);
    }
    get items() {
        return this._items.slice();
    }
    addRecord(record) {
        const item = new record_link_item_value_1.default(this, { record_id: record.id });
        item._record = record;
        this.insertItem(item);
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
}
exports.default = RecordLinkValue;
//# sourceMappingURL=record-link-value.js.map