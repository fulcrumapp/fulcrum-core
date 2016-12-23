'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MediaValue = function (_FormValue) {
  _inherits(MediaValue, _FormValue);

  function MediaValue(element, items) {
    _classCallCheck(this, MediaValue);

    var _this = _possibleConstructorReturn(this, _FormValue.call(this, element, items));

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

        _this._items.push(new _this.ItemClass(_this, item));
      }
    }
    return _this;
  }

  MediaValue.prototype.format = function format(_ref2) {
    var _ref2$part = _ref2.part,
        part = _ref2$part === undefined ? null : _ref2$part,
        formatURL = _ref2.formatURL;

    if (this.isEmpty) {
      return null;
    }

    if (part === 'captions') {
      return this.items.map(function (item) {
        return item.caption;
      });
    } else if (part === 'urls') {
      return this.items.map(formatURL);
    }

    return this.items.map(function (item) {
      return item.mediaID;
    });
  };

  MediaValue.prototype.toJSON = function toJSON() {
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

  MediaValue.prototype.isEqual = function isEqual(value) {
    return false;
  };

  MediaValue.prototype.contains = function contains(value) {
    return false;
  };

  MediaValue.prototype.startsWith = function startsWith(value) {
    return false;
  };

  MediaValue.prototype.isLessThan = function isLessThan(value) {
    return this.length < _numberUtils2.default.parseDouble(value);
  };

  MediaValue.prototype.isGreaterThan = function isGreaterThan(value) {
    return this.length > _numberUtils2.default.parseDouble(value);
  };

  MediaValue.prototype.mapItems = function mapItems(callback) {
    return this._items.slice().map(callback);
  };

  MediaValue.prototype.addItem = function addItem(id, caption) {
    var item = new this.ItemClass(this, { caption: caption });

    item.mediaID = id;

    this._items.push(item);

    return item;
  };

  MediaValue.prototype.removeItem = function removeItem(id) {
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
    key: 'isEmpty',
    get: function get() {
      return this._items.length === 0;
    }
  }, {
    key: 'searchableValue',
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

        if (_textUtils2.default.isPresent(item.caption)) {
          ids.push(item.caption);
        }
      }

      return ids.join(' ');
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
    key: 'multipleValues',
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

        items.push(new _multipleValueItem2.default(this.element, item.mediaID));
      }

      return items;
    }
  }, {
    key: 'hasCaptions',
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

        if (_textUtils2.default.isPresent(item.caption)) {
          return true;
        }
      }

      return false;
    }

    // return a copy until it's determined that a mutable API is necessary

  }, {
    key: 'items',
    get: function get() {
      return this._items.slice();
    }
  }]);

  return MediaValue;
}(_formValue2.default);

exports.default = MediaValue;
//# sourceMappingURL=media-value.js.map