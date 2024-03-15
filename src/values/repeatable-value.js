import FormValue from './form-value';
import RepeatableItemValue from './repeatable-item-value';
import TextUtils from '../utils/text-utils';
import { v4 as uuidv4 } from 'uuid'

const SearchSeparator = ' ';

export default class RepeatableValue extends FormValue {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items != null) {
      for (const item of items) {
        this._items.push(new RepeatableItemValue(this.element, item, this._items.length, this));
      }
    }
  }

  get isEmpty() {
    return this._items.length === 0;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Item';
    }

    return this.length + ' Items';
  }

  get searchableValue() {
    if (this.isEmpty) {
      return null;
    }

    const values = [];

    for (const item of this._items) {
      const searchValue = item.searchableValue;

      if (TextUtils.isPresent(searchValue)) {
        values.push(searchValue);
      }
    }

    return values.join(SearchSeparator);
  }

  format(options) {
    if (this.isEmpty) {
      return null;
    }

    return options.useDisplayValue ? this.displayValue : this.length;
  }

  get length() {
    return this._items.length;
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

  toSimpleJSON() {
    if (this.isEmpty) {
      return null;
    }

    const items = [];

    for (const item of this._items) {
      items.push(item.toJSON({simple: true}));
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

  // return a copy until it's determined that a mutable API is necessary
  get items() {
    return this._items.slice();
  }

  forEachItem(callback) {
    this.mapItems(callback);
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
      id: uuidv4(),
      form_values: {}
    };

    return new RepeatableItemValue(this.element, attributes, this._items.length, this);
  }
}
