'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _audioItemValue = require('./audio-item-value');

var _audioItemValue2 = _interopRequireDefault(_audioItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AudioValue extends _mediaValue2.default {
  get ItemClass() {
    return _audioItemValue2.default;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Audio File';
    } else {
      return `${ this.length } Audio Files`;
    }
  }
}
exports.default = AudioValue;
//# sourceMappingURL=audio-value.js.map