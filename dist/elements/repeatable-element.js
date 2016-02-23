'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containerElement = require('./container-element');

var _containerElement2 = _interopRequireDefault(_containerElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RepeatableElement extends _containerElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.titleFieldKeys = attributes.title_field_keys;

    this.geometryTypes = attributes.geometry_types;

    this.geometryRequired = !!attributes.geometry_required;
  }
}
exports.default = RepeatableElement;
//# sourceMappingURL=repeatable-element.js.map