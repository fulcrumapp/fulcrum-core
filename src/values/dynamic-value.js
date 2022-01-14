import FormValue from './form-value';
import DynamicItemValue from './dynamic-item-value';
import MultipleValueItem from './multiple-value-item';
import NumberUtils from '../utils/number-utils';

export default class DynamicValue extends FormValue {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (Array.isArray(items)) {
      for (const item of items) {
        this._items.push(new this.ItemClass(this, item));
      }
    }
  }

  get ItemClass() {
    return DynamicItemValue;
  }

  get isEmpty() {
    return this._items.length === 0;
  }

  get searchableValue() {
    return null;
  }

  get length() {
    return this._items.length;
  }

  format({part = null}) {
    if (this.isEmpty) {
      return null;
    }

    if (part === 'elements') {
      return this.items.map(item => item._elementsJSON);
    } else if (part === 'metadata') {
      return this.items.map(item => item._metadataJSON);
    }

    return this.items.map(item => item.values);
  }

  get columnValue() {
    if (this.isEmpty) {
      return null;
    }

    const values = [];
    const elements = [];

    for (const item of this._items) {
      values.push(item.values);
      elements.push(item.elements);
    }

    const value = {};

    value['f' + this.element.key + '_elements'] = elements;
    value['f' + this.element.key] = values;

    return value;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    const items = [];

    for (const item of this._items) {
      items.push(item.toJSON());
    }

    return items;
  }

  get multipleValues() {
    const items = [];

    for (const item of this._items) {
      items.push(new MultipleValueItem(this.element, item.values));
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
    return this.length < NumberUtils.parseDouble(value);
  }

  isGreaterThan(value) {
    return this.length > NumberUtils.parseDouble(value);
  }

  get items() {
    return this._items.slice();
  }

  addRecord(record) {
    const item = new DynamicItemValue(this, {record_id: record.id});

    item._record = record;

    this.insertItem(item);
  }

  itemIndex(id) {
    for (let index = 0; index < this._items.length; ++index) {
      if (id === this._items[index].id) {
        return index;
      }
    }

    return -1;
  }

  insertItem(item) {
    const index = this.itemIndex(item.id);

    if (index > -1) {
      this._items[index] = item;
    } else {
      this._items.push(item);
    }
  }

  removeItem(id) {
    const index = this.itemIndex(id);

    if (index > -1) {
      const item = this._items[index];

      this._items.splice(index, 1);

      return item;
    }

    return null;
  }
}
