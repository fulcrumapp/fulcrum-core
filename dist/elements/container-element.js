'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _childElements = require('./child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContainerElement extends _element2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.createChildElements(attributes.elements);
  }
}

exports.default = ContainerElement;
_childElements2.default.includeInto(ContainerElement);
//# sourceMappingURL=container-element.js.map