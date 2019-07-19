"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(attrs) {
    var attributes = attrs || {};
    this._id = attributes.id;
    this._firstName = attributes.first_name;
    this._lastName = attributes.last_name;
    this._email = attributes.email;
    this._fullName = attributes.name;
  }

  _createClass(User, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "firstName",
    get: function get() {
      return this._firstName;
    }
  }, {
    key: "lastName",
    get: function get() {
      return this._lastName;
    }
  }, {
    key: "fullName",
    get: function get() {
      return this._fullName || this.firstName + ' ' + this.lastName;
    }
  }, {
    key: "email",
    get: function get() {
      return this._email;
    }
  }]);

  return User;
}();

exports["default"] = User;
//# sourceMappingURL=user.js.map