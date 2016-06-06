'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _recordLinkItemValue = require('./record-link-item-value');

var _recordLinkItemValue2 = _interopRequireDefault(_recordLinkItemValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RecordLinkValue = function (_FormValue) {
  _inherits(RecordLinkValue, _FormValue);

  function RecordLinkValue(element, items) {
    _classCallCheck(this, RecordLinkValue);

    var _this = _possibleConstructorReturn(this, _FormValue.call(this, element, items));

    _this._items = [];

    if (items) {
      for (var _iterator = items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

        _this._items.push(new _recordLinkItemValue2.default(_this, item));
      }
    }
    return _this;
  }

  RecordLinkValue.prototype.toJSON = function toJSON() {
    var items = [];

    for (var _iterator2 = this._items, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var item = _ref2;

      items.push(item.toJSON());
    }

    return items;
  };

  RecordLinkValue.prototype.isEqual = function isEqual(value) {
    return false;
  };

  RecordLinkValue.prototype.contains = function contains(value) {
    return false;
  };

  RecordLinkValue.prototype.startsWith = function startsWith(value) {
    return false;
  };

  RecordLinkValue.prototype.isLessThan = function isLessThan(value) {
    return this.length < _numberUtils2.default.parseDouble(value);
  };

  RecordLinkValue.prototype.isGreaterThan = function isGreaterThan(value) {
    return this.length > _numberUtils2.default.parseDouble(value);
  };

  RecordLinkValue.prototype.addRecord = function addRecord(record) {
    var item = new _recordLinkItemValue2.default(this, { record_id: record.id });

    item._record = record;

    this.insertItem(item);
  };

  RecordLinkValue.prototype.itemIndex = function itemIndex(id) {
    for (var index = 0; index < this._items.length; ++index) {
      if (id === this._items[index].id) {
        return index;
      }
    }

    return -1;
  };

  RecordLinkValue.prototype.insertItem = function insertItem(item) {
    var index = this.itemIndex(item.id);

    if (index > -1) {
      this._items[index] = item;
    } else {
      this._items.push(item);
    }
  };

  RecordLinkValue.prototype.removeItem = function removeItem(id) {
    var index = this.itemIndex(id);

    if (index > -1) {
      var item = this._items[index];

      this._items.splice(index, 1);

      return item;
    }

    return null;
  };

  _createClass(RecordLinkValue, [{
    key: 'isEmpty',
    get: function get() {
      return this.length === 0;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      if (this.length === 1) {
        return '1 record';
      }

      return this.length + ' records';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.displayValue;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var ids = [];

      for (var _iterator3 = this._items, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var item = _ref3;

        ids.push(item.id);
      }

      return ids;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      var ids = [];

      for (var _iterator4 = this._items, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var item = _ref4;

        ids.push(new _multipleValueItem2.default(this.element, item.id));
      }

      return ids;
    }
  }, {
    key: 'items',
    get: function get() {
      return this._items.slice();
    }
  }]);

  return RecordLinkValue;
}(_formValue2.default);

exports.default = RecordLinkValue;
//# sourceMappingURL=record-link-value.js.map