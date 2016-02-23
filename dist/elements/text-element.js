'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextElement extends _textualElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.numeric = !!attributes.numeric;

    this.format = attributes.format;

    this.min = +attributes.min;

    this.max = +attributes.max;

    if (isNaN(this.min)) {
      this.min = null;
    }

    if (isNaN(this.max)) {
      this.max = null;
    }

    this.pattern = attributes.pattern;

    this.patternDescription = attributes.pattern_description;
  }

  get isLengthValidationSupported() {
    return true;
  }

  get isDecimalFormat() {
    return this.numeric && this.format === 'decimal';
  }

  get isIntegerFormat() {
    return this.numeric && this.format === 'integer';
  }

  get hasMin() {
    return this.min != null;
  }

  get hasMax() {
    return this.max != null;
  }

  get hasPattern() {
    return this.pattern && this.pattern.length;
  }
}
exports.default = TextElement;
//# sourceMappingURL=text-element.js.map