export default class User {
  constructor(attributes) {
    attributes = attributes || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this.email = attributes.email;
  }
}
