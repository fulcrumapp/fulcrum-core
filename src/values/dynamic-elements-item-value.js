import ChildElements from '../elements/child-elements';
import FormValues from '../values/form-values';

export default class DynamicElementsItemValue {
  constructor(dynamicElementValue, attributes) {
    this.dynamicElementValue = dynamicElementValue;
    this._formValuesJSON = attributes.values;
    this._elementsJSON = attributes.elements;
    this._metadataJSON = attributes.metadata;
  }

  toJSON() {
    const json = {};

    json.values = this._formValuesJSON || null;
    json.elements = this._elementsJSON || null;
    json.metadata = this._metadataJSON || null;

    return json;
  }

  get metadata() {
    return this._metadataJSON;
  }

  get formValues() {
    if (this._formValues == null) {
      this._formValues = new FormValues(this, this._formValuesJSON);
    }

    return this._formValues;
  }
}

ChildElements.includeInto(DynamicElementsItemValue);
