export default class User {
  constructor(attrs) {
    const attributes = attrs || {};

    this._id = attributes.id;
    this._firstName = attributes.first_name;
    this._lastName = attributes.last_name;
    this._email = attributes.email;
    this._fullName = attributes.name;
    this._imageLarge = attributes.image_large;
    this._imageSmall = attributes.image_small;
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
    return this._fullName || (this.firstName + ' ' + this.lastName);
  }

  get email() {
    return this._email;
  }

  get imageLarge() {
    return this._imageLarge;
  }

  get imageSmall() {
    return this._imageSmall;
  }
}
