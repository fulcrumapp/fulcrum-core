'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class YesNoElement extends _textualElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.positiveChoice = attributes.positive;

    this.negativeChoice = attributes.negative;

    this.neutralChoice = attributes.neutral;

    this.neutralEnabled = !!attributes.neutral_enabled;
  }
}
exports.default = YesNoElement;
//# sourceMappingURL=yes-no-element.js.map