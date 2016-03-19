import Feature from './feature';
import FormValues from './values/form-values';
import TextUtils from './utils/text-utils';
import DateUtils from './utils/date-utils';
import StatusValue from './values/status-value';
import uuid from 'uuid';

export default class Record extends Feature {
  constructor(attributes, form) {
    if (!form) {
      throw new ReferenceError('A form must be passed');
    }

    super();

    this._form = form;

    this.updateFromAPIAttributes(attributes);
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

  get version() {
    return this._version;
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

    // TODO(zhm) this is incomplete
    json.id = this.id || null;
    json.version = this._version || null;
    json.client_created_at = DateUtils.formatTimestamp(this.createdAt);
    json.client_updated_at = DateUtils.formatTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.latitude = this._latitude || null;
    json.longitude = this._longitude || null;
    json.project_id = this._projectID || null;
    json.assigned_to_id = this._assignedToID || null;
    json.form_id = this._form.id;

    return json;
  }

  updateFromAPIAttributes(attributes) {
    this._id = attributes.id || uuid.v4();
    this._version = attributes.version || null;
    this._createdAt = DateUtils.parseTimestamp(attributes.client_created_at);
    this._updatedAt = DateUtils.parseTimestamp(attributes.client_updated_at);
    this._formValuesJSON = attributes.form_values || {};
    this._latitude = attributes.latitude || null;
    this._longitude = attributes.longitude || null;
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
    return new StatusValue(this.form.statusField, this.status);
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

  get projectID() {
    return this._projectID;
  }

  set projectID(id) {
    this._projectID = id;
  }

  get assignedToID() {
    return this._assignedToID;
  }

  set assignedToID(id) {
    this._assignedToID = id;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;
  }

  get latitude() {
    return this._latitude;
  }

  set latitude(latitude) {
    this._latitude = latitude;
  }

  get longitude() {
    return this._longitude;
  }

  set longitude(longitude) {
    this._longitude = longitude;
  }

  get horizontalAccuracy() {
    return this._horizontalAccuracy;
  }

  set horizontalAccuracy(accuracy) {
    this._horizontalAccuracy = accuracy;
  }

  get verticalAccuracy() {
    return this._verticalAccuracy;
  }

  set verticalAccuracy(accuracy) {
    this._verticalAccuracy = accuracy;
  }
}
