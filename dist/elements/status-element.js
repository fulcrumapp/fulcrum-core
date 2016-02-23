'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StatusElement extends _textualElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.choices = attributes.choices;

    this.enabled = attributes.enabled;

    this.readOnly = !!attributes.read_only;
  }

  statusForValue(value) {
    throw new Error('Not implemented');
  }
}
exports.default = StatusElement;
//# sourceMappingURL=status-element.js.map