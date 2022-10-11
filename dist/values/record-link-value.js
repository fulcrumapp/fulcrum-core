"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _recordLinkItemValue = _interopRequireDefault(require("./record-link-item-value"));

var _multipleValueItem = _interopRequireDefault(require("./multiple-value-item"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RecordLinkValue =
/*#__PURE__*/
function (_FormValue) {
  _inheritsLoose(RecordLinkValue, _FormValue);

  function RecordLinkValue(element, items) {
    var _this;

    _this = _FormValue.call(this, element, items) || this;
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

        _this._items.push(new _recordLinkItemValue["default"](_assertThisInitialized(_this), item));
      }
    }

    return _this;
  }

  var _proto = RecordLinkValue.prototype;

  _proto.format = function format(_ref2) {
    var _ref2$part = _ref2.part,
        part = _ref2$part === void 0 ? null : _ref2$part;

    if (this.isEmpty) {
      return null;
    }

    if (part === 'titles') {
      return this.items.map(function (item) {
        return item.displayValue;
      });
    }

    return this.items.map(function (item) {
      return item.id;
    });
  };

  _proto.toJSON = function toJSON() {
    var items = [];

    for (var _iterator2 = this._items, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var item = _ref3;
      items.push(item.toJSON());
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
    return this.length < _numberUtils["default"].parseDouble(value);
  };

  _proto.isGreaterThan = function isGreaterThan(value) {
    return this.length > _numberUtils["default"].parseDouble(value);
  };

  _proto.addRecord = function addRecord(record) {
    var item = new _recordLinkItemValue["default"](this, {
      record_id: record.id
    });
    item._record = record;
    this.insertItem(item);
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

  _createClass(RecordLinkValue, [{
    key: "isEmpty",
    get: function get() {
      return this.length === 0;
    }
  }, {
    key: "displayValue",
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
    key: "searchableValue",
    get: function get() {
      return this.displayValue;
    }
  }, {
    key: "length",
    get: function get() {
      return this._items.length;
    }
  }, {
    key: "columnValue",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var ids = [];

      for (var _iterator3 = this._items, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        var item = _ref4;
        ids.push(item.id);
      }

      return ids;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      var ids = [];

      for (var _iterator4 = this._items, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref5 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref5 = _i4.value;
        }

        var item = _ref5;
        ids.push(new _multipleValueItem["default"](this.element, item.id));
      }

      return ids;
    }
  }, {
    key: "items",
    get: function get() {
      return this._items.slice();
    }
  }]);

  return RecordLinkValue;
}(_formValue["default"]);

exports["default"] = RecordLinkValue;
//# sourceMappingURL=record-link-value.js.map