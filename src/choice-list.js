import Choice from './elements/choice';

export default class ChoiceList {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._choicesJSON = attributes.choices || [];
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

  get choices() {
    if (!this._choices) {
      this._choices = [];

      for (const choice of this._choicesJSON) {
        this._choices.push(new Choice(choice));
      }
    }

    return this._choices;
  }
}
