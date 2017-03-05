'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = require('../feature');

var _feature2 = _interopRequireDefault(_feature);

var _formValues = require('./form-values');

var _formValues2 = _interopRequireDefault(_formValues);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _loadObject = require('../load-object');

var _loadObject2 = _interopRequireDefault(_loadObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RepeatableItemValue = function (_Feature) {
  _inherits(RepeatableItemValue, _Feature);

  function RepeatableItemValue(element, item, index) {
    _classCallCheck(this, RepeatableItemValue);

    var _this = _possibleConstructorReturn(this, _Feature.call(this));

    _this.index = index;

    _this._element = element;
    _this._id = item.id;
    _this._createdAt = _dateUtils2.default.parseEpochTimestamp(item.created_at);
    _this._updatedAt = _dateUtils2.default.parseEpochTimestamp(item.updated_at);
    _this._formValuesJSON = item.form_values;
    _this._version = item.version || 1;
    _this._changesetID = item.changeset_id;

    _this._recordProjectID = item.record_project_id || null;
    _this._recordProjectName = item.record_project || null;
    _this._recordAssignedToID = item.record_assigned_to_id || null;
    _this._recordAssignedToName = item.record_assigned_to || null;
    _this._recordStatus = item.record_status || null;

    _this._createdByID = item.created_by_id || null;
    _this._createdByName = item.created_by || null;
    _this._updatedByID = item.updated_by_id || null;
    _this._updatedByName = item.updated_by || null;

    var geometry = item.geometry;

    if (geometry != null && geometry.type === 'Point' && geometry.coordinates && geometry.coordinates.length > 1) {
      _this._latitude = geometry.coordinates[1];
      _this._longitude = geometry.coordinates[0];
    }

    _this._createdDuration = item.created_duration || null;
    _this._updatedDuration = item.updated_duration || null;
    _this._editedDuration = item.edited_duration || null;

    var createdLocation = item.created_location;

    _this._createdLatitude = null;
    _this._createdLongitude = null;
    _this._createdAltitude = null;
    _this._createdAccuracy = null;

    if (createdLocation) {
      _this._createdLatitude = createdLocation.latitude;
      _this._createdLongitude = createdLocation.longitude;
      _this._createdAltitude = createdLocation.altitude;
      _this._createdAccuracy = createdLocation.horizontal_accuracy;
    }

    var updatedLocation = item.updated_location;

    _this._updatedLatitude = null;
    _this._updatedLongitude = null;
    _this._updatedAltitude = null;
    _this._updatedAccuracy = null;

    if (updatedLocation) {
      _this._updatedLatitude = updatedLocation.latitude;
      _this._updatedLongitude = updatedLocation.longitude;
      _this._updatedAltitude = updatedLocation.altitude;
      _this._updatedAccuracy = updatedLocation.horizontal_accuracy;
    }
    return _this;
  }

  RepeatableItemValue.prototype.toJSON = function toJSON() {
    var json = {};

    json.id = this.id;
    json.created_at = _dateUtils2.default.formatEpochTimestamp(this.createdAt);
    json.updated_at = _dateUtils2.default.formatEpochTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.geometry = this.geometryAsGeoJSON;
    json.created_location = this.createdLocation;
    json.updated_location = this.updatedLocation;
    json.created_duration = this.createdDuration;
    json.updated_duration = this.updatedDuration;
    json.edited_duration = this.editedDuration;

    return json;
  };

  RepeatableItemValue.prototype.updateTimestamps = function updateTimestamps() {
    var now = new Date();

    if (!this._createdAt) {
      this._createdAt = now;
    }

    this._updatedAt = now;
  };

  RepeatableItemValue.prototype.loadChangeset = function loadChangeset(dataSource, callback) {
    return (0, _loadObject2.default)(this, dataSource, 'changeset', 'getChangeset', callback);
  };

  RepeatableItemValue.prototype.loadCreatedBy = function loadCreatedBy(dataSource, callback) {
    return (0, _loadObject2.default)(this, dataSource, 'updatedBy', 'getUser', callback);
  };

  RepeatableItemValue.prototype.loadUpdatedBy = function loadUpdatedBy(dataSource, callback) {
    return (0, _loadObject2.default)(this, dataSource, 'createdBy', 'getUser', callback);
  };

  _createClass(RepeatableItemValue, [{
    key: 'element',
    get: function get() {
      return this._element;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'createdAt',
    get: function get() {
      return this._createdAt;
    },
    set: function set(createdAt) {
      if (createdAt != null && !(createdAt instanceof Date)) {
        throw new TypeError('createdAt must be a Date');
      }

      this._createdAt = createdAt;
    }
  }, {
    key: 'version',
    get: function get() {
      return this._version;
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._updatedAt;
    },
    set: function set(updatedAt) {
      if (updatedAt != null && !(updatedAt instanceof Date)) {
        throw new TypeError('updatedAt must be a Date');
      }

      this._updatedAt = updatedAt;
    }
  }, {
    key: 'formValues',
    get: function get() {
      if (!this._formValues) {
        this._formValues = new _formValues2.default(this._element, this._formValuesJSON);
      }

      return this._formValues;
    }
  }, {
    key: 'hasCoordinate',
    get: function get() {
      return this._latitude != null && this._longitude != null;
    }
  }, {
    key: 'isGeometryEnabled',
    get: function get() {
      return this._element.isGeometryEnabled;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var titleFieldKeys = this._element.titleFieldKeys;
      var titles = [];

      for (var _iterator = titleFieldKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var fieldKey = _ref;

        var formValue = this.formValues.get(fieldKey);

        if (formValue) {
          var displayValue = formValue.displayValue;

          if (_textUtils2.default.isPresent(displayValue)) {
            titles.push(displayValue);
          }
        }
      }

      return titles.join(', ');
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.formValues.searchableValue;
    }
  }, {
    key: 'geometryAsGeoJSON',
    get: function get() {
      if (!this.hasCoordinate) {
        return null;
      }

      return {
        type: 'Point',
        coordinates: [this._longitude, this._latitude]
      };
    }
  }, {
    key: 'latitude',
    get: function get() {
      return this._latitude;
    },
    set: function set(latitude) {
      this._latitude = latitude;
    }
  }, {
    key: 'longitude',
    get: function get() {
      return this._longitude;
    },
    set: function set(longitude) {
      this._longitude = longitude;
    }
  }, {
    key: 'changesetID',
    get: function get() {
      return this._changesetID;
    }
  }, {
    key: 'createdByID',
    get: function get() {
      return this._createdByID;
    }
  }, {
    key: 'updatedByID',
    get: function get() {
      return this._updatedByID;
    }
  }, {
    key: 'changeset',
    get: function get() {
      return this._changeset;
    }
  }, {
    key: 'updatedBy',
    get: function get() {
      return this._updatedBy;
    }
  }, {
    key: 'createdBy',
    get: function get() {
      return this._createdBy;
    }
  }, {
    key: 'createdDuration',
    get: function get() {
      return this._createdDuration;
    },
    set: function set(value) {
      this._createdDuration = value != null ? +value : null;
    }
  }, {
    key: 'updatedDuration',
    get: function get() {
      return this._updatedDuration;
    },
    set: function set(value) {
      this._updatedDuration = value != null ? +value : null;
    }
  }, {
    key: 'editedDuration',
    get: function get() {
      return this._editedDuration;
    },
    set: function set(value) {
      this._editedDuration = value != null ? +value : null;
    }
  }, {
    key: 'createdLatitude',
    get: function get() {
      return this._createdLatitude;
    },
    set: function set(value) {
      this._createdLatitude = value != null ? +value : null;
    }
  }, {
    key: 'createdLongitude',
    get: function get() {
      return this._createdLongitude;
    },
    set: function set(value) {
      this._createdLongitude = value != null ? +value : null;
    }
  }, {
    key: 'createdAltitude',
    get: function get() {
      return this._createdAltitude;
    },
    set: function set(value) {
      this._createdAltitude = value != null ? +value : null;
    }
  }, {
    key: 'createdAccuracy',
    get: function get() {
      return this._createdAccuracy;
    },
    set: function set(value) {
      this._createdAccuracy = value != null ? +value : null;
    }
  }, {
    key: 'updatedLatitude',
    get: function get() {
      return this._updatedLatitude;
    },
    set: function set(value) {
      this._updatedLatitude = value != null ? +value : null;
    }
  }, {
    key: 'updatedLongitude',
    get: function get() {
      return this._updatedLongitude;
    },
    set: function set(value) {
      this._updatedLongitude = value != null ? +value : null;
    }
  }, {
    key: 'updatedAltitude',
    get: function get() {
      return this._updatedAltitude;
    },
    set: function set(value) {
      this._updatedAltitude = value != null ? +value : null;
    }
  }, {
    key: 'updatedAccuracy',
    get: function get() {
      return this._updatedAccuracy;
    },
    set: function set(value) {
      this._updatedAccuracy = value != null ? +value : null;
    }
  }, {
    key: 'hasCreatedCoordinate',
    get: function get() {
      return this.createdLatitude != null && this.createdLongitude != null;
    }
  }, {
    key: 'hasUpdatedCoordinate',
    get: function get() {
      return this.updatedLatitude != null && this.updatedLongitude != null;
    }
  }, {
    key: 'createdLocation',
    get: function get() {
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
  }, {
    key: 'updatedLocation',
    get: function get() {
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
  }, {
    key: 'createdByName',
    get: function get() {
      return this._createdByName;
    }
  }, {
    key: 'updatedByName',
    get: function get() {
      return this._updatedByName;
    }
  }, {
    key: 'recordProjectName',
    get: function get() {
      return this._recordProjectName;
    }
  }, {
    key: 'recordProjectID',
    get: function get() {
      return this._recordProjectID;
    }
  }, {
    key: 'recordAssignedToName',
    get: function get() {
      return this._recordAssignedToName;
    }
  }, {
    key: 'recordAssignedToID',
    get: function get() {
      return this._recordAssignedToID;
    }
  }, {
    key: 'recordStatus',
    get: function get() {
      return this._recordAssignedToID;
    }
  }]);

  return RepeatableItemValue;
}(_feature2.default);

exports.default = RepeatableItemValue;
//# sourceMappingURL=repeatable-item-value.js.map