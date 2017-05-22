import DateUtils from './utils/date-utils';
import { format } from 'util';
import compact from 'lodash.compact';

export default class Changeset {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attrs) {
    const attributes = attrs || {};

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

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get displayValue() {
    return format('Submitted %s by %s from %s',
                  this._createdAt,
                  this._createdBy,
                  this.metadataDescription);
  }

  get application() {
    if (this._metadata.import_id) {
      return 'Fulcrum Importer';
    }

    return this._metadata.application;
  }

  get metadataIndexText() {
    if (!this._metadata) {
      return null;
    }

    const parts = [];

    for (const key of Object.keys(this._metadata)) {
      const value = this._metadata[key];

      if (typeof value === 'string') {
        parts.push(value);
      } else if (typeof value === 'number') {
        parts.push(value.toString());
      } else if (value != null) {
        parts.push(JSON.stringify(value));
      }
    }

    return parts.length ? parts.join(' ') : null;
  }

  get metadataDescription() {
    const parts = [
      compact([ this.application,
                this._metadata.application_version ]).join(' '),

      compact([ this._metadata.browser,
                this._metadata.browser_version ]).join(' '),

      compact([ this._metadata.platform,
                this._metadata.platform_version ]).join(' '),

      compact([ this._metadata.device_manufacturer,
                this._metadata.device_model ]).join(' ')
    ];

    return compact(parts).join(' / ');
  }
}
