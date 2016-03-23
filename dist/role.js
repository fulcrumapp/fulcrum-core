"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Role = function Role(attributes) {
  _classCallCheck(this, Role);

  attributes = attributes || {};

  this.id = attributes.id;
  this.name = attributes.name;
  this._attributes = attributes;
};

exports.default = Role;
//# sourceMappingURL=role.js.map