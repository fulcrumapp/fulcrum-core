"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __importDefault(require("./utils/date-utils"));
class Project {
    constructor(attributes) {
        this.updateFromAPIAttributes(attributes);
    }
    updateFromAPIAttributes(attrs) {
        const attributes = attrs || {};
        this._id = attributes.id;
        this._name = attributes.name;
        this._description = attributes.description;
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
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
}
exports.default = Project;
//# sourceMappingURL=project.js.map