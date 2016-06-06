import Feature from './feature';
import FormValues from './values/form-values';
import TextUtils from './utils/text-utils';
import DateUtils from './utils/date-utils';
import StatusValue from './values/status-value';
import uuid from 'uuid';

export default class Record extends Feature {
  constructor(attributes, form) {
    super();

    this._form = form || null;

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

  get clientCreatedAt() {
    return this._clientCreatedAt;
  }

  set clientCreatedAt(createdAt) {
    this._clientCreatedAt = createdAt;
  }

  get clientUpdatedAt() {
    return this._clientUpdatedAt;
  }

  set clientUpdatedAt(updatedAt) {
    this._clientUpdatedAt = updatedAt;
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

  get changeset() {
    return this._changeset;
  }

  set changeset(changeset) {
    this._changesetID = changeset.id;
    this._changeset = changeset;
  }

  get changesetID() {
    return this._changesetID;
  }

  get createdBy() {
    return this._createdBy;
  }

  get updatedBy() {
    return this._updatedBy;
  }

  loadChangeset(dataSource, callback) {
    if (this._changesetID == null) {
      callback();
      return;
    }

    dataSource.getChangeset(this._changesetID, (err, changeset) => {
      if (err) {
        return callback(err);
      }

      this._changeset = changeset;

      return callback();
    });
  }

  toJSON() {
    const json = {};

    json.form_id = this._form.id;

    json.id = this.id || null;
    json.version = this._version || null;
    json.created_at = DateUtils.formatISOTimestamp(this.createdAt);
    json.updated_at = DateUtils.formatISOTimestamp(this.updatedAt);
    json.client_created_at = DateUtils.formatISOTimestamp(this.clientCreatedAt);
    json.client_updated_at = DateUtils.formatISOTimestamp(this.clientUpdatedAt);
    json.form_values = this.formValues.toJSON();
    json.latitude = this._latitude || null;
    json.longitude = this._longitude || null;
    json.project_id = this._projectID || null;
    json.assigned_to_id = this._assignedToID || null;
    json.status = this._status || null;

    json.created_by_id = this._createdByID || null;
    json.created_by = this._createdBy || null;
    json.updated_by_id = this._updatedByID || null;
    json.updated_by = this._updatedBy || null;

    if (this._horizontalAccuracy != null) {
      json.horizontal_accuracy = this._horizontalAccuracy;
    }

    if (this._verticalAccuracy != null) {
      json.vertical_accuracy = this._verticalAccuracy;
    }

    if (this._altitude != null) {
      json.altitude = this._altitude;
    }

    if (this._speed != null) {
      json.speed = this._speed;
    }

    if (this._course != null) {
      json.course = this._course;
    }

    if (this._changesetID) {
      json.changeset_id = this._changesetID;
    }

    return json;
  }

  updateFromAPIAttributes(attrs) {
    const attributes = attrs || {};

    this._id = attributes.id || uuid.v4();
    this._version = attributes.version || null;
    this._createdAt = DateUtils.parseISOTimestamp(attributes.created_at);
    this._updatedAt = DateUtils.parseISOTimestamp(attributes.updated_at);
    this._clientCreatedAt = DateUtils.parseISOTimestamp(attributes.client_created_at);
    this._clientUpdatedAt = DateUtils.parseISOTimestamp(attributes.client_updated_at);
    this._formValuesJSON = attributes.form_values || {};
    this._latitude = attributes.latitude || null;
    this._longitude = attributes.longitude || null;
    this._projectID = attributes.project_id || null;
    this._assignedToID = attributes.assigned_to_id || null;
    this._status = attributes.status || null;

    this._createdByID = attributes.created_by_id || null;
    this._createdBy = attributes.created_by || null;
    this._updatedByID = attributes.updated_by_id || null;
    this._updatedBy = attributes.updated_by || null;

    this._horizontalAccuracy = attributes.horizontal_accuracy || null;
    this._verticalAccuracy = attributes.vertical_accuracy || null;
    this._altitude = attributes.altitude || null;
    this._speed = attributes.speed || null;
    this._course = attributes.course || null;

    this._changesetID = attributes.changeset_id || null;
  }

  updateTimestamps() {
    const now = new Date();

    if (this.clientCreatedAt == null) {
      this.clientCreatedAt = now;
    }

    this.clientUpdatedAt = now;
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

  get searchableValue() {
    return this.formValues.searchableValue;
  }

  get displayValue() {
    const titleFieldKeys = this.form.titleFieldKeys;
    const titles = [];

    for (const fieldKey of titleFieldKeys) {
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

  get formID() {
    return this.form ? this.form.id : null;
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

  get createdByID() {
    return this._createdByID;
  }

  get updatedByID() {
    return this._updatedByID;
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

  get altitude() {
    return this._altitude;
  }

  set altitude(altitude) {
    this._altitude = altitude;
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = speed;
  }

  get course() {
    return this._course;
  }

  set course(course) {
    this._course = course;
  }

  get geometryAsGeoJSON() {
    if (!this.hasCoordinate) {
      return null;
    }

    return {
      type: 'Point',
      coordinates: [
        this.longitude,
        this.latitude
      ]
    };
  }

  updateFromActionAttributes(attributes, role) {
    for (const dataName of Object.keys(attributes)) {
      switch (dataName) {
        case 'project_id': {
          if (attributes.project_id && role.canChangeProject) {
            this.projectID = attributes.project_id;
          }

          break;
        }

        case 'assigned_to_id': {
          if (attributes.assigned_to_id && role.canChangeAssignment) {
            this.assignedToID = attributes.assigned_to_id;
          }

          break;
        }

        case 'status': {
          if (attributes.status && role.canChangeStatus) {
            this.status = attributes.status;
          }

          break;
        }

        case 'latitude': {
          if (attributes.latitude != null && attributes.latitude >= -90 && attributes.latitude <= 90) {
            this.latitude = +attributes.latitude;
          }

          break;
        }

        case 'longitude': {
          if (attributes.longitude != null && attributes.longitude >= -180 && attributes.longitude <= 180) {
            this.longitude = +attributes.longitude;
          }

          break;
        }

        default: {
          const element = this.form.elementsByDataName[dataName];
          const value = attributes[dataName];

          if (element && value != null) {
            const formValue = this.formValues.createValueFromString(element, value);

            if (formValue) {
              this.formValues.set(element.key, formValue);
            }
          }

          break;
        }
      }
    }
  }
}
