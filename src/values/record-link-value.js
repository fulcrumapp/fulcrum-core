import FormValue from './form-value';
import RecordLinkItemValue from './record-link-item-value';
import MultipleValueItem from './multiple-value-item';
import NumberUtils from '../utils/number-utils';

export default class RecordLinkValue extends FormValue {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items) {
      for (let item of items) {
        this._items.push(new RecordLinkItemValue(item));
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
      ids.push(new MultipleValueItem(this.element, item.recordID));
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
    return this.length < NumberUtils.parseDouble(value);
  }

  isGreaterThan(value) {
    return this.length > NumberUtils.parseDouble(value);
  }

  get items() {
    return this._items;
  }
}
