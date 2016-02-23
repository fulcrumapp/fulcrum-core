'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _choice = require('./elements/choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChoiceList {
  constructor(attributes) {
    attributes = attributes || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.choices = [];

    if (attributes.choices) {
      for (let choice of attributes.choices) {
        this.choices.push(new _choice2.default(choice));
      }
    }
  }
}
exports.default = ChoiceList;
//# sourceMappingURL=choice-list.js.map