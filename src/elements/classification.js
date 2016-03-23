export default class Classification {
  constructor(parent, attributes) {
    this.parent = parent;
    this.label = attributes.label;
    this.value = attributes.value || attributes.label;
    this._items = [];

    if (attributes.child_classifications) {
      for (let child of attributes.child_classifications) {
        this._items.push(new Classification(this, child));
      }
    }
  }

  get items() {
    return this._items.slice();
  }

  get exploded() {
    // return an array of all classifications including all parent items
    const classifications = [];

    let iterator = this;

    while (iterator && iterator.parent) {
      classifications.push(iterator);
      iterator = iterator.parent;
    }

    if (iterator) {
      classifications.push(iterator);
    }

    return classifications.reverse();
  }

  toJSON() {
    const values = [];

    for (let item of this.exploded) {
      if (item.value) {
        values.push(item.value);
      }
    }

    return values;
  }
}
