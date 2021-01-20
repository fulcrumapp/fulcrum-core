"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _repeatableItemValue = _interopRequireDefault(require("./repeatable-item-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SearchSeparator = ' ';

var RepeatableValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(RepeatableValue, _FormValue);

  function RepeatableValue(element, items) {
    var _this;

    _this = _FormValue.call(this, element, items) || this;
    _this._items = [];

    if (items != null) {
      for (var _iterator = _createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
        var item = _step.value;

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

    for (var _iterator2 = _createForOfIteratorHelperLoose(this._items), _step2; !(_step2 = _iterator2()).done;) {
      var item = _step2.value;
      items.push(item.toJSON());
    }

    return items;
  };

  _proto.toSimpleJSON = function toSimpleJSON() {
    if (this.isEmpty) {
      return null;
    }

    var items = [];

    for (var _iterator3 = _createForOfIteratorHelperLoose(this._items), _step3; !(_step3 = _iterator3()).done;) {
      var item = _step3.value;
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

      for (var _iterator4 = _createForOfIteratorHelperLoose(this._items), _step4; !(_step4 = _iterator4()).done;) {
        var item = _step4.value;
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