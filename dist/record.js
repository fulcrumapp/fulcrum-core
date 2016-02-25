'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

class Record extends _feature2.default {
  constructor(attributes) {
    super();

    // this._id = attributes.id;
    // this._createdAt = DateUtils.parseTimestamp(attributes.client_created_at);
    // this._updatedAt = DateUtils.parseTimestamp(attributes.client_updated_at);
    // this._formValuesJSON = attributes.form_values;
    // this._latitude = attributes.latitude;
    // this._longitude = attributes.longitude;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get form() {
    return this._form;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }

  get formValues() {
    if (this._formValues == null) {
      this._formValues = new _formValues2.default(this._form, this._formValuesJSON);
    }

    return this._formValues;
  }

  get hasCoordinate() {
    return this._latitude != null && this._longitude != null;
  }

  toJSON() {
    const json = {};

    json.id = this.id;
    json.client_created_at = _dateUtils2.default.formatTimestamp(this.createdAt);
    json.client_updated_at = _dateUtils2.default.formatTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.latitude = this._latitude;
    json.longitude = this._longitude;

    return json;
  }

  updateTimestamps() {
    const now = new Date();

    if (this._createdAt == null) {
      this.createdAt = now;
    }

    this.updatedAt = now;
  }

  get isGeometryEnabled() {
    return this.form.isGeometryEnabled;
  }

  get(key, formValues) {
    if (key === '@status') {
      return this.statusValue;
    }

    return formValues.get(key);
  }

  set(key, value, formValues) {
    if (key === '@status') {
      this.status = value.textValue;
      return;
    }

    formValues.set(key, value);
  }

  get statusValue() {
    return new _statusValue2.default(this.status, this.form.statusField);
  }

  get displayValue() {
    const titleFieldKeys = this.form.titleFieldKeys;
    const titles = [];

    for (let fieldKey of titleFieldKeys) {
      const value = this.formValues.get(fieldKey);

      if (value) {
        const displayValue = value.displayValue;

        if (_textUtils2.default.isPresent(displayValue)) {
          titles.push(displayValue);
        }
      }
    }

    return titles.join(', ');
  }
}
exports.default = Record;
//# sourceMappingURL=record.js.map