"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classification_1 = __importDefault(require("./elements/classification"));
const date_utils_1 = __importDefault(require("./utils/date-utils"));
class ClassificationSet {
    constructor(attributes) {
        this.updateFromAPIAttributes(attributes);
    }
    updateFromAPIAttributes(attrs) {
        const attributes = attrs || {};
        this._id = attributes.id;
        this._name = attributes.name;
        this._description = attributes.description;
        this._itemsJSON = attributes.items || [];
        this._version = attributes.version;
        this._createdAt = date_utils_1.default.parseISOTimestamp(attributes.created_at);
        this._updatedAt = date_utils_1.default.parseISOTimestamp(attributes.updated_at);
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get version() {
        return this._version;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get items() {
        if (!this._items) {
            this._items = [];
            for (const item of this._itemsJSON) {
                this._items.push(new classification_1.default(null, item));
            }
        }
        return this._items;
    }
    toJSON() {
        const json = {};
        json.id = this.id || null;
        json.name = this.name || null;
        json.description = this.description || null;
        json.items = this._itemsJSON || null;
        json.version = this.version;
        json.created_at = date_utils_1.default.formatISOTimestamp(this.createdAt);
        json.updated_at = date_utils_1.default.formatISOTimestamp(this.updatedAt);
        return json;
    }
}
exports.default = ClassificationSet;
//# sourceMappingURL=classification-set.js.map