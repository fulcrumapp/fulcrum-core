"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _repeatableItemValue = _interopRequireDefault(require("./repeatable-item-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SearchSeparator = ' ';

var RepeatableValue =
/*#__PURE__*/
function (_FormValue) {
  _inheritsLoose(RepeatableValue, _FormValue);

  function RepeatableValue(element, items) {
    var _this;

    _this = _FormValue.call(this, element, items) || this;
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

        _this._items.push(new _repeatableItemValue["default"](_this.element, item, _this._items.length));
      }
    }

    return _this;
  }

  var _proto = RepeatableValue.prototype;

  _proto.format = function format(options) {
    if (this.isEmpty) {
      return null;
    }

    return options.useDisplayValue ? this.displayValue : this.length;
  };

  _proto.toJSON = function toJSON() {
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

  _proto.toSimpleJSON = function toSimpleJSON() {
    if (this.isEmpty) {
      return null;
    }

    var items = [];

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
      items.push(item.toJSON({
        simple: true
      }));
    }

    return items;
  };

  _proto.isEqual = function isEqual(value) {
    return false;
  };

  _proto.contains = function contains(value) {
    return false;
  };

  _proto.startsWith = function startsWith(value) {
    return false;
  };

  _proto.isLessThan = function isLessThan(value) {
    return false;
  };

  _proto.isGreaterThan = function isGreaterThan(value) {
    return false;
  };

  _proto.mapItems = function mapItems(callback) {
    return this._items.slice().map(callback);
  } // return a copy until it's determined that a mutable API is necessary
  ;

  _proto.forEachItem = function forEachItem(callback) {
    this.mapItems(callback);
  };

  _proto.itemIndex = function itemIndex(id) {
    for (var index = 0; index < this._items.length; ++index) {
      if (id === this._items[index].id) {
        return index;
      }
    }

    return -1;
  };

  _proto.insertItem = function insertItem(item) {
    var index = this.itemIndex(item.id);

    if (index > -1) {
      this._items[index] = item;
    } else {
      this._items.push(item);
    }
  };

  _proto.removeItem = function removeItem(id) {
    var index = this.itemIndex(id);

    if (index > -1) {
      var item = this._items[index];

      this._items.splice(index, 1);

      return item;
    }

    return null;
  };

  _proto.createNewItem = function createNewItem() {
    var attributes = {
      id: _uuid["default"].v4(),
      form_values: {}
    };
    return new _repeatableItemValue["default"](this.element, attributes, this._items.length);
  };

  _createClass(RepeatableValue, [{
    key: "isEmpty",
    get: function get() {
      return this._items.length === 0;
    }
  }, {
    key: "displayValue",
    get: function get() {
      if (this.length === 1) {
        return '1 Item';
      }

      return this.length + ' Items';
    }
  }, {
    key: "searchableValue",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var values = [];

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
        var searchValue = item.searchableValue;

        if (_textUtils["default"].isPresent(searchValue)) {
          values.push(searchValue);
        }
      }

      return values.join(SearchSeparator);
    }
  }, {
    key: "length",
    get: function get() {
      return this._items.length;
    }
  }, {
    key: "columnValue",
    get: function get() {
      return null;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      return null;
    }
  }, {
    key: "items",
    get: function get() {
      return this._items.slice();
    }
  }]);

  return RepeatableValue;
}(_formValue["default"]);

exports["default"] = RepeatableValue;
//# sourceMappingURL=repeatable-value.js.map