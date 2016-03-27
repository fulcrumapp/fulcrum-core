import Classification from './elements/classification';

export default class ClassificationSet {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._itemsJSON = attributes.items || [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get items() {
    if (!this._items) {
      this._items = [];

      for (const item of this._itemsJSON) {
        this._items.push(new Classification(null, item));
      }
    }

    return this._items;
  }
}
