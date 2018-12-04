'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(attrs) {
    _classCallCheck(this, User);

    var attributes = attrs || {};

    this._id = attributes.id;
    this._firstName = attributes.first_name;
    this._lastName = attributes.last_name;
    this._email = attributes.email;
    this._fullName = attributes.name;
    this._imageLarge = attributes.image_large;
    this._imageSmall = attributes.image_small;
  }

  _createClass(User, [{
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'firstName',
    get: function get() {
      return this._firstName;
    }
  }, {
    key: 'lastName',
    get: function get() {
      return this._lastName;
    }
  }, {
    key: 'fullName',
    get: function get() {
      return this._fullName || this.firstName + ' ' + this.lastName;
    }
  }, {
    key: 'email',
    get: function get() {
      return this._email;
    }
  }, {
    key: 'imageLarge',
    get: function get() {
      return this._imageLarge;
    }
  }, {
    key: 'imageSmall',
    get: function get() {
      return this._imageSmall;
    }
  }]);

  return User;
}();

exports.default = User;
//# sourceMappingURL=user.js.map