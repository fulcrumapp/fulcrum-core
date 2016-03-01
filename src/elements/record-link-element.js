import Element from './element';

export default class RecordLinkElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.formID = attributes.form_id;

    this.allowMultiple = !!attributes.allow_multiple_records;
    this.allowExisting = !!attributes.allow_existing_records;
    this.allowCreating = !!attributes.allow_creating_records;
    this.allowUpdating = !!attributes.allow_updating_records;

    // TODO(zhm) model these
    this.recordConditionsType = attributes.record_conditions_type;
    this.recordConditions = attributes.record_conditions;
    this.recordDefaults = attributes.record_defaults;
  }
}

