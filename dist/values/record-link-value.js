'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _recordLinkItemValue = require('./record-link-item-value');

var _recordLinkItemValue2 = _interopRequireDefault(_recordLinkItemValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RecordLinkValue extends _formValue2.default {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items) {
      for (let item of items) {
        this._items.push(new _recordLinkItemValue2.default(item));
      }
    }
  }

  get isEmpty() {
    return this.length === 0;
  }

  get displayValue() {
    if (this.isEmpty) {
      return null;
    }

    if (this.length === 1) {
      return '1 record';
    }

    return this.length + ' records';
  }

  get searchableValue() {
    return this.displayValue;
  }

  get length() {
    return this._items.length;
  }

  toJSON() {
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
    const ids = [];

    for (let item of this._items) {
      ids.push(new _multipleValueItem2.default(this.element, item.recordID));
    }

    return ids;
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
}
exports.default = RecordLinkValue;
//# sourceMappingURL=record-link-value.js.map