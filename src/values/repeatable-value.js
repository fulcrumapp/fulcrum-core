import FormValue from './form-value';
import RepeatableItemValue from './repeatable-item-value';
import TextUtils from '../utils/text-utils';
import uuid from 'uuid';

const SearchSeparator = ' ';

export default class RepeatableValue extends FormValue {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items != null) {
      for (let item of items) {
        this._items.push(new RepeatableItemValue(this.element, item, this._items.length));
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

      if (TextUtils.isPresent(searchValue)) {
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

  itemIndex(item) {
    for (let index = 0; index < this._items.length; ++index) {
      if (item.id === this._items[index].id) {
        return index;
      }
    }

    return -1;
  }

  insertItem(item) {
    const index = this.itemIndex(item);

    if (index > -1) {
      this._items[index] = item;
    } else {
      this._items.push(item);
    }
  }

  createNewItem() {
    const attributes = {
      id: uuid.v4(),
      form_values: {}
    };

    return new RepeatableItemValue(this.element, attributes, this._items.length);
  }
}
