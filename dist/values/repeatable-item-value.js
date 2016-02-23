'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feature = require('../feature');

var _feature2 = _interopRequireDefault(_feature);

var _formValues = require('./form-values');

var _formValues2 = _interopRequireDefault(_formValues);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RepeatableItemValue extends _feature2.default {
  constructor(element, item, index) {
    super();

    this.index = index;

    this._element = element;
    this._id = item.id;
    this._createdAt = _dateUtils2.default.parseTimestamp(item.created_at);
    this._updatedAt = _dateUtils2.default.parseTimestamp(item.updated_at);
    this._formValuesJSON = item.form_values;

    const geometry = item.geometry;

    if (geometry != null && geometry.type === 'Point') {
      this._latitude = geometry.coordinates[1];
      this._longitude = geometry.coordinates[0];
    }
  }

  get identifier() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get formValues() {
    if (!this._formValues) {
      this._formValues = new _formValues2.default(this._element, this._formValuesJSON);
    }

    return this._formValues;
  }

  get hasCoordinate() {
    return this._latitude != null && this._longitude != null;
  }

  toJSON() {
    const json = {};

    json.id = this.identifier;
    json.created_at = _dateUtils2.default.formatTimestamp(this.createdAt);
    json.updated_at = _dateUtils2.default.formatTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.geometry = this.geometryAsGeoJSON();

    return json;
  }

  updateTimestamps() {
    const now = new Date();

    if (!this._createdAt) {
      this._createdAt = now;
    }

    this._updatedAt = now;
  }

  get isGeometryEnabled() {
    return this._element.isGeometryEnabled;
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }

  get displayValue() {
    const titleFieldKeys = this._element.titleFieldKeys;
    const titles = [];

    for (let fieldKey of titleFieldKeys) {
      const formValue = this.formValues.get(fieldKey);

      if (formValue) {
        const displayValue = formValue.displayValue;

        if (_textUtils2.default.isPresent(displayValue)) {
          titles.push(displayValue);
        }
      }
    }

    return titles.join(', ');
  }

  geometryAsGeoJSON() {
    if (!this.hasCoordinate) {
      return null;
    }

    return {
      type: 'Point',
      coordinates: [this._longitude, this._latitude]
    };
  }
}
exports.default = RepeatableItemValue;
//# sourceMappingURL=repeatable-item-value.js.map