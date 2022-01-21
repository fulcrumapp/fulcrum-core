import ChildElements from '../elements/child-elements';
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
    json.elements = this._elementsJSON || null;
    json.values = this.values.toJSON() || null;

    return json;
  }

  get id() {
    return this.metadata.id;
  }

  get metadata() {
    return this._metadataJSON;
  }

  get values() {
    if (this._values == null) {
      this._values = new FormValues(this, this._valuesJSON);
    }

    return this._values;
  }
}

ChildElements.includeInto(DynamicItemValue);
