'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaItemValue = require('./media-item-value');

var _mediaItemValue2 = _interopRequireDefault(_mediaItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AudioItemValue extends _mediaItemValue2.default {
  get mediaKey() {
    return 'audio_id';
  }
}
exports.default = AudioItemValue;
//# sourceMappingURL=audio-item-value.js.map