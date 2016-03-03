"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Choice = function Choice(attributes) {
  _classCallCheck(this, Choice);

  this.label = attributes.label;
  this.value = attributes.value || attributes.label;
};

exports.default = Choice;
//# sourceMappingURL=choice.js.map