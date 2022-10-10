"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _formValue = _interopRequireDefault(require("./form-value"));
var _multipleValueItem = _interopRequireDefault(require("./multiple-value-item"));
var _textUtils = _interopRequireDefault(require("../utils/text-utils"));
var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));
var _excluded = ["part", "formatMediaURL", "formatMediaViewerURL", "formatMediaName"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MediaValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(MediaValue, _FormValue);
  function MediaValue(element, items) {
    var _this;
    _this = _FormValue.call(this, element, items) || this;
    _this._items = [];
    if (Array.isArray(items)) {
      for (var _iterator = _createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
        var item = _step.value;
        _this._items.push(new _this.ItemClass(_assertThisInitialized(_this), item));
      }
    }
    return _this;
  }
  var _proto = MediaValue.prototype;
  _proto.format = function format(_ref) {
    var _ref$part = _ref.part,
      part = _ref$part === void 0 ? null : _ref$part,
      formatMediaURL = _ref.formatMediaURL,
      formatMediaViewerURL = _ref.formatMediaViewerURL,
      formatMediaName = _ref.formatMediaName,
      args = _objectWithoutPropertiesLoose(_ref, _excluded);
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
    for (var _iterator2 = _createForOfIteratorHelperLoose(this._items), _step2; !(_step2 = _iterator2()).done;) {
      var item = _step2.value;
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
      for (var _iterator3 = _createForOfIteratorHelperLoose(this._items), _step3; !(_step3 = _iterator3()).done;) {
        var item = _step3.value;
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
      for (var _iterator4 = _createForOfIteratorHelperLoose(this._items), _step4; !(_step4 = _iterator4()).done;) {
        var item = _step4.value;
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
      for (var _iterator5 = _createForOfIteratorHelperLoose(this._items), _step5; !(_step5 = _iterator5()).done;) {
        var item = _step5.value;
        items.push(new _multipleValueItem["default"](this.element, item.mediaID));
      }
      return items;
    }
  }, {
    key: "hasCaptions",
    get: function get() {
      for (var _iterator6 = _createForOfIteratorHelperLoose(this._items), _step6; !(_step6 = _iterator6()).done;) {
        var item = _step6.value;
        if (_textUtils["default"].isPresent(item.caption)) {
          return true;
        }
      }
      return false;
    }

    // return a copy until it's determined that a mutable API is necessary
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