import FormValue from './form-value';
import MultipleValueItem from './multiple-value-item';
import TextUtils from '../utils/text-utils';
import NumberUtils from '../utils/number-utils';

export default class MediaValue extends FormValue {
  constructor(element, items) {
    super(element, items);

    this._items = [];

    if (items != null) {
      for (let item of items) {
        this._items.push(new this.ItemClass(this, item));
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
      if (TextUtils.isPresent(item.caption)) {
        ids.push(item.caption);
      }
    }

    return ids.join(' ');
  }

  get length() {
    return this._items.length;
  }

  get columnValue() {
    const ids = [];

    for (let item of this._items) {
      ids.push(item.mediaID);
    }

    return ids;
  }

  get multipleValues() {
    const items = [];

    for (let item of this._items) {
      items.push(new MultipleValueItem(this.element, item.mediaID));
    }

    return items;
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

  addItem(id, caption) {
    const item = new this.ItemClass(this, { caption: caption });

    item.mediaID = id;

    this._items.push(item);

    return item;
  }

  removeItem(id) {
    for (let index = 0; index < this._items.length; ++index) {
      if (this._items[index].mediaID === id) {
        const item = this._items[index];

        this._items.splice(index, 1);

        return item;
      }
    }

    return null;
  }

  get hasCaptions() {
    for (const item of this._items) {
      if (TextUtils.isPresent(item.caption)) {
        return true;
      }
    }

    return false;
  }

  // return a copy until it's determined that a mutable API is necessary
  get items() {
    return this._items.slice();
  }
}
