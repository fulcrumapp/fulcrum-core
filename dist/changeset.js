'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dateUtils = require('./utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _util = require('util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Changeset = function () {
  function Changeset(attributes) {
    _classCallCheck(this, Changeset);

    this.updateFromAPIAttributes(attributes);
  }

  Changeset.prototype.updateFromAPIAttributes = function updateFromAPIAttributes(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._metadata = attributes.metadata || {};
    this._minLat = attributes.min_lat;
    this._maxLat = attributes.max_lat;
    this._minLon = attributes.min_lon;
    this._maxLon = attributes.max_lon;
    this._numberOfChanges = attributes.number_of_changes;
    this._closedAt = _dateUtils2.default.parseISOTimestamp(attributes.closed_at);
    this._closedBy = attributes.closed_by;
    this._closedByID = attributes.closed_by_id;
    this._createdAt = _dateUtils2.default.parseISOTimestamp(attributes.created_at);
    this._createdBy = attributes.created_by;
    this._createdByID = attributes.created_by_id;
    this._updatedAt = _dateUtils2.default.parseISOTimestamp(attributes.updated_at);
    this._updatedBy = attributes.updated_by;
    this._updatedByID = attributes.updated_by_id;
    this._formID = attributes.form_id;
  };

  Changeset.prototype.toJSON = function toJSON() {
    var json = {};

    json.id = this._id;
    json.metadata = this._metadata || {};

    json.min_lat = this._minLat;
    json.max_lat = this._maxLat;
    json.min_lon = this._minLon;
    json.max_lon = this._maxLon;

    json.number_of_changes = this._numberOfChanges;

    json.closed_at = _dateUtils2.default.formatISOTimestamp(this._closedAt);
    json.closed_by = this._closedBy;
    json.closed_by_id = this._closedByID;

    json.created_at = _dateUtils2.default.formatISOTimestamp(this._createdAt);
    json.created_by = this._createdBy;
    json.created_by_id = this._createdByID;

    json.updated_at = _dateUtils2.default.formatISOTimestamp(this._updatedAt);
    json.updated_by = this._updatedBy;
    json.updated_by_id = this._updatedByID;

    json.form_id = this._formID;
  };

  _createClass(Changeset, [{
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'isClosed',
    get: function get() {
      return this._closedAt != null;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return (0, _util.format)('Submitted %s by %s from %s', this._createdAt, this._createdBy, this.metadataDescription);
    }
  }, {
    key: 'metadataDescription',
    get: function get() {
      var parts = [_lodash2.default.compact([this._metadata.application, this._metadata.application_version]).join(' '), _lodash2.default.compact([this._metadata.browser, this._metadata.browser_version]).join(' '), _lodash2.default.compact([this._metadata.platform, this._metadata.platform_version]).join(' '), _lodash2.default.compact([this._metadata.device_manufacturer, this._metadata.device_model]).join(' ')];

      return _lodash2.default.compact(parts).join(' / ');
    }
  }]);

  return Changeset;
}();

exports.default = Changeset;
//# sourceMappingURL=changeset.js.map