"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(attrs) {
        const attributes = attrs || {};
        this._id = attributes.id;
        this._firstName = attributes.first_name;
        this._lastName = attributes.last_name;
        this._email = attributes.email;
        this._fullName = attributes.name;
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
}
exports.default = User;
//# sourceMappingURL=user.js.map