"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _multipleValueItem = _interopRequireDefault(require("./multiple-value-item"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MediaValue =
/*#__PURE__*/
function (_FormValue) {
  _inheritsLoose(MediaValue, _FormValue);

  function MediaValue(element, items) {
    var _this;

    _this = _FormValue.call(this, element, items) || this;
    _this._items = [];

    if (Array.isArray(items)) {
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

        _this._items.push(new _this.ItemClass(_assertThisInitialized(_this), item));
      }
    }

    return _this;
  }

  var _proto = MediaValue.prototype;

  _proto.format = function format(_ref2) {
    var _ref2$part = _ref2.part,
        part = _ref2$part === void 0 ? null : _ref2$part,
        formatMediaURL = _ref2.formatMediaURL,
        formatMediaViewerURL = _ref2.formatMediaViewerURL,
        formatMediaName = _ref2.formatMediaName,
        args = _objectWithoutPropertiesLoose(_ref2, ["part", "formatMediaURL", "formatMediaViewerURL", "formatMediaName"]);

    if (this.isEmpty) {
      return null;
    }

    if (part === 'captions') {
      return this.items.map(function (item) {
        return item.caption;
      });
    } else if (part === 'view' && formatMediaViewerURL) {
      return formatMediaViewerURL(this, args);
    } else if (part === 'urls' && formatMediaURL) {
      return this.items.map(function (item) {
        return formatMediaURL(item, args);
      });
    } else if (part === 'name' && formatMediaName) {
      return this.items.map(function (item) {
        return formatMediaName(item, args);
      });
    }

    return this.items.map(function (item) {
      return item.mediaID;
    });
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

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

  _proto.mapItems = function mapItems(callback) {
    return this._items.slice().map(callback);
  };

  _proto.addItem = function addItem(id, caption) {
    var item = new this.ItemClass(this, {
      caption: caption
    });
    item.mediaID = id;

    this._items.push(item);

    return item;
  };

  _proto.removeItem = function removeItem(id) {
    for (var index = 0; index < this._items.length; ++index) {
      if (this._items[index].mediaID === id) {
        var item = this._items[index];

        this._items.splice(index, 1);

        return item;
      }
    }

    return null;
  };

  _createClass(MediaValue, [{
    key: "isEmpty",
    get: function get() {
      return this._items.length === 0;
    }
  }, {
    key: "searchableValue",
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

        if (_textUtils["default"].isPresent(item.caption)) {
          ids.push(item.caption);
        }
      }

      return ids.join(' ');
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
      var captions = [];

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
        ids.push(item.mediaID);
        captions.push(item.caption);
      }

      var value = {};
      value['f' + this.element.key + '_captions'] = captions;
      value['f' + this.element.key] = ids;
      return value;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      var items = [];

      for (var _iterator5 = this._items, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref6 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref6 = _i5.value;
        }

        var item = _ref6;
        items.push(new _multipleValueItem["default"](this.element, item.mediaID));
      }

      return items;
    }
  }, {
    key: "hasCaptions",
    get: function get() {
      for (var _iterator6 = this._items, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray6) {
          if (_i6 >= _iterator6.length) break;
          _ref7 = _iterator6[_i6++];
        } else {
          _i6 = _iterator6.next();
          if (_i6.done) break;
          _ref7 = _i6.value;
        }

        var item = _ref7;

        if (_textUtils["default"].isPresent(item.caption)) {
          return true;
        }
      }

      return false;
    } // return a copy until it's determined that a mutable API is necessary

  }, {
    key: "items",
    get: function get() {
      return this._items.slice();
    }
  }]);

  return MediaValue;
}(_formValue["default"]);

exports["default"] = MediaValue;
//# sourceMappingURL=media-value.js.map