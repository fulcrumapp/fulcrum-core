import ChildElements from './elements/child-elements';

export default class Form {
  constructor(attributes) {
    // TODO(zhm) remove json attr
    this._json = attributes;
    this.createChildElements(attributes.elements);
    this.titleFieldKeys = attributes.titile_field_keys;
  }

  elementByKey(key) {
    for (let element of this.elements) {
      if (element.key === key) {
        return element;
      }
    }
  }

  toJSON() {
    // TODO(zhm) actually implement this so it returns a copy
    return this._json;
  }
}

ChildElements.includeInto(Form);
