import Element from './element';
import RecordLinkCondition from './record-link-condition';
import RecordLinkDefault from './record-link-default';

export default class RecordLinkElement extends Element {
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
        this.recordConditions.push(new RecordLinkCondition(condition));
      }
    }

    this.recordDefaults = [];

    if (attributes.record_defaults) {
      for (const def of attributes.record_defaults) {
        this.recordDefaults.push(new RecordLinkDefault(def));
      }
    }
  }

  load(dataSource, callback) {
    dataSource.getForm(this._formID, (err, form) => {
      if (err) {
        return callback(err);
      }

      this.form = form;

      return callback();
    });
  }
}

