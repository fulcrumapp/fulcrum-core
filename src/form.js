import ChildElements from './elements/child-elements';
import StatusElement from './elements/status-element';
import DefaultValues from './values/default-values';
import Record from './record';
import async from 'async';

export default class Form {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attrs) {
    const attributes = attrs || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._elementsJSON = attributes.elements;
    this._elements = null;
    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;
    this._script = attributes.script;
    this._geometryRequired = !!attributes.geometry_required;
    this._geometryTypes = attributes.geometry_types;
    this._reportTemplatesJSON = attributes.report_templates;

    this._projectEnabled = attributes.projects_enabled != null ? !!attributes.projects_enabled : true;
    this._assignmentEnabled = attributes.assignment_enabled != null ? !!attributes.assignment_enabled : true;

    if (attributes.title_field_keys || attributes.record_title_key) {
      this._titleFieldKeysJSON = attributes.title_field_keys || [ attributes.record_title_key ];
    } else {
      this._titleFieldKeysJSON = [];
    }
  }

  get id() {
    return this._id;
  }

  load(dataSource, callback) {
    if (this._schemaLoaded) {
      callback();
      return;
    }

    this._schemaLoaded = true;

    const loadElements = [];

    for (const element of this.allElements) {
      if (element.load) {
        loadElements.push(element);
      }
    }

    async.each(loadElements, (element, cb) => {
      element.load(dataSource, (err) => {
        if (err) {
          // TODO(zhm) We need a parameter to control what happens when there's an error. We don't
          // want to throw right here because some actual forms have orphaned objects. We can't have this
          // blow up here because in a migration we need to keep going even when a form is 'slightly bogus'.
          // In some cases it might be desirable to have more strict verification of the choice lists and
          // classification sets.
        }

        cb();
      });
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

  get isProjectEnabled() {
    return this._projectEnabled;
  }

  get isAssignmentEnabled() {
    return this._assignmentEnabled;
  }

  toJSON() {
    const json = {};

    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.script = this.script || null;
    json.elements = JSON.parse(JSON.stringify(this._elementsJSON));
    json.assignment_enabled = this.isAssignmentEnabled;
    json.projects_enabled = this.isProjectEnabled;
    json.geometry_required = this.isGeometryRequired;
    json.geometry_types = this._geometryTypes;
    json.title_field_keys = this.titleFieldKeys;
    json.report_templates = this.reportTemplates;

    if (this._statusFieldJSON) {
      json.status_field = JSON.parse(JSON.stringify(this._statusFieldJSON));
    }

    return json;
  }

  get isGeometryEnabled() {
    return this._geometryTypes && this._geometryTypes.length > 0;
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
    return this._titleFieldKeysJSON || [];
  }

  get reportTemplates() {
    return this._reportTemplatesJSON || [];
  }

  get reportTemplate() {
    return this.reportTemplates.length ? this.reportTemplates[0] : null;
  }

  resetOverrides() {
    for (const element of this.elements) {
      element.resetOverrides();
    }

    this.statusField.resetOverrides();
  }
}

ChildElements.includeInto(Form);
