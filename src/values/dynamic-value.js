import FormValue from './form-value';
import MultipleValueItem from './multiple-value-item';
import NumberUtils from '../utils/number-utils';
import { v4 as uuidv4 } from 'uuid'

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
    const DynamicItemValue = require('./dynamic-item-value').default; // Import the module here to avoid circular dependency
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

    if (part === 'metadata') {
      return this.items.map(item => item._metadataJSON);
    } else if (part === 'elements') {
      return this.items.map(item => item._elementsJSON);
    }

    return this.items.map(item => item.values.toJSON());
  }

  get columnValue() {
    if (this.isEmpty) {
      return null;
    }

    const metadata = [];
    const elements = [];
    const values = [];

    for (const item of this._items) {
      metadata.push(item.metadata);
      elements.push(item.elements);
      values.push(item.values);
    }

    const value = {};

    value['f' + this.element.key + '_metadata'] = metadata;
    value['f' + this.element.key + '_elements'] = elements;
    value['f' + this.element.key + '_values'] = values;

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

  get displayValue() {
    if (this.length === 1) {
      return '1 item';
    }

    return `${this.length} items`;
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

  mapItems(callback) {
    return this._items.slice().map(callback);
  }

  get items() {
    return this._items.slice();
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

  createNewItem() {
    const attributes = {
      metadata: {
        id: uuidv4()
      },
      elements: [],
      values: {}
    };

    return new this.ItemClass(this, attributes);
  }
}
