'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RecordLinkElement extends _element2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.formID = attributes.form_id;

    this.allowMultiple = !!attributes.allow_multiple;
    this.allowExisting = !!attributes.allow_existing;
    this.allowCreating = !!attributes.allow_creating;
    this.allowUpdating = !!attributes.allow_updating;

    // TODO(zhm) model these
    this.recordConditionsType = attributes.record_conditions_type;
    this.recordConditions = attributes.record_conditions;
    this.recordDefaults = attributes.record_defaults;
  }
}
exports.default = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map