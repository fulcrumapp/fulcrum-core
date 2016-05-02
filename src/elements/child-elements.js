import Mixin from 'mixmatch';
import ElementFactory from './element-factory';

export default class ChildElements extends Mixin {
  get elements() {
    if (!this._elements) {
      this.createChildElements(this._elementsJSON);
    }

    return this._elements;
  }

  createChildElements(elements) {
    this._elements = [];

    for (const element of elements) {
      this._elements.push(ElementFactory.create(this, element));
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

  elementsOfType(type) {
    const result = [];

    for (const element of this.allElements) {
      if (element.type === type) {
        result.push(element);
      }
    }

    return result;
  }

  _flattenElements(elements) {
    let flat = [];

    for (const element of elements) {
      flat.push(element);

      if (element.elements) {
        flat = flat.concat(this._flattenElements(element.elements));
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
