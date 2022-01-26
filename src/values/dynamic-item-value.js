import ElementFactory from '../elements/element-factory';
import FormValues from './form-values';

export default class DynamicItemValue {
  constructor(dynamicValue, attributes) {
    this.dynamicValue = dynamicValue;
    this._metadataJSON = attributes.metadata;
    this._elementsJSON = attributes.elements;
    this._valuesJSON = attributes.values;
  }

  toJSON() {
    const json = {};

    json.metadata = this._metadataJSON || null;

    json.elements = [];
    for (const element of this.elements) {
      json.elements.push(element.toJSON());
    }

    json.values = this.values.toJSON();

    return json;
  }

  get id() {
    return this.metadata.id;
  }

  get metadata() {
    return this._metadataJSON;
  }

  get elements() {
    if (this._elements == null) {
      this._elements = [];
      for (const elementJSON of this._elementsJSON) {
        const element = ElementFactory.create(null, elementJSON);
        if (element) {
          this._elements.push(element);
        }
      }
    }

    return this._elements;
  }

  get values() {
    if (this._values == null) {
      this._values = new FormValues(this, this._valuesJSON);
    }

    return this._values;
  }
}
