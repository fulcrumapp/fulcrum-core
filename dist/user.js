"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(attributes) {
  _classCallCheck(this, User);

  attributes = attributes || {};

  this.id = attributes.id;
  this.name = attributes.name;
  this.email = attributes.email;
};

exports.default = User;
//# sourceMappingURL=user.js.map