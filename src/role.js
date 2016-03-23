export default class Role {
  constructor(attributes) {
    attributes = attributes || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this._attributes = attributes;
  }
}
