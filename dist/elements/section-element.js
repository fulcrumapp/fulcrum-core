'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containerElement = require('./container-element');

var _containerElement2 = _interopRequireDefault(_containerElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SectionElement extends _containerElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.display = attributes.display;
  }

  get isDrillDown() {
    return this.display === 'drilldown';
  }

  get isInline() {
    return this.display === 'inline';
  }
}
exports.default = SectionElement;
//# sourceMappingURL=section-element.js.map