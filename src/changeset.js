import DateUtils from './utils/date-utils';
import { format } from 'util';
import _ from 'lodash';

export default class Changeset {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._metadata = attributes.metadata || {};
    this._minLat = attributes.min_lat;
    this._maxLat = attributes.max_lat;
    this._minLon = attributes.min_lon;
    this._maxLon = attributes.max_lon;
    this._numberOfChanges = attributes.number_of_changes;
    this._closedAt = DateUtils.parseISOTimestamp(attributes.closed_at);
    this._closedBy = attributes.closed_by;
    this._closedByID = attributes.closed_by_id;
    this._createdAt = DateUtils.parseISOTimestamp(attributes.created_at);
    this._createdBy = attributes.created_by;
    this._createdByID = attributes.created_by_id;
    this._updatedAt = DateUtils.parseISOTimestamp(attributes.updated_at);
    this._updatedBy = attributes.updated_by;
    this._updatedByID = attributes.updated_by_id;
    this._formID = attributes.form_id;
  }

  toJSON() {
    const json = {};

    json.id = this._id;
    json.metadata = this._metadata || {};

    json.min_lat = this._minLat;
    json.max_lat = this._maxLat;
    json.min_lon = this._minLon;
    json.max_lon = this._maxLon;

    json.number_of_changes = this._numberOfChanges;

    json.closed_at = DateUtils.formatISOTimestamp(this._closedAt);
    json.closed_by = this._closedBy;
    json.closed_by_id = this._closedByID;

    json.created_at = DateUtils.formatISOTimestamp(this._createdAt);
    json.created_by = this._createdBy;
    json.created_by_id = this._createdByID;

    json.updated_at = DateUtils.formatISOTimestamp(this._updatedAt);
    json.updated_by = this._updatedBy;
    json.updated_by_id = this._updatedByID;

    json.form_id = this._formID;
  }

  get id() {
    return this._id;
  }

  get isClosed() {
    return this._closedAt != null;
  }

  get displayValue() {
    return format('Submitted %s by %s from %s',
                  this._createdAt,
                  this._createdBy,
                  this.metadataDescription);
  }

  get metadataDescription() {
    const parts = [
      this._metadata.application,
      this._metadata.application_version,
      this._metadata.browser,
      this._metadata.browser_version,
      this._metadata.platform,
      this._metadata.platform_version,
      this._metadata.device_manufacturer,
      this._metadata.device_model
    ];

    return _.compact(parts).join(' / ');
  }
}
