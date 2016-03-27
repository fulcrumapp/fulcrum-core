import ChildElements from './elements/child-elements';
import StatusElement from './elements/status-element';
import DefaultValues from './values/default-values';
import Record from './record';
import async from 'async';

export default class Form {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._elementsJSON = attributes.elements;
    this._elements = null;
    this._titleFieldKeysJSON = attributes.title_field_keys;
    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;
    this._script = attributes.script;
    this._geometryRequired = !!attributes.geometry_required;

    if (attributes.title_field_keys || attributes.record_title_key) {
      this._titleFieldKeysJSON = attributes.title_field_keys || [attributes.record_title_key];
      this._titleFieldKeys = [];
    } else {
      this._titleFieldKeysJSON = [];
      this._titleFieldKeys = [];
    }
  }

  get id() {
    return this._id;
  }

  load(dataSource, callback) {
    const loadElements = [];

    for (const element of this.allElements) {
      if (element.load) {
        loadElements.push(element);
      }
    }

    async.each(loadElements, (element, cb) => {
      element.load(dataSource, cb);
    }, callback);
  }

  createRecord(attributes) {
    const record = new Record(attributes, this);

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
    const json = {};

    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.script = this.script || null;
    json.elements = JSON.parse(JSON.stringify(this._elementsJSON));

    return json;
  }

  get isGeometryRequired() {
    return this._geometryRequired;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get script() {
    return this._script;
  }

  get titleFieldKeys() {
    return this._titleFieldKeys;
  }
}

ChildElements.includeInto(Form);
