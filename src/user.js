export default class User {
  constructor(attributes) {
    attributes = attributes || {};

    this._id = attributes.id;
    this._firstName = attributes.first_name;
    this._lastName = attributes.last_name;
    this._email = attributes.email;
  }

  get id() {
    return this._id;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  get email() {
    return this._email;
  }
}
