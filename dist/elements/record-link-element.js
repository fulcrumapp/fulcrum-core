"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
const record_link_condition_1 = __importDefault(require("./record-link-condition"));
const record_link_default_1 = __importDefault(require("./record-link-default"));
class RecordLinkElement extends element_1.default {
    constructor(parent, attributes) {
        super(parent, attributes);
        this._formID = attributes.form_id;
        this.allowMultiple = !!attributes.allow_multiple_records;
        this.allowExisting = !!attributes.allow_existing_records;
        this.allowCreating = !!attributes.allow_creating_records;
        this.allowUpdating = !!attributes.allow_updating_records;
        // TODO(zhm) model these
        this.recordConditionsType = attributes.record_conditions_type;
        this.recordConditions = [];
        if (attributes.record_conditions) {
            for (const condition of attributes.record_conditions) {
                this.recordConditions.push(new record_link_condition_1.default(condition));
            }
        }
        this.recordDefaults = [];
        if (attributes.record_defaults) {
            for (const def of attributes.record_defaults) {
                this.recordDefaults.push(new record_link_default_1.default(def));
            }
        }
    }
    load(dataSource, callback) {
        dataSource.getForm(this._formID, (err, form) => {
            if (err) {
                callback(err);
                return;
            }
            // recursively load the linked forms
            this.form = form;
            this.form.load(dataSource, callback);
        });
    }
}
exports.default = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map