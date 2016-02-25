'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _choice = require('./choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StatusChoice extends _choice2.default {
  constructor(attributes) {
    super(attributes);

    this.color = attributes.color;
  }
}
exports.default = StatusChoice;
//# sourceMappingURL=status-choice.js.map