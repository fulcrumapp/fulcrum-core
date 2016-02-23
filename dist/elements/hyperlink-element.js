'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HyperlinkElement extends _textualElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.defaultURL = attributes.default_url;
  }
}
exports.default = HyperlinkElement;
//# sourceMappingURL=hyperlink-element.js.map