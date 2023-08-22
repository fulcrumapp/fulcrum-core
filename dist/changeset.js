"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __importDefault(require("./utils/date-utils"));
const util_1 = require("util");
const compact_1 = __importDefault(require("lodash/compact"));
class Changeset {
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
        this._numberOfCreates = attributes.number_created;
        this._numberOfUpdates = attributes.number_updated;
        this._numberOfDeletes = attributes.number_deleted;
        this._closedAt = date_utils_1.default.parseISOTimestamp(attributes.closed_at);
        this._closedBy = attributes.closed_by;
        this._closedByID = attributes.closed_by_id;
        this._createdAt = date_utils_1.default.parseISOTimestamp(attributes.created_at);
        this._createdBy = attributes.created_by;
        this._createdByID = attributes.created_by_id;
        this._updatedAt = date_utils_1.default.parseISOTimestamp(attributes.updated_at);
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
        json.number_created = this._numberOfCreates;
        json.number_updated = this._numberOfUpdates;
        json.number_deleted = this._numberOfDeletes;
        json.closed_at = date_utils_1.default.formatISOTimestamp(this._closedAt);
        json.closed_by = this._closedBy;
        json.closed_by_id = this._closedByID;
        json.created_at = date_utils_1.default.formatISOTimestamp(this._createdAt);
        json.created_by = this._createdBy;
        json.created_by_id = this._createdByID;
        json.updated_at = date_utils_1.default.formatISOTimestamp(this._updatedAt);
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
    get numberOfCreates() {
        return this._numberOfCreates;
    }
    get numberOfUpdates() {
        return this._numberOfUpdates;
    }
    get numberOfDeletes() {
        return this._numberOfDeletes;
    }
    get displayValue() {
        return (0, util_1.format)('Submitted %s by %s from %s', this._createdAt, this._createdBy, this.metadataDescription);
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
            }
            else if (typeof value === 'number') {
                parts.push(value.toString());
            }
            else if (value != null) {
                parts.push(JSON.stringify(value));
            }
        }
        return parts.length ? parts.join(' ') : null;
    }
    get metadataDescription() {
        const parts = [
            (0, compact_1.default)([this.application,
                this._metadata.application_version]).join(' '),
            (0, compact_1.default)([this._metadata.browser,
                this._metadata.browser_version]).join(' '),
            (0, compact_1.default)([this._metadata.platform,
                this._metadata.platform_version]).join(' '),
            (0, compact_1.default)([this._metadata.device_manufacturer,
                this._metadata.device_model]).join(' ')
        ];
        return (0, compact_1.default)(parts).join(' / ');
    }
    get boundingBoxAsGeoJSON() {
        if (this._minLat == null || this._maxLat == null ||
            this._minLon == null || this._maxLon == null) {
            return null;
        }
        if (this._minLat === this._maxLat && this._minLon === this._maxLon) {
            return {
                type: 'Point',
                coordinates: [this._minLon, this._minLat]
            };
        }
        if (this._minLat === this._maxLat || this._minLon === this._maxLon) {
            return {
                type: 'LineString',
                coordinates: [[this._minLon, this._minLat], [this._maxLon, this._maxLat]]
            };
        }
        return {
            type: 'Polygon',
            coordinates: [
                [
                    [this._minLon, this._minLat],
                    [this._minLon, this._maxLat],
                    [this._maxLon, this._maxLat],
                    [this._maxLon, this._minLat],
                    [this._minLon, this._minLat]
                ]
            ]
        };
    }
}
exports.default = Changeset;
//# sourceMappingURL=changeset.js.map