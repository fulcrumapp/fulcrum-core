'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classification = require('./elements/classification');

var _classification2 = _interopRequireDefault(_classification);

var _dateUtils = require('./utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassificationSet = function () {
  function ClassificationSet(attributes) {
    _classCallCheck(this, ClassificationSet);

    this.updateFromAPIAttributes(attributes);
  }

  ClassificationSet.prototype.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._itemsJSON = attributes.items || [];
    this._version = attributes.version;
    this._createdAt = _dateUtils2.default.parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils2.default.parseISOTimestamp(attributes.updated_at);
  };

  ClassificationSet.prototype.toJSON = function toJSON() {
    var json = {};

    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.items = this._itemsJSON || null;
    json.version = this.version;
    json.created_at = _dateUtils2.default.formatISOTimestamp(this.createdAt);
    json.updated_at = _dateUtils2.default.formatISOTimestamp(this.updatedAt);

    return json;
  };

  _createClass(ClassificationSet, [{
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'description',
    get: function get() {
      return this._description;
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
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._updatedAt;
    }
  }, {
    key: 'items',
    get: function get() {
      if (!this._items) {
        this._items = [];

        for (var _iterator = this._itemsJSON, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var item = _ref;

          this._items.push(new _classification2.default(null, item));
        }
      }

      return this._items;
    }
  }]);

  return ClassificationSet;
}();

exports.default = ClassificationSet;
//# sourceMappingURL=classification-set.js.map