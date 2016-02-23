'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _repeatableItemValue = require('./repeatable-item-value');

var _repeatableItemValue2 = _interopRequireDefault(_repeatableItemValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SearchSeparator = ' ';

class RepeatableValue extends _formValue2.default {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items != null) {
      for (let item of items) {
        this._items.push(new _repeatableItemValue2.default(this.element, item));
      }
    }
  }

  get isEmpty() {
    return this._items.length === 0;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Item';
    } else {
      return this.length + ' Items';
    }
  }

  get searchableValue() {
    if (this.isEmpty) {
      return null;
    }

    const values = [];

    for (let item of this._items) {
      const searchValue = item.searchableValue;

      if (_textUtils2.default.isPresent(searchValue)) {
        values.push(searchValue);
      }
    }

    return values.join(SearchSeparator);
  }

  get length() {
    return this._items.length;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    const items = [];

    for (let item of this._items) {
      items.push(item.toJSON());
    }

    return items;
  }

  get columnValue() {
    return null;
  }

  get multipleValues() {
    return null;
  }

  isEqual(value) {
    return false;
  }

  contains(value) {
    return false;
  }

  startsWith(value) {
    return false;
  }

  isLessThan(value) {
    return false;
  }

  isGreaterThan(value) {
    return false;
  }

  mapItems(callback) {
    return this._items.slice().map(callback);
  }

  forEachItem(callback) {
    this.mapItems(callback);
  }
}
exports.default = RepeatableValue;
//# sourceMappingURL=repeatable-value.js.map