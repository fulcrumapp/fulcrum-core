import Mixin from 'mixmatch';

export default class ChildElements extends Mixin {
  get elements() {
    if (!this._elements) {
      this.createChildElements(this._elementsJSON);
    }

    return this._elements;
  }

  createChildElements(elements) {
    this._elements = [];

    if (elements) {
      const ElementFactory = require('./element-factory').default; // Import the module here to avoid circular dependency
      for (const element of elements) {
        const el = ElementFactory.create(this, element);

        if (el) {
          this._elements.push(el);
        }
      }
    }
  }

  get allElements() {
    return this._flattenElements(this.elements);
  }

  get elementsByKey() {
    if (this._elementsByKey == null) {
      this._elementsByKey = this._flattenElementsByAttribute(this.elements, 'key');
    }

    return this._elementsByKey;
  }

  get elementsByDataName() {
    if (this._elementsByDataName == null) {
      this._elementsByDataName = this._flattenElementsByAttribute(this.elements, 'dataName');
    }

    return this._elementsByDataName;
  }

  elementsOfType(type, recurseRepeatables = true) {
    const result = [];

    for (const element of this.flattenElements(recurseRepeatables)) {
      if (element.type === type) {
        result.push(element);
      }
    }

    return result;
  }

  flattenElements(recurseRepeatables = true) {
    return this._flattenElements(this.elements, recurseRepeatables);
  }

  _flattenElements(elements, recurseRepeatables = true) {
    let flat = [];

    for (const element of elements) {
      flat.push(element);

      let recurse = true;

      if (!recurseRepeatables && element.isRepeatableElement) {
        recurse = false;
      }

      if (recurse && element.elements) {
        flat = flat.concat(this._flattenElements(element.elements, recurseRepeatables));
      }
    }

    return flat;
  }

  _flattenElementsByAttribute(elements, attr) {
    const flat = {};

    for (const element of elements) {
      flat[element[attr]] = element;

      if (element.elements) {
        const children = this._flattenElementsByAttribute(element.elements, attr);

        for (const key of Object.keys(children)) {
          flat[key] = children[key];
        }
      }
    }

    return flat;
  }
}
