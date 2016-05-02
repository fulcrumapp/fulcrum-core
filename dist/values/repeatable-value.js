'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _repeatableItemValue = require('./repeatable-item-value');

var _repeatableItemValue2 = _interopRequireDefault(_repeatableItemValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SearchSeparator = ' ';

var RepeatableValue = function (_FormValue) {
  _inherits(RepeatableValue, _FormValue);

  function RepeatableValue(element, items) {
    _classCallCheck(this, RepeatableValue);

    var _this = _possibleConstructorReturn(this, _FormValue.call(this, element, items));

    _this._items = [];

    if (items != null) {
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

        _this._items.push(new _repeatableItemValue2.default(_this.element, item, _this._items.length));
      }
    }
    return _this;
  }

  RepeatableValue.prototype.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

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

  RepeatableValue.prototype.isEqual = function isEqual(value) {
    return false;
  };

  RepeatableValue.prototype.contains = function contains(value) {
    return false;
  };

  RepeatableValue.prototype.startsWith = function startsWith(value) {
    return false;
  };

  RepeatableValue.prototype.isLessThan = function isLessThan(value) {
    return false;
  };

  RepeatableValue.prototype.isGreaterThan = function isGreaterThan(value) {
    return false;
  };

  RepeatableValue.prototype.mapItems = function mapItems(callback) {
    return this._items.slice().map(callback);
  };

  // return a copy until it's determined that a mutable API is necessary


  RepeatableValue.prototype.forEachItem = function forEachItem(callback) {
    this.mapItems(callback);
  };

  RepeatableValue.prototype.itemIndex = function itemIndex(id) {
    for (var index = 0; index < this._items.length; ++index) {
      if (id === this._items[index].id) {
        return index;
      }
    }

    return -1;
  };

  RepeatableValue.prototype.insertItem = function insertItem(item) {
    var index = this.itemIndex(item.id);

    if (index > -1) {
      this._items[index] = item;
    } else {
      this._items.push(item);
    }
  };

  RepeatableValue.prototype.removeItem = function removeItem(id) {
    var index = this.itemIndex(id);

    if (index > -1) {
      var item = this._items[index];

      this._items.splice(index, 1);

      return item;
    }

    return null;
  };

  RepeatableValue.prototype.createNewItem = function createNewItem() {
    var attributes = {
      id: _uuid2.default.v4(),
      form_values: {}
    };

    return new _repeatableItemValue2.default(this.element, attributes, this._items.length);
  };

  _createClass(RepeatableValue, [{
    key: 'isEmpty',
    get: function get() {
      return this._items.length === 0;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.length === 1) {
        return '1 Item';
      }

      return this.length + ' Items';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var values = [];

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

        var searchValue = item.searchableValue;

        if (_textUtils2.default.isPresent(searchValue)) {
          values.push(searchValue);
        }
      }

      return values.join(SearchSeparator);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }, {
    key: 'items',
    get: function get() {
      return this._items.slice();
    }
  }]);

  return RepeatableValue;
}(_formValue2.default);

exports.default = RepeatableValue;
//# sourceMappingURL=repeatable-value.js.map