'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _statusChoice = require('./status-choice');

var _statusChoice2 = _interopRequireDefault(_statusChoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StatusElement extends _textualElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.choices = [];

    for (const choice of attributes.choices) {
      this.choices.push(new _statusChoice2.default(choice));
    }

    this._enabled = !!attributes.enabled;
    this._readOnly = !!attributes.read_only;
  }

  get isEnabled() {
    return this._enabled;
  }

  get isReadOnly() {
    return this._readOnly;
  }

  statusForValue(value) {
    for (const choice of this.choices) {
      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  }
}
exports.default = StatusElement;
//# sourceMappingURL=status-element.js.map