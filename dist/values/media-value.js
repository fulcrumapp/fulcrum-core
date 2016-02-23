'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MediaValue extends _formValue2.default {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items != null) {
      for (let item of items) {
        this._items.push(new this.ItemClass(item));
      }
    }
  }

  get isEmpty() {
    return this._items.length === 0;
  }

  get searchableValue() {
    if (this.isEmpty) {
      return null;
    }

    const ids = [];

    for (const item of this._items) {
      if (_textUtils2.default.isPresent(item.caption)) {
        ids.push(item.caption);
      }
    }

    return ids.join(' ');
  }

  get length() {
    return this._items.length;
  }

  columnValue() {
    const ids = [];

    for (let item of this._items) {
      ids.push(item.mediaID);
    }

    return ids.join(',');
  }

  get multipleValues() {
    const items = [];

    for (let item of this._items) {
      items.push(new _multipleValueItem2.default(this.element, item.mediaID));
    }

    return items;
  }

  toJSON() {
    const items = [];

    for (let item of this._items) {
      items.push(item.toJSON());
    }

    return items;
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
    return this.length < _numberUtils2.default.parseDouble(value);
  }

  isGreaterThan(value) {
    return this.length > _numberUtils2.default.parseDouble(value);
  }

  mapItems(callback) {
    return this._items.slice().map(callback);
  }

  addItem(id, caption) {
    const item = new this.ItemClass({ caption: caption });

    item.mediaID = id;

    this._items.push(item);

    return item;
  }
}
exports.default = MediaValue;
//# sourceMappingURL=media-value.js.map