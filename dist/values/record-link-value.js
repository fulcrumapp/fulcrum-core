"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _recordLinkItemValue = _interopRequireDefault(require("./record-link-item-value"));

var _multipleValueItem = _interopRequireDefault(require("./multiple-value-item"));

var _numberUtils = _interopRequireDefault(require("../utils/number-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RecordLinkValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(RecordLinkValue, _FormValue);

  function RecordLinkValue(element, items) {
    var _this;

    _this = _FormValue.call(this, element, items) || this;
    _this._items = [];

    if (items) {
      for (var _iterator = _createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
        var item = _step.value;

        _this._items.push(new _recordLinkItemValue["default"](_assertThisInitialized(_this), item));
      }
    }

    return _this;
  }

  var _proto = RecordLinkValue.prototype;

  _proto.format = function format(_ref) {
    var _ref$part = _ref.part,
        part = _ref$part === void 0 ? null : _ref$part;

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

      for (var _iterator3 = _createForOfIteratorHelperLoose(this._items), _step3; !(_step3 = _iterator3()).done;) {
        var item = _step3.value;
        ids.push(item.id);
      }

      return ids;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      var ids = [];

      for (var _iterator4 = _createForOfIteratorHelperLoose(this._items), _step4; !(_step4 = _iterator4()).done;) {
        var item = _step4.value;
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