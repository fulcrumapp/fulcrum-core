import Feature from '../feature';
import FormValues from './form-values';
import DateUtils from '../utils/date-utils';
import TextUtils from '../utils/text-utils';
import loadObject from '../load-object';

export default class RepeatableItemValue extends Feature {
  constructor(element, item, index) {
    super();

    this.index = index;

    this._element = element;
    this._id = item.id;
    this._createdAt = DateUtils.parseEpochTimestamp(item.created_at);
    this._updatedAt = DateUtils.parseEpochTimestamp(item.updated_at);
    this._formValuesJSON = item.form_values;
    this._version = item.version || 1;
    this._changesetID = item.changeset_id;
    this._createdByID = item.created_by_id;
    this._updatedByID = item.updated_by_id;

    const geometry = item.geometry;

    if (geometry != null &&
        geometry.type === 'Point' &&
        geometry.coordinates &&
        geometry.coordinates.length > 1) {
      this._latitude = geometry.coordinates[1];
      this._longitude = geometry.coordinates[0];
    }

    this._createdDuration = item.created_duration || null;
    this._updatedDuration = item.updated_duration || null;
    this._editedDuration = item.edited_duration || null;

    const createdLocation = item.created_location;

    if (createdLocation) {
      this._createdLatitude = createdLocation.latitude || null;
      this._createdLongitude = createdLocation.longitude || null;
      this._createdAltitude = createdLocation.altitude || null;
      this._createdAccuracy = createdLocation.horizontal_accuracy || null;
    } else {
      this._createdLatitude = null;
      this._createdLongitude = null;
      this._createdAltitude = null;
      this._createdAccuracy = null;
    }

    const updatedLocation = item.updated_location;

    if (updatedLocation) {
      this._updatedLatitude = updatedLocation.latitude || null;
      this._updatedLongitude = updatedLocation.longitude || null;
      this._updatedAltitude = updatedLocation.altitude || null;
      this._updatedAccuracy = updatedLocation.horizontal_accuracy || null;
    } else {
      this._updatedLatitude = null;
      this._updatedLongitude = null;
      this._updatedAltitude = null;
      this._updatedAccuracy = null;
    }
  }

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get version() {
    return this._version;
  }

  set createdAt(createdAt) {
    if (createdAt != null && !(createdAt instanceof Date)) {
      throw new TypeError('createdAt must be a Date');
    }

    this._createdAt = createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt) {
    if (updatedAt != null && !(updatedAt instanceof Date)) {
      throw new TypeError('updatedAt must be a Date');
    }

    this._updatedAt = updatedAt;
  }

  get formValues() {
    if (!this._formValues) {
      this._formValues = new FormValues(this._element, this._formValuesJSON);
    }

    return this._formValues;
  }

  get hasCoordinate() {
    return this._latitude != null && this._longitude != null;
  }

  toJSON() {
    const json = {};

    json.id = this.id;
    json.created_at = DateUtils.formatEpochTimestamp(this.createdAt);
    json.updated_at = DateUtils.formatEpochTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.geometry = this.geometryAsGeoJSON;
    json.created_location = this.createdLocation;
    json.updated_location = this.updatedLocation;
    json.created_duration = this.createdDuration;
    json.updated_duration = this.updatedDuration;
    json.edited_duration = this.editedDuration;

    return json;
  }

  updateTimestamps() {
    const now = new Date();

    if (!this._createdAt) {
      this._createdAt = now;
    }

    this._updatedAt = now;
  }

  get isGeometryEnabled() {
    return this._element.isGeometryEnabled;
  }

  get displayValue() {
    const titleFieldKeys = this._element.titleFieldKeys;
    const titles = [];

    for (const fieldKey of titleFieldKeys) {
      const formValue = this.formValues.get(fieldKey);

      if (formValue) {
        const displayValue = formValue.displayValue;

        if (TextUtils.isPresent(displayValue)) {
          titles.push(displayValue);
        }
      }
    }

    return titles.join(', ');
  }

  get searchableValue() {
    return this.formValues.searchableValue;
  }

  get geometryAsGeoJSON() {
    if (!this.hasCoordinate) {
      return null;
    }

    return {
      type: 'Point',
      coordinates: [ this._longitude, this._latitude ]
    };
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

  get changesetID() {
    return this._changesetID;
  }

  get createdByID() {
    return this._createdByID;
  }

  get updatedByID() {
    return this._updatedByID;
  }

  loadChangeset(dataSource, callback) {
    return loadObject(this, dataSource, 'changeset', 'getChangeset', callback);
  }

  loadCreatedBy(dataSource, callback) {
    return loadObject(this, dataSource, 'updatedBy', 'getUser', callback);
  }

  loadUpdatedBy(dataSource, callback) {
    return loadObject(this, dataSource, 'createdBy', 'getUser', callback);
  }

  get changeset() {
    return this._changeset;
  }

  get updatedBy() {
    return this._updatedBy;
  }

  get createdBy() {
    return this._createdBy;
  }

  get createdDuration() {
    return this._createdDuration;
  }

  set createdDuration(value) {
    this._createdDuration = (value != null ? +value : null);
  }

  get updatedDuration() {
    return this._updatedDuration;
  }

  set updatedDuration(value) {
    this._updatedDuration = (value != null ? +value : null);
  }

  get editedDuration() {
    return this._editedDuration;
  }

  set editedDuration(value) {
    this._editedDuration = (value != null ? +value : null);
  }

  get createdLatitude() {
    return this._createdLatitude;
  }

  get createdLongitude() {
    return this._createdLongitude;
  }

  get createdAltitude() {
    return this._createdAltitude;
  }

  get createdAccuracy() {
    return this._createdAccuracy;
  }

  set createdLatitude(value) {
    this._createdLatitude = (value != null ? +value : null);
  }

  set createdLongitude(value) {
    this._createdLongitude = (value != null ? +value : null);
  }

  set createdAltitude(value) {
    this._createdAltitude = (value != null ? +value : null);
  }

  set createdAccuracy(value) {
    this._createdAccuracy = (value != null ? +value : null);
  }

  get updatedLatitude() {
    return this._updatedLatitude;
  }

  get updatedLongitude() {
    return this._updatedLongitude;
  }

  get updatedAltitude() {
    return this._updatedAltitude;
  }

  get updatedAccuracy() {
    return this._updatedAccuracy;
  }

  set updatedLatitude(value) {
    this._updatedLatitude = (value != null ? +value : null);
  }

  set updatedLongitude(value) {
    this._updatedLongitude = (value != null ? +value : null);
  }

  set updatedAltitude(value) {
    this._updatedAltitude = (value != null ? +value : null);
  }

  set updatedAccuracy(value) {
    this._updatedAccuracy = (value != null ? +value : null);
  }

  get hasCreatedCoordinate() {
    return this.createdLatitude != null && this.createdLongitude != null;
  }

  get hasUpdatedCoordinate() {
    return this.updatedLatitude != null && this.updatedLongitude != null;
  }

  get createdLocation() {
    if (this.hasCreatedCoordinate) {
      return {
        latitude: this.createdLatitude,
        longitude: this.createdLongitude,
        altitude: this.createdAltitude,
        horizontal_accuracy: this.createdAccuracy
      };
    }

    return null;
  }

  get updatedLocation() {
    if (this.hasUpdatedCoordinate) {
      return {
        latitude: this.updatedLatitude,
        longitude: this.updatedLongitude,
        altitude: this.updatedAltitude,
        horizontal_accuracy: this.updatedAccuracy
      };
    }

    return null;
  }
}
