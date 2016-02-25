import ChildElements from './elements/child-elements';

export default class Form {
  constructor(attributes) {
    // TODO(zhm) remove json attr
    this._json = attributes;
    // TODO(zhm) this might need to go away
    this.titleFieldKeys = attributes.title_field_keys;
    this.script = attributes.script;
    this.createChildElements(attributes.elements);
  }

  async load() {
    for (const element of this.allElements) {
      if (element.load) {
        await element.load();
      }
    }
  }

  get(key) {
    return this.elementsByKey[key];
  }

  find(dataName) {
    return this.elementsByDataName[dataName];
  }

  get hasHiddenParent() {
    return false;
  }

  toJSON() {
    // TODO(zhm) actually implement this so it returns a copy
    return this._json;
  }
}

ChildElements.includeInto(Form);
