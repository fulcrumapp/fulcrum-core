'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Record = function (_Feature) {
  _inherits(Record, _Feature);

  function Record(attributes) {
    _classCallCheck(this, Record);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Record).call(this));

    // this._id = attributes.id;
    // this._createdAt = DateUtils.parseTimestamp(attributes.client_created_at);
    // this._updatedAt = DateUtils.parseTimestamp(attributes.client_updated_at);
    // this._formValuesJSON = attributes.form_values;
    // this._latitude = attributes.latitude;
    // this._longitude = attributes.longitude;
  }

  _createClass(Record, [{
    key: 'toJSON',
    value: function toJSON() {
      var json = {};

      json.id = this.id;
      json.client_created_at = _dateUtils2.default.formatTimestamp(this.createdAt);
      json.client_updated_at = _dateUtils2.default.formatTimestamp(this.updatedAt);
      json.form_values = this.formValues.toJSON();
      json.latitude = this._latitude;
      json.longitude = this._longitude;

      return json;
    }
  }, {
    key: 'updateTimestamps',
    value: function updateTimestamps() {
      var now = new Date();

      if (this._createdAt == null) {
        this.createdAt = now;
      }

      this.updatedAt = now;
    }
  }, {
    key: 'get',
    value: function get(key, formValues) {
      if (key === '@status') {
        return this.statusValue;
      }

      return formValues.get(key);
    }
  }, {
    key: 'set',
    value: function set(key, value, formValues) {
      if (key === '@status') {
        this.status = value.textValue;
        return;
      }

      formValues.set(key, value);
    }
  }, {
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
    key: 'isGeometryEnabled',
    get: function get() {
      return this.form.isGeometryEnabled;
    }
  }, {
    key: 'statusValue',
    get: function get() {
      return new _statusValue2.default(this.status, this.form.statusField);
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var titleFieldKeys = this.form.titleFieldKeys;
      var titles = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = titleFieldKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldKey = _step.value;

          var value = this.formValues.get(fieldKey);

          if (value) {
            var displayValue = value.displayValue;

            if (_textUtils2.default.isPresent(displayValue)) {
              titles.push(displayValue);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
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
  }]);

  return Record;
}(_feature2.default);

exports.default = Record;
//# sourceMappingURL=record.js.map