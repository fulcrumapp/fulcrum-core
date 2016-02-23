'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextValue extends _textualValue2.default {
  get columnValue() {
    if (this.element.numeric) {
      return this.numericValue;
    }
    return super.columnValue;
  }
}
exports.default = TextValue;
//# sourceMappingURL=text-value.js.map