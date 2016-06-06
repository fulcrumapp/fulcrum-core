'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = require('./feature');

var _feature2 = _interopRequireDefault(_feature);

var _formValues = require('./values/form-values');

var _formValues2 = _interopRequireDefault(_formValues);

var _textUtils = require('./utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _dateUtils = require('./utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _statusValue = require('./values/status-value');

var _statusValue2 = _interopRequireDefault(_statusValue);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Record = function (_Feature) {
  _inherits(Record, _Feature);

  function Record(attributes, form) {
    _classCallCheck(this, Record);

    var _this = _possibleConstructorReturn(this, _Feature.call(this));

    _this._form = form || null;

    _this.updateFromAPIAttributes(attributes);
    return _this;
  }

  Record.prototype.loadChangeset = function loadChangeset(dataSource, callback) {
    var _this2 = this;

    if (this._changesetID == null) {
      callback();
      return;
    }

    dataSource.getChangeset(this._changesetID, function (err, changeset) {
      if (err) {
        return callback(err);
      }

      _this2._changeset = changeset;

      return callback();
    });
  };

  Record.prototype.toJSON = function toJSON() {
    var json = {};

    json.form_id = this._form.id;

    json.id = this.id || null;
    json.version = this._version || null;
    json.created_at = _dateUtils2.default.formatISOTimestamp(this.createdAt);
    json.updated_at = _dateUtils2.default.formatISOTimestamp(this.updatedAt);
    json.client_created_at = _dateUtils2.default.formatISOTimestamp(this.clientCreatedAt);
    json.client_updated_at = _dateUtils2.default.formatISOTimestamp(this.clientUpdatedAt);
    json.form_values = this.formValues.toJSON();
    json.latitude = this._latitude || null;
    json.longitude = this._longitude || null;
    json.project_id = this._projectID || null;
    json.assigned_to_id = this._assignedToID || null;
    json.status = this._status || null;

    json.created_by_id = this._createdByID || null;
    json.created_by = this._createdBy || null;
    json.updated_by_id = this._updatedByID || null;
    json.updated_by = this._updatedBy || null;

    if (this._horizontalAccuracy != null) {
      json.horizontal_accuracy = this._horizontalAccuracy;
    }

    if (this._verticalAccuracy != null) {
      json.vertical_accuracy = this._verticalAccuracy;
    }

    if (this._altitude != null) {
      json.altitude = this._altitude;
    }

    if (this._speed != null) {
      json.speed = this._speed;
    }

    if (this._course != null) {
      json.course = this._course;
    }

    if (this._changesetID) {
      json.changeset_id = this._changesetID;
    }

    return json;
  };

  Record.prototype.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};

    this._id = attributes.id || _uuid2.default.v4();
    this._version = attributes.version || null;
    this._createdAt = _dateUtils2.default.parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils2.default.parseISOTimestamp(attributes.updated_at);
    this._clientCreatedAt = _dateUtils2.default.parseISOTimestamp(attributes.client_created_at);
    this._clientUpdatedAt = _dateUtils2.default.parseISOTimestamp(attributes.client_updated_at);
    this._formValuesJSON = attributes.form_values || {};
    this._latitude = attributes.latitude || null;
    this._longitude = attributes.longitude || null;
    this._projectID = attributes.project_id || null;
    this._assignedToID = attributes.assigned_to_id || null;
    this._status = attributes.status || null;

    this._createdByID = attributes.created_by_id || null;
    this._createdBy = attributes.created_by || null;
    this._updatedByID = attributes.updated_by_id || null;
    this._updatedBy = attributes.updated_by || null;

    this._horizontalAccuracy = attributes.horizontal_accuracy || null;
    this._verticalAccuracy = attributes.vertical_accuracy || null;
    this._altitude = attributes.altitude || null;
    this._speed = attributes.speed || null;
    this._course = attributes.course || null;

    this._changesetID = attributes.changeset_id || null;
  };

  Record.prototype.updateTimestamps = function updateTimestamps() {
    var now = new Date();

    if (this.clientCreatedAt == null) {
      this.clientCreatedAt = now;
    }

    this.clientUpdatedAt = now;
  };

  Record.prototype.get = function get(key, formValues) {
    if (key === '@status') {
      return this.statusValue;
    }

    return formValues.get(key);
  };

  Record.prototype.set = function set(key, value, formValues) {
    if (key === '@status') {
      this.status = value.textValue;
      return;
    }

    formValues.set(key, value);
  };

  Record.prototype.updateFromActionAttributes = function updateFromActionAttributes(attributes, role) {
    for (var _iterator = Object.keys(attributes), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var dataName = _ref;

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
            if (attributes.assigned_to_id && role.canChangeAssignment) {
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
    key: 'id',
    get: function get() {
      return this._id;
    },
    set: function set(id) {
      this._id = id;
    }
  }, {
    key: 'form',
    get: function get() {
      return this._form;
    }
  }, {
    key: 'version',
    get: function get() {
      return this._version;
    }
  }, {
    key: 'createdAt',
    get: function get() {
      return this._createdAt;
    },
    set: function set(createdAt) {
      this._createdAt = createdAt;
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._updatedAt;
    },
    set: function set(updatedAt) {
      this._updatedAt = updatedAt;
    }
  }, {
    key: 'clientCreatedAt',
    get: function get() {
      return this._clientCreatedAt;
    },
    set: function set(createdAt) {
      this._clientCreatedAt = createdAt;
    }
  }, {
    key: 'clientUpdatedAt',
    get: function get() {
      return this._clientUpdatedAt;
    },
    set: function set(updatedAt) {
      this._clientUpdatedAt = updatedAt;
    }
  }, {
    key: 'formValues',
    get: function get() {
      if (this._formValues == null) {
        this._formValues = new _formValues2.default(this._form, this._formValuesJSON);
      }

      return this._formValues;
    }
  }, {
    key: 'hasCoordinate',
    get: function get() {
      return this._latitude != null && this._longitude != null;
    }
  }, {
    key: 'changeset',
    get: function get() {
      return this._changeset;
    },
    set: function set(changeset) {
      this._changesetID = changeset.id;
      this._changeset = changeset;
    }
  }, {
    key: 'changesetID',
    get: function get() {
      return this._changesetID;
    }
  }, {
    key: 'createdBy',
    get: function get() {
      return this._createdBy;
    }
  }, {
    key: 'updatedBy',
    get: function get() {
      return this._updatedBy;
    }
  }, {
    key: 'isGeometryEnabled',
    get: function get() {
      return this.form.isGeometryEnabled;
    }
  }, {
    key: 'statusValue',
    get: function get() {
      return new _statusValue2.default(this.form.statusField, this.status);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.formValues.searchableValue;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var titleFieldKeys = this.form.titleFieldKeys;
      var titles = [];

      for (var _iterator2 = titleFieldKeys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var fieldKey = _ref2;

        var value = this.formValues.get(fieldKey);

        if (value) {
          var displayValue = value.displayValue;

          if (_textUtils2.default.isPresent(displayValue)) {
            titles.push(displayValue);
          }
        }
      }

      return titles.join(', ');
    }
  }, {
    key: 'isStatusFieldEnabled',
    get: function get() {
      // invisible if there are no statuses or the status field is marked as hidden
      if (this.form.statusField.choices.length === 0 || this.form.statusField.isHidden) {
        return false;
      }

      // invisible if it's readonly and there's no status (nothing for the user to read)
      if (this.status == null && this.form.statusField.isReadOnly) {
        return false;
      }

      return this.form.statusField.isEnabled;
    }
  }, {
    key: 'formID',
    get: function get() {
      return this.form ? this.form.id : null;
    }
  }, {
    key: 'projectID',
    get: function get() {
      return this._projectID;
    },
    set: function set(id) {
      this._projectID = id;
    }
  }, {
    key: 'assignedToID',
    get: function get() {
      return this._assignedToID;
    },
    set: function set(id) {
      this._assignedToID = id;
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
    key: 'status',
    get: function get() {
      return this._status;
    },
    set: function set(status) {
      this._status = status;
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
    key: 'horizontalAccuracy',
    get: function get() {
      return this._horizontalAccuracy;
    },
    set: function set(accuracy) {
      this._horizontalAccuracy = accuracy;
    }
  }, {
    key: 'verticalAccuracy',
    get: function get() {
      return this._verticalAccuracy;
    },
    set: function set(accuracy) {
      this._verticalAccuracy = accuracy;
    }
  }, {
    key: 'geometryAsGeoJSON',
    get: function get() {
      if (!this.hasCoordinate) {
        return null;
      }

      return {
        type: 'Point',
        coordinates: [this.longitude, this.latitude]
      };
    }
  }]);

  return Record;
}(_feature2.default);

exports.default = Record;
//# sourceMappingURL=record.js.map