export default class Project {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
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
}
