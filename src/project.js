export default class Project {
  constructor(attributes) {
    attributes = attributes || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
  }
}
