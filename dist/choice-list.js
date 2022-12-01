"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const choice_1 = __importDefault(require("./elements/choice"));
const date_utils_1 = __importDefault(require("./utils/date-utils"));
class ChoiceList {
    constructor(attributes) {
        this.updateFromAPIAttributes(attributes);
    }
    updateFromAPIAttributes(attrs) {
        const attributes = attrs || {};
        this._id = attributes.id;
        this._name = attributes.name;
        this._description = attributes.description;
        this._choicesJSON = attributes.choices || [];
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
    get choices() {
        if (!this._choices) {
            this._choices = [];
            for (const choice of this._choicesJSON) {
                this._choices.push(new choice_1.default(choice));
            }
        }
        return this._choices;
    }
    toJSON() {
        const json = {};
        json.id = this.id || null;
        json.name = this.name || null;
        json.description = this.description || null;
        json.choices = this._choicesJSON || null;
        json.version = this.version;
        json.created_at = date_utils_1.default.formatISOTimestamp(this.createdAt);
        json.updated_at = date_utils_1.default.formatISOTimestamp(this.updatedAt);
        return json;
    }
}
exports.default = ChoiceList;
//# sourceMappingURL=choice-list.js.map