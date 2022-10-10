"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _dateUtils = _interopRequireDefault(require("./utils/date-utils"));
var _util = require("util");
var _lodash = _interopRequireDefault(require("lodash.compact"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Changeset = /*#__PURE__*/function () {
  function Changeset(attributes) {
    this.updateFromAPIAttributes(attributes);
  }
  var _proto = Changeset.prototype;
  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};
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
    this._closedAt = _dateUtils["default"].parseISOTimestamp(attributes.closed_at);
    this._closedBy = attributes.closed_by;
    this._closedByID = attributes.closed_by_id;
    this._createdAt = _dateUtils["default"].parseISOTimestamp(attributes.created_at);
    this._createdBy = attributes.created_by;
    this._createdByID = attributes.created_by_id;
    this._updatedAt = _dateUtils["default"].parseISOTimestamp(attributes.updated_at);
    this._updatedBy = attributes.updated_by;
    this._updatedByID = attributes.updated_by_id;
    this._formID = attributes.form_id;
  };
  _proto.toJSON = function toJSON() {
    var json = {};
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
    json.closed_at = _dateUtils["default"].formatISOTimestamp(this._closedAt);
    json.closed_by = this._closedBy;
    json.closed_by_id = this._closedByID;
    json.created_at = _dateUtils["default"].formatISOTimestamp(this._createdAt);
    json.created_by = this._createdBy;
    json.created_by_id = this._createdByID;
    json.updated_at = _dateUtils["default"].formatISOTimestamp(this._updatedAt);
    json.updated_by = this._updatedBy;
    json.updated_by_id = this._updatedByID;
    json.form_id = this._formID;
  };
  _createClass(Changeset, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "isClosed",
    get: function get() {
      return this._closedAt != null;
    }
  }, {
    key: "createdAt",
    get: function get() {
      return this._createdAt;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this._updatedAt;
    }
  }, {
    key: "numberOfCreates",
    get: function get() {
      return this._numberOfCreates;
    }
  }, {
    key: "numberOfUpdates",
    get: function get() {
      return this._numberOfUpdates;
    }
  }, {
    key: "numberOfDeletes",
    get: function get() {
      return this._numberOfDeletes;
    }
  }, {
    key: "displayValue",
    get: function get() {
      return (0, _util.format)('Submitted %s by %s from %s', this._createdAt, this._createdBy, this.metadataDescription);
    }
  }, {
    key: "application",
    get: function get() {
      if (this._metadata.import_id) {
        return 'Fulcrum Importer';
      }
      return this._metadata.application;
    }
  }, {
    key: "metadataIndexText",
    get: function get() {
      if (!this._metadata) {
        return null;
      }
      var parts = [];
      for (var _i = 0, _Object$keys = Object.keys(this._metadata); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var value = this._metadata[key];
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
  }, {
    key: "metadataDescription",
    get: function get() {
      var parts = [(0, _lodash["default"])([this.application, this._metadata.application_version]).join(' '), (0, _lodash["default"])([this._metadata.browser, this._metadata.browser_version]).join(' '), (0, _lodash["default"])([this._metadata.platform, this._metadata.platform_version]).join(' '), (0, _lodash["default"])([this._metadata.device_manufacturer, this._metadata.device_model]).join(' ')];
      return (0, _lodash["default"])(parts).join(' / ');
    }
  }, {
    key: "boundingBoxAsGeoJSON",
    get: function get() {
      if (this._minLat == null || this._maxLat == null || this._minLon == null || this._maxLon == null) {
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
        coordinates: [[[this._minLon, this._minLat], [this._minLon, this._maxLat], [this._maxLon, this._maxLat], [this._maxLon, this._minLat], [this._minLon, this._minLat]]]
      };
    }
  }]);
  return Changeset;
}();
exports["default"] = Changeset;
//# sourceMappingURL=changeset.js.map