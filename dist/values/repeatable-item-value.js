"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _feature = _interopRequireDefault(require("../feature"));

var _formValues = _interopRequireDefault(require("./form-values"));

var _dateUtils = _interopRequireDefault(require("../utils/date-utils"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _loadObject = _interopRequireDefault(require("../load-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RepeatableItemValue = /*#__PURE__*/function (_Feature) {
  _inheritsLoose(RepeatableItemValue, _Feature);

  function RepeatableItemValue(element, attrs, index) {
    var _this;

    _this = _Feature.call(this) || this;
    _this._index = index;
    _this._element = element;

    _this.updateFromAPIAttributes(attrs);

    return _this;
  }

  var _proto = RepeatableItemValue.prototype;

  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    this._id = attrs.id;
    this._createdAt = _dateUtils["default"].parseEpochTimestamp(attrs.created_at);
    this._updatedAt = _dateUtils["default"].parseEpochTimestamp(attrs.updated_at);
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
    this._latitude = attrs.latitude || null;
    this._longitude = attrs.longitude || null;
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

  _proto.toJSON = function toJSON(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        simple = _ref.simple;

    var json = {};
    json.id = this.id;
    json.created_at = _dateUtils["default"].formatEpochTimestamp(this.createdAt);
    json.updated_at = _dateUtils["default"].formatEpochTimestamp(this.updatedAt);
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

  _proto.updateTimestamps = function updateTimestamps() {
    var now = new Date();

    if (!this._createdAt) {
      this._createdAt = now;
    }

    this._updatedAt = now;
  };

  _proto.loadChangeset = function loadChangeset(dataSource, callback) {
    return (0, _loadObject["default"])(this, dataSource, 'changeset', 'getChangeset', callback);
  };

  _proto.loadCreatedBy = function loadCreatedBy(dataSource, callback) {
    return (0, _loadObject["default"])(this, dataSource, 'createdBy', 'getUser', callback);
  };

  _proto.loadUpdatedBy = function loadUpdatedBy(dataSource, callback) {
    return (0, _loadObject["default"])(this, dataSource, 'updatedBy', 'getUser', callback);
  };

  _createClass(RepeatableItemValue, [{
    key: "isRecord",
    get: function get() {
      return false;
    }
  }, {
    key: "isRepeatable",
    get: function get() {
      return true;
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    }
  }, {
    key: "createdAt",
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
    key: "version",
    get: function get() {
      return this._version;
    }
  }, {
    key: "updatedAt",
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
    key: "formValues",
    get: function get() {
      if (!this._formValues) {
        this._formValues = new _formValues["default"](this._element, this._formValuesJSON);
      }

      return this._formValues;
    }
  }, {
    key: "hasCoordinate",
    get: function get() {
      return this._latitude != null && this._longitude != null;
    }
  }, {
    key: "isGeometryEnabled",
    get: function get() {
      return this._element.isGeometryEnabled;
    }
  }, {
    key: "displayValue",
    get: function get() {
      var titleFieldKeys = this._element.titleFieldKeys;
      var titles = [];

      for (var _iterator = _createForOfIteratorHelperLoose(titleFieldKeys), _step; !(_step = _iterator()).done;) {
        var fieldKey = _step.value;
        var formValue = this.formValues.get(fieldKey);

        if (formValue) {
          var displayValue = formValue.displayValue;

          if (_textUtils["default"].isPresent(displayValue)) {
            titles.push(displayValue);
          }
        }
      }

      return titles.join(', ');
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.formValues.searchableValue;
    }
  }, {
    key: "geometryAsGeoJSON",
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
    key: "latitude",
    get: function get() {
      return this._latitude;
    },
    set: function set(latitude) {
      this._latitude = latitude;
    }
  }, {
    key: "longitude",
    get: function get() {
      return this._longitude;
    },
    set: function set(longitude) {
      this._longitude = longitude;
    }
  }, {
    key: "changesetID",
    get: function get() {
      return this._changesetID;
    }
  }, {
    key: "createdByID",
    get: function get() {
      return this._createdByID;
    }
  }, {
    key: "updatedByID",
    get: function get() {
      return this._updatedByID;
    }
  }, {
    key: "changeset",
    get: function get() {
      return this._changeset;
    }
  }, {
    key: "updatedBy",
    get: function get() {
      return this._updatedBy;
    }
  }, {
    key: "createdBy",
    get: function get() {
      return this._createdBy;
    }
  }, {
    key: "createdDuration",
    get: function get() {
      return this._createdDuration;
    },
    set: function set(value) {
      this._createdDuration = value != null ? +value : null;
    }
  }, {
    key: "updatedDuration",
    get: function get() {
      return this._updatedDuration;
    },
    set: function set(value) {
      this._updatedDuration = value != null ? +value : null;
    }
  }, {
    key: "editedDuration",
    get: function get() {
      return this._editedDuration;
    },
    set: function set(value) {
      this._editedDuration = value != null ? +value : null;
    }
  }, {
    key: "createdLatitude",
    get: function get() {
      return this._createdLatitude;
    },
    set: function set(value) {
      this._createdLatitude = value != null ? +value : null;
    }
  }, {
    key: "createdLongitude",
    get: function get() {
      return this._createdLongitude;
    },
    set: function set(value) {
      this._createdLongitude = value != null ? +value : null;
    }
  }, {
    key: "createdAltitude",
    get: function get() {
      return this._createdAltitude;
    },
    set: function set(value) {
      this._createdAltitude = value != null ? +value : null;
    }
  }, {
    key: "createdAccuracy",
    get: function get() {
      return this._createdAccuracy;
    },
    set: function set(value) {
      this._createdAccuracy = value != null ? +value : null;
    }
  }, {
    key: "updatedLatitude",
    get: function get() {
      return this._updatedLatitude;
    },
    set: function set(value) {
      this._updatedLatitude = value != null ? +value : null;
    }
  }, {
    key: "updatedLongitude",
    get: function get() {
      return this._updatedLongitude;
    },
    set: function set(value) {
      this._updatedLongitude = value != null ? +value : null;
    }
  }, {
    key: "updatedAltitude",
    get: function get() {
      return this._updatedAltitude;
    },
    set: function set(value) {
      this._updatedAltitude = value != null ? +value : null;
    }
  }, {
    key: "updatedAccuracy",
    get: function get() {
      return this._updatedAccuracy;
    },
    set: function set(value) {
      this._updatedAccuracy = value != null ? +value : null;
    }
  }, {
    key: "hasCreatedCoordinate",
    get: function get() {
      return this.createdLatitude != null && this.createdLongitude != null;
    }
  }, {
    key: "hasUpdatedCoordinate",
    get: function get() {
      return this.updatedLatitude != null && this.updatedLongitude != null;
    }
  }, {
    key: "createdLocation",
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
    key: "updatedLocation",
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
    key: "recordID",
    get: function get() {
      return this._recordID;
    }
  }, {
    key: "parentID",
    get: function get() {
      return this._parentID;
    }
  }, {
    key: "createdByName",
    get: function get() {
      return this._createdByName;
    },
    set: function set(name) {
      this._createdByName = name;
    }
  }, {
    key: "updatedByName",
    get: function get() {
      return this._updatedByName;
    },
    set: function set(name) {
      this._updatedByName = name;
    }
  }, {
    key: "recordProjectName",
    get: function get() {
      return this._recordProjectName;
    },
    set: function set(name) {
      this._recordProjectName = name;
    }
  }, {
    key: "recordProjectID",
    get: function get() {
      return this._recordProjectID;
    },
    set: function set(id) {
      this._recordProjectID = id;
    }
  }, {
    key: "recordAssignedToName",
    get: function get() {
      return this._recordAssignedToName;
    },
    set: function set(name) {
      this._recordAssignedToName = name;
    }
  }, {
    key: "recordAssignedToID",
    get: function get() {
      return this._recordAssignedToID;
    },
    set: function set(id) {
      this._recordAssignedToID = id;
    }
  }, {
    key: "recordStatus",
    get: function get() {
      return this._recordStatus;
    }
  }]);

  return RepeatableItemValue;
}(_feature["default"]);

exports["default"] = RepeatableItemValue;
//# sourceMappingURL=repeatable-item-value.js.map