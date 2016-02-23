'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classification = require('./elements/classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassificationSet {
  constructor(attributes) {
    attributes = attributes || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.items = [];

    if (attributes.items) {
      for (let item of attributes.items) {
        this.items.push(new _classification2.default(null, item));
      }
    }
  }
}
exports.default = ClassificationSet;
//# sourceMappingURL=classification-set.js.map