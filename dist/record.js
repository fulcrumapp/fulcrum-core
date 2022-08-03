"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _feature = _interopRequireDefault(require("./feature"));

var _formValues = _interopRequireDefault(require("./values/form-values"));

var _textUtils = _interopRequireDefault(require("./utils/text-utils"));

var _dateUtils = _interopRequireDefault(require("./utils/date-utils"));

var _statusValue = _interopRequireDefault(require("./values/status-value"));

var _uuid = _interopRequireDefault(require("uuid"));

var _loadObject = _interopRequireDefault(require("./load-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Record = /*#__PURE__*/function (_Feature) {
  _inheritsLoose(Record, _Feature);

  function Record(attributes, form) {
    var _this;

    _this = _Feature.call(this) || this;
    _this._form = form || null;

    _this.updateFromAPIAttributes(attributes);

    return _this;
  }

  var _proto = Record.prototype;

  _proto.loadChangeset = function loadChangeset(dataSource, callback) {
    return (0, _loadObject["default"])(this, dataSource, 'changeset', 'getChangeset', callback);
  };

  _proto.toJSON = function toJSON(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        simple = _ref.simple;

    var json = {};
    json.form_id = this._form.id;
    json.id = this.id || null;
    json.version = this._version != null ? this._version : null;
    json.created_at = _dateUtils["default"].formatISOTimestamp(this.createdAt);
    json.updated_at = _dateUtils["default"].formatISOTimestamp(this.updatedAt);
    json.client_created_at = _dateUtils["default"].formatISOTimestamp(this.clientCreatedAt);
    json.client_updated_at = _dateUtils["default"].formatISOTimestamp(this.clientUpdatedAt);
    json.form_values = simple ? this.formValues.toSimpleJSON() : this.formValues.toJSON();
    json.latitude = this._latitude != null ? this._latitude : null;
    json.longitude = this._longitude != null ? this._longitude : null;
    json.project_id = this._projectID || null;
    json.assigned_to_id = this._assignedToID || null;
    json.status = this._status || null;
    json.created_by_id = this._createdByID || null;
    json.created_by = this._createdByName || null;
    json.updated_by_id = this._updatedByID || null;
    json.updated_by = this._updatedBy || null;
    json.horizontal_accuracy = this._horizontalAccuracy != null ? this._horizontalAccuracy : null;
    json.vertical_accuracy = this._verticalAccuracy != null ? this._verticalAccuracy : null;
    json.speed = this._speed != null ? this._speed : null;
    json.course = this._course != null ? this._course : null;

    if (this._altitude != null) {
      json.altitude = this._altitude;
    }

    if (this._changesetID) {
      json.changeset_id = this._changesetID;
    }

    json.created_location = this.createdLocation;
    json.updated_location = this.updatedLocation;
    json.created_duration = this.createdDuration;
    json.updated_duration = this.updatedDuration;
    json.edited_duration = this.editedDuration;
    return json;
  };

  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};
    this._id = attributes.id || _uuid["default"].v4();
    this._version = attributes.version != null ? attributes.version : null;
    this._createdAt = _dateUtils["default"].parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils["default"].parseISOTimestamp(attributes.updated_at);
    this._clientCreatedAt = _dateUtils["default"].parseISOTimestamp(attributes.client_created_at);
    this._clientUpdatedAt = _dateUtils["default"].parseISOTimestamp(attributes.client_updated_at);
    this._formValuesJSON = attributes.form_values || {};
    this._latitude = attributes.latitude != null ? attributes.latitude : null;
    this._longitude = attributes.longitude != null ? attributes.longitude : null;
    this._projectID = attributes.project_id || null;
    this._projectName = attributes.project || null;
    this._assignedToID = attributes.assigned_to_id || null;
    this._assignedToName = attributes.assigned_to || null;
    this._status = attributes.status || null;
    this._createdByID = attributes.created_by_id || null;
    this._createdByName = attributes.created_by || null;
    this._updatedByID = attributes.updated_by_id || null;
    this._updatedByName = attributes.updated_by || null;
    this._horizontalAccuracy = attributes.horizontal_accuracy != null ? attributes.horizontal_accuracy : null;
    this._verticalAccuracy = attributes.vertical_accuracy != null ? attributes.vertical_accuracy : null;
    this._altitude = attributes.altitude != null ? attributes.altitude : null;
    this._speed = attributes.speed != null ? attributes.speed : null;
    this._course = attributes.course != null ? attributes.course : null;
    this._changesetID = attributes.changeset_id || null;
    this._createdDuration = attributes.created_duration != null ? attributes.created_duration : null;
    this._updatedDuration = attributes.updated_duration != null ? attributes.updated_duration : null;
    this._editedDuration = attributes.edited_duration != null ? attributes.edited_duration : null;
    var createdLocation = attributes.created_location;
    this._createdLatitude = attributes.created_latitude != null ? attributes.created_latitude : null;
    this._createdLongitude = attributes.created_longitude != null ? attributes.created_longitude : null;
    this._createdAltitude = attributes.created_altitude != null ? attributes.created_altitude : null;
    this._createdAccuracy = attributes.created_horizontal_accuracy != null ? attributes.created_horizontal_accuracy : null;

    if (createdLocation) {
      this._createdLatitude = createdLocation.latitude;
      this._createdLongitude = createdLocation.longitude;
      this._createdAltitude = createdLocation.altitude;
      this._createdAccuracy = createdLocation.horizontal_accuracy;
    }

    var updatedLocation = attributes.updated_location;
    this._updatedLatitude = attributes.updated_latitude != null ? attributes.updated_latitude : null;
    this._updatedLongitude = attributes.updated_longitude != null ? attributes.updated_longitude : null;
    this._updatedAltitude = attributes.updated_altitude != null ? attributes.updated_altitude : null;
    this._updatedAccuracy = attributes.updated_horizontal_accuracy != null ? attributes.updated_horizontal_accuracy : null;

    if (updatedLocation) {
      this._updatedLatitude = updatedLocation.latitude;
      this._updatedLongitude = updatedLocation.longitude;
      this._updatedAltitude = updatedLocation.altitude;
      this._updatedAccuracy = updatedLocation.horizontal_accuracy;
    }
  };

  _proto.updateTimestamps = function updateTimestamps() {
    var now = new Date();

    if (this.clientCreatedAt == null) {
      this.clientCreatedAt = now;
    }

    this.clientUpdatedAt = now;
  };

  _proto.get = function get(key, formValues) {
    if (key === '@status') {
      return this.statusValue;
    }

    return formValues.get(key);
  };

  _proto.set = function set(key, value, formValues) {
    if (key === '@status') {
      this.status = value.textValue;
      return;
    }

    formValues.set(key, value);
  };

  _proto.updateFromActionAttributes = function updateFromActionAttributes(attributes, role) {
    for (var _i = 0, _Object$keys = Object.keys(attributes); _i < _Object$keys.length; _i++) {
      var dataName = _Object$keys[_i];

      switch (dataName) {
        case 'project_id':
          {
            if (attributes.project_id && role.canChangeProject) {
              this.projectID = attributes.project_id;
            }

            break;
          }

        case 'assigned_to_id':
          {
            if (attributes.assigned_to_id && role.canAssignRecords) {
              this.assignedToID = attributes.assigned_to_id;
            }

            break;
          }

        case 'status':
          {
            if (attributes.status && role.canChangeStatus) {
              this.status = attributes.status;
            }

            break;
          }

        case 'latitude':
          {
            if (attributes.latitude != null && attributes.latitude >= -90 && attributes.latitude <= 90) {
              this.latitude = +attributes.latitude;
            }

            break;
          }

        case 'longitude':
          {
            if (attributes.longitude != null && attributes.longitude >= -180 && attributes.longitude <= 180) {
              this.longitude = +attributes.longitude;
            }

            break;
          }

        default:
          {
            var element = this.form.elementsByDataName[dataName];
            var value = attributes[dataName];

            if (element && value != null) {
              var formValue = this.formValues.createValueFromString(element, value);

              if (formValue) {
                this.formValues.set(element.key, formValue);
              }
            }

            break;
          }
      }
    }
  };

  _createClass(Record, [{
    key: "isRecord",
    get: function get() {
      return true;
    }
  }, {
    key: "isRepeatable",
    get: function get() {
      return false;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(id) {
      this._id = id;
    }
  }, {
    key: "form",
    get: function get() {
      return this._form;
    }
  }, {
    key: "version",
    get: function get() {
      return this._version;
    }
  }, {
    key: "createdAt",
    get: function get() {
      return this._createdAt;
    },
    set: function set(createdAt) {
      this._createdAt = createdAt;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this._updatedAt;
    },
    set: function set(updatedAt) {
      this._updatedAt = updatedAt;
    }
  }, {
    key: "clientCreatedAt",
    get: function get() {
      return this._clientCreatedAt;
    },
    set: function set(createdAt) {
      this._clientCreatedAt = createdAt;
    }
  }, {
    key: "clientUpdatedAt",
    get: function get() {
      return this._clientUpdatedAt;
    },
    set: function set(updatedAt) {
      this._clientUpdatedAt = updatedAt;
    }
  }, {
    key: "formValues",
    get: function get() {
      if (this._formValues == null) {
        this._formValues = new _formValues["default"](this._form, this._formValuesJSON);
      }

      return this._formValues;
    }
  }, {
    key: "hasCoordinate",
    get: function get() {
      return this._latitude != null && this._longitude != null;
    }
  }, {
    key: "changeset",
    get: function get() {
      return this._changeset;
    },
    set: function set(changeset) {
      this._changesetID = changeset.id;
      this._changeset = changeset;
    }
  }, {
    key: "changesetID",
    get: function get() {
      return this._changesetID;
    }
  }, {
    key: "isGeometryEnabled",
    get: function get() {
      return this.form.isGeometryEnabled;
    }
  }, {
    key: "statusValue",
    get: function get() {
      return new _statusValue["default"](this.form.statusField, this.status);
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.formValues.searchableValue;
    }
  }, {
    key: "displayValue",
    get: function get() {
      var titleFieldKeys = this.form.titleFieldKeys;
      var titles = [];

      for (var _iterator = _createForOfIteratorHelperLoose(titleFieldKeys), _step; !(_step = _iterator()).done;) {
        var fieldKey = _step.value;
        var value = this.formValues.get(fieldKey);

        if (value) {
          var displayValue = value.displayValue;

          if (_textUtils["default"].isPresent(displayValue)) {
            titles.push(displayValue);
          }
        }
      }

      return titles.join(', ');
    }
  }, {
    key: "isStatusFieldEnabled",
    get: function get() {
      // invisible if there are no statuses or the status field is marked as hidden
      if (this.form.statusField.choices.length === 0 || this.form.statusField.isHidden) {
        return false;
      } // invisible if it's readonly and there's no status (nothing for the user to read)


      if (this.status == null && this.form.statusField.isReadOnly) {
        return false;
      }

      return this.form.statusField.isEnabled;
    }
  }, {
    key: "formID",
    get: function get() {
      return this.form ? this.form.id : null;
    }
  }, {
    key: "projectName",
    get: function get() {
      return this._projectName;
    }
  }, {
    key: "projectID",
    get: function get() {
      return this._projectID;
    },
    set: function set(id) {
      if (id !== this._projectID) {
        this._projectID = id;
        this._projectName = null;
      }
    }
  }, {
    key: "project",
    set: function set(project) {
      if (project) {
        this._projectID = project.id;
        this._projectName = project.name;
      } else {
        this._projectID = null;
        this._projectName = null;
      }
    }
  }, {
    key: "assignedToName",
    get: function get() {
      return this._assignedToName;
    }
  }, {
    key: "assignedToID",
    get: function get() {
      return this._assignedToID;
    },
    set: function set(id) {
      if (id !== this._assignedToID) {
        this._assignedToID = id;
        this._assignedToName = null;
      }
    }
  }, {
    key: "assignedTo",
    set: function set(user) {
      if (user) {
        this._assignedToID = user.id;
        this._assignedToName = user.fullName;
      } else {
        this._assignedToID = null;
        this._assignedToName = null;
      }
    }
  }, {
    key: "createdBy",
    get: function get() {
      return this._createdBy;
    }
  }, {
    key: "createdByID",
    get: function get() {
      return this._createdByID;
    }
  }, {
    key: "createdByName",
    get: function get() {
      return this._createdByName;
    }
  }, {
    key: "updatedBy",
    get: function get() {
      return this._updatedBy;
    }
  }, {
    key: "updatedByID",
    get: function get() {
      return this._updatedByID;
    }
  }, {
    key: "updatedByName",
    get: function get() {
      return this._updatedByName;
    }
  }, {
    key: "status",
    get: function get() {
      return this._status;
    },
    set: function set(status) {
      this._status = status;
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
    key: "horizontalAccuracy",
    get: function get() {
      return this._horizontalAccuracy;
    },
    set: function set(accuracy) {
      this._horizontalAccuracy = accuracy;
    }
  }, {
    key: "verticalAccuracy",
    get: function get() {
      return this._verticalAccuracy;
    },
    set: function set(accuracy) {
      this._verticalAccuracy = accuracy;
    }
  }, {
    key: "altitude",
    get: function get() {
      return this._altitude;
    },
    set: function set(altitude) {
      this._altitude = altitude;
    }
  }, {
    key: "speed",
    get: function get() {
      return this._speed;
    },
    set: function set(speed) {
      this._speed = speed;
    }
  }, {
    key: "course",
    get: function get() {
      return this._course;
    },
    set: function set(course) {
      this._course = course;
    }
  }, {
    key: "geometryAsGeoJSON",
    get: function get() {
      if (!this.hasCoordinate) {
        return null;
      }

      return {
        type: 'Point',
        coordinates: [this.longitude, this.latitude]
      };
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
  }]);

  return Record;
}(_feature["default"]);

exports["default"] = Record;
//# sourceMappingURL=record.js.map