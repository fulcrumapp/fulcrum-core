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

  function RepeatableItemValue(element, attrs, index) {
    _classCallCheck(this, RepeatableItemValue);

    var _this = _possibleConstructorReturn(this, _Feature.call(this));

    _this._index = index;
    _this._element = element;

    _this.updateFromAPIAttributes(attrs);
    return _this;
  }

  RepeatableItemValue.prototype.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    this._id = attrs.id;
    this._createdAt = _dateUtils2.default.parseEpochTimestamp(attrs.created_at);
    this._updatedAt = _dateUtils2.default.parseEpochTimestamp(attrs.updated_at);
    this._formValuesJSON = attrs.form_values;
    this._version = attrs.version != null ? attrs.version : 1;
    this._changesetID = attrs.changeset_id;

    this._recordID = attrs.record_id || null;
    this._parentID = attrs.parent_id || null;

    this._recordProjectID = attrs.record_project_id || null;
    this._recordProjectName = attrs.record_project || null;
    this._recordAssignedToID = attrs.record_assigned_to_id || null;
    this._recordAssignedToName = attrs.record_assigned_to || null;
    this._recordStatus = attrs.record_status || null;

    this._createdByID = attrs.created_by_id || null;
    this._createdByName = attrs.created_by || null;
    this._updatedByID = attrs.updated_by_id || null;
    this._updatedByName = attrs.updated_by || null;

    var geometry = attrs.geometry;

    if (geometry != null && geometry.type === 'Point' && geometry.coordinates && geometry.coordinates.length > 1) {
      this._latitude = geometry.coordinates[1];
      this._longitude = geometry.coordinates[0];
    }

    this._createdDuration = attrs.created_duration != null ? attrs.created_duration : null;
    this._updatedDuration = attrs.updated_duration != null ? attrs.updated_duration : null;
    this._editedDuration = attrs.edited_duration != null ? attrs.edited_duration : null;

    var createdLocation = attrs.created_location;

    this._createdLatitude = null;
    this._createdLongitude = null;
    this._createdAltitude = null;
    this._createdAccuracy = null;

    if (createdLocation) {
      this._createdLatitude = createdLocation.latitude;
      this._createdLongitude = createdLocation.longitude;
      this._createdAltitude = createdLocation.altitude;
      this._createdAccuracy = createdLocation.horizontal_accuracy;
    }

    var updatedLocation = attrs.updated_location;

    this._updatedLatitude = null;
    this._updatedLongitude = null;
    this._updatedAltitude = null;
    this._updatedAccuracy = null;

    if (updatedLocation) {
      this._updatedLatitude = updatedLocation.latitude;
      this._updatedLongitude = updatedLocation.longitude;
      this._updatedAltitude = updatedLocation.altitude;
      this._updatedAccuracy = updatedLocation.horizontal_accuracy;
    }
  };

  RepeatableItemValue.prototype.toJSON = function toJSON() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        simple = _ref.simple;

    var json = {};

    json.id = this.id;
    json.created_at = _dateUtils2.default.formatEpochTimestamp(this.createdAt);
    json.updated_at = _dateUtils2.default.formatEpochTimestamp(this.updatedAt);
    json.form_values = simple ? this.formValues.toSimpleJSON() : this.formValues.toJSON();
    json.geometry = this.geometryAsGeoJSON;
    json.created_location = this.createdLocation;
    json.updated_location = this.updatedLocation;
    json.created_duration = this._createdDuration != null ? this._createdDuration : null;
    json.updated_duration = this._updatedDuration != null ? this._updatedDuration : null;
    json.edited_duration = this._editedDuration != null ? this._editedDuration : null;
    json.created_by_id = this._createdByID != null ? this._createdByID : null;
    json.updated_by_id = this._updatedByID != null ? this._updatedByID : null;
    json.version = this._version != null ? this._version : null;
    json.changeset_id = this._changesetID != null ? this._changesetID : null;

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
    return (0, _loadObject2.default)(this, dataSource, 'createdBy', 'getUser', callback);
  };

  RepeatableItemValue.prototype.loadUpdatedBy = function loadUpdatedBy(dataSource, callback) {
    return (0, _loadObject2.default)(this, dataSource, 'updatedBy', 'getUser', callback);
  };

  _createClass(RepeatableItemValue, [{
    key: 'isRecord',
    get: function get() {
      return false;
    }
  }, {
    key: 'isRepeatable',
    get: function get() {
      return true;
    }
  }, {
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
    key: 'index',
    get: function get() {
      return this._index;
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
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var fieldKey = _ref2;

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
    key: 'recordID',
    get: function get() {
      return this._recordID;
    }
  }, {
    key: 'parentID',
    get: function get() {
      return this._parentID;
    }
  }, {
    key: 'createdByName',
    get: function get() {
      return this._createdByName;
    },
    set: function set(name) {
      this._createdByName = name;
    }
  }, {
    key: 'updatedByName',
    get: function get() {
      return this._updatedByName;
    },
    set: function set(name) {
      this._updatedByName = name;
    }
  }, {
    key: 'recordProjectName',
    get: function get() {
      return this._recordProjectName;
    },
    set: function set(name) {
      this._recordProjectName = name;
    }
  }, {
    key: 'recordProjectID',
    get: function get() {
      return this._recordProjectID;
    },
    set: function set(id) {
      this._recordProjectID = id;
    }
  }, {
    key: 'recordAssignedToName',
    get: function get() {
      return this._recordAssignedToName;
    },
    set: function set(name) {
      this._recordAssignedToName = name;
    }
  }, {
    key: 'recordAssignedToID',
    get: function get() {
      return this._recordAssignedToID;
    },
    set: function set(id) {
      this._recordAssignedToID = id;
    }
  }, {
    key: 'recordStatus',
    get: function get() {
      return this._recordStatus;
    }
  }]);

  return RepeatableItemValue;
}(_feature2.default);

exports.default = RepeatableItemValue;
//# sourceMappingURL=repeatable-item-value.js.map