import ChildElements from '../elements/child-elements';
import FormValues from '../values/form-values';

export default class DynamicElementsItemValue {
  constructor(dynamicElementValue, attributes) {
    this.dynamicElementValue = dynamicElementValue;
    this._formValuesJSON = attributes.values;
    this._elementsJSON = attributes.elements;
  }

  toJSON() {
    const json = {};

    json.values = this._formValuesJSON || null;
    json.elements = this._elementsJSON || null;

    return json;
  }

  get formValues() {
    if (this._formValues == null) {
      this._formValues = new FormValues(this, this._formValuesJSON);
    }

    return this._formValues;
  }
}

ChildElements.includeInto(DynamicElementsItemValue);
