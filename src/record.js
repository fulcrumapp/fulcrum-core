import Feature from './feature';
import FormValues from './values/form-values';
import TextUtils from './utils/text-utils';
import DateUtils from './utils/date-utils';
import StatusValue from './values/status-value';

export default class Record extends Feature {
  constructor(attributes) {
    super();

    // this._id = attributes.id;
    // this._createdAt = DateUtils.parseTimestamp(attributes.client_created_at);
    // this._updatedAt = DateUtils.parseTimestamp(attributes.client_updated_at);
    // this._formValuesJSON = attributes.form_values;
    // this._latitude = attributes.latitude;
    // this._longitude = attributes.longitude;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get form() {
    return this._form;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }

  get formValues() {
    if (this._formValues == null) {
      this._formValues = new FormValues(this._form, this._formValuesJSON);
    }

    return this._formValues;
  }

  get hasCoordinate() {
    return this._latitude != null && this._longitude != null;
  }

  toJSON() {
    const json = {};

    json.id = this.id;
    json.client_created_at = DateUtils.formatTimestamp(this.createdAt);
    json.client_updated_at = DateUtils.formatTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.latitude = this._latitude;
    json.longitude = this._longitude;

    return json;
  }

  updateTimestamps() {
    const now = new Date();

    if (this._createdAt == null) {
      this.createdAt = now;
    }

    this.updatedAt = now;
  }

  get isGeometryEnabled() {
    return this.form.isGeometryEnabled;
  }

  get(key, formValues) {
    if (key === '@status') {
      return this.statusValue;
    }

    return formValues.get(key);
  }

  set(key, value, formValues) {
    if (key === '@status') {
      this.status = value.textValue;
      return;
    }

    formValues.set(key, value);
  }

  get statusValue() {
    return new StatusValue(this.status, this.form.statusField);
  }

  get displayValue() {
    const titleFieldKeys = this.form.titleFieldKeys;
    const titles = [];

    for (let fieldKey of titleFieldKeys) {
      const value = this.formValues.get(fieldKey);

      if (value) {
        const displayValue = value.displayValue;

        if (TextUtils.isPresent(displayValue)) {
          titles.push(displayValue);
        }
      }
    }

    return titles.join(', ');
  }

  get isStatusFieldEnabled() {
    // invisible if there are no statuses or the status field is marked as hidden
    if (this.form.statusField.choices.length === 0 || this.form.statusField.isHidden) {
      return false;
    }

    // invisible if it's readonly and there's no status (nothing for the user to read)
    if (this.status == null && this.form.statusField.isReadOnly) {
      return false;
    }

    return this.form.statusField.isEnabled;
  }
}
