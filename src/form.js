import ChildElements from './elements/child-elements';
import StatusElement from './elements/status-element';
import DefaultValues from './values/default-values';
import Record from './record';

export default class Form {
  constructor(attributes) {
    // TODO(zhm) remove json attr
    this._json = attributes;
    // TODO(zhm) this might need to go away
    this.titleFieldKeys = attributes.title_field_keys;
    this.script = attributes.script;
    this.createChildElements(attributes.elements);

    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;
  }

  async load() {
    for (const element of this.allElements) {
      if (element.load) {
        await element.load();
      }
    }
  }

  createRecord(attributes) {
    const record = new Record(attributes);

    // TODO(zhm) this might not be final
    record._form = this;
    record._formValuesJSON = {};

    DefaultValues.applyDefaultValuesForElements(this.elements,
                                                record.formValues,
                                                record);

    return record;
  }

  get statusField() {
    if (!this._statusField) {
      this._statusField = new StatusElement(this, this._statusFieldJSON);
    }
    return this._statusField;
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
