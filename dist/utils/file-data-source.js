"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const form_1 = __importDefault(require("../form"));
const choice_list_1 = __importDefault(require("../choice-list"));
const classification_set_1 = __importDefault(require("../classification-set"));
class FileDataSource {
    constructor(root) {
        this.root = root.toString();
    }
    json(jsonPath) {
        return JSON.parse(fs_1.default.readFileSync(jsonPath).toString());
    }
    getChoiceList(id, callback) {
        const jsonPath = path_1.default.join(this.root, 'choice_lists', id + '.json');
        return callback(null, new choice_list_1.default(this.json(jsonPath).choice_list));
    }
    getClassificationSet(id, callback) {
        const jsonPath = path_1.default.join(this.root, 'classification_sets', id + '.json');
        return callback(null, new classification_set_1.default(this.json(jsonPath).classification_set));
    }
    getForm(id, callback) {
        const jsonPath = path_1.default.join(this.root, 'forms', id + '.json');
        return callback(null, new form_1.default(this.json(jsonPath).form));
    }
    getUsers(params, callback) {
        return callback(null, []);
    }
    getProjects(params, callback) {
        return callback(null, []);
    }
}
exports.default = FileDataSource;
//# sourceMappingURL=file-data-source.js.map