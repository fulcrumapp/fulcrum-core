import Choice from './elements/choice';

export default class ChoiceList {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attrs) {
    const attributes = attrs || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._choicesJSON = attributes.choices || [];
    this._version = attrs.version;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get version() {
    return this._version;
  }

  get choices() {
    if (!this._choices) {
      this._choices = [];

      for (const choice of this._choicesJSON) {
        this._choices.push(new Choice(choice));
      }
    }

    return this._choices;
  }

  toJSON() {
    const json = {};

    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.choices = this._choicesJSON || null;
    json.version = this.version;

    return json;
  }
}
