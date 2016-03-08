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
    _this._createdAt = _dateUtils2.default.parseTimestamp(item.created_at);
    _this._updatedAt = _dateUtils2.default.parseTimestamp(item.updated_at);
    _this._formValuesJSON = item.form_values;

    var geometry = item.geometry;

    if (geometry != null && geometry.type === 'Point') {
      _this._latitude = geometry.coordinates[1];
      _this._longitude = geometry.coordinates[0];
    }
    return _this;
  }

  RepeatableItemValue.prototype.toJSON = function toJSON() {
    var json = {};

    json.id = this.identifier;
    json.created_at = _dateUtils2.default.formatTimestamp(this.createdAt);
    json.updated_at = _dateUtils2.default.formatTimestamp(this.updatedAt);
    json.form_values = this.formValues.toJSON();
    json.geometry = this.geometryAsGeoJSON();

    return json;
  };

  RepeatableItemValue.prototype.updateTimestamps = function updateTimestamps() {
    var now = new Date();

    if (!this._createdAt) {
      this._createdAt = now;
    }

    this._updatedAt = now;
  };

  RepeatableItemValue.prototype.geometryAsGeoJSON = function geometryAsGeoJSON() {
    if (!this.hasCoordinate) {
      return null;
    }

    return {
      type: 'Point',
      coordinates: [this._longitude, this._latitude]
    };
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
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._updatedAt;
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
  }]);

  return RepeatableItemValue;
}(_feature2.default);

exports.default = RepeatableItemValue;
//# sourceMappingURL=repeatable-item-value.js.map